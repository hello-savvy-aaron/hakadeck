import { getAllLocations } from "@/lib/locations";
import { SiteFooterView } from "./site-footer-view";

// How many town links the footer shows. Every location page is reachable from
// the /locations hub (and the sitemap); the footer surfaces the core service
// area by curated `order` so it doesn't turn into a 30-link wall.
const FOOTER_AREA_LIMIT = 14;

// The footer's markup lives in a client component (site-footer-view.tsx) and
// this server half only works out the data for it. That is a deliberate
// payload trade: a page ships its server-rendered tree twice (HTML plus the
// RSC payload that hydrates it), and the footer's ~10 KB of markup was on
// every one of 190 pages. As props it is a ~1 KB list of links; the HTML the
// crawler sees is unchanged.
export async function SiteFooter() {
  const locations = await getAllLocations();
  // Take the closest/highest-priority towns by curated `order`, then present
  // them alphabetically — elsewhere locations keep their `order`.
  const areas = locations
    .slice(0, FOOTER_AREA_LIMIT)
    .map((l) => ({ href: `/locations/${l.slug}`, label: `${l.name}, CO` }))
    .toSorted((a, b) => a.label.localeCompare(b.label));
  areas.push({ href: "/locations", label: "All service areas" });
  // Split evenly so the two columns stay balanced as towns are added.
  const half = Math.ceil(areas.length / 2);
  return (
    <SiteFooterView
      areaColumns={[areas.slice(0, half), areas.slice(half)]}
      year={new Date().getFullYear()}
    />
  );
}
