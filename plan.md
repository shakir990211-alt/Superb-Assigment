# Kaam Wali — Local Skill Connect | Website Plan

## 1. Project Overview
**Product:** Kaam Wali — a local skill-connect marketplace that matches households/businesses with nearby skilled workers (cleaning, cooking, child/elder care, repairs, beauty, tutoring, etc.).  
**Goal:** Let users find, vet, book, and pay trusted local workers within their neighborhood, while giving workers a simple way to list skills, set rates, and manage bookings.

---

## 2. Target Audience
- **Clients:** Homeowners, tenants, offices, societies needing home help/services.
- **Workers:** Local skilled/unskilled workers seeking nearby gigs (women-first friendly for domestic roles).
- **Admins:** Platform operators verifying profiles, handling disputes, managing payouts.

---

## 3. User Roles

| Role | Capabilities |
|------|--------------|
| **Guest** | Browse categories, view worker cards, search/filter, sign up/login |
| **Client (Hirer)** | Post job requests, book workers, chat, rate/review, pay, manage bookings |
| **Worker** | Create profile, list skills & rates, set availability, accept/decline jobs, track earnings |
| **Admin** | Verify IDs, approve/reject profiles, moderate reviews, manage categories & payouts |

---

## 4. Core Features

### Client side
- Location-based worker discovery (near me / city / pincode)
- Category filters + skill tags + price range + availability
- Worker profile: ratings, reviews, ID-verified badge, experience, photos
- Instant book / request quote / schedule recurring visits
- In-app chat & call masking
- Secure in-app payment (wallet / UPI / cards / cash on completion)
- Booking history, rehire favorite workers, leave ratings

### Worker side
- Profile builder (photo, bio, skills, experience, certifications)
- Hourly/daily rate setting, service area radius
- Availability calendar (weekly slots / block dates)
- Job feed: accept/decline requests, chat with client
- Earnings dashboard, payout requests, transaction history

### Admin side
- Verification queue (Aadhaar/Police check, documents)
- Category & sub-category management
- Dispute resolution, refunds, worker/client suspension
- Analytics: bookings, active workers, revenue, city growth

---

## 5. Sitemap (Information Architecture)

```
/                          Landing page (hero, categories, how it works, trust badges, footer)
/categories                All service categories grid
/category/[slug]           Category page with worker listings + filters
/worker/[id]               Worker profile, reviews, availability, book button
/book/[id]                 Booking flow (date/time -> address -> payment)
/dashboard/client          My bookings, favorites, ratings, profile
/dashboard/worker          Jobs, availability, earnings, payouts
/login, /register, /forgot-password
/verify                    ID verification upload (worker)
/admin                     Admin dashboard (verification queue, users, categories, payouts)
/privacy, /terms, /safety, /contact
```

---

## 6. Page Wireframes (High Level)

### Landing Page
- Navbar: logo, category quick-links, location selector, login/signup, post-a-job CTA
- Hero: "Find trusted help nearby" + search bar (what, where, when)
- How it works (3 steps: Search → Book → Pay after service)
- Trust section: ID-verified, background-checked, ratings, insurance note
- Category tiles: Cleaning, Cooking, Nanny/Elder care, Repair, Beauty, Tutoring, Other
- Testimonials + FAQ + Footer

### Worker Listing (/category/[slug])
- Left: filters (rating, price, availability, gender, language, distance)
- Right: grid of worker cards (photo, name, rating, experience, price, "Book now")
- Map toggle view option

### Worker Profile (/worker/[id])
- Header: photo, name, badge, rating, "Message/Book" buttons
- About, skills list, experience, services offered & prices
- Availability calendar
- Reviews (with client photos, dates, star rating)
- FAQ / safety info

### Booking Flow
1. Select date & time slot
2. Enter service address & instructions
3. Review worker & total price
4. Payment method (UPI/Card/Wallet/Cash on completion)
5. Confirmation + worker contact details

### Dashboards
- Client: Upcoming/past bookings, rehire, ratings given, profile settings
- Worker: Pending/accepted jobs, calendar, earnings this week/month, payout request
- Admin: Verification queue stats, recent bookings, flagged reviews, category performance

---

## 7. Design System

### Visual Direction
- **Vibe:** Trustworthy, warm, approachable, mobile-first (most workers/clients use phones)
- **Primary color:** Teal/Green (#0f766e) — trust, cleanliness, growth
- **Secondary:** Warm amber (#d97706) for CTAs
- **Background:** Off-white (#fafafa), surface white, text slate (#1e293b)
- **Typography:** Inter / Poppins (clean, legible on small screens)

### Key UI Components
- Search bar with location chip
- Worker card (image, name, rating, price, verify badge, book button)
- Pill badges (Verified, Available, Busy, New)
- Star rating + review count
- Calendar date picker
- Primary/secondary/outline buttons
- Empty states ("No workers nearby", "No bookings yet")
- Toast notifications (booking confirmed, payment success)

### Responsive
- Mobile-first: single column, sticky bottom nav (Home, Search, Bookings, Profile)
- Tablet/Desktop: two-column listings, wider dashboard, fixed top nav

---

## 8. Recommended Tech Stack

| Layer | Suggestion |
|-------|------------|
| Frontend | Next.js (App Router) + React + Tailwind CSS |
| Mobile UI | Responsive web (PWA-ready) — optional React Native later |
| Backend | Next.js API routes or Node.js/Express |
| Database | PostgreSQL (Prisma ORM) |
| Auth | NextAuth.js / Clerk (phone OTP + email/password) |
| Payments | Razorpay / Stripe (UPI, cards, wallet) |
| Maps | Google Places API / Mapbox (location search, distance) |
| Chat/Notifications | Socket.io or Firebase (chat), push/email via Resend/SendGrid |
| File upload | AWS S3 / Cloudinary (profile photos, ID docs) |
| Deploy | Vercel / Railway |

---

## 9. Database Schema (Core Tables)

- **users:** id, role (client/worker/admin), name, phone, email, password_hash, location, pincode, avatar_url, is_verified, created_at
- **worker_profiles:** user_id, bio, experience_years, hourly_rate, service_radius_km, languages[], availability_json, is_available
- **categories:** id, name, slug, icon, commission_percent
- **skills:** id, category_id, name
- **worker_skills:** worker_id, skill_id
- **bookings:** id, client_id, worker_id, category_id, service_date, time_slot, address, status (pending/accepted/completed/cancelled), total_amount, payment_status, created_at
- **reviews:** id, booking_id, client_id, worker_id, rating, comment, created_at
- **payouts:** id, worker_id, amount, status, paid_at
- **documents:** user_id, type (aadhaar/police), url, status (pending/approved/rejected)

---

## 10. Key User Flows

**Client booking:** Search → Filter workers → View profile → Pick date/time → Enter address → Pay → Get confirmation → Chat worker → Service done → Rate & review.

**Worker onboarding:** Sign up → Upload ID documents → Build profile (skills, rates, availability) → Admin verifies → Receive job requests → Accept → Complete service → Request payout.

---

## 11. Trust & Safety
- ID verification badge for workers
- Background check option (police verification)
- Ratings & reviews with verified-booking tag
- In-app chat & masked phone numbers
- Cancel/refund policy
- SOS / report user button

---

## 12. Launch Phases

| Phase | Scope |
|-------|-------|
| **MVP** | Client search & booking, worker profiles, basic auth, UPI payments, admin verification queue, one city |
| **Beta** | Worker dashboard & earnings, chat, recurring bookings, reviews, payouts, 2–3 cities |
| **V1** | Mobile apps (iOS/Android), SOS, subscriptions for workers, business/office bookings, admin analytics |

---

## 13. Success Metrics
- Workers onboarded & verified per city
- Monthly bookings & completion rate
- Repeat booking rate (rehire)
- Average rating & review volume
- GMV (gross merchandise value) & platform commission

---

## 14. Next Steps
1. Finalize feature scope & pick tech stack.
2. Design low-fidelity wireframes (Figma) for landing, listing, profile, booking, dashboards.
3. Set up Next.js + Tailwind + PostgreSQL repo.
4. Build auth + worker profile + booking flow (MVP).
5. Internal testing → launch in one pilot city.
