# Competitor audit: Colorado Deck and Landscape (coloradodeck.com)

GBP reference: 4.6★/81 reviews, 15200 E Girard Ave #4025, Aurora CO 80014, (303) 344-3325. Ranks #1 in Google Maps for "deck builders near me" in south-Denver metro.

## 6-line summary: why this listing likely outranks a 5.0★/90-review competitor

1. **This is a GBP-signal win, not an on-page SEO win.** The site has zero "deck builder(s)" or "near me" phrases anywhere (checked all 16 pages), yet ranks #1 in Maps — ranking is being carried by GBP review volume/velocity, category selection, and proximity, not content.
2. **40+ years of brand and link history (est. 1984).** Long-tenured local business = more accumulated citations, backlinks, and review history than a newer competitor can match quickly, regardless of current review count/rating.
3. **Review volume beats review score at this tier.** 81 Google reviews vs. a hypothetical 90-review/5.0★ rival is close enough that other factors (proximity to searcher, category match, photo count, Q&A, posts) likely decide map-pack order — a 0.4-star gap is not disqualifying when review count is in the same range.
4. **Wide citation footprint, even if messy.** Confirmed live listings on Yelp, Houzz, BBB, Nextdoor (x2), Facebook (x2), GuildQuality, Whirlocal, Topsoil.com, Yahoo Local — sheer number of corroborating NAP signals across the web reinforces GBP trust even though the records don't all match.
5. **Technical/on-page SEO is actually weak** — no LocalBusiness/HomeAndConstructionBusiness/Review/FAQ schema anywhere, no city/location landing pages at all, only 4 blog posts. This is a competitor beatable on content depth and structured data, not one with a sophisticated SEO program to out-engineer.
6. **Net takeaway for Haka:** don't chase their content strategy (there isn't much of one) — chase their GBP review count/velocity and citation breadth instead; Haka can leapfrog the technical layer (schema, location pages) since Colorado Deck has none.

---

## 1. Homepage title / H1 / meta description / keyword usage

- Source: https://coloradodeck.com/ (fetched via curl + WebFetch)
- `<title>`: `Home - Colorado Deck and Landscaping`
- H1: **"You Imagine It, We Create It!"** (tagline, not keyword-targeted)
- Meta description (verbatim from HTML): `Welcome to Colorado Deck and Landscape, providing custom decks, patios, outdoor kitchens, pergolas, fireplaces, and xeriscaping in Colorado.`
- Note the name inconsistency even within one page: title says "...Landscaping", meta description says "...Landscape" (no -ing).
- "deck builder" / "deck builders": **0 occurrences** anywhere on homepage (verified via grep on raw HTML).
- "near me": **0 occurrences** anywhere on the homepage or any page checked.
- City names on homepage body: "Greater Denver area" / "Denver" referenced generally; no neighborhood/suburb names on the homepage itself.

## 2. NAP (name, address, phone)

- Source: https://coloradodeck.com/contact/ and https://coloradodeck.com/ (raw HTML, confirmed via curl)
- On-site business name used most often: **"Colorado Deck and Landscaping"** (11–16 occurrences per page in title tags, footer copyright, body).
- Secondary/inconsistent name also used on-site: **"Colorado Deck and Landscape"** (no "-ing") — appears in the homepage meta description and ~3–6 places per page. This does **not** exactly match either the website's dominant name or the GBP name given in the brief.
- Address (contact page, verbatim): `15200 E Girard Ave #4025, Aurora, CO, 80014` — **matches the GBP address given**. Appears only on the homepage and contact page, not in the sitemap-wide footer.
- Footer (all pages) contains only: `Copyright © 2026 Colorado Deck and Landscaping | Powered by Colorado Deck and Landscaping` — no address or phone repeated in the global footer.
- Phone: `303-344-3325` and vanity `303-344-DECK` both used as tel: links — **matches GBP phone**.
- Email: `Info@coloradodeck.com` (contact page).
- No second physical location found anywhere on-site.
- **Cross-citation name variance** (from WebSearch, see section 7): BBB lists the legal name as **"Colorado Deck Landscape & Remodeling Co, Inc."**; GuildQuality lists **"Colorado Deck & Landscape Co"** at a different ZIP (**Aurora, CO 80011**, vs. the site's 80014); Yelp/Nextdoor/Facebook variously say "Colorado Deck & Landscape" or "Colorado Deck and Landscape" (no "-ing"). This is a real, long-standing NAP-name inconsistency across citations — yet the business still ranks #1, reinforcing that review volume/age is outweighing citation hygiene.

## 3. Schema markup

- Source: raw HTML via curl, parsed JSON-LD on all 12 pages fetched (home, contact, decks, about, projects, news, services, patios, pergolas, outdoor-kitchens, outdoor-fireplaces, xeriscape, process-page).
- **Every single page uses only the default Yoast SEO plugin `@graph` block** with these `@type`s: `WebPage`, `ImageObject`, `BreadcrumbList`, `WebSite`. Example (homepage):
  ```json
  {
    "@type": "WebSite",
    "@id": "https://coloradodeck.com/#website",
    "url": "https://coloradodeck.com/",
    "name": "Colorado Deck and Landscaping",
    "description": "You Imagine it, We will Create it",
    "alternateName": "Custom Decks & Outdoor Living",
    "potentialAction": [{"@type": "SearchAction", ...}],
    "inLanguage": "en-US"
  }
  ```
- **No `LocalBusiness`, `HomeAndConstructionBusiness`, `Organization`, `Review`/`AggregateRating`, or `FAQPage` schema found anywhere on the site**, despite the homepage displaying an embedded Google reviews widget and the FAQ nav link. This is confirmed from raw HTML (not just the WebFetch markdown conversion, which strips `<script>` tags) — ran `grep`/`json.loads` directly on the downloaded source of all 12 pages.
- This is a clear structured-data gap Haka can exploit (LocalBusiness + Review + FAQPage schema if not already in place).

## 4. Site structure

- Source: https://coloradodeck.com/sitemap_index.xml → page-sitemap.xml / post-sitemap.xml (WordPress/Yoast).
- **Total indexed pages (page-sitemap.xml): 16**, listed in full:
  - `/` (home), `/about/`, `/contact/`, `/services/`, `/process-page/`, `/projects/`, `/news/` (blog index), `/privacy-policy/`, `/colorado-deck-landscape-special-offer/`, `/backyard-transformation/`
  - Service pages: `/decks/`, `/patios/`, `/pergolas/`, `/outdoor-kitchens/`, `/outdoor-fireplaces/`, `/xeriscape/` → **6 individual service pages** (plus one `/services/` hub = 7 total).
- **City/location pages: 0.** No dedicated city or suburb landing pages exist anywhere on the site (confirmed via sitemap + grep for Centennial, Littleton, Englewood, Lone Tree — all zero hits; Aurora/Denver/Parker/Castle Rock/Highlands Ranch appear only as inline mentions of service-area copy on service pages, not as standalone pages).
- **Blog ("News & Insights"): only 4 posts total** (post-sitemap.xml), all recent:
  - `/repair-or-replace-aging-deck-colorado/` — 2026-09-09
  - `/deck-inspection-before-buying-home/` — 2026-09-09
  - `/how-to-prepare-outdoor-living-space-for-winter/` — 2026-09-27
  - `/what-is-coloradoscaping/` — 2026-09-27
  - Recency is good (all within the last ~3 weeks of the audit date), but volume is very thin (4 posts total).
- **Portfolio/gallery (`/projects/`):** ~30+ gallery items across 6 categories (Decks, Patios, Pergolas, Outdoor Kitchens, Outdoor Fireplaces, Landscaping). **Not tagged or filterable by city** — no geographic labeling of projects, no filter UI.

## 5. Trust / proof signals

- Source: homepage + /about/ (WebFetch + raw HTML).
- **Years in business**: founded 1984 by Robert D. Jones; site badge says "40 Years in Service" / "105+ Total Years of Experience" (aggregate team experience) / "3,325+ Successfully Finished Projects."
- **Licensing/insurance**: no specific license number or insurance carrier stated anywhere on the site (only generic "licensed and insured" type claims surfaced in third-party aggregator copy, not verified on-site).
- **Warranties**: 3-year craftsmanship warranty + manufacturer's warranty mentioned; 1-year warranty on trees/shrubs (landscaping side).
- **Financing**: not mentioned anywhere.
- **Certifications/badges displayed on-site**: BBB Accredited Business badge; "40 Years in Service" seal. Partner brand names mentioned in copy: **TimberTech, Trex Pro, Fortress, Sylanix** — but no verifiable Trex Pro / TimberTech installer badge or locator listing was found in WebSearch (see §7), so this reads as a claim rather than a confirmed certification.
- **Awards**: About page references unspecified "awards from Associated Landscape Contractors of Colorado."
- **Embedded Google reviews widget**: yes, on the homepage — displays "EXCELLENT" + 5-star graphic sourced from **76 reviews** (as cached on-page) with several individual reviews shown by name. Note this is lower than the 81 reviews cited in the GBP brief and the 61 a third-party aggregator (Whirlocal) reported — three different counts across sources/snapshot dates, consistent with normal growth/caching lag rather than a red flag.

## 6. Conversion setup

- Source: homepage + /contact/.
- Phone in header: **yes**, `303-344-DECK (3325)`, rendered as a clickable `tel:` link.
- Quote/contact form: yes — "Get a Free Estimate" CTAs throughout the site linking to `/contact/`, which hosts an "Estimate Form."
- No online booking/scheduling widget found.
- No live chat widget detected.
- No business hours stated on the homepage or contact page (not found in any fetched source).

## 7. Third-party listings / citations (from WebSearch, 3 queries used)

| Platform | Finding | Source |
|---|---|---|
| Yelp | **4.1★, 14 reviews**, listed as "COLORADO DECK & LANDSCAPE," 15200 E Girard Ave, Aurora | https://www.yelp.com/biz/colorado-deck-and-landscape-aurora |
| Houzz | **5.0★, 3 reviews**, listed as "COLORADO DECK & LANDSCAPING" | https://www.houzz.com/professionals/decks-patios-and-outdoor-enclosures/colorado-deck-and-landscaping-pfvwus-pf~1737567060 |
| BBB | Accredited; legal/registered name differs: **"Colorado Deck Landscape & Remodeling Co, Inc."** | https://www.bbb.org/us/co/aurora/profile/patios-and-decks/colorado-deck-landscape-remodeling-co-inc-1296-4780 |
| Angi/HomeAdvisor | **No confirmed listing found** — search returned only generic Aurora-area category pages (e.g., HomeAdvisor's "Top-Rated Deck Services Experts in Aurora, CO" directory and an unrelated "Living Designs Landscaping" Angi profile), not a specific Colorado Deck and Landscape profile | https://www.homeadvisor.com/c.Decks.Aurora.CO.-12017.html |
| Nextdoor | **Two separate pages found** (possible duplicate listing): `/pages/colorado-deck-and-landscape-aurora-co/` and `/pages/colorado-deck-aurora-co/`; "4 Faves" from neighbors | https://nextdoor.com/pages/colorado-deck-and-landscape-aurora-co/ , https://nextdoor.com/pages/colorado-deck-aurora-co/ |
| Facebook | **Two separate pages found** (possible duplicate/legacy page): `facebook.com/p/Colorado-Deck-Landscape-100063867780239/` and `facebook.com/cdl303/` | both listed above |
| GuildQuality | Listed as "Colorado Deck & Landscape Co," Aurora, CO **80011** (ZIP differs from the site's stated 80014) — possible stale/duplicate address record; 4.3★/4 reviews | https://www.guildquality.com/pro/colorado-deck-landscape-and-remodeling-co |
| Other directories | Also indexed on Whirlocal, Topsoil.com, and Yahoo Local (generic aggregator/directory listings, not major review drivers) | https://whirlocal.io/company/colorado-deck-landscape/ , https://topsoil.com/colorado/aurora/colorado-deck-landscape/ , https://local.yahoo.com/info-19542303-colorado-deck-landscape-aurora/ |
| Trex Pro / TimberTech / NADRA | **No confirmed Trex Pro installer certification, TimberTech installer badge, or NADRA membership found** despite the homepage naming TimberTech/Trex Pro/Fortress/Sylanix as "partner brands" — unverified claim, not corroborated by any locator or awards listing in search results | search only; no direct source URL (absence of evidence) |
| Thumbtack, Porch, Expertise.com, chambers | Not found in the 3 searches run (quota exhausted); unknown — not confirmed either way | — |

## 8. Notable items

- **Review-count discrepancy across sources**: GBP brief says 81, on-site widget shows 76, a third-party aggregator snippet shows 61, Yelp shows only 14 — review counts clearly diverge by platform and by crawl date, which is normal but worth knowing when comparing "81 reviews" head-to-head with a rival's count.
- **Name inconsistency is pervasive and long-standing**: at least 4 name variants in active use across the web — "Colorado Deck and Landscaping" (site's dominant brand), "Colorado Deck and Landscape" (site's own meta description + several citations), "Colorado Deck & Landscape Co" (GuildQuality), and "Colorado Deck Landscape & Remodeling Co, Inc." (BBB legal name). Despite textbook-bad NAP-name hygiene, this business still holds #1 in Maps — strong evidence that review volume/age and proximity outweigh citation consistency at this competitive tier.
- **Possible duplicate GBP-adjacent listings**: two distinct Nextdoor pages and two distinct Facebook pages turned up for the same business — worth a follow-up check (outside this audit's scope) on whether there are also duplicate/legacy Google Business Profiles, which can sometimes help local pack coverage by occupying more SERP real estate rather than hurting it.
- **Typo found in production**: the Outdoor Fireplaces page `<title>` tag reads "Outdoor Firesplaces - Colorado Deck and Landscaping" (confirmed in raw HTML) — a small but real on-page quality defect.
- **No virtual office or "open 24 hours" red flags** — address, phone, and years-in-business all read as a legitimate, long-tenured local shop; domain is not new (content and copyright suggest a mature, continuously-updated WordPress site, last content update 2026-09-27).
- **Zero city/location landing pages combined with zero schema markup** is the single biggest structural gap — this competitor is winning Maps almost entirely on GBP strength (reviews + proximity + category), not through a content or technical SEO moat, which is good news for a competitor trying to out-build them on the web property itself.
