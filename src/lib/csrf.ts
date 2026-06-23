import { type NextRequest } from "next/server";

export const CSRF_COOKIE = "kk_csrf";
export const CSRF_HEADER = "x-csrf-token";

export function assertCsrf(request: NextRequest) {
  const method = request.method.toUpperCase();
  if (["GET", "HEAD", "OPTIONS"].includes(method)) return;

  const cookieToken = request.cookies.get(CSRF_COOKIE)?.value;
  const headerToken = request.headers.get(CSRF_HEADER);
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    throw new Error("CSRF");
  }
}
