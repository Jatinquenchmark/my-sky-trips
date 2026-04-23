# Sky-trip Fullstack Project

A premium travel booking platform for helicopter yatra packages and water sports activities in India.

---

## Project Structure

| Directory | Description |
|-----------|-------------|
| `/client` | Main travel website (Vite + React + TypeScript + Tailwind) |
| `/admin`  | Admin Dashboard — hosted separately (same `/client/src/admin`) |
| `/server` | Backend REST API (Node.js + Express + MongoDB) |

---

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express, Mongoose (MongoDB), JWT Authentication
- **Payments**: Razorpay (order creation + signature verification)
- **Uploads**: Cloudinary (package images + gallery)
- **Email**: Resend (admin password reset)

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Razorpay account (for payments)
- Cloudinary account (for image uploads)

### Setup

**1. Backend**
```bash
cd server
npm install
# Copy .env.example → .env and fill in your credentials
npm run dev         # Starts on port 5000
```

**2. Client (Main Website)**
```bash
cd client
npm install
# Set VITE_API_URL=http://localhost:5000/api in .env
npm run dev         # Starts on port 5173
```

**3. Admin Dashboard**
> Admin routes are embedded inside `/client` at path `/admin/*`
> Access via: http://localhost:5173/admin

---

## Environment Variables

### Server (`server/.env`)
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RESEND_API_KEY=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
```

### Client (`client/.env`)
```
VITE_API_URL=https://your-backend.render.com/api
VITE_RAZORPAY_KEY_ID=rzp_live_...
```

---

## Features

### 🏔️ Travel Packages
- Admin can create/edit/delete packages with images, gallery, itinerary, pricing tiers
- `showPrice` toggle per package — hides/shows the Pay button on the package detail page
  - `showPrice: true`  → Pay button visible, Razorpay checkout enabled
  - `showPrice: false` → "📞 Contact Our Team" shown instead

### 🌊 Tehri Water Adventure Activities
A dedicated booking section on the homepage for water sports rides.

**Activities available:**
| Activity | Price |
|---|---|
| Fly Boarding | ₹3,500 / person |
| Jet Ski | ₹1,000 / person |
| Para Sailing | ₹2,500 / person |
| High Speed Boat | ₹1,500 / person (30 min) |
| Banana Ride | ₹500 (30 min) / ₹800 (1 hr) |
| Bumper Ride | ₹500 / person |
| Speed Boat | ₹500 (30 min) / ₹1,000 (1 hr) |
| Shikara | ₹250 / person |

**Booking rules:**
- Each ride has **50 seats per session**
- **Minimum booking: ₹5,000** (can book multiple rides)
- Users pay directly via Razorpay on the website
- When a ride reaches 50/50 — it shows **"FULL"** and cannot be booked

**Seat Reset Flow (Admin):**
1. 50 people book and complete a ride
2. Admin goes to **Admin Dashboard → Water Activities**
3. Clicks **"Mark Ride Complete"** → `bookedSeats` resets to 0
4. Ride is available again for new bookings

**Admin APIs:**
```
GET  /api/activities/admin     → List all activities (admin only)
POST /api/activities/seed      → Seed default 8 activities (run once)
PUT  /api/activities/:id/reset → Reset bookedSeats to 0
PUT  /api/activities/:id       → Update price/seats/isActive
```

**Public APIs:**
```
GET  /api/activities           → Get all active activities with seat counts
POST /api/activities/book      → Reserve seats (called before payment)
```

### 💳 Payments (Razorpay)
- Guest checkout supported (no login required)
- Name, email, phone collected before payment
- Order created on backend → Razorpay modal opens → Signature verified on backend
- Payment confirmation toast shown on success

### 🔐 Admin Auth
- JWT-based authentication
- Protected routes (all admin APIs require `Authorization: Bearer <token>`)
- Password reset via email (Resend)

---

## API Reference

### Packages
```
GET    /api/packages              → List all packages (public)
GET    /api/packages/:id          → Get single package (public)
POST   /api/packages              → Create package (admin)
PUT    /api/packages/:id          → Update package (admin)
DELETE /api/packages/:id          → Delete package (admin)
GET    /api/packages/dashboard/stats → Dashboard stats (admin)
```

### Auth
```
POST /api/auth/login              → Admin login
POST /api/auth/forgot-password    → Send reset email
PUT  /api/auth/reset-password/:token → Reset password
```

### Payment
```
POST /api/payment/create-order    → Create Razorpay order
POST /api/payment/verify-payment  → Verify payment signature
```

### Activities
```
GET  /api/activities              → List active activities (public)
POST /api/activities/book         → Book seats (public)
GET  /api/activities/admin        → List all activities (admin)
POST /api/activities/seed         → Seed defaults (admin)
PUT  /api/activities/:id/reset    → Reset seats (admin)
PUT  /api/activities/:id          → Update activity (admin)
```

---

## Deployment

- **Backend**: Render (Node.js web service)
- **Frontend + Admin**: Vercel
- **Database**: MongoDB Atlas
- **Images**: Cloudinary CDN

---

## Changelog

| Date | Feature |
|------|---------|
| 2026-04-22 | Added `showPrice` toggle per package (hide/show Pay button) |
| 2026-04-22 | Built Tehri Water Adventure section — cart, seat management, Razorpay |
| 2026-04-15 | Connected live API via `VITE_API_URL` env variable |
| 2026-04-10 | Admin auth, Cloudinary uploads, Razorpay integration |
| 2026-04-09 | Initial admin dashboard + package CRUD |
