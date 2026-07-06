import { site } from "@/lib/site";

export function ServiceJsonLd({
  name,
  description,
  slug,
  category,
}: {
  name: string;
  description: string;
  slug: string;
  category: string;
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
        provider: {
          "@type": "GeneralContractor",
          name: site.name,
          url: site.url,
          telephone: site.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            addressLocality: site.address.city,
            addressRegion: site.address.state,
            postalCode: site.address.zip,
            addressCountry: "US",
          },
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Denver & Colorado Springs metro areas, Colorado",
        },
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
