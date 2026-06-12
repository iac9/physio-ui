# Physio Website Spec — Huy Hua Physiotherapy

## Overview
Sleek, clean & minimal physiotherapy website for **Huy Hua** (solo practitioner) in **Mitcham, Victoria**. React + TypeScript on Vite. 9 pages with a custom booking calendar. Deploy on Vercel. Placeholder content for now.

---

## Tech Stack
- **Frontend**: React 19 + TypeScript (Vite)
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Booking**: Custom calendar UI (in-memory mock storage, backend-ready interface)
- **Icons**: Lucide React
- **Animations**: Framer Motion (subtle, professional)
- **Deployment**: Vercel

## Design Direction
- Clean & minimal with generous white space
- Soft color palette: warm cream background (#f5f0eb), white card surfaces, muted teal/sage green accent (#5d8e87), warm neutral tones
- Page background is warm off-white cream (#f5f0eb) — not pure white — to reduce eye strain
- White (#ffffff) is reserved for cards and panels, creating subtle depth against the cream background
- Buttons on colored (teal) backgrounds use text-primary-dark (#3d6e67) for WCAG AA contrast compliance
- Professional typography (Inter via Google Fonts)
- Mobile-first responsive design
- Subtle animations on scroll (fade-in, slide-up)

---

## Pages & Components

### Shared Components
1. **Navbar** — Sticky top nav with logo/business name, nav links, CTA "Book Now" button. Mobile hamburger menu.
2. **Footer** — Contact info (phone, email), social links (Instagram, Facebook), location, copyright. Quick nav links.

### Pages (9 total)

1. **Home** — Hero section (full-width image/gradient, headline, subtitle, CTA button), brief services overview cards, testimonial preview, CTA banner.
2. **About** — Huy Hua's bio, photo placeholder, qualifications, philosophy, why choose section.
3. **Services** — Grid/cards for Physio & Rehab services with icons, descriptions, and "Book Now" CTA per service.
4. **Book Appointment** — Custom multi-step booking calendar (see below).
5. **Pricing** — Clean pricing table/cards for consultation types (Initial, Follow-up, Extended).
6. **Testimonials** — Client reviews in card layout with star ratings (placeholder content).
7. **Blog** — Article list with card previews (placeholder posts, static for now).
8. **FAQ** — Accordion-style Q&A section.
9. **Contact** — Phone, email, social links, Google Maps embed for Mitcham VIC, business hours.

### Custom Booking Calendar Design

Multi-step booking flow, UI only with in-memory mock data. Clean `BookingService` interface for future backend swap.

| Step | Component | Description |
|------|-----------|-------------|
| 1 | **ServiceSelect** | Cards showing available services with durations (Initial Consult 60min, Follow-up 30min, Extended Rehab 45min) |
| 2 | **CalendarPicker** | Monthly calendar widget, weekends disabled, navigate between months |
| 3 | **TimeSlotGrid** | Available time slots for selected date (Mon–Fri 9am–5pm), slot size matches service duration, mock-booked slots shown as unavailable. User selects a slot then clicks Next → to proceed. |
| 4 | **BookingForm** | Client details: name, email, phone, optional notes |
| 5 | **BookingConfirmation** | Summary of booking details + success message |

**Navigation**: ← Back and Next → arrow buttons appear at the bottom of the booking panel. Back is available on steps 2–4; Next is available on steps 1–3 when the current step has a selection. Step 4 advances only via form submission. Navigating between steps does not clear previously entered data (only selecting a *different* service clears date/time; selecting a *different* date clears the time).

**Data layer**: In-memory store via React Context. Exposes a `BookingService` interface so a real backend can be swapped in without touching UI components.

---

## Implementation Phases

### Phase 1: Project Setup & Foundation
1. Install dependencies: `tailwindcss`, `@tailwindcss/vite`, `react-router-dom`, `lucide-react`, `framer-motion`
2. Configure Tailwind CSS v4 (Vite plugin, base styles, custom theme colors)
3. Set up React Router with all 9 routes in `App.tsx`
4. Define color palette & typography (teal/sage accent, neutral grays)
5. Create shared layout component (`Layout.tsx`) wrapping Navbar + Footer + `<Outlet />`

### Phase 2: Shared Components
6. Build `Navbar` — responsive, sticky, mobile hamburger menu, "Book Now" CTA
7. Build `Footer` — contact info, social icons, nav links, copyright

### Phase 3: Core Pages
8. **Home page** — Hero with CTA, services preview (3 cards), testimonial snippet, bottom CTA
9. **About page** — Bio section with image placeholder, qualifications list, philosophy
10. **Services page** — Service cards grid (Physiotherapy, Rehabilitation, sub-services)
11. **Contact page** — Info cards (phone, email, hours), Google Maps embed, social links

### Phase 4: Booking & Commercial Pages
12. **Book Appointment page** — Custom multi-step booking calendar
    - `src/components/booking/ServiceSelect.tsx`
    - `src/components/booking/CalendarPicker.tsx`
    - `src/components/booking/TimeSlotGrid.tsx`
    - `src/components/booking/BookingForm.tsx`
    - `src/components/booking/BookingConfirmation.tsx`
    - `src/context/BookingContext.tsx`
    - `src/types/booking.ts`
13. **Pricing page** — Pricing cards (Initial Consult, Follow-up, Extended session)
14. **FAQ page** — Accordion component with common physio questions

### Phase 5: Content & Engagement Pages
15. **Testimonials page** — Review cards with star ratings, placeholder client names
16. **Blog page** — Article preview cards, individual blog post layout (static/placeholder)

### Phase 6: Polish & Deploy
17. Add scroll animations (Framer Motion fade-in on sections)
18. SEO meta tags (title, description, Open Graph) per page
19. Responsive testing & final polish
20. Deploy to Vercel

---

## File Structure

### Existing Files to Modify
- `src/App.tsx` — Router setup + layout
- `src/index.css` — Tailwind directives + global styles
- `vite.config.ts` — Add Tailwind Vite plugin
- `index.html` — Title, meta tags, Google Fonts link

### New Files

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── PricingCard.tsx
│   │   └── AccordionItem.tsx
│   └── booking/
│       ├── ServiceSelect.tsx
│       ├── CalendarPicker.tsx
│       ├── TimeSlotGrid.tsx
│       ├── BookingForm.tsx
│       └── BookingConfirmation.tsx
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── BookAppointment.tsx
│   ├── Pricing.tsx
│   ├── Testimonials.tsx
│   ├── Blog.tsx
│   ├── FAQ.tsx
│   └── Contact.tsx
├── context/
│   └── BookingContext.tsx
├── types/
│   └── booking.ts
└── data/
    ├── services.ts
    ├── testimonials.ts
    ├── faq.ts
    └── blog.ts
```

---

## Verification
1. `npm run dev` — all 9 pages render and route correctly
2. `npm run build` — TypeScript compiles with no errors
3. `npm run lint` — no ESLint errors
4. Responsive layout on mobile/tablet/desktop viewports
5. Booking calendar flow works end-to-end (UI only)
6. Lighthouse: aim for 90+ on Performance, Accessibility, SEO
7. Deploy to Vercel and verify production build

---

## Decisions
- **Custom calendar over Cal.com**: UI-only with in-memory mock data, backend to be built later
- **Business hours**: Mon–Fri 9am–5pm (configurable later)
- **Appointment durations**: Mixed per service (Initial 60min, Follow-up 30min, Extended 45min)
- **In-memory storage**: Bookings stored in React Context with a clean interface for future backend swap
- **Static blog**: No CMS — placeholder posts as static data files
- **No backend**: Fully static frontend with mock booking data. Contact via phone/email/social
- **Placeholder content**: All text, images, testimonials are placeholders — real content to be supplied later

## Open Items
- **Custom domain**: Connect one (e.g., huyhuaphysio.com.au) via Vercel when ready
- **Google Maps**: Free iframe embed on Contact page (no API key needed)
- **Backend**: To be built later for real booking persistence and notifications
