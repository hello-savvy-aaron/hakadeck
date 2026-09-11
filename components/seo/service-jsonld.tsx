import { site } from "@/lib/site";
import type { ServiceOffer } from "@/lib/services";

export function ServiceJsonLd({
  name,
  description,
  slug,
  category,
  cities = [],
  offer,
}: {
  name: string;
  description: string;
  slug: string;
  category: string;
  // City names with dedicated location pages (from getAllLocations) — emitted
  // as schema.org City entries alongside the broad AdministrativeArea.
  cities?: string[];
  // Installed price range from frontmatter → schema.org Offer with a
  // UnitPriceSpecification, so "how much does a composite deck cost" answers
  // have a machine-readable number to cite (matches the visible FAQ copy).
  offer?: ServiceOffer;
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
        ...(offer
          ? {
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                areaServed: "Denver metro, Colorado",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  priceCurrency: "USD",
                  minPrice: offer.minPrice,
                  maxPrice: offer.maxPrice,
                  unitText: offer.unit,
                  description: `Installed, ${offer.unit}, Denver metro (2026)`,
                },
              },
            }
          : {}),
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
