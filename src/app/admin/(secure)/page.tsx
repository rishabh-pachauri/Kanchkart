import { AlertTriangle, Boxes, IndianRupee, PackageCheck, Users } from "lucide-react";
import { MetricCard } from "@/components/admin/metric-card";
import { formatDate, formatMoney } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [orders, customers, products, revenue, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.user.count(),
    prisma.product.findMany({ where: { status: "ACTIVE" }, orderBy: { inventory: "asc" }, take: 50 }),
    prisma.order.aggregate({ _sum: { grandTotal: true } }),
    prisma.order.findMany({
      include: { payment: true },
      orderBy: { createdAt: "desc" },
      take: 8
    })
  ]);
  const lowStock = products.filter((product) => product.inventory <= product.lowStockAt);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Dashboard</p>
          <h1 className="mt-2 font-display text-5xl text-ink">Commerce Overview</h1>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Total sales" value={String(orders)} helper="Lifetime orders" tone="dark" />
        <MetricCard label="Revenue" value={formatMoney(String(revenue._sum.grandTotal ?? 0))} helper="Captured and pending" />
        <MetricCard label="Customers" value={String(customers)} helper="Registered accounts" />
        <MetricCard label="Active products" value={String(products.length)} helper="Live catalog" />
        <MetricCard label="Inventory alerts" value={String(lowStock.length)} helper="At or below threshold" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-md border border-champagne bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            <PackageCheck size={18} /> Recent Orders
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b border-champagne text-left text-smoke">
                <tr>
                  <th className="py-3 pr-4 font-medium">Order</th>
                  <th className="py-3 pr-4 font-medium">Customer</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium">Total</th>
                  <th className="py-3 pr-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-champagne/70">
                    <td className="py-3 pr-4 font-semibold">{order.orderNumber}</td>
                    <td className="py-3 pr-4">{order.customerName}</td>
                    <td className="py-3 pr-4">{order.status.replaceAll("_", " ")}</td>
                    <td className="py-3 pr-4">{formatMoney(String(order.grandTotal))}</td>
                    <td className="py-3 pr-4">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-md border border-champagne bg-pearl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            <AlertTriangle size={18} /> Inventory Alerts
          </div>
          <div className="mt-5 grid gap-3">
            {lowStock.length ? (
              lowStock.slice(0, 8).map((product) => (
                <div key={product.id} className="flex items-center justify-between gap-4 rounded-md border border-champagne bg-white p-3 text-sm">
                  <div>
                    <p className="font-semibold text-ink">{product.name}</p>
                    <p className="text-smoke">{product.sku}</p>
                  </div>
                  <p className="rounded-md bg-gold/20 px-3 py-1 font-semibold text-ink">{product.inventory}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-smoke">No low stock alerts.</p>
            )}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: IndianRupee, label: "Payment reconciliation", text: "Review Razorpay captures and refunds." },
          { icon: Users, label: "Customer insight", text: "Track account growth and repeat orders." },
          { icon: Boxes, label: "Catalog operations", text: "Manage product images, GST, stock, and categories." }
        ].map((item) => (
          <div key={item.label} className="rounded-md border border-champagne bg-white p-5">
            <item.icon className="text-gold" size={24} />
            <p className="mt-3 font-display text-2xl text-ink">{item.label}</p>
            <p className="mt-2 text-sm text-smoke">{item.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
