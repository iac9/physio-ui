# Huy Hua Physiotherapy — Website

Personal project. A clean, minimal physiotherapy website for Huy Hua, solo practitioner in Mitcham, Victoria.

## Tech Stack

| | |
|---|---|
| **React 19** + **TypeScript** | UI + type safety (Vite 8) |
| **Tailwind CSS v4** | Styling via `@theme {}` block, no config file |
| **React Router v7** | Client-side routing |
| **Framer Motion** | Page transitions and scroll animations |
| **Lucide React** | Icons |
| **Clerk (`@clerk/react` v6)** | Authentication (Google, Apple, email) |
| **Vitest** + **React Testing Library** | Unit and component tests |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create `.env.local` in the project root with your Clerk keys:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Get these from the [Clerk dashboard](https://dashboard.clerk.com).

### 3. Start the dev server

```bash
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
| `npx vitest run` | Run tests once |
| `npx vitest` | Run tests in watch mode |

## Pages

| Route | Page | Auth required |
|---|---|---|
| `/` | Home — hero, services preview, testimonials, CTA | — |
| `/about` | About Huy Hua — bio, qualifications, philosophy | — |
| `/services` | Full services grid (6 services) | — |
| `/pricing` | Pricing cards | — |
| `/testimonials` | Patient reviews with star ratings | — |
| `/blog` | Article list | — |
| `/blog/:slug` | Individual blog post | — |
| `/faq` | Accordion Q&A | — |
| `/contact` | Contact form, location, hours | — |
| `/book` | 5-step appointment booking | Yes (Clerk) |
| `/my-bookings` | View, reschedule, and cancel bookings | Yes (Clerk) |

## Authentication

Authentication is handled by Clerk. Users must be signed in to access `/book` and `/my-bookings`. Sign-in/sign-up is presented as a modal (Google, Apple, or email).

- `<Show when="signed-in">` / `<Show when="signed-out">` gate content in the Navbar and booking page
- `useAuth()` provides `userId` for associating bookings with the logged-in user
- `useUser()` pre-fills the booking form (step 4) with the user's name, email, and phone from their Clerk profile
- `UserButton` (top-right of Navbar when signed in) provides sign-out and profile management

## Booking Flow

The `/book` page is a 5-step flow. Bookings are stored in React Context (in-memory, session only — no backend yet).

| Step | Description |
|---|---|
| 1 — Service | Choose from Initial Consultation (60 min / $130), Follow-up (30 min / $90), or Extended Rehabilitation (45 min / $115) |
| 2 — Date | Month calendar; Mon–Fri only |
| 3 — Time | Available slots from 9:00 AM – 5:00 PM (30-min intervals); pre-seeded mock bookings for realism |
| 4 — Details | Name, email, phone, optional notes (pre-filled from Clerk profile); cancellation policy acknowledgement checkbox |
| 5 — Confirm | Booking summary |

Returning to `/book` after a completed booking resets the flow to step 1.

`BookingServiceInterface` in `src/types/booking.ts` is the swap point for a real backend — replace `inMemoryBookingService` in `BookingContext.tsx` without touching any UI.

## My Bookings

The `/my-bookings` page (signed-in only) shows all bookings for the current user, split into **Upcoming** and **Past** tabs.

- **Reschedule** — expands an inline calendar + time slot picker below the card; confirm replaces the booking in place
- **Cancel** — opens a custom modal with appointment details and styled confirm/dismiss buttons; cancellations within 24 hours of the appointment show a late-cancellation policy warning

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer, Layout (wraps all pages in BookingProvider)
│   ├── ui/           # Button, ServiceCard, TestimonialCard, PricingCard, AccordionItem, StarRatingInput
│   └── booking/      # ServiceSelect, CalendarPicker, TimeSlotGrid, BookingForm, BookingConfirmation
├── context/          # BookingContext — state, actions, in-memory booking service
├── data/             # Static data: services, testimonials, faq, blog posts
├── pages/            # One file per route
├── test/             # Vitest setup (setup.ts)
└── types/            # booking.ts — Service, Booking, BookingState, BookingServiceInterface
```

## Tests

Tests are written with Vitest and React Testing Library. Run with `npx vitest run`.

| File | What's covered |
|---|---|
| `context/BookingContext.test.tsx` | Initial state; selectService (preserves/clears downstream data); selectDate (no auto-advance); selectTime; setStep; reset; slot generation; createBooking marks slot unavailable; getBookingsByUser; cancelBooking (removal + slot freed); rescheduleBooking (update + throws on missing ID) |
| `components/ui/Button.test.tsx` | Renders as button or link; onClick; disabled; all variants and sizes |
| `components/ui/AccordionItem.test.tsx` | Renders question/answer; aria-expanded toggles on click |
| `components/ui/StarRatingInput.test.tsx` | 5 stars render; correct label per rating; onChange fires with star number |

## Deployment

Deploy to Vercel — connect the repo and it builds automatically (no Vite/Vercel config needed for a SPA).

Add the `VITE_CLERK_PUBLISHABLE_KEY` environment variable in the Vercel project settings. `CLERK_SECRET_KEY` is only needed if a backend is added later.

## Status

Placeholder content throughout. Real copy, photos, and pricing to be supplied by the client. Backend booking persistence to be built separately — swap in a real implementation of `BookingServiceInterface`.
