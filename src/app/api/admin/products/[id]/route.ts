import { type NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { handleApiError, ok, readJson } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { assertCsrf } from "@/lib/csrf";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validation";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(request);
    assertCsrf(request);
    const { id } = await params;
    const body = productSchema.partial().parse(await readJson(request));
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...body,
        specs: body.specs ? (body.specs as Prisma.InputJsonValue) : undefined
      } as Prisma.ProductUncheckedUpdateInput
    });
    return ok({ product });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(request);
    assertCsrf(request);
    const { id } = await params;
    await prisma.product.update({
      where: { id },
      data: { status: "ARCHIVED" }
    });
    return ok({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
