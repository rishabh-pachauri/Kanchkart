import { type NextRequest } from "next/server";
import { handleApiError, ok, readJson } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { assertCsrf } from "@/lib/csrf";
import { prisma } from "@/lib/prisma";
import { defaultTrackingMessage } from "@/lib/orders";
import { notifyOrderStatus } from "@/lib/notifications";
import { statusUpdateSchema } from "@/lib/validation";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(request);
    assertCsrf(request);
    const { id } = await params;
    const body = statusUpdateSchema.parse(await readJson(request));

    const order = await prisma.order.update({
      where: { id },
      data: {
        status: body.status,
        trackingNumber: body.trackingNumber,
        courierName: body.courierName,
        courierUrl: body.courierUrl,
        estimatedDelivery: body.estimatedDelivery ? new Date(body.estimatedDelivery) : undefined,
        invoiceNumber: body.status === "DELIVERED" ? `INV-${new Date().getFullYear()}-${id.slice(-6)}` : undefined,
        trackingUpdates: {
          create: {
            status: body.status,
            message: body.message ?? defaultTrackingMessage(body.status),
            location: body.location,
            trackingNumber: body.trackingNumber,
            courierName: body.courierName,
            estimatedDelivery: body.estimatedDelivery ? new Date(body.estimatedDelivery) : undefined,
            notifiedAt: new Date()
          }
        }
      },
      include: { trackingUpdates: true }
    });

    await notifyOrderStatus(order);
    return ok({ order });
  } catch (error) {
    return handleApiError(error);
  }
}
