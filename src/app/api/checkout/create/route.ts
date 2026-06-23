import { Prisma } from "@prisma/client";
import { type NextRequest } from "next/server";
import { created, fail, handleApiError, readJson, toMoney } from "@/lib/api";
import { getRequestUser } from "@/lib/auth";
import { assertCsrf } from "@/lib/csrf";
import { generateOrderNumber } from "@/lib/orders";
import { prisma } from "@/lib/prisma";
import { createRazorpayOrder } from "@/lib/razorpay";
import { checkoutSchema } from "@/lib/validation";

function calculateTax(price: number, quantity: number, gstRate: number) {
  return toMoney(((price * quantity) * gstRate) / (100 + gstRate));
}

async function resolveDiscount(code: string | undefined, subtotal: number) {
  if (!code) return { discountTotal: 0, couponCode: undefined };
  const coupon = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });
  const now = new Date();
  if (
    !coupon ||
    !coupon.active ||
    (coupon.startsAt && coupon.startsAt > now) ||
    (coupon.expiresAt && coupon.expiresAt < now) ||
    (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) ||
    (coupon.minimumSubtotal && subtotal < Number(coupon.minimumSubtotal))
  ) {
    return { discountTotal: 0, couponCode: undefined };
  }

  const rawDiscount =
    coupon.discountType === "PERCENTAGE"
      ? subtotal * (Number(coupon.discountValue) / 100)
      : Number(coupon.discountValue);
  const discountTotal = coupon.maxDiscount ? Math.min(rawDiscount, Number(coupon.maxDiscount)) : rawDiscount;
  return { discountTotal: toMoney(discountTotal), couponCode: coupon.code };
}

export async function POST(request: NextRequest) {
  try {
    assertCsrf(request);
    const user = await getRequestUser(request);
    const data = checkoutSchema.parse(await readJson(request));
    const itemIds = data.items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: itemIds }, status: "ACTIVE" }
    });
    const productMap = new Map(products.map((product) => [product.id, product]));

    for (const item of data.items) {
      const product = productMap.get(item.productId);
      if (!product) return fail("One or more products are no longer available.", 409);
      if (product.inventory < item.quantity) {
        return fail(`${product.name} has only ${product.inventory} unit(s) available.`, 409);
      }
    }

    const subtotal = toMoney(
      data.items.reduce((sum, item) => {
        const product = productMap.get(item.productId);
        return sum + Number(product?.price ?? 0) * item.quantity;
      }, 0)
    );
    const taxTotal = toMoney(
      data.items.reduce((sum, item) => {
        const product = productMap.get(item.productId);
        return sum + calculateTax(Number(product?.price ?? 0), item.quantity, Number(product?.gstRate ?? 18));
      }, 0)
    );
    const shippingTotal = subtotal >= 2999 ? 0 : 99;
    const { discountTotal, couponCode } = await resolveDiscount(data.couponCode, subtotal);
    const grandTotal = toMoney(Math.max(subtotal + shippingTotal - discountTotal, 0));
    const orderNumber = generateOrderNumber();

    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: user?.sub,
          customerEmail: data.customer.email.toLowerCase(),
          customerName: data.customer.name,
          customerPhone: data.customer.phone,
          subtotal: new Prisma.Decimal(subtotal),
          discountTotal: new Prisma.Decimal(discountTotal),
          shippingTotal: new Prisma.Decimal(shippingTotal),
          taxTotal: new Prisma.Decimal(taxTotal),
          grandTotal: new Prisma.Decimal(grandTotal),
          couponCode,
          shippingAddress: data.shippingAddress,
          billingAddress: data.billingAddress,
          items: {
            create: data.items.map((item) => {
              const product = productMap.get(item.productId);
              const unitPrice = Number(product?.price ?? 0);
              return {
                productId: item.productId,
                name: product?.name ?? "Product",
                sku: product?.sku ?? "SKU",
                image: product?.images[0],
                quantity: item.quantity,
                unitPrice: new Prisma.Decimal(unitPrice),
                gstRate: new Prisma.Decimal(Number(product?.gstRate ?? 18)),
                lineTotal: new Prisma.Decimal(toMoney(unitPrice * item.quantity))
              };
            })
          },
          payment: {
            create: {
              provider: "RAZORPAY",
              status: "PENDING",
              amount: new Prisma.Decimal(grandTotal)
            }
          },
          trackingUpdates: {
            create: {
              status: "ORDER_RECEIVED",
              message: "We have received your order and reserved the selected glassware."
            }
          }
        },
        include: { payment: true, items: true }
      });

      await Promise.all(
        data.items.map((item) =>
          tx.product.updateMany({
            where: { id: item.productId, inventory: { gte: item.quantity } },
            data: { inventory: { decrement: item.quantity } }
          })
        )
      );

      if (couponCode) {
        await tx.coupon.update({
          where: { code: couponCode },
          data: { usedCount: { increment: 1 } }
        });
      }

      return createdOrder;
    });

    const razorpayOrder = await createRazorpayOrder({
      amount: grandTotal,
      receipt: order.orderNumber,
      notes: { orderId: order.id, orderNumber: order.orderNumber }
    });

    await prisma.payment.update({
      where: { orderId: order.id },
      data: { razorpayOrderId: razorpayOrder.id }
    });

    return created({
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        grandTotal,
        customerEmail: order.customerEmail
      },
      razorpayOrder,
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    return handleApiError(error);
  }
}
