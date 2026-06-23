import { formatDate, formatMoney } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    include: {
      orders: {
        select: { id: true, grandTotal: true, createdAt: true },
        orderBy: { createdAt: "desc" }
      },
      addresses: true
    },
    orderBy: { createdAt: "desc" },
    take: 100
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Customers</p>
        <h1 className="mt-2 font-display text-5xl text-ink">Customer Management</h1>
      </div>
      <div className="mt-8 overflow-hidden rounded-md border border-champagne bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-champagne bg-pearl text-smoke">
            <tr>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Orders</th>
              <th className="px-4 py-3 font-medium">Lifetime value</th>
              <th className="px-4 py-3 font-medium">Addresses</th>
              <th className="px-4 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => {
              const lifetime = customer.orders.reduce((sum, order) => sum + Number(order.grandTotal), 0);
              return (
                <tr key={customer.id} className="border-b border-champagne/70">
                  <td className="px-4 py-4">
                    <p className="font-semibold text-ink">{customer.name}</p>
                    <p className="text-smoke">{customer.email}</p>
                  </td>
                  <td className="px-4 py-4">{customer.orders.length}</td>
                  <td className="px-4 py-4">{formatMoney(lifetime)}</td>
                  <td className="px-4 py-4">{customer.addresses.length}</td>
                  <td className="px-4 py-4">{formatDate(customer.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
