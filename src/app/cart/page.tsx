import type { Metadata } from "next";
import { CartClient } from "@/components/customer/cart-client";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your KanchKart cart, apply coupons, and estimate shipping."
};

export default function CartPage() {
  return <CartClient />;
}
