import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const productImages = [
  "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85"
];

async function main() {
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "ChangeMe123!", 12);

  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL ?? "admin@kanchkart.com" },
    update: { passwordHash },
    create: {
      name: "KanchKart Admin",
      email: process.env.ADMIN_EMAIL ?? "admin@kanchkart.com",
      passwordHash,
      role: "OWNER",
      isSuperAdmin: true
    }
  });

  const storage = await prisma.category.upsert({
    where: { slug: "glass-storage" },
    update: {},
    create: {
      name: "Glass Storage",
      slug: "glass-storage",
      description: "Airtight borosilicate containers for elegant everyday storage.",
      image: productImages[0]
    }
  });

  const serveware = await prisma.category.upsert({
    where: { slug: "serveware" },
    update: {},
    create: {
      name: "Serveware",
      slug: "serveware",
      description: "Premium glassware designed for hosting, gifting, and daily rituals.",
      image: productImages[1]
    }
  });

  const drinkware = await prisma.category.upsert({
    where: { slug: "drinkware" },
    update: {},
    create: {
      name: "Drinkware",
      slug: "drinkware",
      description: "Double-wall tumblers and refined glass drink service.",
      image: "https://images.unsplash.com/photo-1571942676516-bcab84649e44?auto=format&fit=crop&w=1200&q=85"
    }
  });

  const mealPrep = await prisma.category.upsert({
    where: { slug: "meal-prep" },
    update: {},
    create: {
      name: "Meal Prep",
      slug: "meal-prep",
      description: "Heat-safe glass containers for weekly cooking and fresh storage.",
      image: "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=1200&q=85"
    }
  });

  await prisma.product.upsert({
    where: { slug: "aurum-stackable-storage-set" },
    update: {},
    create: {
      id: "aurum-set",
      name: "Aurum Stackable Storage Set",
      slug: "aurum-stackable-storage-set",
      sku: "KK-AURUM-SET-6",
      description:
        "A six-piece borosilicate glass storage set with airtight bamboo lids and refined gold detailing.",
      story:
        "Made for open shelving and meal prep alike, Aurum keeps food visible, fresh, and beautifully organized.",
      price: 3499,
      mrp: 4299,
      inventory: 84,
      lowStockAt: 12,
      images: productImages,
      dimensions: "Set of 6: 320 ml, 520 ml, 800 ml",
      capacityMl: 800,
      weightGrams: 2100,
      care: "Dishwasher safe glass. Hand wash bamboo lids.",
      specs: {
        thermalShockResistant: true,
        microwaveSafe: true,
        freezerSafe: true,
        lidMaterial: "Bamboo and food-grade silicone"
      },
      featured: true,
      bestSeller: true,
      seoTitle: "Aurum Stackable Borosilicate Glass Storage Set | KanchKart",
      seoDescription: "Premium airtight borosilicate glass storage set with bamboo lids.",
      categoryId: storage.id
    }
  });

  await prisma.product.upsert({
    where: { slug: "noor-nesting-bowls" },
    update: {},
    create: {
      id: "noor-bowls",
      name: "Noor Nesting Bowls",
      slug: "noor-nesting-bowls",
      sku: "KK-NOOR-BOWLS",
      description: "Three nesting bowls with luminous clarity for salads, dessert tables, and everyday prep.",
      story: "Noor is built for kitchens that do not hide their tools: light, stackable, and ready for hosting.",
      price: 2499,
      mrp: 3099,
      inventory: 42,
      images: [
        "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=85"
      ],
      dimensions: "600 ml, 1.1 L, 1.8 L",
      capacityMl: 1800,
      care: "Dishwasher safe.",
      specs: { set: "3 nesting bowls", microwaveSafe: true },
      bestSeller: true,
      categoryId: serveware.id
    }
  });

  await prisma.product.upsert({
    where: { slug: "prism-double-wall-tumblers" },
    update: {},
    create: {
      id: "prism-tumblers",
      name: "Prism Double-Wall Tumblers",
      slug: "prism-double-wall-tumblers",
      sku: "KK-PRISM-TUM-4",
      description: "A four-piece double-wall tumbler set for tea, cold brew, sparkling water, and slow evenings.",
      story: "Prism keeps temperature comfortable in the hand while letting the drink remain the quiet visual centrepiece.",
      price: 2199,
      mrp: 2799,
      inventory: 68,
      images: [
        "https://images.unsplash.com/photo-1571942676516-bcab84649e44?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=85"
      ],
      dimensions: "Set of 4, 300 ml each",
      capacityMl: 300,
      care: "Top-rack dishwasher safe.",
      specs: { doubleWall: true, thermalResistant: true },
      featured: true,
      categoryId: drinkware.id
    }
  });

  await prisma.product.upsert({
    where: { slug: "soma-meal-prep-trio" },
    update: {},
    create: {
      id: "soma-meal-prep",
      name: "Soma Meal Prep Trio",
      slug: "soma-meal-prep-trio",
      sku: "KK-SOMA-TRIO",
      description: "Three compartment-friendly glass containers for fresh weekly meals without plastic staining.",
      story: "Soma makes meal prep feel intentional, with strong seals and glass clear enough to bring calm to a busy fridge.",
      price: 2999,
      mrp: 3599,
      inventory: 37,
      images: [
        "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"
      ],
      dimensions: "3 containers, 850 ml each",
      capacityMl: 850,
      care: "Oven safe glass without lids.",
      specs: { freezerSafe: true, ovenSafe: true },
      newArrival: true,
      categoryId: mealPrep.id
    }
  });

  await prisma.product.upsert({
    where: { slug: "elara-pantry-jar-quartet" },
    update: {},
    create: {
      id: "elara-jars",
      name: "Elara Pantry Jar Quartet",
      slug: "elara-pantry-jar-quartet",
      sku: "KK-ELARA-JAR-4",
      description: "Four tall pantry jars with airtight glass lids for grains, coffee, snacks, and countertop rituals.",
      story: "Elara brings order to the pantry without hiding texture, colour, or the pleasure of ingredients worth seeing.",
      price: 2699,
      mrp: 3299,
      inventory: 51,
      images: [
        "https://images.unsplash.com/photo-1584473457409-cef81a24596b?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=85"
      ],
      dimensions: "4 jars, 1 L each",
      capacityMl: 1000,
      care: "Dishwasher safe glass.",
      specs: { airtight: true, siliconeSeal: true },
      bestSeller: true,
      categoryId: storage.id
    }
  });

  await prisma.product.upsert({
    where: { slug: "luna-carafe-and-tumbler-duo" },
    update: {},
    create: {
      id: "luna-duo",
      name: "Luna Carafe & Tumbler Duo",
      slug: "luna-carafe-and-tumbler-duo",
      sku: "KK-LUNA-DUO",
      description:
        "A bedside and dining carafe set in crystal-clear borosilicate glass with a feather-light pour.",
      story:
        "The Luna duo turns water service into a small ceremony, with a tumbler that nests neatly over the carafe.",
      price: 1899,
      mrp: 2299,
      inventory: 56,
      lowStockAt: 8,
      images: [
        "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=85",
        ...productImages.slice(1)
      ],
      dimensions: "Carafe 900 ml, tumbler 260 ml",
      capacityMl: 900,
      weightGrams: 760,
      care: "Dishwasher safe. Avoid abrasive scrubbers.",
      specs: {
        thermalShockResistant: true,
        leadFree: true,
        dishwasherSafe: true
      },
      featured: true,
      newArrival: true,
      seoTitle: "Luna Borosilicate Glass Carafe and Tumbler Duo | KanchKart",
      seoDescription: "Elegant borosilicate glass carafe set for dining and bedside use.",
      categoryId: serveware.id
    }
  });

  await prisma.coupon.upsert({
    where: { code: "KANCHAURA" },
    update: {},
    create: {
      code: "KANCHAURA",
      description: "Launch offer for premium glassware shoppers.",
      discountType: "PERCENTAGE",
      discountValue: 10,
      minimumSubtotal: 1999,
      maxDiscount: 750,
      active: true
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
