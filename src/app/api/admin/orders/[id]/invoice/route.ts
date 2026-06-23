import { type NextRequest } from "next/server";
import { handleApiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { generateInvoicePdf } from "@/lib/invoice";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(request);
    const { id } = await params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true }
    });
    if (!order) return new Response("Invoice not found", { status: 404 });

    const pdf = await generateInvoicePdf(order);
    return new Response(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${order.orderNumber}.pdf"`
      }
    });
  } catch (error) {
    return handleApiError(error);
  }
}
