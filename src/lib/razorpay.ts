import crypto from "node:crypto";
import Razorpay from "razorpay";
import { toPaise } from "@/lib/api";

function getClient() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) return null;
  return new Razorpay({ key_id, key_secret });
}

export async function createRazorpayOrder(input: {
  amount: number;
  receipt: string;
  notes?: Record<string, string>;
}) {
  const client = getClient();
  if (!client) {
    return {
      id: `rzp_test_${input.receipt}`,
      amount: toPaise(input.amount),
      currency: "INR",
      receipt: input.receipt
    };
  }

  return client.orders.create({
    amount: toPaise(input.amount),
    currency: "INR",
    receipt: input.receipt,
    notes: input.notes
  });
}

export function verifyRazorpaySignature(input: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  const body = `${input.razorpayOrderId}|${input.razorpayPaymentId}`;
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  if (expected.length !== input.razorpaySignature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(input.razorpaySignature));
}

export async function refundRazorpayPayment(input: { paymentId: string; amount?: number }) {
  const client = getClient();
  if (!client) {
    return { id: `rfnd_test_${input.paymentId}`, amount: input.amount ? toPaise(input.amount) : undefined };
  }
  return client.payments.refund(input.paymentId, input.amount ? { amount: toPaise(input.amount) } : {});
}
