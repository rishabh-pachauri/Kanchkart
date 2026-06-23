# Deployment

## Environment Variables

Required:

- `DATABASE_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Recommended:

- `RAZORPAY_WEBHOOK_SECRET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `SUPPORT_EMAIL`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_SMS_FROM`
- `TWILIO_WHATSAPP_FROM`
- `CRON_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## Vercel

1. Create a PostgreSQL database and copy the pooled connection string into `DATABASE_URL`.
2. Add all environment variables in Vercel Project Settings.
3. Set the build command to `npm run build`.
4. Run migrations before or during release:

```bash
pnpm prisma:migrate
```

5. Seed the first admin once:

```bash
pnpm db:seed
```

6. Deploy.

## CSV Product Upload Format

```csv
name,slug,sku,categorySlug,description,price,mrp,inventory,images
Aurum Set,aurum-set,KK-AURUM,glass-storage,Premium set,3499,4299,84,https://res.cloudinary.com/.../a.jpg|https://res.cloudinary.com/.../b.jpg
```

## Scaling Notes

- Use Vercel Postgres, Neon, Supabase, or RDS with connection pooling.
- Add Redis/Upstash for distributed rate limiting and cart/session analytics.
- Move notification sending to a background queue when order volume grows.
- Process Razorpay webhooks for payment state reconciliation.
- Store product images in Cloudinary and keep only metadata in PostgreSQL.
- Add database indexes for reporting queries once real traffic patterns are known.
