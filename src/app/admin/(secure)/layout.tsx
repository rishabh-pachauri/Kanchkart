import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { ADMIN_COOKIE, verifyAuthToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function SecureAdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const admin = await verifyAuthToken(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!admin || admin.role !== "ADMIN") redirect("/admin/login");

  return <AdminShell adminName={admin.name}>{children}</AdminShell>;
}
