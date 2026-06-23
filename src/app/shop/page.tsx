import type { Metadata } from "next";
import { ProductCatalogClient } from "@/components/customer/product-catalog-client";
import { productCatalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop Premium Glassware",
  description: "Shop KanchKart borosilicate glass storage, serveware, drinkware, and meal prep products."
};

export default function ShopPage() {
  return (
    <main>
      <section className="bg-ivory py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Catalog</p>
          <h1 className="mt-2 font-display text-6xl text-ink">Premium Glassware</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-smoke">
            Search, filter, sort, and compare refined borosilicate pieces for storage, serving, drinking, and meal prep.
          </p>
        </div>
      </section>
      <ProductCatalogClient products={productCatalog} />
    </main>
  );
}
