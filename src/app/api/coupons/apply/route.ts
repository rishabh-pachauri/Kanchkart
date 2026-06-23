import { type NextRequest } from "next/server";
import { fail, handleApiError, ok, readJson, toMoney } from "@/lib/api";
import { assertCsrf } from "@/lib/csrf";
import { prisma } from "@/lib/prisma";
import { couponApplySchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    assertCsrf(request);
    const body = couponApplySchema.parse(await readJson(request));
    const coupon = await prisma.coupon.findUnique({ where: { code: body.code.toUpperCase() } });
    const now = new Date();
    if (
      !coupon ||
      !coupon.active ||
      (coupon.startsAt && coupon.startsAt > now) ||
      (coupon.expiresAt && coupon.expiresAt < now) ||
      (coupon.minimumSubtotal && body.subtotal < Number(coupon.minimumSubtotal))
    ) {
      return fail("This coupon is not valid for the current cart.", 404);
    }

    const raw =
      coupon.discountType === "PERCENTAGE"
        ? body.subtotal * (Number(coupon.discountValue) / 100)
        : Number(coupon.discountValue);
    const discount = toMoney(coupon.maxDiscount ? Math.min(raw, Number(coupon.maxDiscount)) : raw);
    return ok({ code: coupon.code, discount });
  } catch (error) {
    return handleApiError(error);
  }
}
