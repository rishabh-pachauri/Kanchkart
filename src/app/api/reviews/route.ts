import { type NextRequest } from "next/server";
import { created, handleApiError, ok, readJson } from "@/lib/api";
import { assertCsrf } from "@/lib/csrf";
import { prisma } from "@/lib/prisma";
import { reviewSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const reviews = await prisma.review.findMany({
      where: { approved: true, ...(productId ? { productId } : {}) },
      orderBy: { createdAt: "desc" },
      take: 40
    });
    return ok({ reviews });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    assertCsrf(request);
    const body = reviewSchema.parse(await readJson(request));
    const review = await prisma.review.create({
      data: {
        productId: body.productId,
        rating: body.rating,
        title: body.title,
        body: body.body,
        name: body.name,
        approved: false
      }
    });
    return created({ review, moderation: "pending" });
  } catch (error) {
    return handleApiError(error);
  }
}
