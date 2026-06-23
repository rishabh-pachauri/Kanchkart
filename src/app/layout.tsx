import type { Metadata } from "next";
import "@/app/globals.css";
import { SiteFooter } from "@/components/customer/site-footer";
import { SiteHeader } from "@/components/customer/site-header";
import { baseMetadata } from "@/lib/seo";

export const metadata: Metadata = baseMetadata();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
