import { type NextRequest } from "next/server";
import { handleApiError, ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await params;
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id: orderId }, { orderNumber: orderId }]
      },
      select: {
        id: true,
        orderNumber: true,
        status: true,
        customerEmail: true,
        trackingNumber: true,
        courierName: true,
        courierUrl: true,
        estimatedDelivery: true,
        createdAt: true,
        trackingUpdates: {
          orderBy: { createdAt: "asc" }
        }
      }
    });
    return ok({ order });
  } catch (error) {
    return handleApiError(error);
  }
}
