import { type NextRequest } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { handleApiError, ok, readJson } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { assertCsrf } from "@/lib/csrf";
import { prisma } from "@/lib/prisma";
import { refundRazorpayPayment } from "@/lib/razorpay";

const refundSchema = z.object({
  amount: z.coerce.number().positive().optional()
});

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(request);
    assertCsrf(request);
    const { id } = await params;
    const body = refundSchema.parse(await readJson(request));
    const payment = await prisma.payment.findUnique({ where: { id } });
    if (!payment?.razorpayPaymentId) throw new Error("Payment cannot be refunded yet");

    const refund = await refundRazorpayPayment({
      paymentId: payment.razorpayPaymentId,
      amount: body.amount
    });

    const updated = await prisma.payment.update({
      where: { id },
      data: {
        status: "REFUNDED",
        refundId: refund.id,
        metadata: JSON.parse(JSON.stringify({ refund })) as Prisma.InputJsonValue
      }
    });

    return ok({ payment: updated });
  } catch (error) {
    return handleApiError(error);
  }
}
