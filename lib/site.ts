export const site = {
  name: "Haka Decks",
  tagline: "Custom Colorado Decks",
  // Kept ≤160 chars so Google doesn't truncate it in search results. Used for
  // the meta description, OpenGraph/Twitter, and the JSON-LD description.
  description:
    "Custom deck builder in Centennial, CO — composite & hardwood decks, pergolas & covered outdoor living across the south Denver metro. Engineered for altitude.",
  url: "https://hakadeck.com",
  phone: "720-589-5680",
  phoneHref: "tel:+17205895680",
  email: "pete@hakaconstruction.com",
  emailHref: "mailto:pete@hakaconstruction.com",
  address: {
    street: "9707 E Easter Ln",
    city: "Centennial",
    state: "CO",
    zip: "80112",
    region: "south Denver metro",
  },
  // Hours mirror the Google Business Profile. `display` renders on the site;
  // `schema` feeds openingHoursSpecification in the LocalBusiness JSON-LD.
  hours: {
    display: [
      { label: "Mon – Fri", value: "8:00 AM – 6:00 PM" },
      { label: "Saturday", value: "9:00 AM – 1:00 PM" },
      { label: "Sunday", value: "Closed" },
    ],
    schema: [
      {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      { days: ["Saturday"], opens: "09:00", closes: "13:00" },
    ],
  },
  // Google Analytics 4 measurement ID (gtag.js).
  gaId: "G-Y02QMV6M3D",
  founded: 2017,
  rating: { value: 5.0, count: 87, max: 5 },
  reviewsUrl: "https://g.co/kgs/haka-deck",
  socials: {
    instagram: "https://www.instagram.com/hakaconstruction",
    instagramHandle: "@hakaconstruction",
    linkedin: "https://www.linkedin.com/company/hakaconstruction",
  },
  nav: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
  ],
  cta: { label: "Get a Quote", href: "/contact" },
} as const;

export type Site = typeof site;
