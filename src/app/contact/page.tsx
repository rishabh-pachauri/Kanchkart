import type { Metadata } from "next";
import { ContactClient } from "@/components/customer/contact-client";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact KanchKart for premium glassware support by form, WhatsApp, or email."
};

export default function ContactPage() {
  return <ContactClient />;
}
