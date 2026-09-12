# IWF 2027 — Digital Experience Plan

Source of truth for scope, targets, and rationale. Read this before changing the repo.

## Event facts

| Item | Value |
|------|--------|
| Event | International Worship Festival (IWF) 2027 |
| Venue | Teslim Balogun Stadium, Surulere, Lagos |
| Date | Saturday 9 January 2027 |
| Start | `2027-01-09T09:00:00+01:00` (WAT, UTC+1) |
| Domain | `iworshipfestival.org` |
| Entry | Free — registration only, no payment or ticketing |
| Capacity target | 10,000+ attendees |

## Festival objectives → digital translation

| Festival objective | Digital translation |
|--------------------|---------------------|
| Fill the stadium (10,000+) | Free `/register` + homepage live counter (`Registration.countDocuments()`, ISR 60s) |
| 15+ nations represented | Required ISO country dropdown; `Registration.distinct("country")` is the metric |
| Frictionless gate entry | Server-side QR encoding `IWF27-XXXXXXXX` only (not a URL); `/verify/[id]` for staff lookup |
| Global / overflow participation | `/live` hub with YouTube/Facebook embeds + **always-visible** altar-call form |
| Resource the festival | `/partners` tiers (Kingdom ₦20M+ / Covenant ₦8M+ / Seed ₦2M+) + inquiry → Resend notify |

## Success-target metrics

| Metric | Target / rule |
|--------|----------------|
| Registrations | 10,000+ documents in `Registration` |
| Nations | 15+ distinct `country` values |
| QR accreditation | QR decodes to the exact `registrationId` string (`IWF27-XXXXXXXX`) |
| Altar call | Form visible for the entire livestream — **no** time-gating (including no 7:00 PM window) |
| Partnership | Inquiries written to MongoDB and emailed to the team via Resend |

## Stack constraints (strict)

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14+ (App Router), TypeScript strict |
| Styling | Tailwind CSS |
| Database | MongoDB Atlas via Mongoose |
| Hosting | **Railway** — no Vercel-specific APIs |
| DNS/CDN | Cloudflare in front; respect `X-Forwarded-*` / `CF-Connecting-IP` |
| Email | Resend (transactional only) |
| QR | `qrcode` npm package, server-side |
| Domain | `iworshipfestival.org` |

## Explicit non-goals (do not build)

- Any WhatsApp integration (forms, confirmation, or broadcast)
- Payment or ticketing
- Admin dashboard beyond raw counts (phase 2)
- Physical gate-scanning app — `/verify/[id]` is lookup only
- Vercel deployment or Edge-only features that assume Vercel’s network

## Key business rules

- **Registration ID:** `IWF27-${nanoid(8).toUpperCase()}` — encode this string in the QR, not a URL
- **Registered counter:** ISR / `revalidate = 60` — do not query Mongo on every uncached request path beyond that window
- **Rate limit:** 5 requests/minute/IP on `/api/register` and `/api/altar-call`
- **Partner tiers:** enum only — `kingdom` | `covenant` | `seed`
- **Open question (v1):** no duplicate-registration blocking — same email registering twice (e.g. different group sizes) may be legitimate

## Site map

| Route | Purpose |
|-------|---------|
| `/` | Hero, countdown, vision, live registration count, CTA |
| `/programme` | Two-session schedule |
| `/ministers` | Line-up grid (static data → CMS later) |
| `/register` | Free registration form |
| `/register/success` | QR + registration ID |
| `/partners` | Sponsorship tiers + inquiry |
| `/press` | Media kit |
| `/live` | Livestream + altar-call + CTA bar |
| `/faq` | Logistics, accessibility, transport, safety |
| `/verify/[id]` | Staff accreditation lookup (not in public nav) |
