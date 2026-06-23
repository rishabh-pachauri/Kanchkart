export type CatalogProduct = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  categorySlug: string;
  description: string;
  story: string;
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  inventory: number;
  badges: string[];
  images: string[];
  specs: Record<string, string>;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
};

export const categories = [
  {
    name: "Glass Storage",
    slug: "glass-storage",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Serveware",
    slug: "serveware",
    image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Drinkware",
    slug: "drinkware",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Meal Prep",
    slug: "meal-prep",
    image: "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=1200&q=85"
  }
];

export const productCatalog: CatalogProduct[] = [
  {
    id: "aurum-set",
    name: "Aurum Stackable Storage Set",
    slug: "aurum-stackable-storage-set",
    sku: "KK-AURUM-SET-6",
    category: "Glass Storage",
    categorySlug: "glass-storage",
    description:
      "A six-piece borosilicate glass storage set with airtight bamboo lids and refined gold detailing.",
    story:
      "Aurum keeps food visible, fresh, and beautifully organized, whether it lives on an open shelf or inside a weekday meal prep routine.",
    price: 3499,
    mrp: 4299,
    rating: 4.9,
    reviewCount: 128,
    inventory: 84,
    badges: ["Best Seller", "Airtight", "Microwave Safe"],
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1400&q=85"
    ],
    specs: {
      Material: "Premium borosilicate glass",
      Lids: "Bamboo with food-grade silicone seal",
      Capacity: "320 ml, 520 ml, 800 ml",
      Care: "Dishwasher safe glass, hand wash lids"
    },
    featured: true,
    bestSeller: true
  },
  {
    id: "luna-duo",
    name: "Luna Carafe & Tumbler Duo",
    slug: "luna-carafe-and-tumbler-duo",
    sku: "KK-LUNA-DUO",
    category: "Serveware",
    categorySlug: "serveware",
    description: "A bedside and dining carafe set in crystal-clear borosilicate glass with a feather-light pour.",
    story:
      "The Luna duo turns water service into a small ceremony, with a tumbler that nests neatly over the carafe.",
    price: 1899,
    mrp: 2299,
    rating: 4.8,
    reviewCount: 76,
    inventory: 56,
    badges: ["New Arrival", "Lead Free", "Gift Ready"],
    images: [
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=85"
    ],
    specs: {
      Material: "Borosilicate glass",
      Capacity: "900 ml carafe, 260 ml tumbler",
      Finish: "Crystal clear",
      Care: "Dishwasher safe"
    },
    featured: true,
    newArrival: true
  },
  {
    id: "noor-bowls",
    name: "Noor Nesting Bowls",
    slug: "noor-nesting-bowls",
    sku: "KK-NOOR-BOWLS",
    category: "Serveware",
    categorySlug: "serveware",
    description: "Three nesting bowls with luminous clarity for salads, dessert tables, and everyday prep.",
    story:
      "Noor is built for kitchens that do not hide their tools: light, stackable, and ready for hosting.",
    price: 2499,
    mrp: 3099,
    rating: 4.7,
    reviewCount: 92,
    inventory: 42,
    badges: ["Stackable", "Host Edit"],
    images: [
      "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1400&q=85"
    ],
    specs: {
      Material: "Borosilicate glass",
      Set: "3 nesting bowls",
      Capacity: "600 ml, 1.1 L, 1.8 L",
      Care: "Dishwasher safe"
    },
    bestSeller: true
  },
  {
    id: "prism-tumblers",
    name: "Prism Double-Wall Tumblers",
    slug: "prism-double-wall-tumblers",
    sku: "KK-PRISM-TUM-4",
    category: "Drinkware",
    categorySlug: "drinkware",
    description: "A four-piece double-wall tumbler set for tea, cold brew, sparkling water, and slow evenings.",
    story:
      "Prism keeps temperature comfortable in the hand while letting the drink remain the quiet visual centrepiece.",
    price: 2199,
    mrp: 2799,
    rating: 4.9,
    reviewCount: 144,
    inventory: 68,
    badges: ["Double Wall", "Thermal"],
    images: [
      "https://images.unsplash.com/photo-1571942676516-bcab84649e44?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=1400&q=85"
    ],
    specs: {
      Material: "Double-wall borosilicate glass",
      Set: "4 tumblers",
      Capacity: "300 ml each",
      Care: "Top-rack dishwasher safe"
    },
    featured: true
  },
  {
    id: "soma-meal-prep",
    name: "Soma Meal Prep Trio",
    slug: "soma-meal-prep-trio",
    sku: "KK-SOMA-TRIO",
    category: "Meal Prep",
    categorySlug: "meal-prep",
    description: "Three compartment-friendly glass containers for fresh weekly meals without plastic staining.",
    story:
      "Soma makes meal prep feel intentional, with strong seals and glass clear enough to bring calm to a busy fridge.",
    price: 2999,
    mrp: 3599,
    rating: 4.6,
    reviewCount: 61,
    inventory: 37,
    badges: ["Freezer Safe", "Oven Safe"],
    images: [
      "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=85"
    ],
    specs: {
      Material: "Borosilicate glass",
      Set: "3 containers",
      Capacity: "850 ml each",
      Care: "Oven safe glass without lids"
    },
    newArrival: true
  },
  {
    id: "elara-jars",
    name: "Elara Pantry Jar Quartet",
    slug: "elara-pantry-jar-quartet",
    sku: "KK-ELARA-JAR-4",
    category: "Glass Storage",
    categorySlug: "glass-storage",
    description: "Four tall pantry jars with airtight glass lids for grains, coffee, snacks, and countertop rituals.",
    story:
      "Elara brings order to the pantry without hiding texture, colour, or the pleasure of ingredients worth seeing.",
    price: 2699,
    mrp: 3299,
    rating: 4.8,
    reviewCount: 84,
    inventory: 51,
    badges: ["Pantry Edit", "Airtight"],
    images: [
      "https://images.unsplash.com/photo-1584473457409-cef81a24596b?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1400&q=85"
    ],
    specs: {
      Material: "Borosilicate glass",
      Set: "4 jars",
      Capacity: "1 L each",
      Seal: "Food-grade silicone"
    },
    bestSeller: true
  }
];

export function getProductBySlug(slug: string) {
  return productCatalog.find((product) => product.slug === slug);
}

export function relatedProducts(product: CatalogProduct) {
  return productCatalog
    .filter((candidate) => candidate.slug !== product.slug && candidate.categorySlug === product.categorySlug)
    .slice(0, 3);
}
