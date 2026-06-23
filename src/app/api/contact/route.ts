import { type NextRequest } from "next/server";
import { created, handleApiError, readJson } from "@/lib/api";
import { assertCsrf } from "@/lib/csrf";
import { sendEmail } from "@/lib/notifications";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    assertCsrf(request);
    const body = contactSchema.parse(await readJson(request));
    const message = await prisma.contactMessage.create({ data: body });
    await sendEmail({
      to: process.env.SUPPORT_EMAIL ?? "care@kanchkart.com",
      subject: `KanchKart contact: ${body.subject ?? body.name}`,
      text: `${body.name} <${body.email}> wrote:\n\n${body.message}`,
      html: `<p><strong>${body.name}</strong> &lt;${body.email}&gt; wrote:</p><p>${body.message}</p>`
    });
    return created({ message });
  } catch (error) {
    return handleApiError(error);
  }
}
