export const site = {
  name: "Haka Decks",
  tagline: "Custom Colorado Decks",
  // Kept ~120 chars: short enough to never truncate in SERPs and to clear the
  // stricter site-grader limits, while keeping the deck-builder + geo + service
  // keywords. Used for the meta description, OpenGraph/Twitter, and JSON-LD.
  description:
    "Denver Tech Center deck builder — composite & hardwood decks, pergolas & covered outdoor living across the Front Range.",
  // Canonical host. Uses www because Vercel serves the site at www.hakadecks.com
  // (the bare apex 307-redirects to it); keeping canonical, sitemap, robots, and
  // schema on www matches the URL that actually returns 200 — fixes the grader's
  // canonical flag. If the apex is ever made primary in Vercel, revert to apex.
  url: "https://www.hakadecks.com",
  phone: "720-589-5680",
  phoneHref: "tel:+17205895680",
  email: "pete@hakadecks.com",
  emailHref: "mailto:pete@hakadecks.com",
  address: {
    street: "9707 E Easter Ln",
    // Postal city — must stay "Centennial" to match the Google Business
    // Profile NAP (footer address, JSON-LD addressLocality). Brand copy leads
    // with `district` instead.
    city: "Centennial",
    state: "CO",
    zip: "80112",
    district: "Denver Tech Center",
    region: "Front Range",
  },
  // The real coverage rule — quoted anywhere the site states the service area
  // as fact (contact, locations, intros). City-targeted SEO copy on service and
  // blog pages intentionally stays narrower than this.
  serviceArea: "anywhere within an hour of Denver or Colorado Springs",
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
  // Reddit Ads pixel (advertiser) ID — e.g. "a2_xxxxxxxxxxxx". Find it in Reddit
  // Ads Manager → Events Manager → Pixel. Public client-side ID, same class as
  // gaId; an empty string keeps the pixel disabled (RedditPixel renders nothing).
  redditPixelId: "",
  founded: 2017,
  rating: { value: 5.0, count: 87, max: 5 },
  // Official Google Business Profile share link → opens the Haka Decks listing
  // (knowledge panel + reviews). Verified 200; resolves to the GBP for kgmid
  // /g/11sxx77nb2. Replaced the old g.co/kgs/haka-deck placeholder, which 404'd.
  reviewsUrl: "https://share.google/dHcnAq4RwBtdhuHjF",
  socials: {
    instagram: "https://www.instagram.com/hakaconstruction",
    instagramHandle: "@hakaconstruction",
    // Owner's profile — no company page exists yet (the old /company/hakaconstruction 404'd).
    linkedin: "https://www.linkedin.com/in/pete-borlase-574913b2",
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
