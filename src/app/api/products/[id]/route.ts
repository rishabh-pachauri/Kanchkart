import { type NextRequest } from "next/server";
import { handleApiError, ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await prisma.product.findFirst({
      where: {
        status: "ACTIVE",
        OR: [{ id }, { slug: id }]
      },
      include: {
        category: true,
        reviews: {
          where: { approved: true },
          orderBy: { createdAt: "desc" },
          take: 20
        }
      }
    });

    if (!product) return ok({ product: null }, 404);
    return ok({ product });
  } catch (error) {
    return handleApiError(error);
  }
}
