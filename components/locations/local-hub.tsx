import {
  calendarBadge,
  categoryLabel,
  formatCalendarDate,
  formatMonthYear,
  groupCalendarByMonth,
  groupResources,
  upcomingCalendar,
  type CalendarItem,
  type LocationMeta,
  type LocationResource,
} from "@/lib/locations";
import {
  HubCalendarView,
  HubDirectoryView,
  HubGlanceView,
  type HubEventView,
  type HubResourceView,
} from "./local-hub-view";

// The "local hub" half of a location page: an at-a-glance strip, the dated
// calendar for the months ahead, and the who-to-call directory. Everything is
// computed here, on the server, from frontmatter — the calendar filtered
// against today in Denver, resources grouped and labelled, dates formatted —
// and handed to the views as plain strings.
//
// The views are client components on purpose. A Next.js page ships its
// rendered server tree a second time, as the RSC payload that hydrates it; for
// a directory of forty cards and a thirty-item calendar that was ~200 KB of
// duplicate markup inline in every location page. With the views on the
// client, the payload carries this compact data instead, while the HTML is
// still fully server-rendered — the numbers and dates stay in the page for
// crawlers and answer engines exactly as before.

// Drop undefined fields so they don't ride the payload as "$undefined".
function compact<T extends object>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;
}

function resourceView(r: LocationResource): HubResourceView {
  return compact({
    label: r.label,
    name: r.name,
    phone: r.phone,
    url: r.url,
    note: r.note,
    address: r.address,
    hours: r.hours,
  });
}

function eventView(item: CalendarItem): HubEventView {
  const b = calendarBadge(item);
  const range = item.endDate && item.endDate !== item.date;
  const badge = range
    ? {
        kicker: "From",
        day: `${b.month} ${b.day}`,
        through: formatCalendarDate({
          ...item,
          date: item.endDate as string,
          endDate: undefined,
        }).replace(/^\w{3}, /, ""),
      }
    : { kicker: b.weekday, day: `${b.month} ${b.day}` };
  return compact({
    name: item.name,
    url: item.url,
    note: item.note,
    time: item.time,
    venue: item.venue,
    tag: item.tag,
    host: item.host,
    badge,
  });
}

export function HubGlance({ location, isCounty }: { location: LocationMeta; isCounty: boolean }) {
  const featured = location.resources.filter((r) => r.featured).slice(0, 4);
  const hasCalendar = upcomingCalendar(location.calendar).length > 0 || location.events.length > 0;
  const hasDirectory = location.resources.length > 0;
  if (featured.length === 0 && location.facts.length === 0) return null;

  const nav = [
    hasCalendar ? { href: "#calendar", label: "Coming up" } : null,
    hasDirectory ? { href: "#directory", label: "Who to call" } : null,
    location.links.length ? { href: "#links", label: "Quick links" } : null,
    { href: "#decks", label: `Decks in ${location.name}` },
  ].filter((l) => l !== null);

  return (
    <HubGlanceView
      name={location.name}
      isCounty={isCounty}
      checked={location.hubUpdated ? formatMonthYear(location.hubUpdated) : undefined}
      nav={nav}
      featured={featured.map(resourceView)}
      facts={location.facts}
    />
  );
}

export function HubCalendar({ location }: { location: LocationMeta; isCounty: boolean }) {
  const upcoming = upcomingCalendar(location.calendar);
  if (upcoming.length === 0 && location.events.length === 0) return null;
  const months = groupCalendarByMonth(upcoming).map((m) => ({
    key: m.key,
    label: m.label,
    items: m.items.map(eventView),
  }));
  return <HubCalendarView name={location.name} months={months} events={location.events} />;
}

export function HubDirectory({
  location,
  isCounty,
}: {
  location: LocationMeta;
  isCounty: boolean;
}) {
  if (location.resources.length === 0 && location.links.length === 0) return null;
  const groups = groupResources(location.resources).map((g) => ({
    category: g.category,
    label: categoryLabel(g.category, isCounty),
    items: g.items.map(resourceView),
  }));
  return (
    <HubDirectoryView
      name={location.name}
      checked={location.hubUpdated ? formatMonthYear(location.hubUpdated) : undefined}
      links={location.links}
      groups={groups}
    />
  );
}
