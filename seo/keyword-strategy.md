# Haka Decks — SEO Keyword Blitz & Ranking Strategy

_Research date: 2026-07-16. Source: Google Autocomplete (live suggest API, Colorado-localized),
SERP sampling for the two money terms, sitemap gap analysis._

## How this list was built

Google Autocomplete only suggests things people actually type, so every keyword below is
real demand — no guessed volume. Suggestions were pulled for ~30 seed terms (deck builder,
deck contractor, composite deck, trex, deck cost, repair, replacement, pergola, patio cover,
outdoor kitchen, financing, permits, second-story, resurfacing) plus geo variants for every
city we serve. Colorado cities appearing organically in suggestions (denver, aurora, parker,
littleton, highlands ranch, castle rock) = strongest local-demand signal.

---

## Tier 1 — Money keywords (local, hire-a-contractor intent)

These are the "someone's about to spend $30k" searches. Each needs a dedicated page.

| Keyword | Target page | Status |
|---|---|---|
| deck builders denver / denver deck builders | Homepage | ✅ have (tune title/H1) |
| deck builders near me / in my area | GBP + homepage | ✅ have (GBP-driven) |
| deck contractors denver / deck companies denver | Homepage (secondary) | ✅ have |
| deck builder centennial co | /locations/centennial | ✅ have |
| deck builders highlands ranch (colorado) | /locations/highlands-ranch | ❌ **MISSING** |
| deck builders littleton co | /locations/littleton | ❌ **MISSING** |
| deck builders parker co | /locations/parker | ❌ **MISSING** |
| deck builders castle rock co | /locations/castle-rock | ❌ **MISSING** |
| deck builders aurora co | /locations/aurora | ❌ **MISSING** |
| custom deck builder denver | Homepage / portfolio | ✅ have |

## Tier 2 — Service + intent keywords

| Keyword | Target page | Status |
|---|---|---|
| composite decking denver / composite deck builders near me | /services/composite-decks | ✅ have (tune) |
| trex deck builders near me | /services/composite-decks | ✅ have (add Trex H2) |
| deck installation (companies) near me | /services (hub) | ✅ have (tune) |
| deck repair denver / near me / highlands ranch / parker / littleton | /services/deck-repair | ✅ have (add city links) |
| deck replacement (contractors/companies near me) | /services/deck-replacement | ❌ **MISSING — distinct from repair, high volume** |
| deck resurfacing near me | fold into deck-replacement page | ❌ missing |
| pergola builders near me / denver pergola company / pergola installation denver | /services/pergolas-patio-covers | ✅ have (tune) |
| patio cover denver / covered patio builders near me | /services/pergolas-patio-covers | ✅ have (add "patio cover Denver" H2) |
| outdoor kitchen denver (colorado) | /services/outdoor-kitchens | ✅ have (tune) |

## Tier 3 — Informational / cost keywords (blog + tools)

| Keyword | Asset | Status |
|---|---|---|
| how much does a deck cost (to build / per square foot) | blog cost guide | ✅ composite-deck-cost-denver (broaden or new post) |
| deck cost estimator / deck cost calculator | **interactive calculator page** | ❌ **MISSING — biggest content opportunity** |
| deck installation labor cost / deck building labor cost | blog post | ❌ missing |
| deck replacement cost (per square foot) | blog post, links to service page | ❌ missing |
| second story deck cost / with patio underneath / with roof | blog post (walkout/elevated decks) | ❌ missing — matches their actual portfolio |
| covered patio cost | ✅ polycarbonate-roof-covers-guide (tune) + deck add-ons guide | partial |
| deck financing / options / companies that offer financing | blog post or /financing page | ❌ missing — differentiator if Haka offers it |
| deck permit denver | ✅ deck-permits post covers Centennial/Arapahoe/Douglas | expand to Denver county |
| denver pergola permit | add section to permits post | ❌ missing |
| can you build a deck over concrete / cost | blog post | ❌ missing |
| building a deck off an existing deck | blog post (expansions/additions) | ❌ missing |
| trex vs timbertech / composite decking brands/colors | ✅ trex-vs-timbertech-vs-fiberon | ✅ have |
| composite vs wood decking | ✅ composite-vs-natural-decking-guide | ✅ have |

---

## Ranking strategy

### Phase 1 — Location page blitz (weeks 1–2, highest ROI)
Autocomplete proves city-level demand; we have 3 of the ~8 pages needed.
Build: **Highlands Ranch, Parker, Littleton, Castle Rock, Aurora** (+ consider Castle Pines,
Cherry Hills Village, Englewood). Clone the /locations/centennial template but make each
genuinely unique: county permit specifics, HOA norms, neighborhood names, portfolio projects
built in that city, city-specific FAQ. Add each to the locations hub, footer, and sitemap.
Competitors (O'Keefe, Griffin, The Deck Company) rank with exactly this playbook.

### Phase 2 — Money-page tuning (week 2)
- Homepage title currently leads with Centennial; test leading with "Denver" —
  "Custom Deck Builder in Denver | Haka Decks" (higher volume, DTC positioning already
  supports it). Keep Centennial NAP intact.
- Add a **/services/deck-replacement** page ("deck replacement" ≠ "deck repair" in Google's
  eyes; both suggest independently, and replacement is the bigger ticket).
- Service pages: align H1s with query language ("Composite Deck Builders in Denver",
  "Pergola & Patio Cover Installation in Denver"), add a Trex/TimberTech/Deckorators
  brand section to composite page (certifications = E-E-A-T + "trex deck builders near me").
- Add `areaServed` city list to Service JSON-LD; cross-link every service page ↔ every
  location page ↔ related blog posts.

### Phase 3 — Content engine (weeks 3–8, one post/week)
Priority order (each targets a proven autocomplete cluster):
1. **Interactive deck cost calculator** (targets estimator/calculator; earns links; CTA → quote)
2. Deck replacement vs repair: costs & when to replace
3. Second-story / walkout deck cost guide (Colorado) — matches portfolio strength
4. Deck financing options in Colorado (if Haka offers financing, say so loudly — "deck
   companies that offer financing" is a suggest term)
5. Labor cost to build a deck in Denver
6. Building a deck over concrete (cost + how)
7. Expand permits post: Denver county + pergola permits

### Phase 4 — Map pack & citations (parallel, owner-side)
"Near me" searches are won in Google Business Profile, not on-site:
- GBP: confirm categories (Deck Builder primary), add all services, weekly photo posts,
  seed Q&A, keep review velocity (89 → 100+; ask every completed project).
- Fix citations (from 2026-07-14 audit): claim Apple Maps, fix Angi's old Englewood address,
  kill the Yelp duplicate, create **Houzz** (ranks page 1 for "deck builder centennial co"),
  BBB, Nextdoor, Facebook, and Team Dave Logan (ranks page 1 for "deck builders denver").
  Directory profiles = free page-one real estate.

### Phase 5 — Measure (ongoing)
- Settle the Search Console account question; submit sitemap; watch Indexing → Pages.
- Monthly: track Tier 1 keywords manually or via GSC queries report; watch which blog
  posts earn impressions and double-down.
- Success = map-pack presence for "deck builder [city]" in served cities + top-5 organic
  for 5+ Tier 1 terms within 6 months.

### Competitors on page 1 (for reference)
denverdeckbuilder.com, okeefebuilt.com, denverdecks.com, barefootdecks.com,
thedeckcompanyinc.com, freedomdeckbuilders.com, griffindeck.com, centennialdecks.com,
newcustomdecks.com — plus directories: Yelp, Houzz, BBB, Team Dave Logan.
