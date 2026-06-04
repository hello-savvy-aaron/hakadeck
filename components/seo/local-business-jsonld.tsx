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
    areaServed: [
      "Centennial, CO",
      "Greenwood Village, CO",
      "Cherry Hills Village, CO",
      "Lone Tree, CO",
      "Highlands Ranch, CO",
      "Castle Rock, CO",
      "Denver, CO",
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
    image: `${site.url}/assets/brand/haka-badge.png`,
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
