import { type NextRequest } from "next/server";
import { created, handleApiError, readJson } from "@/lib/api";
import { assertCsrf } from "@/lib/csrf";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    assertCsrf(request);
    const body = newsletterSchema.parse(await readJson(request));
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: body.email.toLowerCase() },
      update: {},
      create: { email: body.email.toLowerCase() }
    });
    return created({ subscriber });
  } catch (error) {
    return handleApiError(error);
  }
}
