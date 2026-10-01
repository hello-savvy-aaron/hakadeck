# Improvement Plan — October 2026

Shared doc for Aaron + Pete (same plan, with a growth chart and checkboxes):
https://claude.ai/code/artifact/96f7ed51-d153-49e3-aefb-a6825e5ac90a

Built 2026-10-01 from a Semrush MCP sweep (rank history, 112-keyword organic
list, top pages, organic competitors, competitor top pages, backlinks
overview + newest referring domains, old-domain check, site audit of
2026-09-19), GA4 (`npm run analytics` + a landing-page/campaign breakdown),
Google Autocomplete for gap topics, and the "SEO improvements" session's
Position Tracking read. Semrush API units hit **zero** mid-sweep (keyword-gap
and newer audit reports didn't run); topic volumes below marked
"autocomplete" are demand signals, not Semrush volumes. Companion to
`action-plan-q4-2026.md` and `backlink-plan.md`.

## TL;DR

1. **Organic is working.** 0 → 112 ranking keywords in four months;
   top-10 count 1 → 9 since Sept 11; GA4 organic sessions 78 → 148 per 28
   days; total users 244 → 494.
2. **The map pack is the miss.** 76 of our 112 keywords show a local pack
   and Haka holds **0 of 9 pack spots every day**. Freedom Deck Builders
   (5.0★/115 reviews, GBP post Sept 24) just took three #1s through the
   pack. GBP activity, reviews, citations and the 301 move this, not more
   pages.
3. **Authority still caps page 2.** AS 2 → 6 and referring domains 68 →
   142, but every one of the 60 newest is .shop/casino/pharma spam (first
   seen Sept 16–Oct 1). Every real-link checklist item is still open.
4. **Paid is leaking.** 186 of the 213 "August Search Blitz" sessions
   arrive via the **Display Network** (43% engaged), and GA4's key event
   is `quote_click` (a button click), not `generate_lead` (a submitted
   form). Conversion bidding is learning from the wrong signal.
5. **Next content = near-page-1 pushes + small-jobs/winter topics**
   (resurfacing, ice melt on composite, stair stringers, "does a deck add
   value"), not more location pages.

## In motion right now (don't duplicate)

| Work | Owner | State |
|---|---|---|
| hakaconstruction.com → www.hakadecks.com 301 | session "Hakkaconstruction to Hakkadecks redirect" | `next.config.ts` Wix-path redirects uncommitted; DNS = edit only A @ + CNAME www at GoDaddy. Domain expires **2026-12-08** |
| Semrush On Page SEO Checker ideas (Sept 25) | session "Ideas table improvement" | Homepage `WebSite` schema fix (`significantLink` = the audit's 2 errors), trex-vs post, stairs/railings cost guide, financing post, highlands-ranch — uncommitted |
| "SEO improvements" session | analysis only | Stood down on edits; triage notes relayed to the ideas session |

Everything below picks up after those land.

## Scorecard — Sept 11 baseline vs now

| Metric | Sept 11 | Now | Source |
|---|---|---|---|
| Keywords in top 100 (US) | 80 | **112** | Semrush rank history (Sept 15 snapshot) |
| Top 3 / 4–10 | 0 / 1 | **1 / 8** | same |
| 11–20 / 21–30 | 9 / 14 | **27 / 20** | same |
| Authority Score | 2 | 6 | backlinks_overview (inflated by spam) |
| Referring domains | 68 | 142 | same; newest 60 all spam |
| Local pack / PAA / AI Overview on our keywords | 51 / 69 / 23 (of 80) | 76 / 102 / 39 (of 112) | rank history SERP features |
| Map-pack spots held | — | **0 of 9 daily** | Position Tracking (national campaign) |
| GA4 users, 28 days | 244 | **494** | `npm run analytics` |
| Organic sessions, 28 days | 78 | **148** (68 land on `/`, mostly brand) | GA4 |
| AI Assistant sessions | 24 | 14 (3 key events) | GA4 |
| `generate_lead`, 28 days | 13 | 15 | GA4 |

Caveat: Semrush's latest monthly snapshot is Sept 15 and most rows show
previous = current position, so the Sept 11 pushes are mostly **not
measured yet**. Recheck after the Oct 15 snapshot.

### Sept 11 pushed terms

| Term | Vol | Sept 11 | Now | Note |
|---|---|---|---|---|
| littleton decks | 140 | — | **#4** | |
| deck services littleton | 140 | #55 | **#15** | moved |
| littleton co deck builders / deck builder littleton / littleton deck builder | 110–170 | #19–28 | #19 / #20 / #28 | not refreshed yet |
| highlands ranch deck builder | 210 | #16 | #16 | |
| deck installation aurora | 110 | #24 | #24 | |
| custom deck design castle pines | 50 | #14 (castle-rock) | #14 (castle-rock) | still cannibalized; castle-pines page #58 for "custom decks castle pines" |
| fiberon vs trex / trex vs fiberon / fiberon vs timbertech | 590 / 210 / 140 | #59 / #53 / #52 | same | not refreshed yet |
| covered deck prices | 40 | #17 | not in list | watch |

## P0 — this week

1. **Google Ads: turn off "Include Google Display Network"** on August
   Search Blitz (Ads → campaign settings → Networks). 186 of its 213 GA4
   sessions are Display. *Pete/Aaron in the Ads UI.*
2. **Fix the conversion signal.** GA4 Admin → Events: mark
   `generate_lead` and `call_click` as key events and unmark
   `quote_click` (47 clicks vs 15 real leads in 28 days). In Google Ads,
   make `generate_lead` + calls the primary conversions and `quote_click`
   secondary. Also find the "(cross-network)" source (17 sessions, 6%
   engaged) and kill it if it's PMax/Demand Gen.
3. **Land the 301** (in motion), then GSC Change of Address, and confirm
   **auto-renew** on hakaconstruction.com (expires 2026-12-08: mail and
   redirect both die if it lapses).
4. **Localize Position Tracking** to ZIP **80112** with business name
   "Haka Decks" so map-pack rank is measured where Pete actually competes.
   The current campaign is national (no ZIP).
5. **Semrush housekeeping:** raise the Site Audit page limit from 100 to
   ≥300. The sitemap has 192 URLs, so ~90 pages (most location pages)
   were never audited, and that's also why the On Page SEO Checker says
   "make your page crawlable". Budget API units: this sweep cost ~5.8k
   units. Pricey reports: `backlinks_refdomains` 40/row,
   `domain_organic_organic` 1,000/call, `resource_organic` 10/row.

## P1 — Map pack / GBP program (the biggest gap)

Evidence: local pack on 76 of 112 keywords; 0 of 9 pack spots daily;
Freedom won "deck builder near me", "deck contractor near me" and "deck
installation highlands ranch" via the pack with 115 reviews (Haka ~90), a
GBP post on Sept 24, and a Littleton 80125 address. Review *count* is
close; recency, GBP activity, citations and proximity are the gap.

Pete:
- **Weekly GBP post**: photo from the current job plus a link to the
  matching guide, with `?utm_source=google&utm_medium=organic&utm_campaign=gbp`.
  Last post found was July 16.
- **Review ask after every job** via the direct `g.page/r/…/review` link,
  asking the customer to name the town and the work ("deck repair in
  Littleton").
- **GBP basics** still open in `owner-checklist.md`: Services list =
  every service page, seed Q&A, secondary categories.
- **Citations** still open: BBB name/domain, Yelp duplicate merge, Apple
  Business Connect claim, Angi old-address fix, Bing Places city fix,
  Houzz, Nextdoor, Facebook.
- **Bing Places matters more than assumed**: Bing + Yahoo + MSN +
  DuckDuckGo = 34 of 148 organic sessions (23%), and ChatGPT search runs
  on Bing.

## P1 — Authority (off-page)

- Freedom's real links are a ready-made target list: **BBB, Nextdoor,
  YP/Superpages, Expertise.com "Best Denver Deck Contractors", NADRA, and
  UFPI/Deckorators**. NADRA (North American Deck and Railing Association)
  is new — not in `backlink-plan.md`. A membership directory link is
  legitimate and on-topic.
- Manufacturer locators: Trex Find-a-Builder (Platinum Pro), Deckorators
  (Pro Elite), TimberTech. Still the cheapest real links available.
- **Snow-load PR pitch: prep now.** Denver's first snow usually arrives
  in October. The "how much snow can a deck hold" post ranks #7, and Pete
  is the quotable local pro.
- Spam: ~74 junk domains appeared Sept 16–Oct 1. Take no action (Google
  ignores it; `disavow.txt` rule stands), and don't read AS 6 as
  progress. The metric is "referring domains with AS ≥ 20".

## P2 — On-page pushes (after the ideas session lands)

| Term | Vol | Pos | Page | Move |
|---|---|---|---|---|
| add roof to existing deck / adding roof… / cost to add roof to deck | 110 / 110 / 50 | #10 / #15 / #21 | add-roof post | Answer-box cost table under the cost H2; inbound links from covered-deck-cost, pergolas service, polycarbonate guide with anchor "add a roof to an existing deck" |
| deck sleepers over concrete | 90 | #13 | deck-over-concrete | Add a "sleepers" H2 |
| deck boards cupping | 90 | #16 | deck-boards-cupping | Bold direct answer + photo |
| custom decks colorado | 170 | #13 | /deck-design-ideas-colorado | 608 words vs 1,522 top-10 average: add project photos, ordered idea list |
| trex deck denver / trex decking denver / trex installer | 110 / 50 / 90 | #16 / #29 / #34 | /trex-deck-builder-denver | "Trex installer" phrasing; Denver page links it (0× "Trex" today) |
| littleton deck repair / deck repair idaho springs co / deck repair aurora co | 170 / 170 / 40 | #67 / #87 / #15 | city pages | "Deck repair in {city}" H2s (Littleton's "Small jobs before the snow" → rename); /services/deck-repair links them with city anchors |
| decking inspection / deck safety inspections | 110 / 90 | #56 / #58 | safety guide | Guide is DIY intent; searchers want a service. See owner decisions |
| decks greenwood village | 50 | #14 via centennial | centennial → GV | centennial.mdx has 0 links to /locations/greenwood-village; add a descriptive one. Check GV is indexed |
| deck contractors in federal heights | 40 | #22 via /locations | federal-heights | Page not ranking at all → GSC indexing check |
| how much snow can a deck hold | 40 | #7 | snow post | Seasonal: `updated:` stamp + GBP post at first snow |

Cannibalization:
- **Denver: homepage vs /locations/denver.** Both titles target "custom
  decks Denver" and Google splits them: "denver custom decks" home #18 /
  denver #68; "custom decks denver colorado" home #22 / denver #66;
  "decks denver" home #17 / denver #55; "custom deck denver" denver #13 /
  home #43. Proposal: the homepage owns "custom decks Denver" (it wins 4
  of 5 variants). Re-aim /locations/denver at "Denver deck builder / deck
  company / deck building" (#27–34 today) plus the neighborhoods, then
  retitle it and align internal anchors. Note the `app/layout.tsx`
  comment assumes the hub owns "custom decks denver"; the data says
  otherwise. *Aaron's call.*
- **Castle Pines:** castle-rock's link to castle-pines uses the anchor
  "its own page". Make it descriptive ("custom decks in Castle Pines").

## P2 — New content (small jobs + winter, matched to demand)

1. **Deck resurfacing: replace deck boards with composite and keep the
   frame.** Autocomplete: "deck resurfacing cost / companies near me",
   "replace deck boards with trex cost", "deck board replacement labor
   cost". Only 2 files mention it today. Commercial, small-job, plays to
   composite certs.
2. **Can you use ice melt on a composite deck? (+ shoveling Trex).**
   Seasonal Oct–Mar, AEO-shaped. Only passing mentions in 3 winter posts.
3. **Rotting deck stair stringer repair**, carried from the Q4 plan (70
   vol, KD 7), plus "deck stairs code / with landing".
4. **Does a deck add value to a Denver home?** Strong autocomplete.
   Doubles as the realtor-outreach asset from `backlink-plan.md`. Source
   every number.
5. **How long does composite decking last?** Trex / TimberTech / Fiberon
   lifespans and warranties; links the warranties guide.
6. **Patio cover styles: gable vs shed vs flat.** Freedom's version ranks
   for 23 keywords; we have polycarbonate and add-roof posts but no styles
   comparison.
7. **Deck demolition & removal cost**: a section in
   deck-replacement-cost, not a new page.
8. **More symptom posts.** These already pull organic landings
   (pulling-away: 8 sessions + 1 lead; over-concrete: 5; bouncy: 4).
   Candidates: ledger-board rot/flashing, soft spots in deck boards, post
   rot at the base. Validate volume when Semrush units refresh.

Owner decisions before writing:
- **Deck staining / refinishing?** "deck staining denver" and "deck
  refinishing denver" show in autocomplete. If yes, write a spring service
  page in February.
- **Paid deck inspection offer?** It would let the safety guide convert
  the 110 + 90 + 50 inspection searches.
- **Gazebos?** Freedom ranks for "gazebo builder in Denver" (29 keywords).
  Only worth a page if Haka builds them.

## P3 — Portfolio and proof

- Six project pages vs Freedom's city-tagged `/projects/...` pages. The
  library holds 36 Instagram photos and 23 of Pete's photos that aren't
  catalogued. Build 8–12 project pages tagged city + material + scope
  ("Composite deck replacement in Littleton"), each linked from its city
  page. *Needs Pete: city, year, materials, scope per job.*
- `/contact` is the audit's one low-word-count page. Coordinate with the
  contact redesign: add "what happens after you submit" plus the service
  area.

## P3 — AI search

- ChatGPT: 14 sessions → 3 key events (vs Google organic 9 / 114).
  Volume is small but it converts.
- LLMs cite listicles, so the Expertise.com nomination doubles as an
  AI-citation play.
- Bing Webmaster Tools: confirm the IndexNow submissions show up (open
  since Sept 11).

## Measurement

- **Weekly**: Position Tracking localized to 80112, tracking map-pack
  share and the pushed terms.
- **Fridays**: `npm run analytics`. After Display is off, expect fewer
  sessions and higher engagement; `generate_lead` is the number that
  matters.
- **After the Oct 15 Semrush snapshot** (needs units): `resource_organic`
  (~1.2k units) to recheck the tables above, plus `backlinks_overview`
  (40). Skip full `backlinks_refdomains` pulls; filter to AS ≥ 20.
- **Jan**: "2026" → "2027" in cost guides; location calendar refresh
  (already scheduled).
