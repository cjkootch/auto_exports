# Vector Auto Exports — vectorautoexports.com

B2B sourcing site for Vector Auto Exports (a Vector Trade Capital company).
US vehicle sourcing & export — Houston-based, container & RoRo to the
Caribbean, Gulf, and Caucasus.

No VINs, no pricing, no live inventory: the site shows a representative
sourcing catalog, and every card funnels into the spec-request form
(Neon Postgres + Resend notification).

## Stack

- Next.js 14 (App Router, TypeScript, Tailwind) — static-first, only the
  form API route is dynamic
- Neon serverless Postgres (`@neondatabase/serverless`)
- Resend (sender: `notify@mail.vectorautoexports.com`)
- Vercel hosting + Vercel Analytics

## Routes

| Route | Purpose |
|---|---|
| `/` | Hero, two-lane strip, how it works, why us |
| `/catalog` | Sourcing catalog grid, All / Clean title / Rebuildable filter |
| `/catalog/[slug]` | Category detail + prefilled spec-request form |
| `/logistics` | Ports, containers, documents, transit windows, payment |
| `/contact` | Spec-request form + direct email |
| `/api/spec-request` | POST — validate, honeypot, rate limit, Neon insert, Resend notify + auto-ack |

## Setup

1. Copy `.env.example` to `.env.local` and fill in values. Use a **new** Neon
   project — do not reuse the Vex connection string.
2. Run the schema migration once:
   ```bash
   psql "$DATABASE_URL" -f db/schema.sql
   ```
3. `npm install && npm run dev`

## Env vars

```
DATABASE_URL=            # Neon pooled connection string
RESEND_API_KEY=
NOTIFY_EMAIL=            # Inbox for spec-request alerts
NEXT_PUBLIC_SITE_URL=https://vectorautoexports.com
```

## Catalog data & images

Catalog categories live in `data/catalog.ts` (typed constant — no CMS).
Catalog imagery uses neutral placeholder frames at launch; see
`public/catalog/README.md` for the photo swap path. Real photos of loads
and units only — no stock photos.

## UTM attribution

Outbound campaigns tag links `?utm_campaign=lane1|lane2`. `UtmCapture`
persists `utm_*` params for the session and the form submits them; they land
in the `utm` JSONB column of `spec_requests` for lane attribution.

## Deploy

Vercel project `vector-auto-exports`, domain `vectorautoexports.com`
(DNS in GoDaddy — A/CNAME per Vercel). Set the env vars in Vercel, run the
schema against Neon, then verify one end-to-end form submission (row in
Neon, notification email arrives).
