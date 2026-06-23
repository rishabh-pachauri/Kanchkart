import PDFDocument from "pdfkit";
import { formatDate, formatMoney } from "@/lib/format";

export type InvoiceOrder = {
  orderNumber: string;
  invoiceNumber?: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  createdAt: Date;
  subtotal: unknown;
  discountTotal: unknown;
  shippingTotal: unknown;
  taxTotal: unknown;
  grandTotal: unknown;
  shippingAddress: unknown;
  items: Array<{
    name: string;
    sku: string;
    quantity: number;
    unitPrice: unknown;
    gstRate: unknown;
    lineTotal: unknown;
  }>;
};

function addressText(value: unknown) {
  if (!value || typeof value !== "object") return "";
  const address = value as Record<string, string>;
  return [
    address.fullName,
    address.line1,
    address.line2,
    `${address.city ?? ""}, ${address.state ?? ""} ${address.postalCode ?? ""}`.trim(),
    address.country
  ]
    .filter(Boolean)
    .join("\n");
}

export async function generateInvoicePdf(order: InvoiceOrder) {
  const doc = new PDFDocument({ margin: 48, size: "A4" });
  const chunks: Buffer[] = [];

  doc.on("data", (chunk: Buffer) => chunks.push(chunk));

  doc.fillColor("#191714").fontSize(24).font("Times-Bold").text("KanchKart", { continued: true });
  doc.fillColor("#C9A24A").fontSize(10).font("Helvetica").text("  PREMIUM GLASSWARE", {
    baseline: "middle"
  });
  doc.moveDown(1);

  doc.fillColor("#191714").fontSize(18).font("Times-Bold").text("GST Tax Invoice");
  doc.fontSize(10).font("Helvetica").fillColor("#66615A");
  doc.text(`Invoice: ${order.invoiceNumber ?? order.orderNumber}`);
  doc.text(`Order: ${order.orderNumber}`);
  doc.text(`Date: ${formatDate(order.createdAt)}`);
  doc.moveDown();

  doc.fillColor("#191714").font("Helvetica-Bold").text("Bill To");
  doc.font("Helvetica").fillColor("#66615A").text(order.customerName);
  doc.text(order.customerEmail);
  if (order.customerPhone) doc.text(order.customerPhone);
  doc.moveDown(0.5);
  doc.fillColor("#191714").font("Helvetica-Bold").text("Ship To");
  doc.font("Helvetica").fillColor("#66615A").text(addressText(order.shippingAddress));
  doc.moveDown();

  const tableTop = doc.y + 8;
  doc.font("Helvetica-Bold").fillColor("#191714").fontSize(9);
  doc.text("Product", 48, tableTop);
  doc.text("SKU", 245, tableTop);
  doc.text("Qty", 340, tableTop, { width: 35, align: "right" });
  doc.text("Price", 390, tableTop, { width: 60, align: "right" });
  doc.text("Total", 470, tableTop, { width: 75, align: "right" });

  doc.moveTo(48, tableTop + 16).lineTo(545, tableTop + 16).strokeColor("#E4D8BE").stroke();

  let y = tableTop + 26;
  doc.font("Helvetica").fillColor("#191714");
  for (const item of order.items) {
    doc.text(item.name, 48, y, { width: 180 });
    doc.text(item.sku, 245, y, { width: 80 });
    doc.text(String(item.quantity), 340, y, { width: 35, align: "right" });
    doc.text(formatMoney(String(item.unitPrice)), 390, y, { width: 60, align: "right" });
    doc.text(formatMoney(String(item.lineTotal)), 470, y, { width: 75, align: "right" });
    y += 28;
  }

  doc.moveDown(2);
  const summaryX = 360;
  const summaryY = Math.max(y + 16, 510);
  const rows = [
    ["Subtotal", order.subtotal],
    ["Discount", `-${order.discountTotal}`],
    ["Shipping", order.shippingTotal],
    ["GST", order.taxTotal],
    ["Grand Total", order.grandTotal]
  ];

  rows.forEach(([label, value], index) => {
    const rowY = summaryY + index * 20;
    doc
      .font(index === rows.length - 1 ? "Helvetica-Bold" : "Helvetica")
      .fillColor(index === rows.length - 1 ? "#191714" : "#66615A")
      .text(String(label), summaryX, rowY, { width: 90 })
      .text(formatMoney(String(value)), 455, rowY, { width: 90, align: "right" });
  });

  doc.fillColor("#66615A").fontSize(9).text("KanchKart | kanchkart.com | care@kanchkart.com", 48, 760, {
    align: "center"
  });

  doc.end();

  return new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });
}
