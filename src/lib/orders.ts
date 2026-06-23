import type { OrderStatus } from "@prisma/client";

export const trackingSteps: OrderStatus[] = [
  "ORDER_RECEIVED",
  "PROCESSING",
  "PACKED",
  "DISPATCHED",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED"
];

export const orderStatusCopy: Record<OrderStatus, string> = {
  ORDER_RECEIVED: "Order Received",
  PROCESSING: "Processing",
  PACKED: "Packed",
  DISPATCHED: "Dispatched",
  IN_TRANSIT: "In Transit",
  OUT_FOR_DELIVERY: "Out For Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  RETURNED: "Returned"
};

export function generateOrderNumber() {
  const date = new Date();
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(
    date.getDate()
  ).padStart(2, "0")}`;
  return `KK-${stamp}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function defaultTrackingMessage(status: OrderStatus) {
  const copy: Record<OrderStatus, string> = {
    ORDER_RECEIVED: "We have received your order and are preparing it for processing.",
    PROCESSING: "Your order is being quality checked and prepared by the KanchKart team.",
    PACKED: "Your glassware has been carefully packed for transit.",
    DISPATCHED: "Your order has left our fulfilment studio.",
    IN_TRANSIT: "Your package is moving through the courier network.",
    OUT_FOR_DELIVERY: "Your package is out for delivery today.",
    DELIVERED: "Your order has been delivered. We hope it brightens your space.",
    CANCELLED: "This order has been cancelled.",
    RETURNED: "This order has been returned."
  };
  return copy[status];
}
