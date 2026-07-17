import { site } from "@/lib/site";

// Standalone BreadcrumbList JSON-LD for detail pages that don't already emit
// one via a richer graph (ServiceJsonLd and LocationJsonLd bundle their own).
// "Home" is prepended automatically as position 1; pass the trail after it.
// Each item's `path` is site-root-relative (e.g. "/portfolio").
type Crumb = { name: string; path: string };

export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      ...items.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: `${site.url}${c.path}`,
      })),
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
