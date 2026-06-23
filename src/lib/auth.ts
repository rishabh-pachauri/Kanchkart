import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT, type JWTPayload } from "jose";
import { type NextRequest, NextResponse } from "next/server";

export const AUTH_COOKIE = "kk_token";
export const ADMIN_COOKIE = "kk_admin";

export type AuthRole = "CUSTOMER" | "ADMIN";

export type AuthPayload = {
  sub: string;
  email: string;
  name: string;
  role: AuthRole;
};

function jwtSecret() {
  const value = process.env.JWT_SECRET;
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET is required in production");
  }
  return new TextEncoder().encode(value ?? "development-kanchkart-secret-change-before-production");
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export async function signAuthToken(payload: AuthPayload, expiresIn = "7d") {
  return new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(jwtSecret());
}

export async function verifyAuthToken(token?: string): Promise<AuthPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, jwtSecret());
    if (!payload.sub || !payload.email || !payload.name || !payload.role) return null;
    return {
      sub: String(payload.sub),
      email: String(payload.email),
      name: String(payload.name),
      role: payload.role === "ADMIN" ? "ADMIN" : "CUSTOMER"
    };
  } catch {
    return null;
  }
}

export function setAuthCookie(response: NextResponse, token: string, role: AuthRole) {
  response.cookies.set(role === "ADMIN" ? ADMIN_COOKIE : AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  });
  return response;
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE, "", { maxAge: 0, path: "/" });
  response.cookies.set(ADMIN_COOKIE, "", { maxAge: 0, path: "/" });
  return response;
}

export async function getRequestUser(request: NextRequest) {
  return verifyAuthToken(request.cookies.get(AUTH_COOKIE)?.value);
}

export async function getRequestAdmin(request: NextRequest) {
  const payload = await verifyAuthToken(request.cookies.get(ADMIN_COOKIE)?.value);
  return payload?.role === "ADMIN" ? payload : null;
}

export async function requireUser(request: NextRequest) {
  const user = await getRequestUser(request);
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export async function requireAdmin(request: NextRequest) {
  const admin = await getRequestAdmin(request);
  if (!admin) throw new Error("FORBIDDEN");
  return admin;
}
