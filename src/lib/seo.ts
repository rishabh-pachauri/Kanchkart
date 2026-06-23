import type { Metadata } from "next";
import type { CatalogProduct } from "@/lib/catalog";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://kanchkart.com";

export function baseMetadata(input?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "KanchKart | Premium Borosilicate Glassware",
      template: "%s | KanchKart"
    },
    description:
      "Premium borosilicate glassware and elegant glass storage products for modern homes.",
    openGraph: {
      type: "website",
      url: siteUrl,
      siteName: "KanchKart",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image"
    },
    ...input
  };
}

export function productJsonLd(product: CatalogProduct) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "KanchKart"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability: product.inventory > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };
}
