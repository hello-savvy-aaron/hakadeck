import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { Faq } from "@/lib/faqs";

const LOCATIONS_DIR = join(process.cwd(), "content", "locations");

// A recurring community tradition shown under the dated calendar. `when` is a
// human-readable recurrence ("Every September", "Night after Thanksgiving"),
// not a machine date — these are the evergreen local-relevance signals.
export type LocationEvent = {
  name: string;
  when: string;
  note: string;
};

// A dated happening in the town — festival, tree lighting, leaf drop-off day,
// election. Dates are ISO (YYYY-MM-DD) so the page can hide what has passed
// and group the rest by month. `endDate` covers multi-day runs and recurring
// series ("Every Saturday through Oct 31" lives in `note`).
export type CalendarItem = {
  name: string;
  date: string;
  endDate?: string;
  time?: string;
  venue?: string;
  note: string;
  url?: string;
  host?: string;
  tag?: string;
};

// The directory is grouped by these, in this order, on the page.
export const RESOURCE_CATEGORIES = [
  "emergency",
  "city",
  "utilities",
  "building",
  "community",
] as const;
export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];

// A verified local office a resident might actually call — police
// non-emergency, the fire district, trash, the permit counter. Phone/URL are
// copied from the official site; `label` is the homeowner-facing purpose
// ("Deck permits"). `featured` puts it in the at-a-glance strip (3–4 per page).
export type LocationResource = {
  category: ResourceCategory;
  label: string;
  name: string;
  phone?: string;
  url?: string;
  address?: string;
  hours?: string;
  note?: string;
  featured?: boolean;
};

// "Population — ≈45,600 (2024 est.)": short verified facts for the glance strip.
export type LocationFact = {
  label: string;
  value: string;
};

// Quick links into the official site: report a problem, pay a bill, calendar.
export type LocationLink = {
  label: string;
  url: string;
  note?: string;
};

export type LocationMeta = {
  slug: string;
  // County display name ("Douglas County"). Links the city page to its county
  // hub (/locations/<kebab>) and groups neighbors in the footer strip.
  county?: string;
  // City name for cards, headings, and areaServed (e.g. "Centennial").
  name: string;
  // Local-intent H1 for the detail page (e.g. "Deck Builder in Centennial, Colorado").
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  image: string;
  // Optional override for the hero image's alt text. The default asserts the
  // build is "near" this city — set this on pages whose hero shows a project
  // from elsewhere so the alt stays truthful.
  imageAlt?: string;
  bullets: string[];
  // Portfolio slugs of real builds in or near this city — curated, not
  // auto-matched, so "near" stays honest.
  projects: string[];
  // Query string for the embedded Google map (e.g. "Centennial, CO").
  mapQuery: string;
  order: number;
  // City-specific Q&As rendered as an accordion + FAQPage JSON-LD.
  faqs: Faq[];
  // Verified recurring community traditions — curated by hand, not scraped.
  events: LocationEvent[];
  // Dated happenings for the months ahead (see CalendarItem). Refreshed each
  // season; the page only renders what hasn't passed.
  calendar: CalendarItem[];
  // Verified civic contacts for this city (see LocationResource).
  resources: LocationResource[];
  facts: LocationFact[];
  links: LocationLink[];
  // ISO date the hub data (calendar/resources/facts/links) was last verified.
  hubUpdated?: string;
};

export type Location = LocationMeta & {
  body: string;
};

export async function getAllLocations(): Promise<LocationMeta[]> {
  if (!existsSync(LOCATIONS_DIR)) return [];
  const files = (await readdir(LOCATIONS_DIR)).filter((f) => f.endsWith(".mdx"));
  const locations = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = await readFile(join(LOCATIONS_DIR, file), "utf8");
      const { data } = matter(raw);
      return locationFromFrontmatter(slug, data);
    }),
  );
  return locations.sort((a, b) => a.order - b.order);
}

export async function getLocation(slug: string): Promise<Location | null> {
  const path = join(LOCATIONS_DIR, `${slug}.mdx`);
  if (!existsSync(path)) return null;
  const raw = await readFile(path, "utf8");
  const { data, content } = matter(raw);
  return { ...locationFromFrontmatter(slug, data), body: content };
}

function locationFromFrontmatter(slug: string, data: Record<string, unknown>): LocationMeta {
  const resources = ((data.resources as Partial<LocationResource>[]) ?? []).map((r) => ({
    ...r,
    // Pre-hub pages only listed permit offices; keep them rendering.
    category: r.category ?? "building",
  })) as LocationResource[];
  return {
    slug,
    county: data.county as string | undefined,
    name: data.name as string,
    title: data.title as string,
    metaTitle: data.metaTitle as string,
    metaDescription: data.metaDescription as string,
    summary: data.summary as string,
    image: data.image as string,
    imageAlt: data.imageAlt as string | undefined,
    bullets: (data.bullets as string[]) ?? [],
    projects: (data.projects as string[]) ?? [],
    mapQuery: data.mapQuery as string,
    order: (data.order as number) ?? 99,
    faqs: (data.faqs as Faq[]) ?? [],
    events: (data.events as LocationEvent[]) ?? [],
    calendar: (data.calendar as CalendarItem[]) ?? [],
    resources,
    facts: (data.facts as LocationFact[]) ?? [],
    links: (data.links as LocationLink[]) ?? [],
    hubUpdated: isoDateString(data.hubUpdated),
  };
}

// YAML hands back a Date for an unquoted date and a string for a quoted one.
function isoDateString(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === "string" && value ? value : undefined;
}

/** Slug of a county hub page from its display name ("Douglas County" → "douglas-county"). */
export function countySlug(county: string): string {
  return county
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------------------------------------------------------------------------
// Calendar helpers. Everything is date-only and Mountain time: a listing
// should fall off the page the morning after it ends, wherever the build runs.

const DENVER = "America/Denver";

/** Today's date in Denver as YYYY-MM-DD (en-CA formats ISO-style). */
export function todayInDenver(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: DENVER }).format(now);
}

/** Calendar items that haven't ended yet, soonest first. */
export function upcomingCalendar(items: CalendarItem[], today = todayInDenver()): CalendarItem[] {
  return items
    .filter((item) => (item.endDate ?? item.date) >= today)
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}

export type CalendarMonth = { key: string; label: string; items: CalendarItem[] };

/** Group by the month the item starts in (an ongoing series lists once, under its start month). */
export function groupCalendarByMonth(
  items: CalendarItem[],
  today = todayInDenver(),
): CalendarMonth[] {
  const months = new Map<string, CalendarMonth>();
  for (const item of items) {
    // A series already under way ("Every Saturday through Oct 31") files under
    // the current month, not the month it started.
    const anchor = item.date < today ? today : item.date;
    const key = anchor.slice(0, 7);
    let month = months.get(key);
    if (!month) {
      month = { key, label: formatMonth(anchor), items: [] };
      months.set(key, month);
    }
    month.items.push(item);
  }
  return [...months.values()].sort((a, b) => (a.key < b.key ? -1 : 1));
}

// Noon Mountain time on the given calendar day — safe to format in any zone.
function atNoonDenver(iso: string): Date {
  return new Date(`${iso}T12:00:00-06:00`);
}

function formatMonth(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: DENVER,
    month: "long",
    year: "numeric",
  }).format(atNoonDenver(iso));
}

/** "Fri, Nov 27" for a single day; "Oct 3 – Oct 31" for a run. */
export function formatCalendarDate(item: CalendarItem): string {
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: DENVER,
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const short = new Intl.DateTimeFormat("en-US", {
    timeZone: DENVER,
    month: "short",
    day: "numeric",
  });
  if (item.endDate && item.endDate !== item.date) {
    return `${short.format(atNoonDenver(item.date))} – ${short.format(atNoonDenver(item.endDate))}`;
  }
  return day.format(atNoonDenver(item.date));
}

/** Parts for a date badge: { weekday: "Fri", day: "27", month: "Nov" }. */
export function calendarBadge(item: CalendarItem): { weekday: string; day: string; month: string } {
  const d = atNoonDenver(item.date);
  const part = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-US", { timeZone: DENVER, ...opts }).format(d);
  return {
    weekday: part({ weekday: "short" }),
    day: part({ day: "numeric" }),
    month: part({ month: "short" }),
  };
}

/** "September 2026" — for the "verified" line under the hub. */
export function formatMonthYear(iso: string): string {
  return formatMonth(iso);
}

// ---------------------------------------------------------------------------
// Directory helpers.

export function categoryLabel(category: ResourceCategory, isCounty: boolean): string {
  switch (category) {
    case "emergency":
      return "Emergency & safety";
    case "city":
      return isCounty ? "County offices & services" : "City hall & services";
    case "utilities":
      return "Utilities";
    case "building":
      return "Permits & building";
    case "community":
      return "Community";
  }
}

/** Resources grouped in display order; empty categories are dropped. */
export function groupResources(
  resources: LocationResource[],
): { category: ResourceCategory; items: LocationResource[] }[] {
  return RESOURCE_CATEGORIES.map((category) => ({
    category,
    items: resources.filter((r) => r.category === category),
  })).filter((g) => g.items.length > 0);
}

// Lines that are the same on every page. Kept out of the content files so a
// number change is one edit, not 121.
export const STATEWIDE_LINES: Omit<LocationResource, "category">[] = [
  {
    label: "Emergency",
    name: "Police, fire, or medical emergency",
    phone: "911",
    note: "Text-to-911 works in most Front Range counties when you can't safely make a call.",
  },
  {
    label: "Before you dig",
    name: "Colorado 811",
    phone: "811",
    url: "https://colorado811.org/",
    note: "Free utility locates, required by state law before any post hole or footing goes in.",
  },
  {
    label: "Road conditions",
    name: "COtrip (CDOT)",
    phone: "511",
    url: "https://www.cotrip.org/",
    note: "Statewide closures, chain laws, and plow cameras; 1-800-288-1047 from out of state.",
  },
  {
    label: "Mental health crisis",
    name: "988 Colorado",
    phone: "988",
    url: "https://www.988colorado.com/",
    note: "Call or text 988 any time — the state mental health line is always open.",
  },
  {
    label: "Poison control",
    name: "Rocky Mountain Poison & Drug Safety",
    phone: "1-800-222-1222",
    url: "https://rmpds.org/",
    note: "24-hour poison and drug information line.",
  },
];
