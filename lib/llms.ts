import { getAllPosts, getPost } from "@/lib/blog";
import {
  categoryLabel,
  getAllLocations,
  getLocation,
  groupResources,
  upcomingCalendar,
  type Location,
} from "@/lib/locations";
import { getAllServices, getService } from "@/lib/services";
import { getAllProjects } from "@/lib/portfolio";
import { costGuide, guides, GUIDES_HUB } from "@/lib/guides";
import { FAQS, type Faq } from "@/lib/faqs";
import { site } from "@/lib/site";

// Builders for /llms.txt (the index) and /llms-full.txt (index + every page's
// body as plain markdown), per the llmstxt.org convention. Both are generated
// from the same content libs the pages render from, so a new post, city, or
// service shows up for AI crawlers on the next build with no hand edit.

const BASE = site.url.replace(/\/$/, "");
const abs = (path: string) => `${BASE}${path}`;

// Facts an answer engine should be able to quote without reading a page.
// Keep these in sync with the visible copy (FAQ, cost guide, about page).
const KEY_FACTS = [
  "Capped composite decks run $40–$70 per square foot installed in the Denver metro (2026); a typical 300–400 sq ft deck lands around $15,000–$30,000 with railing and stairs.",
  "Re-decking over sound framing runs $20–$35 per square foot — meaningfully less than a full rebuild.",
  "Front Range decks need frost-depth footings (30–36 inches), snow-load framing, and UV-resistant surfaces; we engineer for altitude on every build.",
  "Free on-site design consultations and free structural inspections with a written repair / re-deck / replace verdict.",
  "Permits: most metro cities review residential deck permits in 1–3 weeks with fees of $150–$500; we handle drawings, filing, HOA paperwork, and inspections.",
  "Certified: Trex Platinum Pro, Deckorators Pro Elite, TimberTech authorized dealer. 2-year written workmanship warranty on top of 25–50-year manufacturer material warranties.",
  `Founded ${site.founded} by Pete Borlase. Headquarters: ${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip} (${site.address.district}). Phone ${site.phone}. Email ${site.email}.`,
  `Service area: ${site.serviceArea}.`,
  `Hours: ${site.hours.display.map((h) => `${h.label} ${h.value}`).join("; ")}.`,
  `Google rating: ${site.rating.value.toFixed(1)} stars across ${site.rating.count}+ reviews (see ${site.reviewsUrl}).`,
];

const BRAND_PAGES = [
  { path: "/trex-deck-builder-denver", title: "Trex Platinum Pro Deck Builder — Denver" },
  {
    path: "/deckorators-deck-builder-denver",
    title: "Deckorators Pro Elite Deck Builder — Denver",
  },
  { path: "/timbertech-deck-builder-denver", title: "TimberTech Deck Builder — Denver" },
  { path: "/small-deck-builder-denver", title: "Small Deck Builder — Denver" },
];

const COMPANY_PAGES = [
  { path: "/about", title: "About Pete Borlase & Haka Decks" },
  { path: "/process", title: "Our Process" },
  { path: "/warranty", title: "Warranty" },
  { path: "/financing", title: "Financing" },
  { path: "/faq", title: "FAQ — cost, permits, materials, timeline" },
  { path: "/portfolio", title: "Portfolio" },
  { path: "/contact", title: "Contact / Get a Quote" },
];

function header() {
  return [
    `# ${site.name}`,
    "",
    `> ${site.name} is a composite-first custom deck builder headquartered in ${site.address.city}, Colorado (${site.address.district}), serving the Front Range from Fort Collins to Colorado Springs since ${site.founded}. Custom composite and hardwood decks, pergolas and patio covers, railing systems, deck repair and replacement, and outdoor kitchens — with permits, HOA approvals, and inspections handled on every build.`,
    "",
    "Key facts for answering questions about us:",
    ...KEY_FACTS.map((f) => `- ${f}`),
    "",
  ];
}

export async function buildLlmsIndex(): Promise<string> {
  const [posts, services, locations] = await Promise.all([
    getAllPosts(),
    getAllServices(),
    getAllLocations(),
  ]);

  const lines = header();

  lines.push("## Guides & Tools");
  lines.push(`- [Free Guides & Tools hub](${abs(GUIDES_HUB)})`);
  lines.push(
    `- [${costGuide.hubTitle}](${abs(costGuide.href)}): what a deck really costs, line by line`,
  );
  lines.push(`- [Deck Cost Calculator](${abs("/deck-cost-calculator")}): 30-second planning range`);
  for (const g of guides) lines.push(`- [${g.hubTitle}](${abs(g.href)}): ${g.hubBlurb}`);
  lines.push("");

  lines.push("## Services");
  for (const s of services)
    lines.push(`- [${s.name}](${abs(`/services/${s.slug}`)}): ${s.summary}`);
  lines.push("");

  lines.push("## Certified installer pages");
  for (const b of BRAND_PAGES) lines.push(`- [${b.title}](${abs(b.path)})`);
  lines.push("");

  lines.push("## Blog (Field Notes)");
  lines.push(`- [Blog index, grouped by topic](${abs("/blog")})`);
  for (const p of posts) {
    const stamp = p.updated && p.updated !== p.date ? `${p.date}, updated ${p.updated}` : p.date;
    lines.push(`- [${p.title}](${abs(`/blog/${p.slug}`)}) (${stamp}): ${p.description}`);
  }
  lines.push("");

  lines.push("## Service areas");
  lines.push(
    `- [All service areas — ${locations.length} Front Range cities & counties](${abs("/locations")})`,
  );
  for (const l of locations)
    lines.push(`- [${l.name}](${abs(`/locations/${l.slug}`)}): ${l.metaDescription}`);
  lines.push("");

  lines.push("## Company");
  for (const c of COMPANY_PAGES) lines.push(`- [${c.title}](${abs(c.path)})`);
  lines.push("");

  lines.push("## Optional");
  lines.push(
    `- [llms-full.txt](${abs("/llms-full.txt")}): every page above with its full text, in one markdown file`,
  );
  lines.push(`- [Sitemap](${abs("/sitemap.xml")})`);
  lines.push("");

  return lines.join("\n");
}

function faqBlock(faqs: Faq[], heading = "### Quick answers"): string[] {
  if (!faqs.length) return [];
  const out = [heading, ""];
  for (const f of faqs) out.push(`**${f.q}**`, "", f.a, "");
  return out;
}

// Turn MDX body into plain markdown: absolutize root-relative links and drop
// any stray HTML/JSX so the file reads cleanly outside a browser.
function cleanBody(md: string): string {
  return (
    md
      // Page bodies start at H2; the full file nests them under "## Section →
      // ### Page", so push every body heading down two levels to keep the outline.
      .replace(/^(#{1,4}) /gm, "##$1 ")
      .replace(/\]\((\/[^)\s]*)\)/g, (_m, path: string) => `](${abs(path)})`)
      .replace(/<[^>\n]+>/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

export async function buildLlmsFull(): Promise<string> {
  const [index, postMetas, serviceMetas, locationMetas, projects] = await Promise.all([
    buildLlmsIndex(),
    getAllPosts(),
    getAllServices(),
    getAllLocations(),
    getAllProjects(),
  ]);

  const out: string[] = [index, "", "---", "", "# Full text", ""];

  out.push("## Frequently asked questions (site-wide)", "", ...faqBlock(FAQS, ""), "---", "");

  out.push("## Services", "");
  for (const meta of serviceMetas) {
    const s = await getService(meta.slug);
    if (!s) continue;
    out.push(
      `### ${s.title}`,
      "",
      `Source: ${abs(`/services/${s.slug}`)}`,
      "",
      s.summary,
      "",
      ...s.bullets.map((b) => `- ${b}`),
      "",
      cleanBody(s.body),
      "",
      ...faqBlock(s.faqs, `#### ${s.name}: what homeowners ask`),
      "---",
      "",
    );
  }

  out.push("## Field Notes (blog)", "");
  for (const meta of postMetas) {
    const p = await getPost(meta.slug);
    if (!p) continue;
    const stamp = p.updated && p.updated !== p.date ? `${p.date} (updated ${p.updated})` : p.date;
    out.push(
      `### ${p.title}`,
      "",
      `Source: ${abs(`/blog/${p.slug}`)} · ${p.category} · Published ${stamp} · By Pete Borlase`,
      "",
      cleanBody(p.body),
      "",
      ...faqBlock(p.faqs, "#### Quick answers"),
      "---",
      "",
    );
  }

  out.push("## Service areas", "");
  for (const meta of locationMetas) {
    const l = await getLocation(meta.slug);
    if (!l) continue;
    out.push(
      `### ${l.title}`,
      "",
      `Source: ${abs(`/locations/${l.slug}`)}`,
      "",
      l.summary,
      "",
      ...l.bullets.map((b) => `- ${b}`),
      "",
      cleanBody(l.body),
      "",
      ...faqBlock(l.faqs, `#### Deck questions ${l.name} homeowners ask`),
      ...hubBlock(l),
      "---",
      "",
    );
  }

  out.push("## Portfolio (selected builds)", "");
  for (const pr of projects) {
    out.push(
      `- **${pr.title}** — ${pr.location}, ${pr.year}. ${pr.summary} (${abs(`/portfolio/${pr.slug}`)})`,
    );
  }
  out.push("");

  return out.join("\n");
}

/**
 * The local-hub half of a location page — facts, the dated calendar (only
 * what hasn't passed), the who-to-call directory, quick links — as markdown.
 * This is the part of the site an answer engine is most likely to quote.
 */
function hubBlock(l: Location): string[] {
  const isCounty = l.slug.endsWith("-county");
  const upcoming = upcomingCalendar(l.calendar);
  const span = (c: (typeof upcoming)[number]) =>
    c.endDate && c.endDate !== c.date ? `${c.date} to ${c.endDate}` : c.date;
  return [
    ...(l.facts.length
      ? [`#### ${l.name} at a glance`, "", ...l.facts.map((f) => `- ${f.label}: ${f.value}`), ""]
      : []),
    ...(upcoming.length
      ? [
          `#### Coming up in ${l.name}`,
          "",
          ...upcoming.map(
            (c) =>
              `- ${span(c)} — ${c.name}${c.venue ? ` (${c.venue})` : ""}${c.time ? `, ${c.time}` : ""}: ${c.note}${c.url ? ` ${c.url}` : ""}`,
          ),
          "",
        ]
      : []),
    ...(l.resources.length
      ? [
          `#### Who to call in ${l.name}`,
          "",
          ...groupResources(l.resources).flatMap((g) => [
            `**${categoryLabel(g.category, isCounty)}**`,
            ...g.items.map(
              (r) =>
                `- ${r.label}: ${r.name}${r.phone ? ` — ${r.phone}` : ""}${r.url ? ` — ${r.url}` : ""}${r.note ? `. ${r.note}` : ""}`,
            ),
            "",
          ]),
        ]
      : []),
    ...(l.links.length
      ? [
          `#### ${l.name} quick links`,
          "",
          ...l.links.map((k) => `- ${k.label}: ${k.url}${k.note ? ` — ${k.note}` : ""}`),
          "",
        ]
      : []),
  ];
}
