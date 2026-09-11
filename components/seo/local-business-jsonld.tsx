import { site } from "@/lib/site";

// Stable entity ids. Every other JSON-LD block on the site references these
// with { "@id": ... } instead of re-embedding the business or the founder, so
// search engines and answer engines resolve one Haka Decks entity, one Pete
// Borlase, and one website — not a slightly different copy per page.
export const BUSINESS_ID = `${site.url}/#business`;
export const WEBSITE_ID = `${site.url}/#website`;
export const FOUNDER_ID = `${site.url}/about#pete-borlase`;
export const LOGO_URL = `${site.url}/images/brand/haka-badge.png`;

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
  "Colorado deck building codes, permits & HOA approvals",
  "Frost-depth footings and snow-load framing at altitude",
];

// Manufacturer installer tiers. These are the credentials brand pages and the
// homepage cite in copy; naming them as EducationalOccupationalCredential
// nodes lets "certified Trex installer near me"-type answers match the entity.
const CREDENTIALS = [
  { name: "Trex Platinum Pro Installer", by: "Trex Company, Inc." },
  { name: "Deckorators Pro Elite Installer", by: "Deckorators (UFP Industries)" },
  { name: "TimberTech Authorized Dealer & Installer", by: "TimberTech (The AZEK Company)" },
];

export function LocalBusinessJsonLd() {
  const founder = {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: "Pete Borlase",
    jobTitle: "Founder & Owner",
    description:
      "Founder of Haka Decks (2017), a Denver Tech Center deck builder. Former professional rugby player from New Zealand; walks every project personally.",
    url: `${site.url}/about`,
    image: `${site.url}/images/about/pete.jpg`,
    worksFor: { "@id": BUSINESS_ID },
    knowsAbout: KNOWS_ABOUT,
    sameAs: [site.socials.linkedin],
  };

  const business = {
    // GeneralContractor is schema.org's subtype of HomeAndConstructionBusiness;
    // both are declared because SEO graders string-match the parent type.
    "@type": ["GeneralContractor", "HomeAndConstructionBusiness"],
    "@id": BUSINESS_ID,
    name: site.name,
    // Prior trading name (the biz rebranded from "Haka Construction"; the
    // Instagram handle is still @hakaconstruction). Lets brand queries for
    // "haka construction" and "haka decks" both resolve to this entity.
    alternateName: ["Haka Construction", "Haka Decks & Construction"],
    legalName: "Haka Decks",
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+1-${site.phone}`,
      email: site.email,
      areaServed: "US-CO",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.58691,
      longitude: -104.87673,
    },
    // Mirrors the Google Business Profile service area: two broad GeoCircles
    // around the metro anchors, plus every city/town from site.serviceAreaRegions
    // (the GBP list with its ZIP entries translated to town names).
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
      ...site.serviceAreaRegions.flatMap((r) => r.cities.map((city) => `${city}, CO`)),
    ],
    openingHoursSpecification: site.hours.schema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    knowsAbout: KNOWS_ABOUT,
    hasCredential: CREDENTIALS.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Manufacturer installer certification",
      name: c.name,
      recognizedBy: { "@type": "Organization", name: c.by },
    })),
    foundingDate: String(site.founded),
    founder: { "@id": FOUNDER_ID },
    sameAs: [
      site.socials.instagram,
      site.socials.linkedin,
      site.reviewsUrl,
      "https://maps.google.com/maps?cid=2131295845147254655",
      "https://maps.apple.com/place?auid=4817596912492427351",
      "https://www.yelp.com/biz/haka-decks-centennial",
    ],
    // No aggregateRating/review here: Google treats rating markup fed by a
    // business's own site as self-serving and it can draw a manual action.
    // The star rating in search comes from the Google Business Profile.
    image: LOGO_URL,
    logo: LOGO_URL,
    priceRange: "$$$",
    currenciesAccepted: "USD",
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

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    alternateName: "Haka Decks — Custom Colorado Decks",
    url: site.url,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": BUSINESS_ID },
    // Plain-text site summary for LLM crawlers (llms.txt convention).
    significantLink: [`${site.url}/llms.txt`, `${site.url}/llms-full.txt`],
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [business, founder, website],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
