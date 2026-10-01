"use client";

import { Icon } from "@/components/icons/icon";
import type { IconName } from "@/components/icons/icon-names";
import { Eyebrow, Section, SectionHeading } from "@/components/sections/section";
import type {
  LocationEvent,
  LocationFact,
  LocationLink,
  LocationResource,
  ResourceCategory,
} from "@/lib/locations";
import { STATEWIDE_LINES } from "@/lib/statewide-lines";

// Presentational halves of the location hub. local-hub.tsx computes every
// string these render (and explains why they are client components). No
// hooks and no browser APIs: the markup is server-rendered into the page and
// simply hydrated. Repeated class strings live in globals.css as .hub-*.
// Derived strings (tel: links, display hostnames, list keys) are computed here
// rather than shipped, and the five statewide lines come from their own
// module, so the per-page payload is only what differs per town.

export type HubResourceView = Omit<LocationResource, "category" | "featured">;

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

const STATEWIDE: HubResourceView[] = STATEWIDE_LINES;

export type HubEventView = {
  name: string;
  url?: string;
  note: string;
  time?: string;
  venue?: string;
  tag?: string;
  host?: string;
  /** Date badge: { kicker: "Fri", day: "Nov 27" } or { kicker: "From", day: "Oct 3", through: "Oct 31" }. */
  badge: { kicker: string; day: string; through?: string };
};

const CATEGORY_ICONS: Record<ResourceCategory, IconName> = {
  emergency: "siren",
  city: "landmark",
  utilities: "plug",
  building: "hammer",
  community: "users",
};

export function HubGlanceView({
  name,
  isCounty,
  checked,
  nav,
  featured,
  facts,
}: {
  name: string;
  isCounty: boolean;
  /** "September 2026" — when the hub data was last verified. */
  checked?: string;
  nav: { href: string; label: string }[];
  featured: HubResourceView[];
  facts: LocationFact[];
}) {
  return (
    <Section id="glance" top="tight" bottom="tight">
      <nav aria-label="On this page" className="flex flex-wrap gap-2 text-sm">
        {nav.map((l) => (
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
        <Eyebrow>{name} at a glance</Eyebrow>
        <SectionHeading className="mt-4 text-3xl sm:text-4xl">
          The numbers worth keeping on the fridge.
        </SectionHeading>
        <p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-relaxed sm:text-base">
          {checked
            ? `Checked ${checked} against the ${isCounty ? "county" : "city"}'s official pages. `
            : null}
          For anything urgent, call 911 first.
        </p>
      </div>

      {featured.length > 0 ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((r) => (
            <li key={`${r.label}-${r.name}`} className="hub-card">
              <span className="hub-kicker">{r.label}</span>
              <span className="hub-name">{r.name}</span>
              {r.phone ? (
                <a
                  href={telHref(r.phone)}
                  className="font-display text-haka-pine mt-4 inline-flex items-center gap-2 text-xl font-medium tracking-tight whitespace-nowrap hover:underline xl:text-2xl"
                >
                  <Icon name="phone" className="h-5 w-5" />
                  {r.phone}
                </a>
              ) : r.url ? (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-haka-pine mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                >
                  <Icon name="external-link" className="h-3.5 w-3.5" />
                  {hostname(r.url)}
                </a>
              ) : null}
              {r.note ? <span className="hub-note mt-3">{r.note}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}

      {facts.length > 0 ? (
        <dl className="border-border/40 mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t pt-8 sm:grid-cols-3 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="hub-kicker">{f.label}</dt>
              <dd className="mt-1 text-sm leading-snug font-medium sm:text-base">{f.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </Section>
  );
}

export function HubCalendarView({
  name,
  months,
  events,
}: {
  name: string;
  months: { key: string; label: string; items: HubEventView[] }[];
  events: LocationEvent[];
}) {
  const upcoming = months.length > 0;
  return (
    <Section id="calendar" top="tight" bottom="tight">
      <Eyebrow>Coming up</Eyebrow>
      <SectionHeading className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
        {upcoming
          ? `What's happening in ${name} through the end of the year.`
          : `Around town in ${name}.`}
      </SectionHeading>
      <p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-relaxed sm:text-base">
        {upcoming
          ? "Festivals, tree lightings, leaf drop-off days, Election Day — everything we could confirm on an organizer's own page. Dates shift; tap through before you go."
          : "The community traditions that fill the calendar here every year."}
      </p>

      {months.map((month) => (
        <div key={month.key} className="mt-10">
          <h3 className="hub-h3">
            <Icon name="calendar-days" />
            {month.label}
          </h3>
          <ol className="divide-border/40 divide-y">
            {month.items.map((item) => (
              <li key={`${item.badge.day}-${item.name}`} className="hub-row">
                <div className="hub-date">
                  <span className="hub-date-kicker">{item.badge.kicker}</span>
                  <span className="hub-date-day">{item.badge.day}</span>
                  {item.badge.through ? (
                    <span className="text-muted-foreground text-xs sm:mt-1.5 sm:block">
                      through {item.badge.through}
                    </span>
                  ) : null}
                </div>
                <div className="min-w-0">
                  <h4 className="hub-event">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hub-event-link"
                      >
                        {item.name}
                        <Icon name="arrow-up-right" />
                      </a>
                    ) : (
                      item.name
                    )}
                  </h4>
                  {item.time || item.venue ? (
                    <p className="hub-meta">
                      {item.time ? (
                        <span>
                          <Icon name="clock" />
                          {item.time}
                        </span>
                      ) : null}
                      {item.venue ? (
                        <span>
                          <Icon name="map-pin" />
                          {item.venue}
                        </span>
                      ) : null}
                    </p>
                  ) : null}
                  <p className="hub-blurb">{item.note}</p>
                </div>
                {item.tag || item.host ? (
                  <div className="flex flex-wrap items-start gap-2 lg:flex-col lg:items-end">
                    {item.tag ? <span className="hub-tag">{item.tag}</span> : null}
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

      {events.length > 0 ? (
        <div className="border-border/40 bg-card/40 mt-12 rounded-2xl border p-6 sm:p-8">
          <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
            Every year in {name}
          </h3>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <li key={event.name} className="flex flex-col">
                <span className="hub-kicker">{event.when}</span>
                <span className="font-display mt-1.5 text-lg font-medium tracking-tight">
                  {event.name}
                </span>
                <span className="hub-note">{event.note}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}

function ResourceCard({ r }: { r: HubResourceView }) {
  return (
    <li className="hub-card">
      <span className="hub-kicker">{r.label}</span>
      <span className="hub-name">{r.name}</span>
      {r.note ? <span className="hub-note">{r.note}</span> : null}
      {r.address || r.hours ? (
        <span className="hub-where">
          {r.address ? (
            <span>
              <Icon name="map-pin" />
              {r.address}
            </span>
          ) : null}
          {r.hours ? (
            <span>
              <Icon name="clock" />
              {r.hours}
            </span>
          ) : null}
        </span>
      ) : null}
      <span className="hub-actions">
        {r.phone ? (
          <a href={telHref(r.phone)} className="hub-link">
            <Icon name="phone" />
            {r.phone}
          </a>
        ) : null}
        {r.url ? (
          <a href={r.url} target="_blank" rel="noopener noreferrer" className="hub-link">
            <Icon name="external-link" />
            {hostname(r.url)}
          </a>
        ) : null}
      </span>
    </li>
  );
}

export function HubDirectoryView({
  name,
  checked,
  links,
  groups,
}: {
  name: string;
  checked?: string;
  links: LocationLink[];
  groups: { category: ResourceCategory; label: string; items: HubResourceView[] }[];
}) {
  return (
    <Section id="directory" top="tight" bottom="tight">
      <Eyebrow>Who to call</Eyebrow>
      <SectionHeading className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
        Every number a {name} homeowner ends up needing.
      </SectionHeading>
      <p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-relaxed sm:text-base">
        Copied from the official sites{checked ? ` and checked ${checked}` : ""}. We handle the
        permit filing on every build we do; the rest of this is for living here.
      </p>

      {links.length > 0 ? (
        <div id="links" className="mt-8">
          <h3 className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
            Quick links
          </h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hub-quick group"
                >
                  <span className="inline-flex items-center justify-between gap-2 text-sm font-medium">
                    {l.label}
                    <Icon
                      name="arrow-up-right"
                      className="text-muted-foreground h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
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

      {groups.map((group) => (
        <div key={group.category} className="mt-12">
          <h3 className="hub-h3">
            <Icon name={CATEGORY_ICONS[group.category]} />
            {group.label}
          </h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((r) => (
              <ResourceCard key={`${r.label}-${r.name}`} r={r} />
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-12">
        <h3 className="hub-h3">
          <Icon name="mountain" />
          Statewide
        </h3>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STATEWIDE.map((r) => (
            <ResourceCard key={`${r.label}-${r.name}`} r={r} />
          ))}
        </ul>
      </div>
    </Section>
  );
}
