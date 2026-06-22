# Haka Decks — Next.js

The hakadecks.com rebuild, off Webflow. Next.js 16 App Router, Tailwind v4, shadcn (base-nova), MDX content, deployed on Vercel.

## Stack

- **Next.js 16** with the App Router, Turbopack stable, React 19
- **TypeScript** strict
- **Tailwind v4** — CSS-first config via `@theme` in `app/globals.css` (no `tailwind.config.js`)
- **shadcn/ui** in `base-nova` style — primitives sit on `@base-ui/react` instead of Radix
- **next/font/google** for Inter (body) and Bricolage Grotesque (display)
- **motion** (the package formerly known as Framer Motion) for reveals and counters
- **next-mdx-remote/rsc** for blog and portfolio MDX
- **react-hook-form + zod** for the contact form
- **resend** for outbound mail (optional — falls back to console logging)
- **@vercel/analytics**
- **pnpm**, Node 20+

## Local dev

```bash
pnpm install
pnpm dev      # next dev --port 3001
```

The dev port is 3001, not 3000 — easy to free up if there's something else running.

### Convenience scripts

| Command                           | What                                                          |
| --------------------------------- | ------------------------------------------------------------- |
| `pnpm dev`                        | start dev server                                              |
| `pnpm build`                      | production build (also runs `tsc --noEmit` via Next)          |
| `pnpm lint`                       | eslint                                                        |
| `pnpm typecheck`                  | tsc --noEmit                                                  |
| `pnpm format`                     | prettier --write .                                            |
| `pnpm tsx scripts/sync-assets.ts` | resync `public/images/` from the `public/library/` source kit |
| `pnpm tsx scripts/import-blog.ts` | regenerate `content/blog/*.mdx` from `../docs/blog/*.md`      |

## Environment variables

Copy `.env.example` → `.env.local` for local dev.

| Var              | Purpose                                                                                                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY` | Resend API key. If unset, `/api/contact` logs to console instead of sending mail (dev fallback).                                                                                       |
| `RESEND_FROM`    | Override the sender. Default: `Haka Decks <onboarding@resend.dev>` (works without any DNS). After verifying hakadecks.com in Resend, set this to `Haka Decks <noreply@hakadecks.com>`. |
| `CONTACT_TO`     | Override the recipient. Default: `pete@hakadecks.com`. Useful values: `delivered@resend.dev` (Resend simulator — no real mail), `staging@yourdomain.com`.                              |

## Project structure

```
app/
  layout.tsx          # html + fonts + Vercel Analytics + metadataBase
  globals.css         # tokens, marquee, prose-haka
  (site)/             # route group — wraps everything in header + footer
    layout.tsx
    page.tsx          # /
    about/
    services/
    portfolio/        # + [slug]/
    blog/             # + [slug]/
    contact/
  api/contact/        # POST handler (Resend or console log)
  sitemap.ts | robots.ts | manifest.ts | icon.png | apple-icon.png
components/
  layout/             # site-header, site-footer
  sections/           # homepage section components, all reusable
  forms/              # contact-form
  blog/ portfolio/    # cards
  seo/                # JSON-LD
  ui/                 # shadcn primitives
content/
  blog/*.mdx          # 5 posts, sourced from ../docs/blog/*.md via import-blog.ts
  portfolio/*.mdx     # 2 real projects (double-decker, ranch-deck)
lib/
  site.ts             # name, contact, social, nav, rating — single source of truth
  blog.ts portfolio.ts contact-schema.ts utils.ts
public/
  images/             # synced from public/library/ via sync-assets.ts (~100MB of project + reviews + brand)
  library/            # gitignored local source kit — full-res originals to pull from (not committed/deployed)
scripts/
  sync-assets.ts      # public/library/ → public/images/, resizes JPEGs through sharp
  import-blog.ts      # docs/blog/*.md → content/blog/*.mdx
```

## Adding content

### A new blog post

Two ways:

- **Authoritative source in `docs/blog/`** — drop a new `.md` file under `/Users/aaron/dev/haka/docs/blog/`, then run `pnpm tsx scripts/import-blog.ts`. You'll need to add an entry to the `META` map inside that script first (date, description, category, cover image).
- **Direct in `content/blog/`** — write an MDX file with the same frontmatter shape as the existing ones.

Frontmatter shape:

```yaml
---
title: "Your Title"
description: "One-sentence pitch."
date: 2026-05-24
category: "Materials"
cover: "/images/projects/ranch-drone/04.jpeg"
readingMinutes: 4
---
```

### A new portfolio project

Drop a new `.mdx` file under `content/portfolio/`. Look at `content/portfolio/double-decker.mdx` for the frontmatter shape — needs title, summary, location, year, category, cover, gallery array, and optional video + videoPoster. Slug = filename (no `.mdx`).

### Updating site-wide content

`lib/site.ts` is the single source of truth for nav, contact info, address, ratings, social links, and the primary CTA. Edit there; it propagates through the header, footer, JSON-LD, sitemap, and metadata.

## Assets

`public/images/` is committed because Vercel doesn't see the gitignored `public/library/` source. Total ≈ 100MB after `sync-assets.ts` resizes the 25 iPhone JPEGs through sharp (mozjpeg q=82, max 2400px wide).

**Known TODO:** the two drone `.mp4`s are still 48 MB and 26 MB respectively — no `ffmpeg` was available to transcode them. On cellular this is a real download hit. To improve: `brew install ffmpeg`, then add a transcode pass to `sync-assets.ts` targeting H.264 720p @ ~5 Mbps.

## Design system

Extracted from hakadecks.com's compiled Webflow CSS (`hakadeck.webflow.shared.d7502db52.css`) on 2026-05-23. The most-used color in the source is `#0f1e36` (deep navy, 57x), with `#fcf2e8` (warm cream) as the single accent.

- **Background:** `#0f1e36` (haka-navy)
- **Foreground:** `#ffffff`
- **Card / nested section:** `#0e1b31` (haka-navy-card)
- **Primary / CTA:** `#fcf2e8` (haka-cream)
- **Display font:** Bricolage Grotesque (substitute for the live site's licensed Nohemi)
- **Body font:** Inter

All tokens live in `app/globals.css` under `@theme inline { ... }` and `:root { ... }`.

## URL redirects

`next.config.ts` redirects old Webflow URLs to the new App Router paths so existing inbound links and Google's index keep working:

- `/service` → `/services`
- `/blog-post/:slug` → `/blog/:slug`
- `/project/:slug` → `/portfolio/:slug`
- `/blog/decking-materials-composite-vs-natural-wood` → `/blog/composite-vs-natural-decking-guide` (slug rename)
- Template-residue portfolio slugs (`/portfolio/deck-stairs`, `outdoor-space`, `sustainable-habitat`, `tree-house`) → `/portfolio`

## Deploying to Vercel

```bash
vercel link        # one-time, from web/
vercel --prod      # full deploy
```

Set env vars on the project (just `RESEND_API_KEY` for now). The build output is fully static except `/api/contact` which is a tiny server route. No edge config required.

Recommended initial rollout: deploy to a `vercel.app` staging URL or `staging.hakadecks.com` first, point `hakadecks.com` at Vercel once you're happy.

## Known TODOs

- Drone video transcoding (see Assets above)
- Verify the actual Google reviews URL on `site.ts` (currently a best-guess `g.co/kgs/` shortlink)
- Verify Pete's real Instagram + LinkedIn handles on `site.ts`
- **Verify `hakadecks.com` as a Resend sending domain** so the contact form can send from `noreply@hakadecks.com` instead of the temporary `onboarding@resend.dev`. Steps: Resend → Domains → Add `hakadecks.com` → drop the SPF/DKIM/DMARC records into wherever DNS lives. Once green, set `RESEND_FROM="Haka Decks <noreply@hakadecks.com>"` on Vercel.
- Add a real OG image at `public/og.png` referenced by `metadata.openGraph.images`
- **Rotate the dev `RESEND_API_KEY`** before going live — the current one was pasted in chat and should be considered burnable.

## What we discarded from the original

The live `/service` page on hakadecks.com was about 70% Radiant Template residue — copy about "interior architecture planning," "urban design," "3D modeling," "commercial spaces." The new `/services` page replaces all of that with real Haka content (composite decks, pergolas, outdoor kitchens, railings, repairs). The four template portfolio slugs (`deck-stairs`, `outdoor-space`, `sustainable-habitat`, `tree-house`) were template fixtures, not real projects — they redirect to the portfolio index.
