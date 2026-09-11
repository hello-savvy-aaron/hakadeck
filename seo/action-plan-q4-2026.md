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

## Measurement cadence

- **Fridays**: channel scorecard (ads plan doc) — GA4 puller once the key
  lands (`npm run analytics`).
- **~Oct 1**: Semrush position re-pull (this MCP); compare against the
  Sept 11 baseline table in this file's git history.
- **Monthly**: GSC queries containing "deck" (per owner-checklist) +
  keyword-count trend (resource_rank_history).
- Semrush Traffic/Audience analytics: requires plan upgrade — not
  recommended; GA4 covers it first-party.
