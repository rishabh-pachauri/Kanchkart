import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Admin Login | KanchKart",
  robots: { index: false, follow: false }
};

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-ivory px-4 py-12">
      <AdminLoginForm />
    </main>
  );
}
