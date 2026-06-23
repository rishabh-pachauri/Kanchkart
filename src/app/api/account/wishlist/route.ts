import { type NextRequest } from "next/server";
import { z } from "zod";
import { created, handleApiError, ok, readJson } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { assertCsrf } from "@/lib/csrf";
import { prisma } from "@/lib/prisma";

const wishlistSchema = z.object({
  productId: z.string().min(1)
});

export async function GET(request: NextRequest) {
  try {
    const user = await requireUser(request);
    const wishlist = await prisma.wishlist.findMany({
      where: { userId: user.sub },
      include: { product: true },
      orderBy: { createdAt: "desc" }
    });
    return ok({ wishlist });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser(request);
    assertCsrf(request);
    const body = wishlistSchema.parse(await readJson(request));
    const wishlistItem = await prisma.wishlist.upsert({
      where: { userId_productId: { userId: user.sub, productId: body.productId } },
      update: {},
      create: { userId: user.sub, productId: body.productId }
    });
    return created({ wishlistItem });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireUser(request);
    assertCsrf(request);
    const body = wishlistSchema.parse(await readJson(request));
    await prisma.wishlist.delete({
      where: { userId_productId: { userId: user.sub, productId: body.productId } }
    });
    return ok({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
