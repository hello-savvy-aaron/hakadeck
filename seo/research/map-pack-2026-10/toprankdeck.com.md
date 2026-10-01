# Competitor audit: Top Rank Outdoor Living (toprankdeck.com)

Audited 2026-10-01. Google Business Profile per brief: 5.0★ / 20 reviews, service-area business (address hidden on GBP), pin ~39.672,-104.799, phone (303) 434-0448. Ranks #2 in the Google Maps pack for "deck builders near me" in the south-Denver metro.

## 6-line summary — why this listing likely outranks a 5.0★/90-review competitor

1. It isn't winning on content: the whole site is ~19 URLs (confirmed via sitemap), zero blog posts, and only **one** dedicated city landing page (Aurora) despite text claiming it serves 6 cities — thin content is not the ranking driver.
2. Every page title + H1 hard-codes "Aurora, CO" + a service term (deck/pergola/patio cover/fence/drainage), giving Google unambiguous, consistent geo+service relevance signals to match against "deck builders" queries — even though the literal phrase "near me" never appears anywhere on the site.
3. The entity has real age/continuity behind it: JSON-LD schema on 3+ pages still carries the pre-rebrand name "Colorado Lumber Crafts," the logo/favicon files are named `colorado-lumber-crafts-*`, and the on-page Google Maps link resolves to Place ID `0x876c8928e090b59b:0xb20b3a0f87579695` at coords `39.6721905,-104.799499` — the exact same GBP pin quoted in the brief. This reads as one long-lived Google Business entity carried through a rebrand, not a fresh listing.
4. On-site trust proof is thin and 100% self-asserted: no visible review-count/star widget anywhere, no BBB/NADRA/Houzz/Angi badge, no stated license or insurance — just a "10-year workmanship warranty" and "certified installer" claims for Trex/TimberTech/Deckorators.
5. Third-party footprint is also thin (Yelp: 5.0★ but only 2 reviews; ProvenExpert: 4.85; no confirmed BBB, Houzz profile, Angi profile, Nextdoor, or Facebook page surfaced in search) — reinforcing that the map-pack #2 spot is almost certainly being earned on the GBP side (proximity to the searcher, category match, the 20 GBP reviews, call/click engagement) rather than by the website or by citation volume.
6. Technical SEO is actually sloppy — generic "Oxygen Template Server" leftover as the Person/WebSite entity name in schema, two service pages (`/pergolas/`, `/fence-company-in-aurora-co/`) mismarked as `Article` instead of `Service`, a malformed `postalCode` field ("CO 80016"), and LocalBusiness-schema hours (Mon/Wed 8–6, Fri 8–1:30) that contradict the on-page footer hours (Mon–Fri 8–5) — meaning this competitor is beatable on web quality even while it's strong on Maps.

---

## 1. Titles / H1s / meta description / "deck builder" & "near me" usage

| Page | Title | H1 |
|---|---|---|
| Home (`/`) | "Top Rank Outdoor Living \| Custom Decks Aurora CO" | "Aurora's Trusted Custom High-End Deck Builders" |
| `/custom-decks/` | "Custom Deck Builder in Aurora CO \| Top Rank Outdoor Living" | "Custom Deck Builders in Aurora, CO" |
| `/patio-covers-gazebos-and-pavilions/` | "Patio Covers, Gazebos & Pavilions in Aurora, CO \| Top Rank" | "Patio Cover Installation in Aurora, CO" |
| `/pergolas/` | "Pergola Builders in Aurora CO \| Top Rank Outdoor Living" | "Pergola Builder in Aurora, CO" |
| `/under-deck-drain-system/` | "Under Deck Drainage in Aurora, CO \| Top Rank Outdoor Living" | "Under Deck Drainage System in Aurora, CO" |
| `/fence-company-in-aurora-co/` | "Fence Company in Aurora, CO - Top Rank Outdoor Living" | "Fence Company in Aurora, CO" |
| `/services/` | "Deck Services in Aurora CO \| Top Rank Outdoor Living" | "Our Services in Aurora, CO" |
| `/location-aurora-co/` | "Deck Builders Aurora CO \| Top Rank Outdoor Living" | "Built for Colorado Weather. Designed for You." |
| `/about-us/` | "About Top Rank Outdoor Living \| Aurora CO Deck Company" | "About Top Rank Outdoor Living" |

Homepage meta description (raw `<meta name="description">`, source `/`):
> "Top Rank Outdoor Living builds custom decks, pergolas, patio covers and outdoor living spaces in Aurora, CO. Schedule an on-site quote today."

- "Deck builder(s)" — used heavily in titles/H1s across home, `/custom-decks/`, `/location-aurora-co/`.
- "near me" — **not found** on any page checked (home, custom-decks, location-aurora-co, fence-company-in-aurora-co). Confirmed by direct grep of raw HTML as well as WebFetch reads.
- City names in body copy — Aurora dominates every page. `/location-aurora-co/` additionally names Centennial, Parker, Castle Rock, Castle Pines, Highlands Ranch, and "Denver Metro" as served areas (source: `https://toprankdeck.com/location-aurora-co/`).

## 2. NAP (footer/contact) vs. GBP

- Business name on-site: **"Top Rank Outdoor Living"** everywhere in visible copy — matches GBP name.
- Phone: **(303) 434-0448** on every page, header click-to-call (`tel:` link) and footer — matches GBP phone exactly.
- Address: the `/contact-us/` page shows no street address ("Aurora, CO" only). However `/location-aurora-co/` **does** display a full street address in page copy:
  > "Top Rank Outdoor Living, 20434 E Yale Pl, Aurora, CO 80013" (source: `https://toprankdeck.com/location-aurora-co/`, confirmed via raw HTML, not just AI summary)
  - This is notable: the brief states the GBP itself has its address **hidden** (service-area business). The website nonetheless discloses a specific street address publicly. The on-page Google Maps link from that same address block resolves to `@39.6721905,-104.799499` / Place ID `0x876c8928e090b59b:0xb20b3a0f87579695` — i.e., it points at the same GBP pin given in the brief, confirming the site and GBP are the same underlying entity.
  - Zip inconsistency: visible page copy says **80013**; the page's own `LocalBusiness` JSON-LD schema has a malformed `postalCode` field containing **"CO 80016"** (wrong format and a different zip than the visible text). This is an internal NAP inconsistency on the competitor's own site.
- Email: `toprankdeck@gmail.com` (generic Gmail, not a branded domain inbox) — source `/contact-us/`.
- Second location: none found. Single Aurora address/page only.

## 3. Schema markup (verified via raw HTML / JSON-LD, not just rendered text)

Site runs WordPress + Rank Math SEO (Pro) for schema, built on an "Oxygen" page builder theme.

**Homepage (`/`) — `@graph` contains:**
- `["Person","Organization"]` — `"name":"Oxygen Template Server"` (unedited theme-default placeholder, not the business name)
- `WebSite` — `"name":"Oxygen Template Server"` (same placeholder bug)
- `ImageObject` — favicon file literally named `cropped-colorado-lumber-crafts-favicon.png`
- `WebPage` — datePublished `2022-05-18`, dateModified `2026-06-22`
- `Organization` — `"name":"Colorado Lumber Crafts | Deck Builders in Aurora, CO"`, `"alternateName":"Colorado Lumber Crafts"`, logo file `colorado-lumber-crafts-logo-color.png`, `"sameAs":"https://www.instagram.com/co_lumbercrafts/"`
- **No LocalBusiness/HomeAndConstructionBusiness, no AggregateRating/Review, no FAQPage anywhere on the homepage.**

**`/location-aurora-co/` — the only page with a `LocalBusiness` node:**
```
"@type":"LocalBusiness",
"name":"Trusted Deck Builders in Aurora, CO | Colorado Lumber Crafts",
"image":".../colorado-lumber-crafts-logo-color.png",
"telephone":"(303) 434-0448",
"priceRange":"$$ - $$$",
"address":{"streetAddress":"Aurora, CO","addressLocality":"Aurora","addressRegion":"CO","postalCode":"CO 80016","addressCountry":"US"},
"openingHoursSpecification":[{"dayOfWeek":["Monday","Wednesday"],"opens":"08:00","closes":"18:00"},{"dayOfWeek":"Friday","opens":"08:00","closes":"13:30"}],
"sameAs":"https://www.instagram.com/co_lumbercrafts/"
```
Notes: business name in the schema is still the **old brand "Colorado Lumber Crafts"**; `streetAddress` is a generic placeholder, not the real street address shown in the page's visible text; the opening hours in schema (Mon/Wed 8–6, Fri 8–1:30, implicitly closed Tue/Thu/weekend) **contradict** the visible footer hours (Mon–Fri 8–5, closed Sat–Sun); no `aggregateRating` or `review` fields at all.

**Service pages:**
- `/custom-decks/`, `/services/`, `/patio-covers-gazebos-and-pavilions/`, `/under-deck-drain-system/` each carry a `Service` + `Offer` node (price given only as `"$$ - $$$"`, not a real number). The `/custom-decks/` Service node's own `name`/`description` fields still say **"CLC Decks"** — another old-brand leftover baked into live schema: `"name":"Custom Decks Installation Services in Aurora, CO | CLC Decks"`.
- `/pergolas/` and `/fence-company-in-aurora-co/` are mismarked as `Article` schema instead of `Service` — a type/content mismatch.
- `/about-us/` and `/why-choose-top-rank-outdoor-living/` have **no JSON-LD at all** (not even a WebPage node).
- No `FAQPage` schema found anywhere, despite `/fence-company-in-aurora-co/` having a visible on-page FAQ section — a missed rich-result opportunity.
- No `Review`/`AggregateRating` schema found on any page checked.

## 4. Site structure (from `/page-sitemap.xml`, 19 URLs total, no post-sitemap exists at all)

- Service pages (5): `/custom-decks/`, `/patio-covers-gazebos-and-pavilions/`, `/pergolas/`, `/under-deck-drain-system/`, `/fence-company-in-aurora-co/`, plus a `/services/` hub page.
- City/location pages: **1 total** — `/location-aurora-co/`. No dedicated pages exist for Centennial, Parker, Castle Rock, Castle Pines, or Highlands Ranch despite those cities being named as served areas in body copy.
- Blog: **0 posts.** `robots.txt` → `Sitemap: https://toprankdeck.com/sitemap_index.xml` → only sub-sitemap is `page-sitemap.xml` (no `post-sitemap.xml`/category sitemap exists), confirming there is no blog/article content being published at all.
- Gallery/portfolio: a hub `/gallery/` plus 3 category sub-galleries — `/decks-gallery/`, `/pergolas-gallery/`, `/pergola-covers-gallery/`. Organized **by service type, not by city** — not tagged per-location. Hub page shows ~3 sample thumbnails per category (≈9 visible, "View More" links to fuller sets).
- Other pages: `/about-us/`, `/why-choose-top-rank-outdoor-living/`, `/contact-us/`, `/request-a-quote/`, `/thank-you/` (form confirmation), `/privacy-policy/`, `/terms-and-conditions/`, and a stray `/template-inner-page-redesign/` (looks like an orphaned dev/staging page left in the sitemap).

## 5. Trust / proof signals

- Reviews: **no star rating or review-count widget anywhere on the site** (confirmed by raw-HTML grep for "star"/"review"/testimonial-count patterns — none found). Testimonials section exists but displays quotes without numeric ratings or counts.
- Years in business: not stated anywhere (checked home + about-us). No founding date claim on-site, though the Organization schema's earliest `datePublished` on record is 2022-05-18, and WebSearch results say the company was "established in 2018" (unverified third-party claim, not on the client's own site).
- Licenses / insurance: not mentioned on any page checked.
- Warranty: **"10-Year Workmanship Warranty"**, stated on `/about-us/` and `/why-choose-top-rank-outdoor-living/`.
- Financing: mentioned once on `/why-choose-top-rank-outdoor-living/` ("financing options available"), no partner/provider named.
- Certifications/badges: "Certified installers for leading outdoor living brands" — names **TrexPro®, TimberTech®, Deckorators®** (source: `/custom-decks/`), plus "Trex RainEscape®" and "Zip-Up®" systems named on `/about-us/`. No BBB, NADRA, Houzz, Angi, or "Best of" badges found on-site anywhere.
- Awards: none found.

## 6. Conversion mechanisms

- Phone in header: yes, **(303) 434-0448**, as a click-to-call `tel:` link.
- Quote form: yes — "Schedule On-Site Quote" CTA site-wide, plus a dedicated `/request-a-quote/` page and a `/thank-you/` confirmation page.
- Contact form (`/contact-us/`): Name, Email, Phone, Message fields.
- Online booking/scheduling: no true self-serve scheduler found — it's a lead-gen form, not calendar booking.
- Chat widget: none detected.
- Hours stated: footer says Mon–Fri 8:00 AM–5:00 PM, Sat–Sun closed (source: `/contact-us/`, `/location-aurora-co/`) — note this contradicts the LocalBusiness schema's own hours (see §3).

## 7. Third-party listings / citations (from WebSearch, 3 queries used total)

- **Yelp**: profile exists — "Top Rank Outdoor Living — Aurora, Colorado — Decks & Railing," 70 photos, **5.0★ with only 2 reviews** per search snippet. (`https://www.yelp.com/biz/top-rank-outdoor-living-aurora`)
- **ProvenExpert**: profile exists, **4.85/5** rating shown. (`https://www.provenexpert.com/en-us/top-rank-outdoor-living/`)
- **Houzz**: no dedicated business profile surfaced in search — only generic "Best 15 deck building companies in Aurora, CO" directory/list pages that would include them among others. No Houzz review count confirmed.
- **BBB**: no listing found in either search pass.
- **Angi/HomeAdvisor**: no dedicated profile found — only a generic Angi category directory page for "Decks and Porches" in Aurora, CO.
- **Nextdoor, Facebook, Thumbtack, Porch, Expertise.com**: none surfaced in search. No confirmed Facebook business page.
- **Trex/TimberTech/Deckorators installer locators**: not independently confirmed via search (only self-reported on-site claims — see §5); brief search budget did not surface a locator listing.
- **NADRA**: not found; one unrelated NADRA blog post about Trex surfaced but is not about this business.
- **Yahoo Local**: listed under the name **"Colorado Lumber Crafts"** at `https://local.yahoo.com/info-232422022-colorado-lumber-crafts-aurora/`, titled "Top Rank Outdoor Living" in the search snippet — a leftover/un-updated legacy citation under the old business name, consistent with the schema findings in §3.
- **Geebo**: directory listing exists (`https://aurora-co.geebo.com/services/view/id/1984128-top-rank-outdoor-living-`).
- **A Greater Town**: directory listing exists, categorized as "Building Contractors' Referral Services."
- **Agency footprint**: the site's footer links to `numanadigital.com` (uncredited "powered by" style link, likely their web/SEO agency) — not a citation but useful context on who built/maintains the site.

## 8. Notable findings

- **Rebrand residue, not a fresh domain.** The business clearly rebranded from **"Colorado Lumber Crafts"** (Instagram handle is still `@co_lumbercrafts`, logo/favicon filenames, Organization schema name/alternateName, the `/custom-decks/` Service schema literally says "CLC Decks," and the Yahoo Local listing is still under the old name) to "Top Rank Outdoor Living." The underlying GBP/Place ID is continuous through the rebrand (confirmed via matching coordinates/Place ID between the brief and the site's own Maps link), meaning whatever review/engagement history and map-pack trust accrued under the old name likely carried forward — a plausible structural reason it outranks newer or less-established listings despite thin on-site/off-site proof.
- **Single-location SAB with a disclosed address.** GBP is configured as a service-area business with address hidden (per brief), yet the website publicly states a specific street address (20434 E Yale Pl, Aurora, CO 80013) that doesn't match the malformed zip in its own schema (80016) — an internal inconsistency, not independently verified against county/property records.
- **No blog, no FAQ schema, no review schema, no multi-city landing pages** — this is a deliberately minimal, conversion-funnel-only site (home → service page → quote form), not a content/SEO-depth play. Its ranking strength looks concentrated almost entirely in Google Business Profile signals (proximity, category match, the 20 GBP reviews, call/direction engagement) rather than website authority or citation volume.
- Not observed: "open 24 hours" claims, virtual-office red flags, multiple GBPs, or evidence of a brand-new domain (Organization schema shows content on the domain since at least 2022).
