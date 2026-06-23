import { type NextRequest } from "next/server";
import { fail, handleApiError, ok, readJson } from "@/lib/api";
import { assertCsrf } from "@/lib/csrf";
import { setAuthCookie, signAuthToken, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(request, "auth-login", { limit: 10, windowMs: 60_000 });
    if (limited) return limited;
    assertCsrf(request);

    const body = loginSchema.parse(await readJson(request));
    const user = await prisma.user.findUnique({ where: { email: body.email.toLowerCase() } });
    if (!user || !(await verifyPassword(body.password, user.passwordHash))) {
      return fail("Invalid email or password.", 401);
    }

    const token = await signAuthToken({
      sub: user.id,
      name: user.name,
      email: user.email,
      role: "CUSTOMER"
    });
    return setAuthCookie(ok({ user: { id: user.id, name: user.name, email: user.email } }), token, "CUSTOMER");
  } catch (error) {
    return handleApiError(error);
  }
}
