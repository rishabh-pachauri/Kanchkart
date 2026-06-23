import { type NextRequest } from "next/server";
import { handleApiError, ok, readJson } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { assertCsrf } from "@/lib/csrf";
import { prisma } from "@/lib/prisma";
import { addressSchema } from "@/lib/validation";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser(request);
    assertCsrf(request);
    const { id } = await params;
    const body = addressSchema.partial().parse(await readJson(request));
    await prisma.address.updateMany({
      where: { id, userId: user.sub },
      data: body
    });
    const address = await prisma.address.findFirst({ where: { id, userId: user.sub } });
    return ok({ address });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser(request);
    assertCsrf(request);
    const { id } = await params;
    await prisma.address.deleteMany({ where: { id, userId: user.sub } });
    return ok({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
