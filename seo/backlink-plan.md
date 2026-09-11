# Backlink Plan — September 2026

Pulled 2026-09-11 from the Semrush MCP (backlinks_overview, backlinks,
backlinks_refdomains on hakadecks.com, the three old domains, and five
organic competitors). Companion to `action-plan-q4-2026.md` Workstream 2
and `owner-checklist.md` Phase 4b. Everything in **bold** is owner-side.

## Where we stand

| Metric | hakadecks.com |
|---|---|
| Authority Score | 2 |
| Referring domains | 68 |
| Follow / nofollow links | 50 / 26 |
| Referring domains that are real | 4 |

The four real ones: dexknows.com (AS 35, nofollow directory listing),
decks101.com (AS 2, deck directory), parse.gl (a shared ChatGPT
conversation that cites our Trex-vs-TimberTech post — proof the AI channel
is reading us), and hellosavvy.design (Aaron's agency portfolio, dofollow).
The other 64 are link-farm listing pages, casino/PBN sellers, and fake
"Fiverr testimonial" blogs. They are now all in `disavow.txt` (54 domains);
the header rule still applies — hold unless a manual action appears.

## Finding 1 — the old brand domain holds our best links

hakaconstruction.com is still live (200, "HOME | Haka Construction") and
carries the citations the business earned before the rebrand:

| Referring domain | AS | Note |
|---|---|---|
| yellowpages.com | 60 | old listing, links old domain |
| homeadvisor.com | 54 | same stale record as Angi (old Englewood address) |
| dexknows.com | 35 | 2 links |
| superpages.com | 35 | YP network |
| n49.com | 32 | Canadian/US directory, 2 links |
| coldlytics.com | 27 | data aggregator |
| bikestreets.com | 26 | Denver nonprofit — likely a sponsor/thanks link |
| bye.fyi | 24 | scraper, ignore |

hakadeck.com (404) and hakapatio.com (dead) carry only spam — nothing to
transfer. So the domain work is one domain, and it is worth roughly
**doubling our real referring domains** in a single DNS change:

1. **301 hakaconstruction.com (apex + www) → https://www.hakadecks.com/**
   at the registrar/host. Path-preserving if the old site's URLs map;
   otherwise everything to the homepage is fine. This also ends the
   split-identity problem for "haka construction" brand searches.
2. **Then update the source listings** so the links point at the new
   domain directly (a 301 passes most value; a direct link passes all of
   it and fixes NAP): Yellow Pages, HomeAdvisor/Angi (ID 123289411),
   Superpages, DexKnows, n49. These are the same records in the
   citations audit — one pass fixes name, address, and link together.
3. **bikestreets.com** — find the page (Semrush lists 1 link), and ask
   them to update the URL; a Denver nonprofit link is exactly the kind
   Google trusts.

## Finding 2 — the competitor link gap (what they have, we don't)

Real-authority domains linking to at least one of centennialdecks.com,
deckdoctorinc.com, deckbuilderofco.com, westernskydesigns.com,
denverdeckbuilder.com, and not to us. Grouped by effort.

### Free, self-serve (do this month)

| Source | AS | Who has it | How |
|---|---|---|---|
| trex.com | 55 | denverdeckbuilder | **TrexPro "Find a Builder" locator** — we're Platinum Pro; ask the Trex rep to activate the profile with the website field set |
| deckorators.com | 43 | westernskydesigns | **Deckorators Pro Elite installer locator** — same, via the Deckorators rep |
| timbertech.com | — | none yet | **TimberTech contractor locator** — first mover among the local set |
| bbb.org | 78 | 3 of 5 competitors | **BBB profile update** — already A+ under "Haka Construction, LLC"; change name + domain (owner-checklist). Accreditation optional |
| expertise.com | 44 | 3 of 5 | "Best Deck Builders in Denver" list — **submit/claim**; they curate but accept nominations |
| yellowpages.com / superpages.com | 60 / 47 | 4 of 5 | Fix the old record (Finding 1) rather than creating a new one |
| homeadvisor.com | 56 | 2 of 5 | Same — fix record |
| pinterest.com | 100 | denverdeckbuilder | **Pinterest business account**, website verified; pin the portfolio. Nofollow, but a brand/entity signal AI engines read |
| provenexpert.com | 51 | westernskydesigns | Free review-profile site; claim with website link |
| houzz.com | — | — | Still no profile (citations audit). Dofollow pro profile + the best outdoor-living lead directory. **Create it** |
| nextdoor.com | — | — | **Business page** — free, local, and the neighbors-recommend loop feeds GBP |
| bubblelife.com | 33–35 | 3 of 5 | Local news aggregator with free business listings; post the winter-deck articles there |
| bestprosintown.com, hub.biz, bunity.com, bizidex.com, freelistingusa.com, nearmelisting.com, whatsyourhours.com | 20–44 | 1–2 each | Low-value citation sites; batch them in one afternoon with the canonical NAP, nothing more |

### Earned (worth a conversation)

| Source | AS | Angle |
|---|---|---|
| castlerockco.com | 17 | Town site links deckbuilderofco (2 links) — likely a chamber/business-directory page. **Join the Castle Rock Chamber**; same for South Metro Denver Chamber |
| denverrescuemission.org | 38 | deckbuilderofco has a link — sponsorship/volunteer page. If Haka does a community build or donation, ask for the thank-you link |
| diamondcertified.org | 37 | Paid certification with a real vetting process; 4 links to deckbuilderofco. Consider after the free tier is done |
| contractortalk.com | 29 | 78 links to deckbuilderofco — a forum signature. Pete answering deck questions there once a week is cheap E-E-A-T |
| thebuildermarket.com | 22 | Contractor directory with dofollow profiles (16 links to denverdeckbuilder) |
| costhelper.com, ehow.com, thehonestcarpenter.com | 18–47 | Cited as sources — our cost guides are the asset. See "site-side" below |
| coldwellbanker.com | 60 | A realtor blog linked deckdoctorinc. Pitch the "does a deck add value" angle to 2–3 Denver realtor teams |

### Seasonal PR (already in the action plan)

When the first big snow is forecast, pitch Denver TV/news the "how much
snow can a deck hold" angle with Pete as the quotable pro. One landed quote
beats everything in the tables above.

## Site-side (I do this)

- [x] `disavow.txt` updated with the 2026-09-11 sweep (hold, don't submit).
- [x] Linkable assets exist: cost guide, permit guide, snow-load post,
  safety-inspection guide, DIY checklist — all ungated and citable.
- [ ] Once the manufacturer locator profiles, Houzz, BBB, Pinterest, and
  Nextdoor exist, add them to `sameAs` in `lib/site.ts` / the business
  JSON-LD so the entity graph ties the profiles together.
- [ ] After the 301 lands: verify `curl -I hakaconstruction.com` → 301 to
  www.hakadecks.com, then re-pull backlinks_refdomains in ~4 weeks and
  expect the YP/HomeAdvisor/DexKnows/Superpages/n49 domains to appear.
- [ ] Re-pull this report monthly with the Semrush MCP; the metric that
  matters is "referring domains with AS ≥ 20", not the total.

## Priority order for Pete / Aaron

1. 301 hakaconstruction.com → www.hakadecks.com (10 minutes at the host).
2. Trex + Deckorators + TimberTech locator profiles (three emails to reps).
3. Fix the Yellow Pages / HomeAdvisor-Angi / Superpages / DexKnows / n49
   records: new name, Centennial address, new domain.
4. BBB name/domain update; claim Apple Maps; merge the Yelp duplicate.
5. Create Houzz, Nextdoor, Pinterest, ProvenExpert.
6. expertise.com nomination; Castle Rock + South Metro chamber memberships.
7. Snow-season PR pitch (November).
