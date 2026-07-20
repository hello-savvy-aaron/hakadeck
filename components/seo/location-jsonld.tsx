import { site } from "@/lib/site";

export function LocationJsonLd({
  name,
  city,
  description,
  slug,
}: {
  name: string;
  city: string;
  description: string;
  slug: string;
}) {
  const url = `${site.url}/locations/${slug}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name,
        description,
        serviceType: "Deck builder",
        url,
        // References the site-wide GeneralContractor block (rendered in the
        // (site) layout) instead of duplicating the NAP.
        provider: { "@id": `${site.url}/#business` },
        areaServed: {
          "@type": "City",
          name: `${city}, Colorado`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Service Areas",
            item: `${site.url}/locations`,
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
