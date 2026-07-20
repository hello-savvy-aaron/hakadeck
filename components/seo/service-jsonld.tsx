import { site } from "@/lib/site";

export function ServiceJsonLd({
  name,
  description,
  slug,
  category,
  cities = [],
}: {
  name: string;
  description: string;
  slug: string;
  category: string;
  // City names with dedicated location pages (from getAllLocations) — emitted
  // as schema.org City entries alongside the broad AdministrativeArea.
  cities?: string[];
}) {
  const url = `${site.url}/services/${slug}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name,
        description,
        serviceType: category,
        url,
        // References the site-wide GeneralContractor block (rendered in the
        // (site) layout) instead of duplicating the NAP.
        provider: { "@id": `${site.url}/#business` },
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "Denver & Colorado Springs metro areas, Colorado",
          },
          ...cities.map((city) => ({
            "@type": "City",
            name: `${city}, CO`,
          })),
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${site.url}/services`,
          },
          { "@type": "ListItem", position: 3, name, item: url },
        ],
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
