import { type NextRequest } from "next/server";
import { fail, handleApiError, ok, readJson } from "@/lib/api";
import { assertCsrf } from "@/lib/csrf";
import { notifyOrderStatus } from "@/lib/notifications";
import { defaultTrackingMessage } from "@/lib/orders";
import { prisma } from "@/lib/prisma";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { z } from "zod";

const verifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1)
});

export async function POST(request: NextRequest) {
  try {
    assertCsrf(request);
    const body = verifySchema.parse(await readJson(request));
    const verified = verifyRazorpaySignature({
      razorpayOrderId: body.razorpay_order_id,
      razorpayPaymentId: body.razorpay_payment_id,
      razorpaySignature: body.razorpay_signature
    });
    if (!verified) return fail("Payment signature verification failed.", 400);

    const existingPayment = await prisma.payment.findFirst({
      where: { razorpayOrderId: body.razorpay_order_id }
    });
    if (!existingPayment) return fail("Payment order not found.", 404);

    const payment = await prisma.payment.update({
      where: { id: existingPayment.id },
      data: {
        status: "CAPTURED",
        razorpayPaymentId: body.razorpay_payment_id,
        razorpaySignature: body.razorpay_signature,
        order: {
          update: {
            status: "PROCESSING",
            trackingUpdates: {
              create: {
                status: "PROCESSING",
                message: defaultTrackingMessage("PROCESSING"),
                notifiedAt: new Date()
              }
            }
          }
        }
      },
      include: { order: true }
    });

    await notifyOrderStatus(payment.order);
    return ok({ orderNumber: payment.order.orderNumber, status: payment.order.status });
  } catch (error) {
    return handleApiError(error);
  }
}
