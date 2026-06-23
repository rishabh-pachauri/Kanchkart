import { type NextRequest } from "next/server";
import { fail, handleApiError, ok, readJson } from "@/lib/api";
import { assertCsrf } from "@/lib/csrf";
import { setAuthCookie, signAuthToken, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(request, "admin-login", { limit: 6, windowMs: 60_000 });
    if (limited) return limited;
    assertCsrf(request);

    const body = loginSchema.parse(await readJson(request));
    const admin = await prisma.admin.findUnique({ where: { email: body.email.toLowerCase() } });
    if (!admin || !(await verifyPassword(body.password, admin.passwordHash))) {
      return fail("Invalid admin credentials.", 401);
    }

    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() }
    });

    const token = await signAuthToken({
      sub: admin.id,
      name: admin.name,
      email: admin.email,
      role: "ADMIN"
    });
    return setAuthCookie(ok({ admin: { id: admin.id, name: admin.name, email: admin.email } }), token, "ADMIN");
  } catch (error) {
    return handleApiError(error);
  }
}
