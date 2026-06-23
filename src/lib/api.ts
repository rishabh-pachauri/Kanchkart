import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status });
}

export function created<T>(data: T) {
  return ok(data, 201);
}

export function fail(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ error: { message, details } }, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return fail("Validation failed", 422, error.flatten());
  }

  if (error instanceof Error) {
    if (error.message === "UNAUTHORIZED") return fail("Please sign in to continue.", 401);
    if (error.message === "FORBIDDEN") return fail("You do not have access to this resource.", 403);
    if (error.message === "CSRF") return fail("Security token mismatch. Refresh and try again.", 403);
    return fail(error.message, 500);
  }

  return fail("Unexpected server error", 500);
}

export async function readJson<T = unknown>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    return {} as T;
  }
}

export function toPaise(value: number | string) {
  return Math.round(Number(value) * 100);
}

export function toMoney(value: number) {
  return Number(value.toFixed(2));
}
