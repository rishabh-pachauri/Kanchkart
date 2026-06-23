import { RefundButton } from "@/components/admin/refund-button";
import { formatDate, formatMoney } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  const payments = await prisma.payment.findMany({
    include: { order: true },
    orderBy: { createdAt: "desc" },
    take: 100
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Razorpay</p>
        <h1 className="mt-2 font-display text-5xl text-ink">Payment Management</h1>
      </div>
      <div className="mt-8 overflow-hidden rounded-md border border-champagne bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-champagne bg-pearl text-smoke">
            <tr>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Provider</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Payment ID</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Refund</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-champagne/70">
                <td className="px-4 py-4 font-semibold">{payment.order.orderNumber}</td>
                <td className="px-4 py-4">{payment.provider}</td>
                <td className="px-4 py-4">{payment.status}</td>
                <td className="px-4 py-4">{formatMoney(String(payment.amount))}</td>
                <td className="px-4 py-4">{payment.razorpayPaymentId ?? payment.razorpayOrderId ?? "Pending"}</td>
                <td className="px-4 py-4">{formatDate(payment.createdAt)}</td>
                <td className="px-4 py-4">
                  <RefundButton paymentId={payment.id} disabled={payment.status !== "CAPTURED"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
