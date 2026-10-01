# Denver Deck Builders (denverdeckbuilder.com) — Local SEO / GBP Audit
Audited 2026-10-01. Method: curl + WebFetch on live pages (no browser), 3 WebSearch calls.

## 6-LINE SUMMARY
1. One entity, "Denver Deck Builders LLC" (Gibas family, BBB-registered in Parker, CO), publishes LocalBusiness (`GeneralContractor`) schema declaring **four** distinct street addresses — Centennial, Parker, Castle Rock, and Littleton/McArthur Dr — not just the three GBPs named in the brief; a Castle Rock listing (2616 Gray Wolf Point) may be an undiscovered 4th duplicate.
2. The real GBP phone **(720) 284-1439** appears ONLY inside hidden JSON-LD on every page and is never shown to visitors; the visible, clickable number site-wide is a different number, **(720) 605-2946** (call-tracking).
3. Every one of the four schema addresses declares identical hours — `opens 00:00 / closes 23:59` on all seven days, i.e. literally 24/7 — matching the GBPs' "Open 24 hours," which is implausible for a residential deck contractor.
4. Two of the three flagged addresses are confirmably **not** legitimate offices: 11915 Bell Cross Way, Parker is a private single-family home (6 bed/7 bath, sold $990K in 2018, 3.2 acres); 9300 E Mineral Ave, Centennial is "The Glenn," an apartment building with small ground-floor retail — not contractor office space.
5. The five human-facing "location" pages (Centennial, Parker, Castle Pines, Castle Rock, Littleton) display **zero address text** to visitors and read as generic service-area landers — the precise address/geo/Google Place ID only exists in invisible per-page schema, strongly suggesting the NAP is built for crawlers/Google, not customers.
6. Aside from the address scheme, the site is a mature, well-built local-SEO program (123 blog posts since 2022, 9 service pages, 5 city pages, 107-photo gallery, 9 named team members, Trex Platinum/TimberTech/Deckorators/BBB A+ claims) — the multi-location tactic is layered on top of a real, otherwise-legitimate single business.

---

## 1. Homepage basics
Source: https://www.denverdeckbuilder.com/
- `<title>`: "Denver Deck Builders | Custom Composite Deck Contractors"
- Meta description: "Looking for the best deck builders in Denver? We specialize in custom composite decks, pergolas, and outdoor living spaces. Serving the metro since 2000."
- H1: "Denver Custom Deck Builders"
- Body copy uses "deck builder(s)" heavily and leans on city names (Parker, Castle Rock, Centennial, Littleton, Castle Pines, Highlands Ranch, Lone Tree, Greenwood Village, Aurora, Englewood, Lakewood, Arvada, Westminster, Denver) rather than literal "near me" phrasing (no "near me" string found in visible copy).

## 2. NAP (name, addresses, phone, hours)
Legal/display name across site: **"Denver Deck Builders"**; BBB profile name: **"Denver Deck Builders LLC"** (https://www.bbb.org/us/co/parker/profile/deck-builder/denver-deck-builders-llc-1296-90169019).

**Visible, on-page phone (every page, header/footer/CTAs):** (720) 605-2946 — tel:7206052946. This number appears 5–9x per page across every page checked (home, about, get-quote, reviews, all 5 city pages).

**Schema-only phone (never shown to a human visitor, found only inside `<script type="application/ld+json">`):** +1 (720) 284-1439 — exactly the number the task identifies as shared across all three Google Business Profiles. Confirmed via raw-HTML diff: stripping all `<script>` tags removes every occurrence of "2841439" but "6052946" remains — i.e. 284-1439 literally never appears in visible content, only in structured data meant for Google/crawlers.

**Addresses declared in per-page JSON-LD `PostalAddress` (one per page, each paired with its own `GeoCoordinates` and Google Maps `hasMap` Place ID):**

| Page | Street address (schema) | City/zip (schema) | Matches task's GBP? | Place ID in `hasMap` |
|---|---|---|---|---|
| Homepage | 11915 Bell Cross Way | Parker, CO 80138 | = GBP (b) Parker | ChIJRXwUrCr4bIcR6mVMAw0WjiI |
| /parker-deck-builders/ | 11915 Bell Cross Way | Parker, CO 80138 | = GBP (b) Parker | ChIJRXwUrCr4bIcR6mVMAw0WjiI |
| /centennial-deck-builders/ | 9300 East Mineral Avenue | Centennial, CO 80112 | = GBP (a) Centennial | ChIJPdY7PFiFbIcRstku85kb6xs |
| /littleton-deck-builders/ | 1054 McArthur Drive | Littleton, CO 80124 | ≈ GBP (c) "1054 McArthur Dr (Highlands Ranch/Castle Pines area)" — note the site tags this address to its **Littleton** page, not a Castle Pines or Highlands Ranch page | ChIJaSC3Yfsn6AwR8DqsV9S_qT4 |
| /castle-rock-deck-builders/ | 2616 Gray Wolf Point | Castle Rock, CO 80104 | **Not in the task's list of 3** — a 4th address/possible undiscovered duplicate GBP, same phone/hours pattern | ChIJN01H56K9bIcRJsOcb3CABd8 |
| /castle-pines-deck-builders/ | (none) | — | n/a | n/a — **this page has no LocalBusiness JSON-LD at all** (confirmed by direct grep of raw HTML; page returns HTTP 200, so it's not a fetch error) |

So the GBP (c) address "1054 McArthur Dr" is real and matches the site's schema — but the site locates it under the **Littleton** URL/page, while the task describes the GBP itself as being in the "Highlands Ranch/Castle Pines area" (zip 80124 is in fact a Highlands Ranch-area zip code, not Littleton proper — "Littleton" is a common USPS mailing-city label for that zip). The site's own Castle Pines page carries no address/schema at all, so there is a mismatch between which page "owns" which of the real addresses.

**Hours:** Every page that has schema declares identical `openingHoursSpecification`: `opens: "00:00", closes: "23:59"` for Monday–Sunday — literally 24 hours a day, every day. No human-readable hours (e.g. "Mon–Fri 8am–5pm") appear anywhere in visible copy on home, about, get-quote, or reviews pages — hours are simply absent from the visible UI and only exist as this 24/7 schema claim, consistent with the GBPs' "Open 24 hours."

**Are these real offices?** (via WebSearch, limited to the 2 addresses the task flagged as most checkable)
- **9300 E Mineral Ave, Centennial, CO 80112** = "The Glenn" — a building combining apartment/furnished-room rentals (Apartments.com listings for individual units/rooms) with ~1,821 sq ft of ground-floor retail space for lease. This is not contractor office space; it reads as an apartment complex with incidental retail. [LoopNet listing](https://www.loopnet.com/Listing/9300-E-Mineral-Ave-Centennial-CO/25726700/), [Apartments.com unit listings](https://www.apartments.com/9300-e-mineral-ave-centennial-co-unit-5172239/lbqvnvg/).
- **11915 Bell Cross Way, Parker, CO 80138** = a private single-family residence in the "Bell Cross Ranch" neighborhood — 5,983 sq ft, 6 bed/7 bath, 3.2 acres, sold for $990,000 on 2018-03-13, 7-car garage with RV parking. This is unambiguously a residential home, not a business office. [Redfin](https://www.redfin.com/CO/Parker/11915-Bell-Cross-Way-80138/home/35280808), [Trulia](https://www.trulia.com/home/11915-bell-cross-way-parker-co-80138-67450912). (Not independently verified, but worth noting: a public-records search surfaced a "Nancy Gibas" — same surname as the company's ownership family on the About page — in connection with this general area; this is circumstantial and NOT confirmed to be this exact address, flagged only as a lead for further manual verification, not asserted as fact.)
- Castle Rock (2616 Gray Wolf Point) and the Littleton/McArthur address were not separately WebSearch-verified due to the 3-call budget; flagged as needing the same residential/commercial check.

**Does the site list these as "locations"?** The nav has a "Locations" sub-structure (Parker, Centennial, Castle Pines, Castle Rock, Littleton all linked from main nav), but each page's visible body text explicitly frames the city as a **service area** ("serving Parker families," "serving Centennial, CO and surrounding areas") — WebFetch of all three in-scope pages found **no visible street address, suite number, or "visit us at" language** anywhere in the rendered body copy. The only place the specific address appears is the invisible JSON-LD.

## 3. Schema markup
Source: raw HTML of home.html, centennial-deck-builders.html, parker-deck-builders.html, castle-rock-deck-builders.html, littleton-deck-builders.html (castle-pines-deck-builders.html and about-us.html/get-quote.html/reviews.html have **no** JSON-LD at all).

Single `@graph` JSON-LD block per page, `@context: "https://schema.org"`, containing:
- `WebSite` (`@id #website`)
- `WebPage` (`@id #webpage`, ties to `#business` via `about`/`mainEntity`)
- `GeneralContractor` (`@id #business`) — the core LocalBusiness entity, with:
  - `name`: "Denver Deck Builders"
  - `telephone`: "+17202841439" (the GBP number, hidden from visible UI — see §2)
  - `address` (`PostalAddress`): varies per page, see table in §2
  - `geo` (`GeoCoordinates`): distinct lat/long per page, matching each page's address
  - `hasMap`: a distinct `google.com/maps/place/?q=place_id:...` URL per page (i.e., a distinct, specific Google Business/Place entity per page)
  - `sameAs`: includes `maps.google.com/?cid=2489951889128187370` (a Google CID — another signal tying the schema to a specific GBP record) plus Facebook/Instagram/X/YouTube/Pinterest
  - `aggregateRating` (`AggregateRating`): varies per page — Parker 4.6★/89, Centennial 5.0★/80, Castle Rock 5.0★/48, Littleton 5.0★/41. These track closely (within 1–3 reviews) with the task's reported GBP figures (Parker 4.6★/91, Centennial 5.0★/82, McArthur/Littleton 5.0★/43), consistent with a stale scrape of the same three GBPs, plus a 4th (Castle Rock) not mentioned in the brief.
  - `openingHoursSpecification`: 00:00–23:59 all 7 days (every page)
  - `areaServed`: array of `City` entities — Parker, Centennial, Castle Pines, Castle Rock, Littleton, Denver
  - `hasOfferCatalog`/`makesOffer`: 6 `Offer`→`Service` entries (Composite Decks, Roofs & Pergolas, Outdoor Living, Dry-Below System, Deck Repair, Patios), each with its own `serviceType` and canonical URL
  - `potentialAction`: `ScheduleAction` ("Get a Quote" → /get-quote/) and `CommunicateAction` ("Call Us" → tel:+17202841439 — again, the hidden GBP number, not the visible site number)
  - `knowsAbout`: list of service/skill keywords
- No `Review` (individual review) schema or `FAQPage` schema detected anywhere.
- A **Trustindex** widget script was detected in the homepage HTML (`grep` hit on "trustindex") — a third-party plugin typically used to pull/embed Google (and other) reviews; this likely explains why each page's `aggregateRating` differs and tracks a specific Google location (i.e., the widget/schema is probably being fed per-page from each paired fake/duplicate GBP).

**No multi-location `@type: Organization` + `department`/`subOrganization` structure is used** — instead the business re-declares itself as a *complete, independent* `GeneralContractor` entity on each city page with its own address/geo/Place-ID/rating, which is the schema pattern consistent with treating each city as its own "store front" rather than one business with branches.

## 4. Site structure
Source: https://www.denverdeckbuilder.com/sitemap_index.xml, page-sitemap.xml, post-sitemap.xml, team-sitemap.xml (fetched directly, Yoast SEO-generated).

- **Service pages (9):** Composite Decks, Roofs & Pergolas (pergolas-and-patio-covers), Outdoor Living, Dry-Below System (under-deck-drainage), Deck Repair, Patios, Deck Railing, Outdoor Lighting, Stairs.
- **City/location pages (5):** Parker, Centennial, Castle Pines, Castle Rock, Littleton. (Nav/footer copy also name-checks Highlands Ranch, Lone Tree, Greenwood Village, Aurora, Englewood, Lakewood, Arvada, Westminster, Denver as served areas without dedicated pages.)
- **Blog posts: 123 total** (counted `<loc>` entries in post-sitemap.xml). Oldest: 2022-03-05. Posting was roughly twice weekly from March 2022 through mid-2024, then a ~10-month gap (June 2024 → May 2026), then resumed at roughly monthly cadence through the most recent post, **2026-09-14** ("deck-vs-concrete-patio-cost"). Representative recent titles: "which-is-better-trex-decking-or-timbertech-decking," "is-it-better-to-repair-or-replace-a-deck," "20x20-deck-cost," "deck-vs-concrete-patio-cost."
- **Portfolio/gallery:** One `/our-gallery/` page using an Elementor gallery widget with **107 photo items**. Not clearly tagged/filterable by individual city in the raw markup (the city names Parker/Centennial/Littleton/Castle Rock/Castle Pines each appear only 3x in the page's text, likely in body copy/CTAs rather than per-photo tags; Denver appears 20x). No per-project case-study pages were found.
- **Team page:** a dedicated `/team/` sitemap lists 9 individual bio pages: Ron Gibas (Owner), Tyler Gibas (CFO), Peter Gibas (COO), Daniel Gibas (Sales), Cody Donley (Sales), Keaton Rodrigue (PM), Shane Kendall, Benjamin Herrera, Carson Evans (Crew Leads) — i.e., a real, named, multi-person (family-run) organization.

## 5. Trust / proof signals
Source: https://www.denverdeckbuilder.com/ and /about-us/
- "Family-owned... since 2000," "25+ years" in business.
- "Licensed and insured," full liability + workers' comp claimed.
- "In-house Certified Professional Engineers."
- BBB Accredited Business, A+ rating — image badge is self-hosted (`/wp-content/uploads/2025/12/bbb-1024x304.webp`) with descriptive alt text, but **not** a clickable/verified BBB seal linking out to bbb.org; independently confirmed via WebSearch that a real BBB profile exists: "Denver Deck Builders LLC," Parker CO, A+ rating, 8 customer reviews (https://www.bbb.org/us/co/parker/profile/deck-builder/denver-deck-builders-llc-1296-90169019).
- Manufacturer certifications claimed and shown as logos: **Trex Platinum Partner**, **TimberTech Certified**, **Deckorators Partner** (self-hosted logo images, e.g. `/wp-content/uploads/2025/12/timbertech-logo-color.webp`, `deckorators-1024x320.webp`) — not verified against Trex/TimberTech's own installer locators.
- No NADRA, Houzz, Angi, or "Best of" badge images/outbound links found on homepage or about page (despite those platforms independently listing the business — see §7).
- Financing offered via a third-party widget: Hearth (app.gethearth.com prequalify link).
- Reviews page (`/reviews/`) exists but, as rendered/fetched, shows **no visible aggregate star rating or review count and no embedded review cards** — the actual review content/widget likely renders client-side (Trustindex script detected in page source) and wasn't visible to the fetch.

## 6. Conversion / UX signals
Source: all pages fetched
- Phone number (720) 605-2946 in header and repeated as click-to-call `tel:` links 5–9 times per page.
- "Get a Free Quote" CTA buttons throughout; dedicated `/get-quote/` page with a detailed form (name, email, phone, ZIP, project type dropdown, size/description, photo upload, "how did you find us" attribution field, two separate SMS-consent checkboxes).
- No chat widget detected.
- No online booking/scheduling tool detected.
- No visible hours statement anywhere in the UI (see §2) — odd for a service business; the only "hours" claim is the 24/7 schema.

## 7. Third-party citations (via WebSearch, 1 of 3 calls)
Query: `"Denver Deck Builders" Houzz OR Yelp OR BBB OR Angi OR NADRA OR Thumbtack reviews`
- **Angi**: profile under Parker, CO — 4.7★ / 47 reviews (89% 5-star); mixed reviews, one complaint about poor callback/communication. (https://www.angi.com/companylist/us/co/parker/denver-deck-builders-reviews-9509441.htm)
- **Yelp**: "Denver Deck Builders," Parker, Colorado — 3.9★ / 55 reviews, 81 photos; complaints include paint chipping within 6 months, board separation, and a claim the company "doesn't warranty any work." (https://www.yelp.com/biz/denver-deck-builders-parker-6)
- **BBB**: "Denver Deck Builders LLC," Parker, CO — A+ rating, 8 customer reviews; mixed (one 23-years-best-team review, one complaint about not fixing mistakes/customer service). (https://www.bbb.org/us/co/parker/profile/deck-builder/denver-deck-builders-llc-1296-90169019)
- **Houzz**: appears in a Colorado-wide "Best 15 Deck Builders & Contractors in Colorado" listing page (not confirmed as having its own distinct Houzz business profile from this search alone). (https://www.houzz.com/professionals/decks-and-patios/colorado-us-probr0-bo~t_11830~r_5417618)
- **Thumbtack**: not confirmed as having a distinct profile in this search's results (search returned a generic Denver, CO deck-builder category page).
- **NADRA, Nextdoor, Porch, Expertise.com, manufacturer locators, chambers**: not found/not checked — would need targeted follow-up queries (budget exhausted).
- Note the **cross-platform review counts are modest and consistent with ONE business** (Angi 47, Yelp 55, BBB 8) — materially smaller than the combined Google total implied by the three/four GBP listings (approx. 82+91+43(+48) ≈ 264 Google reviews across the duplicate listings). That gap is consistent with — though not proof of — review volume being split/multiplied across duplicate Google listings rather than reflecting genuinely distinct customer bases per "location."
- A separate, unrelated company "Denver Decks" (denverdecks.com, "since 1984") also surfaced in search results — do not confuse with "Denver Deck Builders"/denverdeckbuilder.com.

## 8. Assessment: do the 3 (or 4) GBP listings look like guideline violations?
Evidence gathered supports several concrete, documented red flags under Google's Business Profile guidelines (https://support.google.com/business/answer/3038177 — "Representing your business on Google," and https://support.google.com/business/answer/9339356 — eligibility for service-area/storefront businesses):

1. **Ineligible/implausible physical locations.** Google requires a storefront listing to be a location staffed during stated hours where customers can physically visit. 11915 Bell Cross Way, Parker is a private residence (confirmed via real-estate records) and 9300 E Mineral Ave, Centennial is an apartment building with small retail space — neither looks like a staffed general-contractor office. A contracting business operating from residential/home addresses is specifically meant to register as a **service-area business (SAB) with the address hidden**, not to publish a public street address as if it were a storefront — which is what the schema (and by extension, almost certainly the GBP listings themselves) does.
2. **Likely duplicate/multiple listings for one business.** Google's guidelines explicitly prohibit creating more than one Business Profile for a single location or using multiple listings to "manipulate search results." Here it's multiple *addresses* for one legal entity (Denver Deck Builders LLC, one phone number, one website, one set of staff/schema) — each dressed up with its own full LocalBusiness schema, GPS coordinates, and Google Place ID, which is consistent with (but not direct proof of) the business having created/claimed separate GBPs per fake "branch" to multiply its map-pack presence across Centennial, Parker, Highlands Ranch/Littleton, and possibly Castle Rock.
3. **"Open 24 hours."** A 24/7, 7-day schedule for a deck-building contractor is implausible on its face and matches a known local-SEO manipulation pattern (fake/inflated hours to win "Open Now" badges and appear in more "near me, open now" queries). This isn't itself explicitly named as a violation in Google's policy text, but it is commonly flagged by Google's automated/manual spam review as a signal of an inauthentic or unmanaged profile, especially when paired with other mismatches (like the ones above).
4. **NAP shown to crawlers differs from NAP shown to humans.** The real GBP phone number is deliberately excluded from all visible page content and only emitted in structured data; a different, visible call-tracking number is used for actual visitors. This selective disclosure (accurate NAP for schema/Google, different NAP for people) is itself a trust/consistency red flag, separate from the GBP program policies.

**What would be needed to go from "looks like a violation" to "confirmed violation":**
- Live screenshots/text of the three (or four) actual Google Business Profile listings (name, address, hours, category, attached photos) — the task said not to re-visit Maps, so this audit relies on the task's stated figures plus the site's own schema; an independent Maps re-check would firm up the exact review counts/hours and whether the primary category is "deck builder" vs. a broader/ineligible category.
- Confirmation of who occupies 2616 Gray Wolf Point, Castle Rock and whether it, too, has a matching live GBP (this audit only found it in schema, not in the task's list of three).
- A street-view or ownership record check on 1054 McArthur Dr to see whether it's residential/office/vacant, matching the Bell Cross Way and Mineral Ave pattern.
- Confirmation of whether the "Nancy Gibas" public-records hit is in fact tied to the Bell Cross Way parcel (would directly establish the "office" as an owner's personal home).
- A Google Maps review-screenshot or Local Guide account check to see whether reviews piling up at these addresses mention service visits consistent with an office, or installation jobs consistent with a service-area contractor (which would further support "these are fake storefronts for an SAB business").

## Notes on method / gaps
- WebFetch's markdown conversion **silently dropped all JSON-LD schema** on every page (it reported "no structured data detected"); the real schema was only found by curling raw HTML and grepping/parsing `<script type="application/ld+json">` directly. Anyone repeating this audit should fetch raw HTML, not rely on WebFetch summaries, when checking for schema.
- 3/3 WebSearch calls used (Centennial address, Parker address, third-party citations). Did not verify: Castle Rock or McArthur Dr addresses' real-world nature, NADRA/Porch/Expertise.com/Nextdoor presence, or the "Nancy Gibas" connection — flagged above as follow-ups if more search budget becomes available.
