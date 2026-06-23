import type { Metadata } from "next";
import { OrderTracker } from "@/components/customer/order-tracker";

export const metadata: Metadata = {
  title: "Track Order",
  description: "Track KanchKart orders with status timeline, courier details, tracking number, and estimated delivery."
};

export default function TrackOrderPage() {
  return <OrderTracker />;
}
