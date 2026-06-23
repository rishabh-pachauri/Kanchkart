import { type NextRequest } from "next/server";
import { z } from "zod";
import { created, handleApiError, ok, readJson } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { assertCsrf } from "@/lib/csrf";
import { prisma } from "@/lib/prisma";

const categorySchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional(),
  image: z.string().url().optional()
});

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
    return ok({ categories });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);
    assertCsrf(request);
    const body = categorySchema.parse(await readJson(request));
    const category = await prisma.category.create({ data: body });
    return created({ category });
  } catch (error) {
    return handleApiError(error);
  }
}
