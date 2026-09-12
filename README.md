# IWF 2027 Website

Next.js App Router site for the International Worship Festival 2027 — public pages, free QR registration, livestream altar-call, and partnership inquiries.

See [docs/DIGITAL_EXPERIENCE_PLAN.md](docs/DIGITAL_EXPERIENCE_PLAN.md) for scope and constraints.

## Stack

- Next.js 15 (App Router) + TypeScript strict + Tailwind CSS
- MongoDB Atlas via Mongoose
- Resend (transactional email)
- Hosting target: **Railway** (Cloudflare CDN in front)
- Domain: `iworshipfestival.org`

## Getting started

```bash
cp .env.example .env.local
# fill MONGODB_URI, RESEND_API_KEY, EMAIL_FROM, PARTNER_INQUIRY_TO
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development |
| `npm run build` | Production build (`output: "standalone"`) |
| `npm start` | Run production server |
| `npm run lint` | ESLint |

## Deploy (Railway)

Use the included `Dockerfile` / `railway.toml`. Set the same env vars as `.env.example`. Bind to `PORT` and `HOSTNAME=0.0.0.0` (already handled in the image).

## Non-goals

No WhatsApp, no payments/ticketing, no Vercel-specific APIs.
