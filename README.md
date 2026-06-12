# Huy Hua Physiotherapy — Website

Personal project. A clean, minimal physiotherapy website for Huy Hua, solo practitioner in Mitcham, Victoria.

## Tech Stack

- **React 19** + **TypeScript** (Vite)
- **Tailwind CSS v4**
- **React Router v7**
- **Framer Motion** — scroll animations
- **Lucide React** — icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Huy Hua |
| `/services` | Services |
| `/book` | Book Appointment (multi-step calendar) |
| `/pricing` | Pricing |
| `/testimonials` | Patient Reviews |
| `/blog` | Blog |
| `/blog/:slug` | Blog Post |
| `/faq` | FAQ |
| `/contact` | Contact |

## Booking Calendar

The `/book` page is a 5-step in-memory booking flow (UI only — no backend yet):

1. Select service (Initial 60 min / Follow-up 30 min / Extended 45 min)
2. Pick a date (Mon–Fri only)
3. Pick a time slot
4. Enter contact details
5. Confirmation screen

Bookings are stored in React Context. The `BookingServiceInterface` in `src/types/booking.ts` is the swap point for a real backend.

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer, Layout
│   ├── ui/           # Button, ServiceCard, TestimonialCard, PricingCard, AccordionItem
│   └── booking/      # 5-step booking components
├── context/          # BookingContext (in-memory store)
├── data/             # Static data: services, testimonials, faq, blog
├── pages/            # One file per route
└── types/            # booking.ts
```

## Deployment

Deploy to Vercel — connect the repo and it works out of the box (no config needed for a Vite SPA).

## Status

Placeholder content throughout. Real copy, photos, and pricing to be supplied by client. Backend booking system to be built separately.
