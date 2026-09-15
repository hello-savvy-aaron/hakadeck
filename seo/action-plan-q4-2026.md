# SEO Action Plan — Q4 2026

Built 2026-09-11 from a full Semrush MCP sweep (organic research, domain
overview + rank history, backlinks overview + referring domains, competitor
research, site audit, keyword/question research; traffic & audience analytics
are gated behind a higher Semrush plan). Companion to `keyword-strategy.md`
and `owner-checklist.md`.

## Where the site stands (data, not vibes)

**Growth curve (US organic keywords in Google top 100):**
May 2026: 0 → June: 2 → July: 23 → August: 69 → September: 80.
Distribution now: 1 in top 10, 9 at 11–20, 14 at 21–30, 6 at 31–40.
The content engine works; the September pushes aren't even reflected yet.

**The binding constraint is authority, not content.** Authority Score: 2.
Of 68 referring domains, effectively all are link-farm/casino/scraper junk
(now listed in `disavow.txt`); the only legitimate link is dexknows.com.
Top-10 competitors for our target keywords average 17–33 referring domains.
Every ranking below is capped by this until real links exist.

**SERP-feature landscape on our 80 keywords:** local pack appears on 51,
People-Also-Ask on 69, AI Overviews on 23. Translation: the GBP program is
half the battle, and the question-H2 + FAQPage-schema format (house style
since Sept) is aimed exactly right.

**Technical health: clean.** Site audit (Sept 7): 0 errors. Warnings are
cosmetic: "low text/HTML ratio" on 95 pages (Next.js JS payload — ignore),
2 over-long titles (fixed 2026-09-11, plus 4 more found by grep), 1 low
word count. llms.txt check passes. Note: Semrush's markup detector reports
zero schema — false positive (it misses JSON-LD `@graph`; verified live with
curl). Owner sanity-check: run one location page + one blog post through
Google's Rich Results Test.

**Competitors (organic overlap):** centennialdecks.com (337 kw),
deckdoctorinc.com (354 kw — a REPAIR specialist, relevant to Q4 strategy),
deckbuilderofco.com (203), westernskydesigns.com (792). None run ads.
denverdeckbuilder.com (exact-match domain) still owns the Denver head terms
on authority we don't yet have.

## Workstream 1 — Page 2 → Page 1 (SHIPPED 2026-09-11)

- highlands-ranch: railings section + "decking contractor" phrasing
  (targets: #16 "highlands ranch deck builder" 210 vol, railings trio)
- littleton: plural "deck builders" + "deck services" phrasing + small-jobs
  section (targets: 4 variants at #19–28, 110–170 vol each)
- aurora: "Deck installation in Aurora" section (target: #24, 110 vol)
- castle-pines de-cannibalization: own "custom deck design" section; the
  castle-rock page (which was outranking it for Castle Pines queries at
  #14 vs #58) now routes to it
- trex-vs-timbertech-vs-fiberon: "Fiberon vs. Trex head to head" section +
  FAQ schema (targets: "fiberon vs trex" 590 vol at #59, "fiberon vs
  timbertech" 140 at #52, "trex vs fiberon" 210 at #53)
- covered-deck-cost: "covered deck prices" phrase + question H2 (#17, 40 vol)
- Internal-link sweep: 8 blog posts now feed the pushed pages + denver hub
- Title trims: 6 metaTitles cut to ≤60 chars

**Recheck positions ~Oct 1 via Semrush MCP** (organic_research,
position_asc). Success = the pushed terms crossing into top 10.

## Workstream 2 — Authority (the constraint; mostly owner-side)

1. **301 hakaconstruction.com + hakadeck.com** → www.hakadecks.com.
   Transfers whatever real links the old brand earned; kills the split
   identity. Still the single biggest lever. (Registrar/DNS task.)
2. **Manufacturer installer directories** — Trex "Find a Builder"
   (Platinum Pro listing), Deckorators installer locator (Pro Elite),
   TimberTech contractor locator. Real-authority links available to
   certified installers; ask each brand rep. Free.
3. **Citations** (per `owner-checklist.md` + July audit): fix Angi's old
   address, claim Apple Business Connect, merge Yelp duplicate + fix its
   "Patio Coverings" category, create Nextdoor/Houzz/Facebook. Each is a
   link + NAP consistency.
4. **Local memberships**: South Metro Denver Chamber, local HBA/NARI —
   membership directory links are legitimate and local.
5. **Seasonal PR play**: when the first big snow is forecast, pitch Denver
   TV/news the "how much snow can a deck hold" expert angle (the post
   exists; Pete is the quotable local pro). One landed quote = the best
   link in the profile.
6. **Disavow**: `disavow.txt` updated 2026-09-11 with 16 new junk domains.
   Per the file's own header: only submit if a manual action appears or a
   vendor actually bought links. Otherwise hold.

## Workstream 3 — Content (targeted, not bulk)

- NEW POST: "How to repair a rotting deck stair stringer" — 70 vol, KD 7,
  plus the stair-repair cluster; fits Repair & Maintenance + fall season.
- The "how much does deck repair cost" question cluster (110+90+90, KD 6–9)
  is already owned by deck-repair-cost-denver's question-H2s — verify it
  captures the PAA box in October's recheck.
- Cadence stays 1–2/month, matched to real queries. The 100+ page library
  is built; effort goes to distribution (GBP posts linking guides weekly).
- Annual refresh obligations: location events (winter 2026-27), "2026"
  cost figures (January).

## Workstream 4 — Technical (small, mostly done)

- [x] Title trims (6 pages, 2026-09-11)
- [ ] Owner: Rich Results Test on /locations/centennial + one blog post
- [ ] Watch GSC coverage as the 20 new city + 8 county pages index
- Ignore: text/HTML-ratio warnings; the 1 low-word-count page.

## Workstream 5 — AI / answer-engine readiness (SHIPPED 2026-09-11)

Baseline that motivated it: GA4 shows an "AI Assistant" channel at 83%
engagement and 3 of 13 generate_lead events in the last 28 days — ChatGPT,
Perplexity, and friends are already a lead source. What shipped:

- `/llms.txt` is now generated from the content libs (`lib/llms.ts`) —
  every post, city, county, service, guide, and brand page, with dates.
  `/llms-full.txt` adds every page's full markdown body (~110k words) so an
  LLM can ingest the site in one fetch. Both static, cached a day.
- `robots.txt` names 17 AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot,
  PerplexityBot, Google-Extended, Applebot-Extended, Bingbot, …) with an
  explicit Allow; `<meta name="robots">` opts into max-snippet:-1 and
  max-image-preview:large on every page.
- Entity graph: the site-wide JSON-LD is now a `@graph` of the business
  (+ founder, hasCredential ×3 manufacturer tiers, contactPoint), a Person
  node for Pete (`/about#pete-borlase`), and a WebSite node. Articles,
  guides, services, and locations reference those by `@id` — one entity,
  not a copy per page. `/about` gained an AboutPage node + an "At a
  glance" facts `<dl>` (founded, HQ, area, certs, warranty, phone).
- Freshness: blog frontmatter supports `updated:`; it drives
  `dateModified`, the sitemap, OG `modifiedTime`, and a visible stamp.
- Answer-first leads on all 31 posts (bold 35–60-word direct answer with
  the post's own numbers) and FAQ schema on all 31 (13 posts gained 3
  Q&As each — 39 new PAA-shaped answers).
- Service price ranges as schema.org `Offer` / `UnitPriceSpecification`
  on composite-decks and deck-replacement ($40–$70/sq ft).
- IndexNow: key file in `public/`, `npm run indexnow` pushes every sitemap
  URL to Bing/Copilot/DuckDuckGo (ChatGPT search rides on Bing). Run it
  after each content deploy.

Not done (owner-side or later): GA4 key-event flags for generate_lead /
call_click (needed before any AI-channel conversion math); Bing Webmaster
"IndexNow" report check after the first submission; consider a
`speakable` block on the FAQ page if voice-assistant traffic shows up.

## Workstream 6 — Service-area build-out to the full GBP list (SHIPPED 2026-09-11)

Every one of the 103 GBP service-area towns now has a page, plus 15 county
hubs (121 location pages total; 63 new today). Every city and county page
carries a verified **"Local resources"** block — building department,
permit portal, town/city hall, planning, wildfire-code office — with phone
numbers and links copied from official sites, plus the Colorado 811 line.
Frontmatter: `county:` (links the county hub, groups neighbors),
`resources:`, `events:`. Research lives in the session scratchpad JSON
(5 regional files); facts came only from fetched official pages, and
where an office could not be verified (Ward, Empire) the page says so.

Why it should move traffic: the pages target the long tail the blitz
skipped (mountain and plains towns with no competitor page at all),
carry the snow-load / frost-depth / WUI figures the county publishes
(matches what AI Overviews and PAA quote), and the resources block is the
kind of genuinely useful local content that earns .gov-adjacent
relevance and dwell time. Nav: /locations is now linked region lists +
county cards (the 100-image card grid is gone); each city page shows
same-county neighbors instead of every other city.

Maintenance: events are annual — refresh each winter with the location
events sweep; resources phone/URL rot should be spot-checked twice a
year (a broken .gov link is worse than none). Two counties have no hub on
purpose: Denver and Broomfield are city-counties with one page each.

## Measurement cadence

- **Fridays**: channel scorecard (ads plan doc) — GA4 puller once the key
  lands (`npm run analytics`).
- **~Oct 1**: Semrush position re-pull (this MCP); compare against the
  Sept 11 baseline table in this file's git history.
- **Monthly**: GSC queries containing "deck" (per owner-checklist) +
  keyword-count trend (resource_rank_history).
- Semrush Traffic/Audience analytics: requires plan upgrade — not
  recommended; GA4 covers it first-party.

## Workstream 6 — Local hub pages (SHIPPED 2026-09-15)

Every one of the 121 location pages (103 towns + 15 county hubs + Denver and
Broomfield) is now a local resource hub that leads the page — the brief was
"beat the city's own homepage": an at-a-glance strip (3–4 featured numbers +
facts), a dated **calendar** for the rest of 2026 (grouped by month, past
items hidden automatically, daily ISR so it stays current between deploys),
a **who-to-call directory** grouped emergency / city hall & services /
utilities / permits & building / community plus five statewide lines
(911, 811, 511, 988, poison control), and **quick links** into the official
site (report a problem, pay a bill, calendar, agendas, trash, snow, permits,
alerts). The deck copy, FAQs, projects and map follow below it. Totals at
ship: 905 dated happenings, 1,891 verified contacts, 711 quick links,
822 facts. `/llms-full.txt` carries all of it.

Mechanics: frontmatter keys `facts:`, `calendar:` (ISO dates), `resources:`
(now with `category` and `featured`), `links:`, `hubUpdated:`; rendered by
`components/locations/local-hub.tsx`; schema enforced by
`npm run content:validate`. Research was done per town by agents writing JSON
(one file per slug) that `scripts/merge-location-research.mjs` folds into the
frontmatter without touching anything else — reuse that for every refresh.
Every phone/URL was copied from an official page fetched that day; agents
were told to omit rather than guess, so a missing entry means "could not be
verified", not "does not exist".

Maintenance:
- **Seasonal calendar refresh** (early Jan, early May, early Sept): re-run the
  research for `calendar:` (and prune the past items the validator warns
  about); the annual `events:` list only needs a yearly check.
- **Twice a year**: `node scripts/check-location-links.mjs` — 403s are bot
  walls, not dead pages; fix real 404s.
- Known unverifiable-at-ship gaps to close by phone: Ward and La Salle fire
  districts; Berthoud library/chamber (dead domains); Eaton PD line (site is
  Cloudflare-walled); Palmer Lake Star Lighting, Monument Small Town
  Christmas, Fountain fall/holiday and Breckenridge holiday 2026 dates (not
  published yet); Denver Zoo Lights 2026 dates.
