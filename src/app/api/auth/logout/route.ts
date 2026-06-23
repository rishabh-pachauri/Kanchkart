import { type NextRequest, NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/auth";
import { assertCsrf } from "@/lib/csrf";
import { handleApiError } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    assertCsrf(request);
    return clearAuthCookies(NextResponse.json({ data: { ok: true } }));
  } catch (error) {
    return handleApiError(error);
  }
}
