# Competitor Audit: Custom Decks (newcustomdecks.com)

Audited 2026-10-01. Target: GBP 4.4★/86 reviews, 7045 S Fulton St #240, Centennial CO 80112, (720) 753-3160. Ranks #8 in Maps for "deck builders near me," south-Denver metro.

## Summary — why this likely outranks a 5.0★/90-review competitor 0.3 mi away

1. **Multi-platform review volume, not just GBP**: GBP 86 reviews is only part of the picture — Angi shows 4.8★/34 reviews (97% 5-star), plus BBB A+ presence, plus NADRA/Inc 5000 citations. Aggregate third-party review footprint across platforms is a known local-pack signal; a single-platform 5.0★/90 doesn't necessarily beat a business with broad, consistent citation+review coverage.
2. **Tenure and authority signals**: founded 1996 (~30 yrs, vs. unknown for Haka), Inc 5000 five years running, NADRA award wins, magazine features (Deck Builder, Remodeling 550) — strong E-E-A-T/trust signals Google can surface via NAP-linked citations even without perfect on-page SEO.
3. **Correct, consistent core NAP + LocalBusiness schema**: homepage carries clean `LocalBusiness` JSON-LD with exact address, geo-coordinates, phone, hours, founding date, brand/offer lists — matching the GBP exactly. This is the single most load-bearing technical signal for local pack ranking, and it's present and accurate despite the site being otherwise templated/unpolished.
4. **Large gallery/portfolio volume (97 projects)** signals real, ongoing production volume to both users and (via dwell time/engagement) algorithmically, even though projects aren't geo-tagged.
5. **Certifications stack (Trex/TimberTech/AZEK/Fiberon Platinum, NADRA)** is broader than typical single-brand installer pages, reinforcing category relevance for "deck builder" queries.
6. **Caveat**: the on-page SEO itself is mediocre-to-broken (template placeholder text/titles leaking into production, no FAQPage/Review schema, no city landing pages, no blog) — so the ranking edge is likely driven by off-page/GBP signals (review volume across platforms, tenure, citation consistency, physical proximity to searcher) rather than content quality. This is good news: Haka can likely close the gap with GBP/citation work without having to out-build their content.

---

## 1. Homepage title / H1 / meta description / keyword usage

Source: `https://www.newcustomdecks.com/` (raw HTML fetch + WebFetch, confirmed via `<title>` tag and `<meta name="description">`)

- `<title>`: **"Decks & Patios | Denver, CO | Custom Decks"**
- H1 (hero): **"Custom Decks & Patios"**
- Meta description: **"We specialize in deck services, patio services, and outdoor structures. We offer free, in-person estimates within 48 hours and have 24/7 availability."**
- OG title/description match the title/meta above; `og:url` = `https://www.newcustomdecks.com/`
- Body copy: does **not** use "deck builder(s)" or "near me" as exact phrases on the homepage. Uses "deck services," "patio services," "outdoor living," and city/region references: "Denver, CO," "Front Range," "Mountain Communities." Category/service pages do reference "Denver, CO and Surrounding Areas" repeatedly but still avoid "near me."
- Notable: category page title tags carry a **broken placeholder**: `https://newcustomdecks.com/category/elevated-deck-systems` and `https://newcustomdecks.com/decks/` both render `<title>Decks and Patios | LOCATION | Custom Decks</title>` — i.e., a location-token merge field (`LOCATION`) that never got replaced with an actual city name. The elevated-deck-systems page also shows a literal placeholder H1 "New Title" and a form field labeled "Request Lorem Epsom" — template/CMS content that was never finished, live in production.

## 2. NAP (name, address, phone)

Sources: `https://www.newcustomdecks.com/`, `/contact`, `/about`, homepage JSON-LD.

- **Exact business name on-site: "Custom Decks"** (not a longer legal entity name anywhere on-site — footer, contact page, and schema all say "Custom Decks"). Note: BBB has a listing for a **different, unrelated company** called "Centennial Custom Decks, Inc." (see §7) — a name-collision risk in the category, not this business's legal name.
- **Address**: 7045 South Fulton Street, Centennial, CO 80112, US — **matches** the GBP data given exactly (suite "#240" appears in third-party listings like Angi/Yelp but is not spelled out on-site; site just says "7045 South Fulton Street").
- **Phone**: (720) 753-3160 on-site (homepage, contact, header click-to-call) — **matches** GBP phone.
- Other phone numbers surfaced in third-party search snippets but NOT confirmed on the primary site: a search summary referenced "720-343-7798" (via a review-aggregator mention) and a separate search referenced "(303) 351-3325" (via a NADRA/brand-locator style listing). These could not be verified against newcustomdecks.com directly and may be call-tracking numbers used by individual directories (common practice) rather than true NAP drift — flagging as **unconfirmed, needs manual check** rather than a confirmed inconsistency.
- **No second location** found anywhere on-site; `/contact` explicitly serves "Denver, CO and surrounding areas" from the single Centennial address.
- **Is 7045 S Fulton St #240 an office-suite/coworking address?** Could not confirm from site content alone (no building photo/description on-site). The "#240" suite number pattern is consistent with a multi-tenant office building, which is common for suburban Denver-area small businesses/contractors (not necessarily virtual office/coworking, but worth a manual Street View check — flagging as **unknown, needs manual verification**).
- Hours: Mon–Fri 9:00am–5:00pm, Sat–Sun closed (site + schema `openingHoursSpecification` agree).

## 3. Schema markup

Source: raw HTML of `https://www.newcustomdecks.com/` (2 `application/ld+json` blocks found).

**Block 1 — `WebSite`**:
```json
{"@context":"https://schema.org","@type":"WebSite","name":"Custom Decks","url":"https://www.newcustomdecks.com/"}
```

**Block 2 — `LocalBusiness`** (full, accurate, well-formed):
```json
{
  "@type": "LocalBusiness",
  "name": "Custom Decks",
  "address": {"@type":"PostalAddress","streetAddress":"7045 South Fulton Street","addressLocality":"Centennial","addressRegion":"CO","postalCode":"80112","addressCountry":"US"},
  "geo": {"@type":"GeoCoordinates","latitude":"39.589","longitude":"-104.87274"},
  "url": "https://www.newcustomdecks.com",
  "telephone": "(720) 753-3160",
  "logo": "https://a.mktgcdn.com/...400x400.jpg",
  "sameAs": ["https://facebook.com/1516942558528215","https://instagram.com/_custom_decks_"],
  "openingHoursSpecification": [{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday",...,"Friday"],"opens":"09:00","closes":"17:00"}],
  "@id": "https://www.newcustomdecks.com",
  "foundingDate": "1996",
  "description": "Custom Decks provides deck installation, residential decking, commercial decking, pergola building, and design and planning to the Denver, CO area.",
  "makesOffer": "[{\"name\":\"Residential Decking\"},{\"name\":\"Commercial Decking\"},{\"name\":\"Deck Installation\"},{\"name\":\"Patio Construction\"},{\"name\":\"3D Modeling\"},{\"name\":\"Design Services\"},{\"name\":\"Planning Services\"}]",
  "brand": "[{\"name\":\"Trex\"},{\"name\":\"DecKorators\"},{\"name\":\"TimberTech\"},{\"name\":\"Sundance\"}]"
}
```
- No `HomeAndConstructionBusiness` subtype used (plain `LocalBusiness`).
- No `Review` or `AggregateRating` schema anywhere checked (homepage, /reviews), **despite** a live reviews widget on the homepage (`<div id="recentReviewsWidget">`) — the widget appears to be a client-side JS component (likely loaded via the Hibu/Duda platform) that isn't reflected in static HTML, so its content/source platform (Google vs. internal) couldn't be read by static fetch. This is a missed schema opportunity on their end, not a strength.
- No `FAQPage` schema found on `/faqs` despite visible FAQ content on that page.
- `/gallery`, `/about`, `/contact`, `/decks/` (and the elevated-deck-systems category page) show no additional JSON-LD beyond what's global/sitewide.

## 4. Site structure

Source: `https://www.newcustomdecks.com/sitemap.xml`, nav crawl.

- **Platform**: built on Hibu's website product (CDN hosts: `hibuwebsites.com`, `mktgcdn.com`, `le-cdn.hibuwebsites.com`; markup classes `dmOnlyButton`, `unifiednav` indicate a Duda-based builder white-labeled by Hibu). This is a managed small-business marketing platform, not a custom-built site — consistent with the template-placeholder bugs noted in §1.
- **Total sitemap URLs: 56**
- **Service pages**: no distinct top-level "Services" section; instead ~41 service/category detail pages under `/category/` + related slugs: commercial, railings (aluminum, cable, glass, wood, wrought iron), elevated-deck-systems, patios-and-covers, pergolas, outdoor-living — covering composite/wood/PVC/floating decks, deck lighting, deck replacement/repair, outdoor kitchens, roof cover styles, etc.
- **City/location pages: 0.** No dedicated city/location landing pages found anywhere in the sitemap or nav (no `/denver`, `/centennial`, `/littleton`, etc.) — all geographic targeting is done via homepage/category copy mentioning "Denver, CO and surrounding areas," not dedicated pages.
- **Blog: none found.** No `/blog` path in sitemap or nav.
- **Portfolio/gallery**: single `/gallery` page (not per-project pages) with **97 project thumbnails total** — Decks (37), Pergolas (31), Patios & Outdoor Living (14 + 15 more under "View more"). Projects are **not** tagged by city/neighborhood — just category.
- Other pages: `/about`, `/contact`, `/team`, `/faqs`, `/warranties`, `/awards-recognition`, `/reviews`, `/finance`, `/request-estimate`.

## 5. Trust / proof signals

Sources: homepage, `/about`, `/awards-recognition`, `/faqs`.

- **Years in business**: founded 1996 ("nearly 30 years"), "over 150 years of combined team experience." (One third-party Angi-derived search snippet said "since 1991" — on-site content consistently says 1996; flagging the 1991 figure as unverified/third-party only.)
- **Customers served claim**: "Trusted by 2,000+ Colorado homeowners."
- **Warranty**: "10-year workmanship warranty" (stated repeatedly; dedicated `/warranties` page).
- **Financing**: dedicated `/finance` page/CTA.
- **Licenses/insurance**: **not stated anywhere** checked (home, about, FAQ, contact) — no license number, no insurance callout.
- **Certifications/badges** (from `/awards-recognition`): Trex Platinum Installer, TimberTech Platinum Installer, AZEK Platinum Installer, Fiberon Platinum Installer, NADRA member with multiple yearly awards (incl. 1st place Colorado showroom), Inc. 5000 list (5 years running), magazine features (Deck Builder Magazine, Deck Specialist Magazine, Remodeling 550, Merchant Magazine).
- **Reviews widget**: a `recentReviewsWidget` div is embedded on the homepage (JS-rendered, platform/content not readable via static fetch) plus multiple on-page CTA buttons linking to `/reviews`. The dedicated `/reviews` page itself shows no visible rating/count/snippets in static HTML (likely also JS-rendered) — so the on-site review proof is weaker/less crawlable than it could be, despite strong actual third-party numbers (see §7).
- **Awards language** ("A+ Rated & Nationally Recognized," "Award-Winning Projects") appears as marketing copy sitewide, reinforced by the concrete award list on `/awards-recognition`.

## 6. Conversion elements

Sources: homepage, `/contact`.

- **Phone in header with click-to-call**: yes — (720) 753-3160.
- **Quote/contact form**: yes, multiple "Request Estimate" CTAs sitewide + a dedicated `/request-estimate` page; `/contact` form fields = Name, Email, Phone (required), Message (optional).
- **Online booking/scheduling**: not found.
- **Live chat**: not found in static HTML (possible JS widget not visible to static fetch — unconfirmed either way).
- **SMS**: "Text START" opt-in CTA present on homepage.
- **Hours stated**: yes — Mon–Fri 9am–5pm, Sat/Sun closed (shown on-site and in schema).
- **Map embed**: yes, Google Map link present on `/contact`.

## 7. Third-party listings / citations (from WebSearch + spot WebFetch)

- **Angi**: profile at `7045 South Fulton Street Suite 240, Centennial, CO` — **4.8★, 34 reviews, 97% 5-star**. (Source: angi.com/companylist/us/co/centennial/custom-decks-reviews-1.htm, via search snippet.)
- **Yelp**: listing found at `https://www.yelp.com/biz/new-custom-decks-centennial` — SERP snippet titled "CUSTOM DECKS - Updated June 2026 - 7045 S Fulton St, Centennial, Colorado - Decks & Railing"; a search-result summary separately cited **1.5★ / 2 reviews** for this listing, but direct WebFetch of the Yelp page returned **HTTP 403** (bot-blocked) so the rating/review-count could not be independently confirmed — treat as **low-confidence, needs manual check**. Also note a **second, separate Yelp listing** exists: "Centennial Custom Decks – Centennial, CO" (`centennial-custom-decks-centennial-2`), which appears to be the distinct company below, not this business.
- **BBB**: the BBB listing surfaced by search ("Centennial Custom Decks, Inc.," 8151 E Briarwood Blvd, Centennial CO 80112, phone (720) 273-2527, A+ rating, Not Accredited, 0 reviews/0 complaints) is confirmed via direct WebFetch to be a **different company at a different address** — not newcustomdecks.com's entity. No BBB profile for "Custom Decks" at 7045 S Fulton St was identified. **This generic "Custom Decks" name causing a name-collision with an unrelated local competitor is itself a notable finding** (see §8).
- **HomeAdvisor/Angi-network**: profile exists at `homeadvisor.com/rated.CustomDecksInc.139209435.html` (confirmed to exist via search listing titled "Custom Decks") — direct WebFetch returned **403 Forbidden**, so rating/review count unverified; marked **unknown — page didn't load**.
- **GuildQuality**: profile exists at `guildquality.com/pro/custom-decks`, listed as "Custom Decks - Centennial, CO 80112-399" — direct WebFetch returned **503 Service Unavailable**; content unverified, marked **unknown — page didn't load**.
- **Houzz**: a Centennial-area Houzz directory page surfaced ("Best 15 Deck Builders & Contractors in Centennial, CO") that likely lists this business among others, but no business-specific Houzz profile URL was isolated within the search budget; **unknown — not confirmed**.
- **NADRA**: confirmed via on-site `/awards-recognition` content and corroborated by search results — NADRA member, multiple NADRA Deck Competition wins.
- **Facebook**: `facebook.com/1516942558528215` (from site schema `sameAs`) — URL returns HTTP 301 (redirects, likely to a canonical FB page URL); content/follower count/activity not checked (out of scope for static fetch).
- **Instagram**: `instagram.com/_custom_decks_` (from site schema `sameAs`) — returns HTTP 200; content/follower count/activity not checked.
- **Nextdoor, Thumbtack, Porch, Expertise.com, Trex/TimberTech/Deckorators "find a pro" locator pages, chamber of commerce**: not confirmed within the 3-WebSearch budget for this audit — **unknown, not checked**. (Search snippets did surface generic Thumbtack/Denver-deck-builder directory pages, but not a business-specific Custom Decks profile on Thumbtack.)

## 8. Other notable findings

- **Generic/collision-prone business name**: "Custom Decks" is a highly generic category-descriptive name. This audit found at least one confirmed **unrelated competitor with a confusingly similar name** — "Centennial Custom Decks, Inc." at a different Centennial address (8151 E Briarwood Blvd) with its own BBB A+ profile — plus a second, separate Yelp listing under a similar name. This is a double-edged sign: it can create citation/review confusion (reviews or citations for the wrong "Custom Decks" diluting or occasionally crediting the wrong business), but the exact-match keyword name ("Custom Decks") likely also provides a modest on-SERP relevance boost for generic "deck builder"/"custom deck" queries — the name itself functions as a sitewide keyword signal, which is a known (if unofficial) local-ranking lever.
- **Domain age**: `newcustomdecks.com` registered **2017-06-29** (via WHOIS, GoDaddy registrar) — about 9 years old as of this audit, not a brand-new domain. The "new" in the domain name suggests this replaced an older `customdecks.com` domain at some point (not independently confirmed what happened to that domain).
- **Platform/vendor**: entire site runs on Hibu's managed website platform (Duda-based, per CSS class naming and CDN hostnames `hibuwebsites.com`/`mktgcdn.com`). This explains both the strong-but-generic schema markup (likely a platform default/template, not custom SEO work) and the sloppy template leaks (placeholder "LOCATION" token in title tags, placeholder "New Title" H1, "Request Lorem Epsom" form label on the elevated-deck-systems category page) — i.e., this business is very unlikely to be doing bespoke SEO work; its ranking strength is almost certainly driven by GBP/citation signals and tenure rather than content strategy.
- **robots.txt**: permissive — `User-agent: *` with no disallow rules, plus an explicit `Content-Signal: search=yes, ai-input=yes, ai-train=yes` directive (an emerging AI-crawler-permission signal), and a sitemap reference. Nothing blocking indexation.
- **No HomeAndConstructionBusiness schema subtype, no Review/AggregateRating schema, no FAQPage schema** — all missed structured-data opportunities that Haka could use as a technical-SEO differentiator without needing to match their review/tenure signals.
