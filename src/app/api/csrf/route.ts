import { NextResponse } from "next/server";
import { CSRF_COOKIE } from "@/lib/csrf";

export async function GET() {
  const token = crypto.randomUUID();
  const response = NextResponse.json({ data: { token } });
  response.cookies.set(CSRF_COOKIE, token, {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24
  });
  return response;
}
