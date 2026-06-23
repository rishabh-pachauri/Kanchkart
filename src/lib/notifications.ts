import nodemailer from "nodemailer";
import twilio from "twilio";
import { formatDate, formatMoney } from "@/lib/format";
import { orderStatusCopy } from "@/lib/orders";
import type { OrderStatus } from "@prisma/client";

type NotificationOrder = {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string | null;
  status: OrderStatus;
  grandTotal: unknown;
  trackingNumber?: string | null;
  courierName?: string | null;
  estimatedDelivery?: Date | null;
};

function emailTransport() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

export async function sendEmail(input: { to: string; subject: string; html: string; text: string }) {
  const transport = emailTransport();
  if (!transport) {
    console.info("[email skipped]", input.subject, input.to);
    return;
  }
  await transport.sendMail({
    from: process.env.SMTP_FROM ?? "KanchKart <orders@kanchkart.com>",
    ...input
  });
}

function smsClient() {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) return null;
  return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

export async function sendSms(to: string | null | undefined, body: string) {
  if (!to || !process.env.TWILIO_SMS_FROM) return;
  const client = smsClient();
  if (!client) {
    console.info("[sms skipped]", to, body);
    return;
  }
  await client.messages.create({ to, from: process.env.TWILIO_SMS_FROM, body });
}

export async function sendWhatsApp(to: string | null | undefined, body: string) {
  if (!to || !process.env.TWILIO_WHATSAPP_FROM) return;
  const client = smsClient();
  if (!client) {
    console.info("[whatsapp skipped]", to, body);
    return;
  }
  await client.messages.create({
    to: to.startsWith("whatsapp:") ? to : `whatsapp:${to}`,
    from: process.env.TWILIO_WHATSAPP_FROM,
    body
  });
}

export async function notifyOrderStatus(order: NotificationOrder) {
  const status = orderStatusCopy[order.status];
  const trackingLine = order.trackingNumber
    ? ` Tracking: ${order.trackingNumber}${order.courierName ? ` via ${order.courierName}` : ""}.`
    : "";
  const etaLine = order.estimatedDelivery
    ? ` Estimated delivery: ${formatDate(order.estimatedDelivery)}.`
    : "";
  const text = `KanchKart update for ${order.orderNumber}: ${status}.${trackingLine}${etaLine}`;

  await Promise.all([
    sendEmail({
      to: order.customerEmail,
      subject: `KanchKart order ${order.orderNumber}: ${status}`,
      text,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;color:#191714">
          <h1 style="font-family:Georgia,serif">Your KanchKart order is ${status}</h1>
          <p>Hello ${order.customerName},</p>
          <p>${text}</p>
          <p>Total: ${formatMoney(String(order.grandTotal))}</p>
          <p style="color:#66615A">Thank you for choosing premium borosilicate glassware from KanchKart.</p>
        </div>
      `
    }),
    sendSms(order.customerPhone, text),
    sendWhatsApp(order.customerPhone, text)
  ]);
}
