# KanchKart Full-Stack E-Commerce Platform

Premium e-commerce platform for `kanchkart.com`, built with Next.js 15, TypeScript, Tailwind CSS, PostgreSQL, Prisma, JWT auth, Razorpay, Cloudinary, and REST API routes.

## Portals

- Customer website: `/`, `/shop`, `/products/[slug]`, `/cart`, `/checkout`, `/account`, `/orders/track`, `/contact`
- Admin panel: `/admin/login`, `/admin`, `/admin/products`, `/admin/orders`, `/admin/customers`, `/admin/payments`, `/admin/analytics`

## Folder Structure

```txt
kanchkart-platform/
  prisma/
    schema.prisma
    seed.ts
  src/
    app/
      api/                 REST API routes
      admin/               secured admin panel
      products/[slug]/     product SEO pages
      shop/ cart/ checkout customer commerce pages
      sitemap.ts robots.ts SEO files
    components/
      admin/               admin portal components
      customer/            storefront components
      ui/                  shared controls
    lib/
      auth.ts              JWT + password hashing
      csrf.ts              CSRF enforcement
      prisma.ts            Prisma client
      razorpay.ts          payment helpers
      cloudinary.ts        upload signatures
      notifications.ts     email/SMS/WhatsApp
      invoice.ts           GST invoice PDF
      validation.ts        zod schemas
      catalog.ts           storefront starter catalog
  docs/
    API.md
    DEPLOYMENT.md
```

## Quick Start

```bash
cp .env.example .env
pnpm install
pnpm prisma:dev
pnpm db:seed
pnpm dev
```

Seeded admin:

- Email: value of `ADMIN_EMAIL`, default `admin@kanchkart.com`
- Password: value of `ADMIN_PASSWORD`, default `ChangeMe123!`

## Production Notes

- Use PostgreSQL with pooled connections for Vercel.
- Set a long random `JWT_SECRET`.
- Configure Razorpay live keys and webhook secret.
- Configure Cloudinary signed uploads for admin product photography.
- Configure SMTP and Twilio for email, SMS, and WhatsApp notifications.
- Run `pnpm prisma:migrate` during deployment.
- Replace starter product images with owned Cloudinary assets before launch.

## Security Included

- JWT auth cookies for customers and admins
- Separate admin cookie and server-side admin route group guard
- bcrypt password hashing
- CSRF token cookie/header validation on mutating routes
- zod input validation
- IP-based in-memory rate limiting for auth routes
- Admin-only product, category, order, payment, upload, and inventory APIs

For high-scale production, replace in-memory rate limits with Redis or Upstash and add Razorpay webhook processing for asynchronous capture/refund events.
