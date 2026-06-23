import { type NextRequest } from "next/server";
import { handleApiError, ok } from "@/lib/api";
import { getRequestAdmin } from "@/lib/auth";
import { sendEmail } from "@/lib/notifications";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const cronSecret = process.env.CRON_SECRET;
    const authorizedCron =
      cronSecret && request.headers.get("authorization") === `Bearer ${cronSecret}`;
    const admin = await getRequestAdmin(request);
    if (!authorizedCron && !admin) throw new Error("FORBIDDEN");

    const products = await prisma.product.findMany({
      where: { status: "ACTIVE" },
      orderBy: { inventory: "asc" },
      take: 50
    });
    const lowStock = products.filter((product) => product.inventory <= product.lowStockAt);

    if (lowStock.length) {
      await sendEmail({
        to: process.env.SUPPORT_EMAIL ?? "care@kanchkart.com",
        subject: "KanchKart inventory alerts",
        text: lowStock.map((product) => `${product.sku} ${product.name}: ${product.inventory}`).join("\n"),
        html: `<ul>${lowStock
          .map((product) => `<li>${product.sku} ${product.name}: ${product.inventory}</li>`)
          .join("")}</ul>`
      });
    }

    return ok({ lowStock });
  } catch (error) {
    return handleApiError(error);
  }
}
