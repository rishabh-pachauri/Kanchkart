import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductActions } from "@/components/customer/product-actions";
import { ProductCard } from "@/components/customer/product-card";
import { ProductGallery } from "@/components/customer/product-gallery";
import { getProductBySlug, productCatalog, relatedProducts } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { productJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return productCatalog.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: product.images.map((url) => ({ url }))
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = relatedProducts(product);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <ProductGallery product={product} />
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">{product.category}</p>
          <h1 className="mt-3 font-display text-6xl leading-none text-ink">{product.name}</h1>
          <p className="mt-5 text-base leading-7 text-smoke">{product.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <p className="text-3xl font-semibold text-ink">{formatMoney(product.price)}</p>
            <p className="text-sm text-smoke line-through">{formatMoney(product.mrp)}</p>
            <span className="rounded-md bg-gold/15 px-3 py-1 text-sm font-semibold text-ink">{product.rating} stars</span>
          </div>
          <ProductActions product={product} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {product.badges.map((badge) => (
              <span key={badge} className="rounded-md border border-champagne bg-ivory px-3 py-2 text-sm font-semibold text-ink">
                {badge}
              </span>
            ))}
          </div>
          <section className="mt-8 border-t border-champagne pt-8">
            <h2 className="font-display text-3xl text-ink">Product Story</h2>
            <p className="mt-3 text-sm leading-7 text-smoke">{product.story}</p>
          </section>
          <section className="mt-8 border-t border-champagne pt-8">
            <h2 className="font-display text-3xl text-ink">Specifications</h2>
            <dl className="mt-4 grid gap-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="grid grid-cols-[130px_1fr] gap-4 rounded-md bg-ivory px-4 py-3 text-sm">
                  <dt className="font-semibold text-ink">{key}</dt>
                  <dd className="text-smoke">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </section>
      </div>

      <section className="mt-16 border-t border-champagne pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Reviews</p>
            <h2 className="mt-2 font-display text-5xl text-ink">{product.reviewCount} customer ratings</h2>
          </div>
          <p className="rounded-md bg-gold px-4 py-2 text-sm font-bold text-ink">{product.rating} / 5</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["Beautiful clarity", "Packed perfectly", "Feels premium"].map((title, index) => (
            <article key={title} className="rounded-md border border-champagne bg-pearl p-4">
              <p className="font-semibold text-ink">{title}</p>
              <p className="mt-2 text-sm leading-6 text-smoke">
                {index === 0
                  ? "The glass is light, clear, and looks elegant on open shelves."
                  : index === 1
                    ? "Arrived safely with thoughtful packaging and a polished finish."
                    : "A practical piece that still feels gift-worthy and refined."}
              </p>
            </article>
          ))}
        </div>
      </section>

      {related.length ? (
        <section className="mt-16 border-t border-champagne pt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Related products</p>
          <h2 className="mt-2 font-display text-5xl text-ink">Complete the edit</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </section>
      ) : null}
    </main>
  );
}
