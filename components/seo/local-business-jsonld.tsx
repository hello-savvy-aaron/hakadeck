import { site } from "@/lib/site";

// Mirrors the services covered by dedicated landing pages, and signals the
// GBP categories (deck builder, railing contractor, patio enclosure, etc.)
// without spinning up thin doorway pages.
const KNOWS_ABOUT = [
  "Composite deck construction",
  "Hardwood & cedar decks",
  "Pergolas, patio covers & enclosures",
  "Outdoor kitchens & bars",
  "Railing systems",
  "Deck repair & restoration",
];

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    // Prior trading name (the biz rebranded from "Haka Construction"; the
    // Instagram handle is still @hakaconstruction). Lets brand queries for
    // "haka construction" and "haka decks" both resolve to this entity.
    alternateName: ["Haka Construction", "Haka Decks & Construction"],
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    // Real coverage rule: anywhere within an hour of Denver or Colorado
    // Springs. Encoded as two ~50 mi GeoCircles, plus the named cities the
    // dedicated landing pages target.
    areaServed: [
      {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: 39.7392, longitude: -104.9903 },
        geoRadius: "80000",
        description: "Within an hour of Denver, CO",
      },
      {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: 38.8339, longitude: -104.8214 },
        geoRadius: "80000",
        description: "Within an hour of Colorado Springs, CO",
      },
      "Centennial, CO",
      "Greenwood Village, CO",
      "Cherry Hills Village, CO",
      "Lone Tree, CO",
      "Highlands Ranch, CO",
      "Castle Rock, CO",
      "Denver, CO",
      "Colorado Springs, CO",
    ],
    openingHoursSpecification: site.hours.schema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    knowsAbout: KNOWS_ABOUT,
    foundingDate: String(site.founded),
    sameAs: [site.socials.instagram, site.socials.linkedin, site.reviewsUrl],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: site.rating.max,
    },
    image: `${site.url}/images/brand/haka-badge.png`,
    priceRange: "$$$",
    slogan: "Denver's Deck Builder. Engineered for altitude.",
    makesOffer: [
      "Custom composite deck construction",
      "Hardwood & cedar deck construction",
      "Pergola & patio cover construction",
      "Outdoor kitchen construction",
      "Deck railing installation",
      "Deck repair & restoration",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
