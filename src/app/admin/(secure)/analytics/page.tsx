import { MetricCard } from "@/components/admin/metric-card";
import { formatMoney } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const since = new Date();
  since.setDate(since.getDate() - 30);

  const [orders, orderItems, customers] = await Promise.all([
    prisma.order.findMany({ where: { createdAt: { gte: since } }, orderBy: { createdAt: "asc" } }),
    prisma.orderItem.findMany({ include: { product: true } }),
    prisma.user.findMany({ include: { orders: true } })
  ]);

  const daily = orders.reduce<Record<string, number>>((acc, order) => {
    const key = order.createdAt.toISOString().slice(0, 10);
    acc[key] = (acc[key] ?? 0) + Number(order.grandTotal);
    return acc;
  }, {});
  const maxDaily = Math.max(...Object.values(daily), 1);

  const productPerformance = Object.values(
    orderItems.reduce<Record<string, { name: string; quantity: number; revenue: number }>>((acc, item) => {
      acc[item.productId] ??= { name: item.name, quantity: 0, revenue: 0 };
      acc[item.productId].quantity += item.quantity;
      acc[item.productId].revenue += Number(item.lineTotal);
      return acc;
    }, {})
  ).sort((a, b) => b.revenue - a.revenue);

  const repeatCustomers = customers.filter((customer) => customer.orders.length > 1).length;
  const revenue = orders.reduce((sum, order) => sum + Number(order.grandTotal), 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Analytics</p>
        <h1 className="mt-2 font-display text-5xl text-ink">Revenue and Product Insights</h1>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <MetricCard label="30-day revenue" value={formatMoney(revenue)} helper="All order statuses" tone="dark" />
        <MetricCard label="30-day orders" value={String(orders.length)} helper="Rolling window" />
        <MetricCard label="Repeat customers" value={String(repeatCustomers)} helper="More than one order" />
      </div>

      <section className="mt-8 rounded-md border border-champagne bg-white p-5 shadow-sm">
        <h2 className="font-display text-3xl text-ink">Sales Trends</h2>
        <div className="mt-6 flex h-64 items-end gap-2 border-b border-l border-champagne p-4">
          {Object.entries(daily).map(([date, value]) => (
            <div key={date} className="flex min-w-10 flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-gold"
                style={{ height: `${Math.max((value / maxDaily) * 100, 4)}%` }}
                title={`${date}: ${formatMoney(value)}`}
              />
              <span className="text-[10px] text-smoke">{date.slice(5)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-md border border-champagne bg-pearl p-5 shadow-sm">
        <h2 className="font-display text-3xl text-ink">Product Performance</h2>
        <div className="mt-5 grid gap-3">
          {productPerformance.slice(0, 10).map((product) => (
            <div key={product.name} className="grid gap-2 rounded-md border border-champagne bg-white p-4 sm:grid-cols-[1fr_auto_auto]">
              <p className="font-semibold text-ink">{product.name}</p>
              <p className="text-sm text-smoke">{product.quantity} units</p>
              <p className="font-semibold text-ink">{formatMoney(product.revenue)}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
