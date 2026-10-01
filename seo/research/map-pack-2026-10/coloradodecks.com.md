# Competitor Audit: Mosaic Outdoor Living / Colorado Custom Decks (coloradodecks.com)

## Summary — why this 4.9★/91-review listing likely outranks a comparable competitor 1 mile away

1. **27-year-old exact-match domain** (coloradodecks.com registered 1998-12-17) + a real, ADA-noted physical showroom at the GBP address — both are rare, hard-to-replicate trust signals Google's local algorithm weights heavily.
2. **40 years in business (since 1985)**, a large named team (~25 staff bios on /about-us/), and real press coverage (Denver Gazette "Best of the Springs," Fox21 "Best of the Best," DIY Network's "Mega Decks" show) — strong E-E-A-T signals even though none of it is marked up in schema.
3. On-page SEO is mediocre, not exceptional: **no H1 tag exists on any page we checked except the homepage** (location/about/contact pages use H2 for the primary heading), meta descriptions on location pages are a copy-pasted template with only the city name swapped, and there are **no individual service pages** (one consolidated "Features" page covers everything) — so they are not winning on page-level optimization.
4. They compensate with **volume and localization of secondary content**: 9 dedicated city/location pages each carrying unique, city-specific FAQPage schema (permits/HOA questions worded per city), and a portfolio page filterable by the same 9 cities.
5. **Citation profile is large but inconsistent**, a side effect of a messy rebrand (Colorado Custom Decks → Mosaic Outdoor Living, three separate showroom entities/GBPs in Englewood, Louisville, and Colorado Springs each with their own Yelp listing and rating). This should be a liability, yet the Englewood GBP alone still shows 4.9★/91 reviews — reinforcing that review volume + proximity + domain/business age are outweighing citation hygiene here.
6. **No LocalBusiness/HomeAndConstructionBusiness/Review schema anywhere checked** (only generic Organization + WebSite + per-city FAQPage) and no stated licensing/insurance/warranty/financing copy on-site — so the ranking edge is coming almost entirely from off-page/GBP signals (reviews, age, citations, physical location), not from on-page technical SEO.

---

## 1. Homepage title / H1 / meta description / keyword usage
Source: https://coloradodecks.com/ (fetched via curl, raw HTML)

- `<title>`: "Deck & Patio Builder in Englewood, Louisville & Colorado Springs"
- H1 (confirmed present, `<h1 class="hh1">`): "40 years creating Life-Changing Outdoor Living Spaces"
- Meta description: "Colorado Custom Decks & Mosaic Outdoor Living specializes in every facet of Outdoor Living. Visit one of our showrooms in Englewood, Louisville & Colorado Springs CO."
- Body copy uses "deck builder" / "patio builder" repeatedly and names cities explicitly (Colorado Springs, Englewood, Louisville, Monument, Castle Rock, Castle Pines, Larkspur, Franktown, Sedalia, plus Fort Collins/Boulder mentioned as broader service area). **No "near me" phrasing detected anywhere.**

## 2. NAP / showroom
Sources: footer (sitewide, confirmed in homepage.html, englewood.html, about.html, contact.html) + https://coloradodecks.com/showrooms/

- Exact business name in schema/footer: **"Mosaic Outdoor Living"** (Organization schema `name`), but title tags and footer still carry the legacy name **"Colorado Custom Decks & Mosaic Outdoor Living"** — two names used inconsistently across the site.
- Footer NAP (identical on every page checked): `14 Inverness Drive E. Suite B-112, Englewood, CO 80112` (linked to a Google Maps short link) and click-to-call `tel:1-303-790-9090` — **matches the GBP address/phone given in the brief exactly.**
- This is a **real, three-location physical showroom business**, not just a storefront-style GBP listing:
  - Englewood: 14 Inverness Dr E Ste B-112, Englewood, CO 80112 — 303-790-9090 — Mon–Fri 9am–5pm
  - Louisville: 133D McCaslin Blvd Unit D, Louisville, CO 80027 — 303-926-9292 — Mon–Fri 9am–5pm
  - Colorado Springs: 3255 Austin Bluffs Pkwy, Colorado Springs, CO 80918 — 719-573-6000 — Mon–Fri 9am–5pm
- Each showroom lists its own service-area list (Englewood's covers Littleton, Lone Tree, Lakewood, Aurora, Centennial, Highlands Ranch, Castle Pines, Parker + 13 more communities) — this directly explains the wheelchair-accessible, storefront-style GBP attribute the brief mentioned.

## 3. Schema markup (verified directly in raw HTML, not just a page summary)
Sources: homepage, /englewood-deck-builder/, /castle-rock-deck-builder/, /about-us/, /schedule-a-consultation/

- **Homepage**: two JSON-LD blocks —
  - `@type: WebSite` — name/alternateName/url only, empty description.
  - `@type: Organization` — `name: "Mosaic Outdoor Living"`, `url`, `logo`, `sameAs` (Facebook, Pinterest, Instagram, YouTube), `contactPoint: [{"@type":"ContactPoint","telephone":"303-790-9090","contactType":"customer support"}]`. **No `address`, no `geo`, no `aggregateRating`/`review`.**
- **Location pages** (Englewood, Castle Rock — checked both): single JSON-LD block, `@type: FAQPage`, with 4 city-specific Q&As each (e.g., Englewood asks about decking material/permits/small-backyard design; Castle Rock asks about HOA approval). No LocalBusiness schema, no address/geo on these pages either.
- **About-us and Schedule-a-Consultation pages**: zero JSON-LD blocks found.
- **Net finding**: despite being a real multi-location business with ~90-120 reviews per location, **there is no LocalBusiness, HomeAndConstructionBusiness, Review, or AggregateRating schema anywhere on the site.** This is a genuine, fixable on-page gap — and a useful one to highlight since Haka can out-execute here without needing to match their review count or domain age.

## 4. Site structure
Source: https://coloradodecks.com/page-sitemap1.xml and /post-sitemap1.xml

- **Service pages**: none, individually. There is one consolidated `/features/` page ("Features" title tag: "Features | Deck & Patio Builder in Englewood, Louisville & Colorado Springs CO | Mosaic Outdoor Living") covering deck building, patio construction, and outdoor living broadly, plus a separate `/mega-decks/` page tied to their DIY Network show appearance. No dedicated pergola/patio-cover/deck-repair/railing pages the way Haka structures its services.
- **City/location pages**: 9 total — `/englewood-deck-builder/`, `/louisville-deck-builder/`, `/colorado-springs-deck-builder/`, `/castle-rock-deck-builder/`, `/castle-pines-deck-builder/`, `/monument-deck-builder/`, `/larkspur-deck-builder/`, `/franktown-deck-builder/`, `/sedalia-deck-builder/`. All follow the same H2-headline / templated-meta-description / unique-FAQPage-schema pattern.
- **Blog**: 23 posts in the post-sitemap, dated 2025-03-27 through 2026-09-02 (most recent is ~1 month before this audit, so actively maintained but not high-frequency — roughly one post every 3–5 weeks). Content style is almost entirely storytelling/project-spotlight (e.g., "Behold! The deck built around a 3500-pound pizza oven," "How a 30-Year-Old Tree Became the Centerpiece...") rather than keyword/cost-guide SEO articles — closer to a PR/engagement blog than a search-intent blog.
- **Portfolio/gallery**: `/portfolios/` page with a filter widget (`filter li`) tagged by the same 9 cities (Englewood ×11 mentions, Colorado Springs ×11, Louisville ×8, Castle Rock/Castle Pines ×2 each, Monument/Larkspur/Franktown/Sedalia ×1 each in the filter+grid markup) — i.e., projects are browsable per city, reinforcing local relevance signals. There's also a separate `/video-gallery/` and `/idea-book/` page.

## 5. Trust / proof signals
Sources: /about-us/, /showrooms/, homepage

- **Years in business**: "40 years creating Life-Changing Outdoor Living Spaces" (homepage H1); about page states founded 1985 (BBB listing separately states "37 years," suggesting slightly inconsistent founding-year messaging across properties).
- **Team**: ~25 named staff with titles on /about-us/ (owner/designer, regional manager, several senior project managers, CAD designer, carpenters, laborers) — unusually deep team transparency for a residential deck builder.
- **Awards/media** (per page content, not independently re-verified beyond the About page's "Awards & Media Coverage" section which does render a carousel of press logos/links): DIY Network "Mega Decks" (3 seasons), "Best of the Springs" (Denver Gazette), "Best of the Best" (Fox21), "Deck Specialists of the Year" (Deck Specialist magazine), plus a HelloNation guest-expert placement.
- **Houzz**: linked professional profile (`houzz.com/professionals/.../mosaic-outdoor-living-and-landscapes-pfvwus-pf~755283493`) appears in both homepage and about-page footers/links — this is a profile link, not an embedded award badge.
- **Explicitly NOT found anywhere on-site** (checked homepage, about, englewood, contact, castle-rock pages): the words "licensed," "insured," "BBB," "NADRA," "Trex Pro," "TimberTech," "Deckorators," "Fiberon," "warranty," or "financing." For a company that visibly installs Trex/TimberTech product (confirmed via third-party sources, see §7) and has operated since 1985, this is a real on-page trust-signal gap.
- No embedded Google-reviews widget or third-party review-aggregator widget (e.g., Elfsight/Trustindex) detected in the HTML of any page checked — testimonials appear to be hand-placed copy/quotes rather than a live review feed.

## 6. Conversion elements
Sources: homepage, /schedule-a-consultation/

- Phone numbers are click-to-call (`tel:` links) in the header/footer on every page, and all three showroom numbers (Englewood 303-790-9090, Louisville 303-926-9292, Colorado Springs 719-573-6000) appear together on most pages.
- Primary CTA is "Schedule a Consultation," which leads to a Gravity Forms quote form asking First Name, Last Name, Street Address, City, Zip (and presumably project details below the fold) — a fairly high-intent, detailed intake form.
- Hours are stated per-showroom on /showrooms/ (Mon–Fri 9am–5pm for all three) but not repeated site-wide in the footer.
- No live chat widget, no online booking/scheduling calendar (no Calendly/Acuity-style embed) detected in the raw HTML.

## 7. Third-party listings / citations (via WebSearch, 3 queries used)
- **Yelp**: multiple separate listings per location — Englewood listing ("MOSAIC OUTDOOR LIVING," 14 Inverness Dr E, 157 photos) reported at 4.5★/8 reviews; a separate Colorado Springs listing ("COLORADO CUSTOM DECKS & MOSAIC OUTDOOR LIVING," 3255 Austin Bluffs Pkwy, 186 photos/12 reviews) reported in the 2.5–2.8★ range in different search snippets. **Ratings are inconsistent across their own Yelp listings** — a genuine weak point.
- **BBB**: "Colorado Custom Decks" has at least one profile (Colorado Springs) that is explicitly **NOT accredited / "Not Rated"** per search snippets, plus a separate Englewood BBB profile under the same name. No BBB accreditation badge, consistent with none appearing on-site.
- **Angi**: a "Colorado Custom Decks Inc" profile exists for Englewood; one search snippet cites an overall rating around 3.8/5.
- **Porch**: profile under "Colorado Custom Decks & Mosaic Outdoor Living" (Colorado Springs) reporting 4.64★ across 90 online reviews — this number is suspiciously close to the GBP's "91 reviews," suggesting Porch may be aggregating/mirroring the Google review count rather than hosting independent reviews.
- **Houzz**: active professional profile with project photos/reviews (linked directly from their own site).
- **Facebook**: facebook.com/ColoradoDecks/ — official page (linked in Organization schema's `sameAs`); one snippet cites "90% recommend (41 reviews)."
- **Other social**: Pinterest (pinterest.com/coloradodecks), Instagram (instagram.com/mosaicoutdoorliving), YouTube (@MosaicCCD) — all listed in the homepage's Organization schema `sameAs`.
- **NADRA**: no evidence found connecting Mosaic Outdoor Living / Colorado Custom Decks to NADRA membership or certification. (NADRA mentions in search results referred to an unrelated Denver-area contractor, not this business — do not conflate.)
- **Trex/TimberTech installer locators**: not independently confirmed via locator pages in this audit (not searched directly — budget was spent on review-site citations instead); on-site copy does reference composite decking generally, and one unrelated search snippet mentions a Trex deck project, but no Trex "Pro" or TimberTech "Platinum/Gold" badge was found on their own site.
- **No evidence found** (absence noted per instructions, not guessed) for: Thumbtack profile, HomeAdvisor-specific profile separate from Angi, Expertise.com listing, chamber-of-commerce listing, or Nextdoor business page — none surfaced in the three searches run; a dedicated search for each would be needed to confirm presence/absence definitively.

## 8. Other notable findings
- **Domain age**: coloradodecks.com was registered **1998-12-17** (WHOIS) — a 27-year-old exact-match keyword domain. This is an unusually strong, hard-to-replicate domain authority signal.
- **Multiple business identities / multiple likely GBPs**: the business operates three showrooms (Englewood, Louisville, Colorado Springs) under overlapping names — "Colorado Custom Decks," "Mosaic Outdoor Living," "Mosaic Outdoor Living & Landscapes," "Colorado Custom Decks & Mosaic Outdoor Living" — each location appears to have its own Yelp (and likely its own Google Business Profile), which is consistent with a legacy rebrand that was never fully consolidated. This is a citation-consistency weakness Haka could point to, even though it doesn't appear to be hurting the Englewood listing's local-pack rank today.
- **Real physical showroom** (not a UPS-Store-style virtual office) is the most defensible explanation for GBP's wheelchair-accessible attribute and storefront-style listing — this is not easily replicable without Haka also opening a public showroom.
- **On-page SEO is genuinely beatable**: missing H1s on every non-home page, no individual service pages, templated/duplicate meta descriptions across all 9 city pages, and zero LocalBusiness/Review schema sitewide are concrete, verifiable gaps — the ranking advantage here is coming from off-page age/reviews/physical-presence signals, not from superior on-page execution.
