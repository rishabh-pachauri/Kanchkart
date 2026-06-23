import type { Metadata } from "next";
import { AccountClient } from "@/components/customer/account-client";

export const metadata: Metadata = {
  title: "Customer Account",
  description: "Manage your KanchKart profile, order history, wishlist, and address book."
};

export default function AccountPage() {
  return <AccountClient />;
}
