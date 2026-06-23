# API Endpoints

All mutating routes require the `x-csrf-token` header matching the `kk_csrf` cookie. Auth routes use secure HTTP-only JWT cookies.

## Auth

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/csrf` | Issue CSRF cookie |
| `POST` | `/api/auth/register` | Customer registration |
| `POST` | `/api/auth/login` | Customer login |
| `POST` | `/api/auth/admin/login` | Admin login |
| `POST` | `/api/auth/logout` | Clear auth cookies |
| `GET` | `/api/auth/me` | Current customer payload |

## Customer Commerce

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/products` | Search, filter, and sort products |
| `GET` | `/api/products/[id]` | Product details by ID or slug |
| `POST` | `/api/checkout/create` | Create order, reserve inventory, create Razorpay order |
| `POST` | `/api/payments/verify` | Verify Razorpay signature and capture order state |
| `POST` | `/api/coupons/apply` | Validate coupon and return discount |
| `GET` | `/api/tracking/[orderId]` | Customer order tracking timeline |
| `GET` | `/api/orders` | Signed-in customer order history |
| `GET` | `/api/orders/[id]/invoice` | Customer GST invoice PDF |
| `GET/POST` | `/api/account/addresses` | Address book |
| `PATCH/DELETE` | `/api/account/addresses/[id]` | Address update/removal |
| `GET/POST/DELETE` | `/api/account/wishlist` | Wishlist management |
| `GET/POST` | `/api/reviews` | Approved reviews and review submission |
| `POST` | `/api/newsletter` | Newsletter subscription |
| `POST` | `/api/contact` | Contact form and support email |

## Admin

| Method | Route | Purpose |
| --- | --- | --- |
| `GET/POST` | `/api/admin/categories` | Manage categories |
| `GET/POST` | `/api/admin/products` | List and create products |
| `PATCH/DELETE` | `/api/admin/products/[id]` | Edit/archive products |
| `GET` | `/api/admin/orders` | Order management list |
| `PATCH` | `/api/admin/orders/[id]/status` | Update tracking status and notify customer |
| `GET` | `/api/admin/orders/[id]/invoice` | Admin GST invoice PDF |
| `GET` | `/api/admin/upload-signature` | Cloudinary signed upload payload |
| `POST` | `/api/admin/bulk-upload` | Bulk product CSV upload |
| `POST` | `/api/admin/payments/[id]/refund` | Razorpay refund management |
| `GET` | `/api/admin/inventory-alerts` | Low-stock alert job |

## Order Tracking Statuses

`ORDER_RECEIVED`, `PROCESSING`, `PACKED`, `DISPATCHED`, `IN_TRANSIT`, `OUT_FOR_DELIVERY`, `DELIVERED`, `CANCELLED`, `RETURNED`
