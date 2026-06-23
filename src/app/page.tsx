import { ArrowRight, Crown, Sparkles, Truck } from "lucide-react";
import { NewsletterForm } from "@/components/customer/newsletter-form";
import { ProductCard } from "@/components/customer/product-card";
import { ButtonLink } from "@/components/ui/button";
import { categories, productCatalog } from "@/lib/catalog";

export default function HomePage() {
  const featured = productCatalog.filter((product) => product.featured).slice(0, 3);
  const bestSellers = productCatalog.filter((product) => product.bestSeller).slice(0, 3);
  const newArrivals = productCatalog.filter((product) => product.newArrival).slice(0, 3);

  return (
    <main>
      <section className="relative min-h-[78vh] overflow-hidden bg-ink">
        <img
          src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=2200&q=85"
          alt="Premium glassware arranged in a modern kitchen"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,23,20,0.78),rgba(25,23,20,0.28),rgba(25,23,20,0.1))]" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-fadeUp text-pearl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Premium borosilicate glassware</p>
            <h1 className="mt-5 font-display text-6xl leading-none sm:text-7xl lg:text-8xl">KanchKart</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-pearl/85 sm:text-lg">
              Elegant glass storage, serveware, and drinkware crafted for modern Indian homes that value clarity, durability, and quiet luxury.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/shop">Shop collection <ArrowRight size={18} /></ButtonLink>
              <ButtonLink href="/orders/track" variant="secondary">Track order</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: Crown, title: "Premium glass", text: "Lead-free borosilicate clarity with refined finishing." },
            { icon: Truck, title: "Careful shipping", text: "Protective packing for glassware orders across India." },
            { icon: Sparkles, title: "Gift-ready", text: "Elevated sets for kitchens, housewarmings, and hosting." }
          ].map((item) => (
            <div key={item.title} className="flex gap-4 rounded-md border border-champagne bg-pearl p-4">
              <item.icon className="mt-1 text-gold" size={24} />
              <div>
                <h2 className="font-display text-2xl text-ink">{item.title}</h2>
                <p className="mt-1 text-sm leading-6 text-smoke">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-pearl py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Featured products</p>
              <h2 className="mt-2 font-display text-5xl text-ink">Designed to be seen</h2>
            </div>
            <ButtonLink href="/shop" variant="secondary">View all</ButtonLink>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Brand story</p>
              <h2 className="mt-2 font-display text-5xl text-ink">Glassware for calm, visible living</h2>
              <p className="mt-5 text-sm leading-7 text-smoke">
                KanchKart was built around a simple belief: useful objects should not disappear into a cupboard.
                Our borosilicate pieces bring restaurant-grade clarity, heat resistance, and lasting elegance to everyday Indian kitchens.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {categories.map((category) => (
                  <a key={category.slug} href={`/shop?category=${category.slug}`} className="group overflow-hidden rounded-md border border-champagne bg-ivory">
                    <img src={category.image} alt={category.name} className="h-40 w-full object-cover transition duration-500 group-hover:scale-105" />
                    <p className="p-4 font-display text-2xl text-ink">{category.name}</p>
                  </a>
                ))}
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=85"
              alt="Borosilicate glassware in a bright kitchen"
              className="min-h-[520px] rounded-md object-cover shadow-premium"
            />
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Best sellers</p>
            <h2 className="mt-2 font-display text-5xl text-ink">Most loved pieces</h2>
            <div className="mt-8 grid gap-5">
              {bestSellers.map((product) => (
                <a key={product.id} href={`/products/${product.slug}`} className="grid grid-cols-[96px_1fr] gap-4 rounded-md border border-champagne bg-pearl p-3">
                  <img src={product.images[0]} alt={product.name} className="h-24 w-24 rounded-md object-cover" />
                  <div>
                    <p className="font-display text-2xl text-ink">{product.name}</p>
                    <p className="mt-1 text-sm text-smoke">{product.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">New arrivals</p>
            <h2 className="mt-2 font-display text-5xl text-ink">Fresh from the edit</h2>
            <div className="mt-8 grid gap-5">
              {newArrivals.map((product) => (
                <a key={product.id} href={`/products/${product.slug}`} className="grid grid-cols-[96px_1fr] gap-4 rounded-md border border-champagne bg-pearl p-3">
                  <img src={product.images[0]} alt={product.name} className="h-24 w-24 rounded-md object-cover" />
                  <div>
                    <p className="font-display text-2xl text-ink">{product.name}</p>
                    <p className="mt-1 text-sm text-smoke">{product.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-pearl">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">KanchKart journal</p>
            <h2 className="mt-2 font-display text-5xl">Care notes, launches, and hosting rituals</h2>
            <NewsletterForm />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {productCatalog.slice(0, 6).map((product) => (
              <a key={product.id} href="https://instagram.com/kanchkart" className="aspect-square overflow-hidden rounded-md">
                <img src={product.images[0]} alt={`${product.name} on Instagram`} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
