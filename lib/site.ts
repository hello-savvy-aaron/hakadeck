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
  email: "contact@hakadecks.com",
  emailHref: "mailto:contact@hakadecks.com",
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
  serviceArea:
    "anywhere along the Front Range — Fort Collins down to Colorado Springs — plus the foothills and mountain towns west of Denver",
  // Every city/town in the Google Business Profile service area, grouped for
  // display on /locations and flattened into areaServed in the LocalBusiness
  // JSON-LD. GBP lists the small towns as ZIPs; those are translated to their
  // town names here (e.g. 80135 → Sedalia, 80433 → Conifer, 80424 → Breckenridge).
  serviceAreaRegions: [
    {
      region: "Denver metro",
      cities: [
        "Denver",
        "Glendale",
        "Edgewater",
        "Federal Heights",
        "Aurora",
        "Lakewood",
        "Arvada",
        "Westminster",
        "Thornton",
        "Northglenn",
        "Commerce City",
        "Brighton",
        "Broomfield",
        "Wheat Ridge",
        "Golden",
        "Morrison",
      ],
    },
    {
      region: "South metro & Douglas County",
      cities: [
        "Englewood",
        "Cherry Hills Village",
        "Greenwood Village",
        "Centennial",
        "Littleton",
        "Ken Caryl",
        "Highlands Ranch",
        "Lone Tree",
        "Castle Pines",
        "Parker",
        "Castle Rock",
        "Sedalia",
        "Larkspur",
        "Franktown",
        "Elizabeth",
        "Kiowa",
      ],
    },
    {
      region: "Boulder County",
      cities: [
        "Boulder",
        "Louisville",
        "Lafayette",
        "Erie",
        "Lyons",
        "Nederland",
        "Jamestown",
        "Ward",
        "Allenspark",
      ],
    },
    {
      region: "Northern Front Range",
      cities: [
        "Longmont",
        "Mead",
        "Berthoud",
        "Loveland",
        "Johnstown",
        "Milliken",
        "Windsor",
        "Severance",
        "Timnath",
        "Fort Collins",
        "Laporte",
        "Estes Park",
        "Greeley",
        "Evans",
        "Eaton",
        "Kersey",
        "La Salle",
        "Gilcrest",
        "Platteville",
        "Fort Lupton",
        "Frederick",
        "Firestone",
        "Dacono",
        "Hudson",
        "Keenesburg",
      ],
    },
    {
      region: "Foothills & mountains",
      cities: [
        "Evergreen",
        "Kittredge",
        "Idledale",
        "Indian Hills",
        "Conifer",
        "Pine",
        "Buffalo Creek",
        "Bailey",
        "Idaho Springs",
        "Empire",
        "Georgetown",
        "Silver Plume",
        "Black Hawk",
        "Central City",
        "Rollinsville",
        "Winter Park",
        "Fraser",
        "Tabernash",
        "Dillon",
        "Silverthorne",
        "Frisco",
        "Breckenridge",
      ],
    },
    {
      region: "Eastern plains",
      cities: ["Bennett", "Watkins", "Strasburg", "Byers", "Deer Trail", "Limon"],
    },
    {
      region: "Colorado Springs area",
      cities: [
        "Monument",
        "Palmer Lake",
        "Colorado Springs",
        "Manitou Springs",
        "Cascade",
        "Green Mountain Falls",
        "Woodland Park",
        "Peyton",
        "Fountain",
      ],
    },
  ],
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
  // Google Ads account/conversion ID ("AW-…"), for Ads conversion tracking and
  // remarketing. Reuses the gaId gtag.js loader rather than loading a second
  // copy — it's just an additional gtag `config` destination (see GoogleAds), so
  // it depends on gaId staying set. An empty string keeps it disabled.
  googleAdsId: "AW-18214331613",
  // Google Ads conversion "send_to" labels ("AW-<id>/<label>"), one per
  // conversion action created in Ads. Copy the label out of the action's event
  // snippet. CtaAnalytics fires the matching one on the corresponding CTA click;
  // an empty string skips that conversion.
  googleAdsConversions: {
    // "Click to call" — fired on any `tel:` link click, site-wide.
    call: "AW-18214331613/LgZ9CM7WmNUcEN3Jou1D",
  },
  // Reddit Ads pixel (advertiser) ID — e.g. "a2_xxxxxxxxxxxx". Find it in Reddit
  // Ads Manager → Events Manager → Pixel. Public client-side ID, same class as
  // gaId; an empty string keeps the pixel disabled (RedditPixel renders nothing).
  redditPixelId: "a2_j8eyxrhfn1k2",
  founded: 2017,
  rating: { value: 5.0, count: 89, max: 5 },
  // Official Google Business Profile share link → opens the Haka Decks listing
  // (knowledge panel + reviews). Verified 200; resolves to the GBP for kgmid
  // /g/11sxx77nb2. Replaced the old g.co/kgs/haka-deck placeholder, which 404'd.
  reviewsUrl: "https://share.google/dHcnAq4RwBtdhuHjF",
  // Direct "write a review" link from GBP (Ask for reviews → share). Opens the
  // Google review dialog one click from the stars — use this anywhere we ask
  // for a review, not reviewsUrl (which opens the profile).
  reviewWriteUrl: "https://g.page/r/CX-fRHFH4pMdEAE/review",
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
