import { Download } from "lucide-react";
import { OrderStatusForm } from "@/components/admin/order-status-form";
import { formatDate, formatMoney } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: true,
      payment: true,
      trackingUpdates: { orderBy: { createdAt: "desc" }, take: 5 }
    },
    orderBy: { createdAt: "desc" },
    take: 100
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Fulfilment</p>
        <h1 className="mt-2 font-display text-5xl text-ink">Order Management</h1>
      </div>
      <div className="mt-8 grid gap-6">
        {orders.map((order) => (
          <section key={order.id} className="rounded-md border border-champagne bg-white p-5 shadow-sm">
            <div className="grid gap-5 xl:grid-cols-[1fr_460px]">
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">{order.orderNumber}</p>
                    <h2 className="mt-1 font-display text-3xl text-ink">{order.customerName}</h2>
                    <p className="text-sm text-smoke">{order.customerEmail} | {order.customerPhone}</p>
                  </div>
                  <a href={`/api/admin/orders/${order.id}/invoice`} className="inline-flex h-10 items-center gap-2 rounded-md border border-gold/50 px-3 text-sm font-semibold text-ink hover:bg-champagne/50">
                    <Download size={16} /> Invoice
                  </a>
                </div>
                <div className="mt-5 overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="border-b border-champagne text-smoke">
                      <tr>
                        <th className="py-3 pr-4 font-medium">Item</th>
                        <th className="py-3 pr-4 font-medium">Qty</th>
                        <th className="py-3 pr-4 font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.id} className="border-b border-champagne/70">
                          <td className="py-3 pr-4">{item.name}</td>
                          <td className="py-3 pr-4">{item.quantity}</td>
                          <td className="py-3 pr-4">{formatMoney(String(item.lineTotal))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-5 grid gap-2 text-sm text-smoke sm:grid-cols-3">
                  <p>Status: <strong className="text-ink">{order.status.replaceAll("_", " ")}</strong></p>
                  <p>Total: <strong className="text-ink">{formatMoney(String(order.grandTotal))}</strong></p>
                  <p>Created: <strong className="text-ink">{formatDate(order.createdAt)}</strong></p>
                </div>
              </div>
              <OrderStatusForm orderId={order.id} currentStatus={order.status} />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
