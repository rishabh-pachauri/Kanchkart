import { type NextRequest } from "next/server";
import type { OrderStatus } from "@prisma/client";
import { handleApiError, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const orderStatuses: OrderStatus[] = [
  "ORDER_RECEIVED",
  "PROCESSING",
  "PACKED",
  "DISPATCHED",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
  "RETURNED"
];

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const status = orderStatuses.find((item) => item === statusParam);

    const orders = await prisma.order.findMany({
      where: status ? { status } : undefined,
      include: {
        payment: true,
        items: true,
        trackingUpdates: { orderBy: { createdAt: "desc" }, take: 3 }
      },
      orderBy: { createdAt: "desc" },
      take: 100
    });
    return ok({ orders });
  } catch (error) {
    return handleApiError(error);
  }
}
