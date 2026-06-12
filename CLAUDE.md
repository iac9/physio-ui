# CLAUDE.md — Huy Hua Physiotherapy Website

## Rules — Apply on Every Code Change

After any code change, always:

1. **Run tests** — `npx vitest run` must pass with no failures. Update or add tests to reflect the change.
2. **Update `SPEC.md`** — if the change adds, removes, or alters behaviour described in the spec, update it.
3. **Update `CLAUDE.md`** — if the change affects architecture, conventions, key decisions, or anything a future session needs to know, update this file.

Personal project. A physiotherapy website for Huy Hua, solo practitioner in Mitcham, Victoria. All content is currently placeholder — real copy, photos, and pricing to be supplied by the client.

## Stack

- **React 19 + TypeScript**, Vite 8
- **Tailwind CSS v4** — configured via `@theme {}` block in `src/index.css`. There is no `tailwind.config.js`.
- **React Router v7** — `createBrowserRouter`, all routes share a `<Layout>` component
- **Framer Motion** — page transitions and scroll animations
- **Clerk (`@clerk/react` v6)** — authentication. Uses `<Show when="signed-in/out">` (NOT `<SignedIn>`/`<SignedOut>` which are v5). `ClerkProvider` lives in `src/main.tsx`.
- **Vitest + React Testing Library** — test suite

## Key Architecture Decisions

- **`BookingProvider` lives in `Layout.tsx`**, not in `BookAppointment.tsx`. This means any page can call `useBooking()` — it was moved there to fix a crash on the `/my-bookings` page.
- **In-memory booking store** — `let bookings: Booking[]` is a module-level variable in `BookingContext.tsx`. All booking data is lost on page refresh. `BookingServiceInterface` in `src/types/booking.ts` is the designed swap point for a real backend.
- **Fonts** — `DM Serif Display` (Google Fonts) is used for `h1`, `h2`, `h3`. `Inter` is used for everything else. Both are loaded in `index.html`.
- **`selectDate` does not auto-advance** to step 3. The user must use the Next button.
- **Returning to `/book` after a confirmed booking** resets the flow to step 1 via a `BookingReset` component that runs on mount.

## Routes

| Route | Notes |
|---|---|
| `/` | Home |
| `/about` | About Huy Hua |
| `/services` | 6 services |
| `/pricing` | Pricing |
| `/testimonials` | Patient reviews |
| `/blog`, `/blog/:slug` | Blog |
| `/faq` | FAQ accordion |
| `/contact` | Contact form |
| `/book` | 5-step booking — requires Clerk sign-in |
| `/my-bookings` | View/reschedule/cancel bookings — requires Clerk sign-in |

## Booking Flow (5 steps)

1. Select service (Initial 60min/$130, Follow-up 30min/$90, Extended 45min/$115)
2. Pick date (Mon–Fri only, no auto-advance on selection)
3. Pick time slot (9am–7pm, 30-min intervals)
4. Contact details — pre-filled from Clerk profile via `useUser()`; cancellation policy checkbox must be checked before submitting
5. Confirmation screen

## My Bookings Page

- Upcoming / Past tabs
- Inline reschedule panel (self-contained calendar + time slot picker with own local state — does NOT use BookingContext)
- Cancel opens a custom modal; shows a late-cancellation warning only if the appointment is within 24 hours

## Clerk Auth

- `useAuth()` → `userId` (used to associate bookings with users)
- `useUser()` → pre-fills booking form (name, email, phone)
- Keys are in `.env.local` (gitignored). Get new keys from dashboard.clerk.com.
- Session duration: Clerk defaults (7-day inactivity timeout). No custom config in code.

## Environment Variables

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...   # required — loaded in main.tsx
CLERK_SECRET_KEY=sk_test_...             # for future backend use only
```

## Tests

Run with `npx vitest run`. 37 tests across 4 files:

- `src/context/BookingContext.test.tsx` — state management, all service methods
- `src/components/ui/Button.test.tsx`
- `src/components/ui/AccordionItem.test.tsx`
- `src/components/ui/StarRatingInput.test.tsx`

Tests use far-future dates (`2035-06-16` onwards) to avoid collisions with the mock bookings seeded for the next 14 days.

## What's Still Placeholder

- All copy (practitioner bio, service descriptions, blog posts, FAQ answers, testimonials)
- Contact details (phone, address shown as Mitcham VIC 3132)
- Photos / images (none currently used)
- Pricing (current figures are illustrative)
- No backend — bookings are in-memory only and lost on refresh
