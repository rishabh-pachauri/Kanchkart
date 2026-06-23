import { type NextRequest } from "next/server";
import { handleApiError, ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();
    const category = searchParams.get("category");
    const sort = searchParams.get("sort") ?? "featured";

    const products = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
        ...(category ? { category: { slug: category } } : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
                { sku: { contains: q, mode: "insensitive" } }
              ]
            }
          : {})
      },
      include: { category: true },
      orderBy:
        sort === "price-asc"
          ? { price: "asc" }
          : sort === "price-desc"
            ? { price: "desc" }
            : sort === "new"
              ? { createdAt: "desc" }
              : [{ featured: "desc" }, { bestSeller: "desc" }, { createdAt: "desc" }]
    });

    return ok({ products });
  } catch (error) {
    return handleApiError(error);
  }
}
