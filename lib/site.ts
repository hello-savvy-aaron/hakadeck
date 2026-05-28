export const site = {
  name: "Haka Deck",
  tagline: "Custom Colorado Decks",
  description:
    "Custom decks, pergolas, and outdoor living for the south Denver metro. Composite, hardwood, and covered — engineered for altitude.",
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
  parent: {
    name: "Haka Construction",
    url: "https://hakaconstruction.com",
  },
  founded: 2017,
  rating: { value: 5.0, count: 87, max: 5 },
  reviewsUrl: "https://g.co/kgs/haka-deck",
  socials: {
    instagram: "https://www.instagram.com/hakaconstruction",
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
