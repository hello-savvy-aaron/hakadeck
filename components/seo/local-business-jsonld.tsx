import { site } from "@/lib/site";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    parentOrganization: {
      "@type": "Organization",
      name: site.parent.name,
      url: site.parent.url,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    areaServed: [
      "Centennial, CO",
      "Greenwood Village, CO",
      "Cherry Hills Village, CO",
      "Lone Tree, CO",
      "Highlands Ranch, CO",
      "Castle Rock, CO",
      "Denver, CO",
    ],
    foundingDate: String(site.founded),
    sameAs: [site.socials.instagram, site.socials.linkedin],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: site.rating.max,
    },
    image: `${site.url}/assets/brand/logo-inverse.png`,
    priceRange: "$$$",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
