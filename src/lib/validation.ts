import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(8).max(16).optional(),
  password: z.string().min(8).max(128)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128)
});

export const addressSchema = z.object({
  fullName: z.string().min(2).max(100),
  phone: z.string().min(8).max(16),
  line1: z.string().min(3).max(180),
  line2: z.string().max(180).optional(),
  city: z.string().min(2).max(80),
  state: z.string().min(2).max(80),
  postalCode: z.string().min(4).max(12),
  country: z.string().min(2).max(80).default("India")
});

export const productSchema = z.object({
  name: z.string().min(2).max(140),
  slug: z.string().min(2).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  sku: z.string().min(2).max(80),
  description: z.string().min(12),
  story: z.string().optional(),
  price: z.coerce.number().positive(),
  mrp: z.coerce.number().positive().optional(),
  gstRate: z.coerce.number().min(0).max(28).default(18),
  inventory: z.coerce.number().int().min(0),
  lowStockAt: z.coerce.number().int().min(0).default(10),
  images: z.array(z.string().url()).min(1),
  material: z.string().min(2).default("Borosilicate glass"),
  dimensions: z.string().optional(),
  capacityMl: z.coerce.number().int().positive().optional(),
  weightGrams: z.coerce.number().int().positive().optional(),
  care: z.string().optional(),
  specs: z.record(z.unknown()).optional(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("ACTIVE"),
  featured: z.boolean().default(false),
  bestSeller: z.boolean().default(false),
  newArrival: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  categoryId: z.string().min(1)
});

export const checkoutItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(50)
});

export const checkoutSchema = z.object({
  items: z.array(checkoutItemSchema).min(1),
  customer: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().min(8).max(16)
  }),
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
  couponCode: z.string().max(40).optional()
});

export const statusUpdateSchema = z.object({
  status: z.enum([
    "ORDER_RECEIVED",
    "PROCESSING",
    "PACKED",
    "DISPATCHED",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
    "RETURNED"
  ]),
  message: z.string().min(2).max(300).optional(),
  trackingNumber: z.string().max(80).optional(),
  courierName: z.string().max(120).optional(),
  courierUrl: z.string().url().optional(),
  location: z.string().max(120).optional(),
  estimatedDelivery: z.string().datetime().optional()
});

export const couponApplySchema = z.object({
  code: z.string().min(2).max(40),
  subtotal: z.coerce.number().nonnegative()
});

export const reviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().max(120).optional(),
  body: z.string().min(5).max(1000),
  name: z.string().min(2).max(100)
});

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(16).optional(),
  subject: z.string().max(140).optional(),
  message: z.string().min(10).max(2000)
});

export const newsletterSchema = z.object({
  email: z.string().email()
});
