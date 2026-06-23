import { type NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { created, handleApiError, ok, readJson } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { assertCsrf } from "@/lib/csrf";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" }
    });
    return ok({ products });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);
    assertCsrf(request);
    const body = productSchema.parse(await readJson(request));
    const product = await prisma.product.create({
      data: {
        ...body,
        specs: body.specs ? (body.specs as Prisma.InputJsonValue) : undefined
      } as Prisma.ProductUncheckedCreateInput
    });
    return created({ product });
  } catch (error) {
    return handleApiError(error);
  }
}
