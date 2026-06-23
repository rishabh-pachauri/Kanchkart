import { type NextRequest } from "next/server";
import { created, handleApiError, ok, readJson } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { assertCsrf } from "@/lib/csrf";
import { prisma } from "@/lib/prisma";
import { addressSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  try {
    const user = await requireUser(request);
    const addresses = await prisma.address.findMany({
      where: { userId: user.sub },
      orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }]
    });
    return ok({ addresses });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser(request);
    assertCsrf(request);
    const body = addressSchema.parse(await readJson(request));
    const address = await prisma.address.create({
      data: {
        userId: user.sub,
        ...body
      }
    });
    return created({ address });
  } catch (error) {
    return handleApiError(error);
  }
}
