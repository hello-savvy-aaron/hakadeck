import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  ExternalLink,
  Hammer,
  Landmark,
  MapPin,
  Mountain,
  Phone,
  Plug,
  Siren,
  Users,
} from "lucide-react";
import { Eyebrow, Section, SectionHeading } from "@/components/sections/section";
import {
  calendarBadge,
  categoryLabel,
  formatCalendarDate,
  formatMonthYear,
  groupCalendarByMonth,
  groupResources,
  STATEWIDE_LINES,
  upcomingCalendar,
  type CalendarItem,
  type LocationMeta,
  type LocationResource,
  type ResourceCategory,
} from "@/lib/locations";

// The "local hub" half of a location page: an at-a-glance strip, the dated
// calendar for the months ahead, and the who-to-call directory. Everything
// here is server-rendered from frontmatter — no client JS — so the numbers
// and dates are in the HTML for crawlers and answer engines.

// "303-235-2855 Option 1" → "tel:3032352855"; "811" stays "tel:811".
function telHref(phone: string): string {
  const m = phone.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  return `tel:${(m ? m[0] : phone).replace(/\D/g, "")}`;
}

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const CATEGORY_ICONS: Record<ResourceCategory, typeof Siren> = {
  emergency: Siren,
  city: Landmark,
  utilities: Plug,
  building: Hammer,
  community: Users,
};

const CARD = "border-border/40 bg-card/40 flex h-full flex-col rounded-2xl border p-6";

export function HubGlance({ location, isCounty }: { location: LocationMeta; isCounty: boolean }) {
  const featured = location.resources.filter((r) => r.featured).slice(0, 4);
  const hasCalendar = upcomingCalendar(location.calendar).length > 0 || location.events.length > 0;
  const hasDirectory = location.resources.length > 0;
  if (featured.length === 0 && location.facts.length === 0) return null;

  return (
    <Section id="glance" top="tight" bottom="tight">
      <nav aria-label="On this page" className="flex flex-wrap gap-2 text-sm">
        {[
          hasCalendar ? { href: "#calendar", label: "Coming up" } : null,
          hasDirectory ? { href: "#directory", label: "Who to call" } : null,
          location.links.length ? { href: "#links", label: "Quick links" } : null,
          { href: "#decks", label: `Decks in ${location.name}` },
        ]
          .filter((l) => l !== null)
          .map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="border-border/60 bg-card/60 hover:border-foreground/30 rounded-full border px-4 py-1.5 font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
      </nav>

      <div className="mt-10">
        <Eyebrow>{location.name} at a glance</Eyebrow>
        <SectionHeading className="mt-4 text-3xl sm:text-4xl">
          The numbers worth keeping on the fridge.
        </SectionHeading>
        <p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-relaxed sm:text-base">
          {location.hubUpdated
            ? `Checked ${formatMonthYear(location.hubUpdated)} against the ${isCounty ? "county" : "city"}'s official pages. `
            : null}
          For anything urgent, call 911 first.
        </p>
      </div>

      {featured.length > 0 ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((r) => (
            <li key={`${r.label}-${r.name}`} className={CARD}>
              <span className="text-muted-foreground text-xs tracking-widest uppercase">
                {r.label}
              </span>
              <span className="font-display mt-2 text-lg leading-snug font-medium tracking-tight">
                {r.name}
              </span>
              {r.phone ? (
                <a
                  href={telHref(r.phone)}
                  className="font-display text-haka-pine mt-4 inline-flex items-center gap-2 text-xl font-medium tracking-tight whitespace-nowrap hover:underline xl:text-2xl"
                >
                  <Phone className="h-5 w-5" />
                  {r.phone}
                </a>
              ) : r.url ? (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-haka-pine mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {hostname(r.url)}
                </a>
              ) : null}
              {r.note ? (
                <span className="text-muted-foreground mt-3 text-sm leading-relaxed">{r.note}</span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {location.facts.length > 0 ? (
        <dl className="border-border/40 mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t pt-8 sm:grid-cols-3 lg:grid-cols-4">
          {location.facts.map((f) => (
            <div key={f.label}>
              <dt className="text-muted-foreground text-xs tracking-widest uppercase">{f.label}</dt>
              <dd className="mt-1 text-sm leading-snug font-medium sm:text-base">{f.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </Section>
  );
}

function DateBadge({ item }: { item: CalendarItem }) {
  const range = item.endDate && item.endDate !== item.date;
  const b = calendarBadge(item);
  if (range) {
    const end = formatCalendarDate({ ...item, date: item.endDate as string, endDate: undefined });
    return (
      <div className="flex items-baseline gap-2 sm:block sm:leading-none">
        <span className="text-muted-foreground text-xs tracking-widest uppercase sm:block">
          From
        </span>
        <span className="font-display text-2xl font-medium tracking-tight sm:mt-1 sm:block sm:text-3xl">
          {b.month} {b.day}
        </span>
        <span className="text-muted-foreground text-xs sm:mt-1.5 sm:block">
          through {end.replace(/^\w{3}, /, "")}
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-baseline gap-2 sm:block sm:leading-none">
      <span className="text-muted-foreground text-xs tracking-widest uppercase sm:block">
        {b.weekday}
      </span>
      <span className="font-display text-2xl font-medium tracking-tight sm:mt-1 sm:block sm:text-3xl">
        {b.month} {b.day}
      </span>
    </div>
  );
}

export function HubCalendar({ location }: { location: LocationMeta; isCounty: boolean }) {
  const upcoming = upcomingCalendar(location.calendar);
  const months = groupCalendarByMonth(upcoming);
  if (upcoming.length === 0 && location.events.length === 0) return null;

  return (
    <Section id="calendar" top="tight" bottom="tight">
      <Eyebrow>Coming up</Eyebrow>
      <SectionHeading className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
        {upcoming.length > 0
          ? `What's happening in ${location.name} through the end of the year.`
          : `Around town in ${location.name}.`}
      </SectionHeading>
      <p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-relaxed sm:text-base">
        {upcoming.length > 0
          ? "Festivals, tree lightings, leaf drop-off days, Election Day — everything we could confirm on an organizer's own page. Dates shift; tap through before you go."
          : "The community traditions that fill the calendar here every year."}
      </p>

      {months.map((month) => (
        <div key={month.key} className="mt-10">
          <h3 className="font-display border-border/40 flex items-center gap-2 border-b pb-3 text-2xl font-medium tracking-tight">
            <CalendarDays className="text-haka-pine h-5 w-5" />
            {month.label}
          </h3>
          <ol className="divide-border/40 divide-y">
            {month.items.map((item) => (
              <li
                key={`${item.date}-${item.name}`}
                className="grid gap-3 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6 lg:grid-cols-[7.5rem_1fr_11rem]"
              >
                <DateBadge item={item} />
                <div className="min-w-0">
                  <h4 className="font-display text-lg leading-snug font-medium tracking-tight sm:text-xl">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="decoration-border hover:decoration-foreground inline-flex items-start gap-1 underline underline-offset-4"
                      >
                        {item.name}
                        <ArrowUpRight className="text-muted-foreground mt-1 h-4 w-4 shrink-0" />
                      </a>
                    ) : (
                      item.name
                    )}
                  </h4>
                  {item.time || item.venue ? (
                    <p className="text-muted-foreground mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      {item.time ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {item.time}
                        </span>
                      ) : null}
                      {item.venue ? (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {item.venue}
                        </span>
                      ) : null}
                    </p>
                  ) : null}
                  <p className="text-foreground/85 mt-2 max-w-2xl text-sm leading-relaxed">
                    {item.note}
                  </p>
                </div>
                {item.tag || item.host ? (
                  <div className="flex flex-wrap items-start gap-2 lg:flex-col lg:items-end">
                    {item.tag ? (
                      <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium capitalize">
                        {item.tag}
                      </span>
                    ) : null}
                    {item.host ? (
                      <span className="text-muted-foreground text-xs leading-snug lg:text-right">
                        {item.host}
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      ))}

      {location.events.length > 0 ? (
        <div className="border-border/40 bg-card/40 mt-12 rounded-2xl border p-6 sm:p-8">
          <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
            Every year in {location.name}
          </h3>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {location.events.map((event) => (
              <li key={event.name} className="flex flex-col">
                <span className="text-muted-foreground text-xs tracking-widest uppercase">
                  {event.when}
                </span>
                <span className="font-display mt-1.5 text-lg font-medium tracking-tight">
                  {event.name}
                </span>
                <span className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {event.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}

function ResourceCard({ r }: { r: Omit<LocationResource, "category"> }) {
  return (
    <li className={CARD}>
      <span className="text-muted-foreground text-xs tracking-widest uppercase">{r.label}</span>
      <span className="font-display mt-2 text-lg leading-snug font-medium tracking-tight">
        {r.name}
      </span>
      {r.note ? (
        <span className="text-muted-foreground mt-2 text-sm leading-relaxed">{r.note}</span>
      ) : null}
      {r.address || r.hours ? (
        <span className="text-muted-foreground mt-3 flex flex-col gap-1 text-xs leading-relaxed">
          {r.address ? (
            <span className="inline-flex items-start gap-1.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {r.address}
            </span>
          ) : null}
          {r.hours ? (
            <span className="inline-flex items-start gap-1.5">
              <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {r.hours}
            </span>
          ) : null}
        </span>
      ) : null}
      <span className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-sm">
        {r.phone ? (
          <a
            href={telHref(r.phone)}
            className="text-foreground/85 hover:text-foreground inline-flex items-center gap-1.5 font-medium"
          >
            <Phone className="h-3.5 w-3.5" />
            {r.phone}
          </a>
        ) : null}
        {r.url ? (
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/85 hover:text-foreground inline-flex items-center gap-1.5 font-medium"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {hostname(r.url)}
          </a>
        ) : null}
      </span>
    </li>
  );
}

export function HubDirectory({
  location,
  isCounty,
}: {
  location: LocationMeta;
  isCounty: boolean;
}) {
  if (location.resources.length === 0 && location.links.length === 0) return null;
  const groups = groupResources(location.resources);

  return (
    <Section id="directory" top="tight" bottom="tight">
      <Eyebrow>Who to call</Eyebrow>
      <SectionHeading className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
        Every number a {location.name} homeowner ends up needing.
      </SectionHeading>
      <p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-relaxed sm:text-base">
        Copied from the official sites
        {location.hubUpdated ? ` and checked ${formatMonthYear(location.hubUpdated)}` : ""}. We
        handle the permit filing on every build we do; the rest of this is for living here.
      </p>

      {location.links.length > 0 ? (
        <div id="links" className="mt-8">
          <h3 className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
            Quick links
          </h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {location.links.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border/60 bg-card/60 hover:border-foreground/30 group flex h-full flex-col rounded-xl border px-4 py-3 transition-colors"
                >
                  <span className="inline-flex items-center justify-between gap-2 text-sm font-medium">
                    {l.label}
                    <ArrowUpRight className="text-muted-foreground h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  {l.note ? (
                    <span className="text-muted-foreground mt-1 text-xs leading-snug">
                      {l.note}
                    </span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {groups.map((group) => {
        const Icon = CATEGORY_ICONS[group.category];
        return (
          <div key={group.category} className="mt-12">
            <h3 className="font-display border-border/40 flex items-center gap-2 border-b pb-3 text-2xl font-medium tracking-tight">
              <Icon className="text-haka-pine h-5 w-5" />
              {categoryLabel(group.category, isCounty)}
            </h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((r) => (
                <ResourceCard key={`${r.label}-${r.name}`} r={r} />
              ))}
            </ul>
          </div>
        );
      })}

      <div className="mt-12">
        <h3 className="font-display border-border/40 flex items-center gap-2 border-b pb-3 text-2xl font-medium tracking-tight">
          <Mountain className="text-haka-pine h-5 w-5" />
          Statewide
        </h3>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STATEWIDE_LINES.map((r) => (
            <ResourceCard key={r.name} r={r} />
          ))}
        </ul>
      </div>
    </Section>
  );
}
