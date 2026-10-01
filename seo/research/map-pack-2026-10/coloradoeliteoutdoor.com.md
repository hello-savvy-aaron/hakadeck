# Colorado Elite Outdoor Contractors — Local SEO Audit
Audited 2026-10-01. Site: https://www.coloradoeliteoutdoor.com/ (redirects from the bare coloradoeliteoutdoor.com). GBP reference data supplied for this audit: 4.6★ / 40 reviews, 2813 S Pagosa St, Aurora CO, (720) 674-9058, hours to 7 PM, ranks #3 in Maps for "deck builders near me" in south-Denver metro.

## Why this listing likely outranks a 5.0★/90-review competitor (6 lines)
1. Massive, consistent site footprint: 127 indexed URLs — 7 service pillars × 14 south-metro cities as dedicated combo pages (70 pages), 12 city hub pages, 34 blog posts (incl. "best deck builders in [city]" posts for 9 cities) — giving Google far more exact-match geo/service landing pages to rank than a thinner competitor site.
2. Full technical SEO scaffolding on nearly every page: GeneralContractor/Service + FAQPage + BreadcrumbList JSON-LD is templated across home, service, and city pages, making every city/service combo eligible for FAQ rich results — a structural advantage independent of review volume.
3. Explicit GEO play: robots.txt openly welcomes GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended "for AI search crawlers... GEO/AI visibility" — they're positioning for AI-answer-engine citations, a channel most competitors ignore.
4. Trust-signal copy is pushed hard and everywhere ("4.9★ · 196+ projects," named owners, TimberTech/Deckorators Pro, "BBB Accredited," "Licensed & Insured") even though several of these claims are unverifiable or contradicted by third-party records (see §5/§7) — the perception of trust may be doing more work than the real review count.
5. Real, recent content velocity: 10 of 127 pages were updated 2026-09-11, and every one of them targets Centennial (outdoor-living, patio-cover, pergola, fence pages + a "best deck builders in Centennial" post) — i.e., they are actively expanding into Haka's core DTC/Centennial trade area right now, not sitting on a stale 2026-06 launch.
6. NAP is actually inconsistent across the web (two legal names, two Aurora addresses/zips, two phone numbers — see §2/§7), which would normally hurt local pack ranking, implying the #3 Maps position is being carried by on-page volume/schema/proximity rather than clean citations — i.e., a fixable gap for us, not an unbeatable moat.

---

## 1. Homepage title / H1 / meta / keyword usage
Source: https://www.coloradoeliteoutdoor.com/
- `<title>`: "Deck Builder in Castle Rock & the Front Range, CO | Colorado Elite Outdoor Contractors"
- H1: "Decks & outdoor living in Castle Rock & the Front Range."
- Meta description: "Custom deck builder serving Castle Rock, Parker & the Colorado Front Range. Also fences, pergolas & outdoor living. 4.9★ Google, 196+ projects completed. Free deck quote from Jon & Janessa Lang."
- Uses "deck builder" directly in title/meta. Does **not** use "near me" anywhere observed. Cities named on homepage nav/body: Castle Rock, Highlands Ranch, Parker, Castle Pines, Lone Tree, Aurora, Larkspur, Elizabeth, The Pinery, Saddle Rock, Ponderosa Park, Foxfield (Centennial and Franktown appear elsewhere on the site but not in the homepage nav list).
- Notable: the homepage's primary geo-target is **Castle Rock**, not Aurora — even though the GBP address given for this audit (2813 S Pagosa St) is in Aurora. Their brand identity is centered on Castle Rock/Douglas County, with Aurora treated as one of many service-area cities.

## 2. NAP (Name / Address / Phone)
Sources: homepage, /aurora/, /get-a-quote/, JSON-LD on every page (see §3)
- Business name used sitewide: **"Colorado Elite Outdoor Contractors"** (FAQ copy specifies the legal entity "Colorado Elite Outdoor Contractors LLC").
- Phone shown sitewide: **(720) 674-9058** — matches the GBP phone given for this audit.
- Street address: **not published anywhere on the website** (homepage, footer, /get-a-quote/, /aurora/, /locations/ all omit it). Schema `address` objects only ever contain `addressRegion: "CO"` / `addressCountry: "US"` — no `streetAddress`, no `addressLocality`, not even on the Aurora page. This is a classic service-area-business (SAB) pattern (hide home/office address, serve a region) — consistent with the GBP being a residential/SAB listing rather than a storefront.
- Email: info@coloradoeliteoutdoor.com (shown on /aurora/ and elsewhere).
- No second address is published on the website itself, but **third-party listings disagree significantly** — see §7 for a second address, second phone number, and second legal business name found on citations (Facebook, Nextdoor, BBB). This is a real NAP-consistency problem for them that isn't visible on their own site.

## 3. Schema markup
Pulled from raw HTML (view-source), not the markdown-rendered version, via curl.

**Homepage** (https://www.coloradoeliteoutdoor.com/) — 2 JSON-LD blocks:
- `@type: GeneralContractor` — name, image (logo), url, telephone, email, priceRange "$$", address (region/country only, no street/city), `founder`: [Jon Lang, Janessa Lang], `knowsAbout`: [Deck building, Fence installation, Pergolas, Patio covers, Siding, Pole barns, Outdoor living], `areaServed`: 8 cities (Parker, Highlands Ranch, Castle Rock, Aurora, Castle Pines, Lone Tree, Larkspur, Elizabeth), `aggregateRating`: **ratingValue 4.9, reviewCount 37**.
- `@type: FAQPage` — 5 Q&As: licensed/insured ("BBB Accredited... fully insured and bonded"), wood vs composite, Colorado weather/engineering, HOA/permits, "Will Jon or Janessa be involved."

**/decks/** service page — 3 JSON-LD blocks: `Service` (serviceType "Deck building", nested `provider` GeneralContractor repeating the same 4.9/37 aggregateRating), `BreadcrumbList` (Home > Decks), `FAQPage` (5 Q&As on deck types, permits, HOA, clay-soil footings, best decking material).

**/aurora/** city page — 3 JSON-LD blocks: `GeneralContractor` (city-specific description "serving Aurora, CO...", areaServed: City "Aurora, Colorado", same 4.9/37 aggregateRating), `BreadcrumbList` (Home > Aurora), `FAQPage` (4 Q&As, Aurora-specific: what they build in Aurora, Aurora permits via City of Aurora building office, HOA approval naming Blackstone/Southshore/Saddle Rock/Beacon Point/Tallyn's Reach, golf-course/reservoir "view fence" code).

Pattern: every city page and every service page carries its own GeneralContractor/Service + FAQPage + BreadcrumbList schema, each repeating the sitewide 4.9★/37-review aggregateRating — i.e., programmatically templated structured data at scale, not a one-off homepage schema block.

**Discrepancy flag**: schema states aggregateRating 4.9/37 everywhere; the /reviews/ page headline claims "4.9★ from 196+ Colorado homeowners" (conflating completed-project count with review count); the GBP data given for this audit is **4.6★ / 40 reviews**. None of the three numbers (37 schema, 196+ on-page, 40 GBP) match each other.

## 4. Site structure
Source: https://www.coloradoeliteoutdoor.com/sitemap.xml (127 URLs total; robots.txt points here)
- **Service pillar pages (7):** /decks/, /fences/, /pergolas/, /patio-covers/, /outdoor-living/, /siding/, /pole-barns/
- **City hub pages (14, linked from /locations/):** Castle Rock, Highlands Ranch, Parker, Castle Pines, Lone Tree, Aurora, Larkspur, Elizabeth, The Pinery, Saddle Rock, Ponderosa Park, Foxfield, Franktown, Centennial — though only 12 of these actually have a short-slug hub page in the sitemap (e.g. /aurora/); Centennial and Franktown currently exist only as service-combo page targets (see below), not as their own hub page, despite being listed on /locations/.
- **Service × city combo pages (~70):** patterned as `/{service}-in-{city}-colorado/` or `/{service}-for-{city}-colorado/`, e.g. deck-installation-in-aurora-colorado (14 cities), fence-install-and-repair-in-* (13 cities), outdoor-living-in-* (9), patio-cover-for-* (9), pergola-installation-in-* (9), pole-barn-builder-in-* (8), siding-installation-in-* (8).
- **Blog (34 posts + index):** mix of cost/comparison guides (how-much-does-a-deck-cost-in-colorado, composite-vs-cedar-decking-colorado, timbertech-vs-trex-vs-deckorators-colorado), permit/HOA guides per county, and — notably — 9 **"best deck builders in [city], Colorado"** posts (Aurora, Castle Pines, Castle Rock, Centennial, Elizabeth, Highlands Ranch, Larkspur, Lone Tree, Parker) that function as self-serving "best of" roundups.
- **Portfolio/gallery:** no dedicated portfolio or gallery URL exists in the sitemap. Project photos are embedded directly on service pages (e.g., 2 images found in raw HTML of /decks/) and on city pages, but are not organized into a browsable, city-tagged portfolio section.
- **/reviews/** and **/get-a-quote/** exist as standalone pages; no separate /about/ or /contact/ page (an /about/ URL appears in a stale search-engine cache with the title "Colorado Elite Outdoor: Denver Deck & Fence Builders," but it 404s live as of this audit — about content now lives in a homepage #about anchor section).
- **Freshness:** sitemap `lastmod` values cluster at 2026-06-18 (113 of 127 pages — original launch), 2026-07-20 (4 pages), and **2026-09-11 (10 pages)** — and every one of those 10 most-recently-touched pages is Centennial-specific (outdoor-living, patio-cover, pergola, and fence combo pages plus the "best deck builders in Centennial" blog post), plus four general cost-guide blog posts. This reads as an active, recent push into Centennial specifically.

## 5. Trust / proof signals
Sources: homepage, /aurora/, /decks/, /reviews/
- Headline claim repeated sitewide: **"4.9★ on Google · 196+ Front Range projects."**
- /reviews/ page: title "Reviews, 4.9★ from 196+ Colorado Homeowners"; H1 "Verified Google reviews"; shows **16 individual 5-star review excerpts** with names/initials and project type; links out to "Read all reviews on Google" (a Google search link, not a widget); no Yelp/Facebook/Houzz links found on this page.
- "BBB Accredited" is claimed in the homepage FAQ schema ("Yes, BBB Accredited as Colorado Elite Outdoor Contractors LLC, fully insured and bonded") — **this appears to be false or stale**: the BBB profile found for the related entity "Colorado Elite Deck and Fence, LLC" (Aurora, CO 80017) at https://www.bbb.org/us/co/aurora/profile/deck-builder/colorado-elite-deck-and-fence-llc-1296-1000142881 explicitly shows **"Not BBB Accredited," "Not Rated,"** founded Feb 3, 2022, zero reviews on BBB.
- "Licensed & Insured" is claimed repeatedly (homepage, FAQ schema, /aurora/), but a third-party license check (BuildZoom, https://www.buildzoom.com/contractor/colorado-elite-outdoor-contractors) states: **"BuildZoom was not able to verify this license with the licensing board," "No active license on file."** BuildZoom separately confirms NAP there matches the audit's GBP exactly (2813 S Pagosa St, Aurora, CO 80013 / (720) 674-9058), and notes BuildZoom itself has zero reviews on file (the 4.9★/196+ claim is flagged by BuildZoom as "self-reported").
- Material-partner badges claimed: **TimberTech Pro** and **Deckorators Pro** (both named in page copy and in schema `knowsAbout`). No Trex Pro, Fiberon, NADRA, or Houzz badge found on-site.
- "Family-owned" positioning, owners named and pictured as Jon & Janessa Lang throughout (homepage founder schema, FAQ answers, Aurora page). No explicit "years in business" / founding-date claim found on the website itself (contrast: the BBB record for the related LLC shows a Feb 2022 founding — roughly 3–4 years, not "decades," which is what one old aggregator snippet implied — see §7).
- No warranty terms or financing offers found on any fetched page.

## 6. Conversion elements
Sources: homepage, /get-a-quote/
- Phone number (720) 674-9058 appears in the header as a click-to-call link, and is repeated throughout body copy.
- Primary CTA is "/get-a-quote/" — appears 15+ times sitewide per the homepage fetch. The quote page itself is sparse: title "Get a Free Quote," a form (fields not fully enumerated by the fetch — likely name/phone/email/project-type/message), phone and email repeated, **no street address, no map embed, no stated business hours, no chat widget, no online scheduling/booking tool** found on that page or elsewhere on the site.
- No stated hours anywhere in the fetched pages (the audit's GBP data says hours to 7 PM, but that's not echoed on-site).

## 7. Third-party listings / citations found (via limited WebSearch + direct fetch)
Search quota used: 2 of 3 allowed calls (`"Colorado Elite Outdoor Contractors" reviews Yelp BBB Angi Houzz`; `"Colorado Elite Deck and Fence" OR "coloradoeliteoutdoor" Facebook site:facebook.com`).

| Listing | URL | What was found |
|---|---|---|
| BuildZoom | https://www.buildzoom.com/contractor/colorado-elite-outdoor-contractors | NAP matches GBP exactly (2813 S Pagosa St, Aurora, CO 80013 / (720) 674-9058). "No active license on file" per BuildZoom's licensing-board check. No reviews on BuildZoom; flags the 4.9★/196+ claim as self-reported. |
| BBB | https://www.bbb.org/us/co/aurora/profile/deck-builder/colorado-elite-deck-and-fence-llc-1296-1000142881 | Legal name **"Colorado Elite Deck and Fence, LLC"** (not "...Outdoor Contractors LLC"), Aurora CO 80017-5409 (no street address shown), **Not BBB Accredited / Not Rated**, founded 2026-02-03 (per profile, ~2 years old at the stated founding date), zero complaints, zero reviews — directly contradicts the "BBB Accredited" claim on the main site. |
| Nextdoor | https://nextdoor.com/pages/colorado-elite-deck-and-fence-aurora-co/ | Listed as **"Colorado Elite Outdoor Contractors"** but based in **Castle Rock, CO** with a **different phone number: (720) 712-8828**. ~36+ neighbor recommendations shown. |
| Facebook | https://www.facebook.com/p/Colorado-Elite-Outdoor-Contractors-100077739591014/ | 2,038 likes / 139 talking about it. Address shown: **18983 E Oregon Dr, Aurora, CO 80017** — a *second, different Aurora address/zip* from the GBP's 2813 S Pagosa St (80013). Phone shown: **(720) 712-8828** (matches the Nextdoor number, not the main site/GBP number). Bio claims "decades of experience" / "over 15+ years," and lists service cities including Denver, Englewood, Littleton — broader/different from the current website's Castle-Rock-centric city list. |
| GuildQuality | https://www.guildquality.com/profile/colorado-elite-outdoor-contractors-2 | Page blocked (503) on direct fetch; search-result title read "Colorado Elite Outdoor Contractors - Aurora, CO 80013" — zip matches GBP. Not independently verified beyond the snippet. |
| Chamber of Commerce | https://www.chamberofcommerce.com/business-directory/colorado/aurora/fence-contractor/2017386213-colorado-elite-outdoor-contractors | Page blocked (403) on direct fetch; search-result title read "Colorado Elite Outdoor Contractors in Aurora, CO 80017" — i.e. the *other* zip (matching the Facebook/Oregon Dr address, not the GBP's Pagosa St/80013). Not independently verified beyond the snippet. |
| HomeAdvisor | https://www.homeadvisor.com/rated.ColoradoEliteDeckand.123257589.html | Page blocked (403) on direct fetch. Listed under the name **"Colorado Elite Deck and Fence"** — a third name variant. Rating/review count unknown — page didn't load. |
| Yahoo Local | https://local.yahoo.com/info-231010700-colorado-elite-outdoor-contractors-aurora/ | Found via search only; not fetched. Confirms Aurora listing exists but content not verified. |
| Houzz | "ELITE LANDSCAPE & OUTDOOR LIVING - Highlands Ranch, CO" (https://www.houzz.com/professionals/landscape-contractors/elite-landscape-and-outdoor-living-pfvwus-pf~1863186080) | Likely a **different, unrelated company** (different name, different city/category — landscape vs. deck/fence) — flagging as a probable false match from search, not a confirmed citation. Do not treat as Colorado Elite Outdoor Contractors' Houzz profile without further verification. |
| Yelp, Angi, Thumbtack, Porch, Expertise.com, Trex Pro Locator, NADRA | — | Not found as direct URLs within the 2-search budget. A WebSearch AI-generated summary asserted "5.0 on Facebook and Yelp... 4.8 on Google... 5.0 on Thumbtack," but this was an unsourced aggregated claim with no accompanying URL for each figure — **treating this as unverified, not fact**, per the instruction to prefer "unknown" over guessing. |

**Net NAP-consistency picture:** at least two legal business names ("Colorado Elite Outdoor Contractors LLC" per the site's own FAQ copy vs. "Colorado Elite Deck and Fence, LLC" per BBB/HomeAdvisor), at least two Aurora addresses/zips (2813 S Pagosa St / 80013 per GBP+BuildZoom vs. 18983 E Oregon Dr / 80017 per Facebook, with Chamber of Commerce's snippet also showing 80017), and two phone numbers ((720) 674-9058 on the live site/GBP/BuildZoom vs. (720) 712-8828 on Facebook/Nextdoor).

## 8. Notable findings
- **GEO/AI-crawler targeting**: robots.txt (https://www.coloradoeliteoutdoor.com/robots.txt) explicitly `Allow: /` for GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, and Google-Extended, with an inline comment "AI search crawlers explicitly welcomed (GEO/AI visibility)." This is a deliberate, stated strategy to show up in ChatGPT/Perplexity/AI-overview answers, not just classic SEO.
- **Keyword-rich, self-serving "best of" blog posts**: 9 "best deck builders in [city], Colorado" posts are authored by the company itself (not a neutral third party), e.g. /blog/best-deck-builders-in-centennial-colorado/ — effectively competing for "best deck builders in Centennial" search intent with their own content.
- **Possible second/legacy business entity or rebrand**: the "Colorado Elite Deck and Fence, LLC" name (BBB, HomeAdvisor) vs. current "Colorado Elite Outdoor Contractors" branding, plus a second Aurora address (Oregon Dr) and second phone number tied to the Facebook/Nextdoor presence, strongly suggests either a rebrand that wasn't fully propagated across citations, or two overlapping entities/addresses. This is exactly the kind of fragmented-citation issue your own "Local citations audit" memory flags for Haka — except here it doesn't seem to be holding their Maps rank back.
- **Unverifiable trust claims**: "BBB Accredited" (contradicted by the actual BBB record) and "Licensed & Insured" (BuildZoom could not verify an active license) are both stated as fact in the site's own FAQ schema — i.e., encoded into structured data that could be surfaced in search/AI answers as if confirmed.
- **No physical address published anywhere on their own site** (service-area-business pattern), which lines up with the GBP being a residential/SAB-style listing rather than a public storefront — not unusual for a small outdoor-construction contractor, but worth knowing when comparing against Haka's own NAP display strategy.
- **Currently expanding into Centennial** (see §4 freshness) — the most recently touched content on their whole site targets the exact submarket Haka's DTC/Centennial positioning is built around.
- Homepage/brand identity is **Castle-Rock-first**, not Aurora-first, despite the audited GBP's Aurora address — their content strategy treats Aurora as one of 12+ served cities rather than home base.

## What I could not verify
- Exact field list on the /get-a-quote/ contact form (fetch summarized it as sparse rather than itemizing fields).
- True, audited review counts/ratings on Yelp, Angi, Thumbtack, Porch, Expertise.com, and a confirmed Houzz profile — blocked pages or absent from the 2-search budget; do not treat the AI-search-summary figures as confirmed.
- Whether "Colorado Elite Deck and Fence, LLC" (BBB/HomeAdvisor/Nextdoor/Facebook) and "Colorado Elite Outdoor Contractors LLC" (current site) are the same legal entity that rebranded, or two separate/related entities — the evidence is consistent with either.
- Full NAP as shown on Chamber of Commerce, GuildQuality, and HomeAdvisor (all blocked, 403/503) — zips inferred only from search-result snippet titles, not confirmed page content.
