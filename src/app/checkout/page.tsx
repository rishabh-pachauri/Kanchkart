import type { Metadata } from "next";
import { CheckoutClient } from "@/components/customer/checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure KanchKart checkout with Razorpay payment verification."
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
