import { type NextRequest } from "next/server";
import { getRequestUser } from "@/lib/auth";
import { ok } from "@/lib/api";

export async function GET(request: NextRequest) {
  const user = await getRequestUser(request);
  return ok({ user });
}
