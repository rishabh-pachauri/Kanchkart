import { type NextRequest } from "next/server";
import { handleApiError, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const user = await requireUser(request);
    const orders = await prisma.order.findMany({
      where: { userId: user.sub },
      include: {
        items: true,
        payment: true,
        trackingUpdates: { orderBy: { createdAt: "asc" } }
      },
      orderBy: { createdAt: "desc" }
    });
    return ok({ orders });
  } catch (error) {
    return handleApiError(error);
  }
}
