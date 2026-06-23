import { type NextRequest } from "next/server";
import { created, fail, handleApiError, readJson } from "@/lib/api";
import { assertCsrf } from "@/lib/csrf";
import { hashPassword, setAuthCookie, signAuthToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { registerSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(request, "auth-register", { limit: 8, windowMs: 60_000 });
    if (limited) return limited;
    assertCsrf(request);

    const body = registerSchema.parse(await readJson(request));
    const existing = await prisma.user.findUnique({ where: { email: body.email } });
    if (existing) return fail("An account already exists for this email.", 409);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email.toLowerCase(),
        phone: body.phone,
        passwordHash: await hashPassword(body.password)
      },
      select: { id: true, name: true, email: true, phone: true }
    });

    const token = await signAuthToken({
      sub: user.id,
      name: user.name,
      email: user.email,
      role: "CUSTOMER"
    });
    return setAuthCookie(created({ user }), token, "CUSTOMER");
  } catch (error) {
    return handleApiError(error);
  }
}
