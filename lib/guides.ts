// Single source of truth for the "Free Guides & Tools" system — the featured
// cost guide, the three downloadable guides, and the photo gallery. The landing
// section, the hub page, each guide page, and the sitemap all read from here so
// titles, blurbs, PDF paths, and lead keys never drift between surfaces.
//
// Copy is intentionally screen-specific (landing vs hub) — the design treats it
// as final, so both variants live here rather than being collapsed into one.

export const GUIDES_HUB = "/deck-guides-and-tools";

// Phase-two estimator: built, but deliberately not linked from nav yet.
export const ESTIMATOR_HREF = "/deck-cost-estimator-denver";

export type Chip = "GUIDE · PDF" | "GALLERY";

export type Guide = {
  /** Lead key — recorded with every PDF capture; also the stable identity. */
  key: string;
  slug: string;
  href: string;
  /** Two-digit ordinal shown in list rows. */
  number: string;
  hubTitle: string;
  hubBlurb: string;
  landingTitle: string;
  landingBlurb: string;
  chip: Chip;
  /** Hosted PDF (generated from the print sources). Absent for the gallery. */
  pdf?: string;
  readLabel: string;
  updated: string;
};

// The featured cost guide — rendered as the Sky card on both the landing
// section and the hub, and as its own guide page.
export const costGuide = {
  key: "cost-guide",
  slug: "deck-cost-guide-denver",
  href: "/deck-cost-guide-denver",
  landingTitle: "What does a deck really cost?",
  hubTitle: "The Deck Cost Guide",
  pdf: "/guides/deck-cost-guide-denver.pdf",
  readLabel: "10 min read",
  updated: "July 2026",
} as const;

export const guides: Guide[] = [
  {
    key: "materials-guide",
    slug: "composite-vs-hardwood-decking-colorado",
    href: "/composite-vs-hardwood-decking-colorado",
    number: "01",
    hubTitle: "Composite vs. Hardwood Decking",
    hubBlurb: "The honest materials comparison — cost, upkeep, and how each holds up at 5,000+ ft.",
    landingTitle: "Composite vs. Hardwood",
    landingBlurb: "The honest materials comparison — cost, upkeep, and how each holds up at altitude.",
    chip: "GUIDE · PDF",
    pdf: "/guides/composite-vs-hardwood-decking-colorado.pdf",
    readLabel: "5 min read",
    updated: "July 2026",
  },
  {
    key: "permits-guide",
    slug: "deck-permits-south-denver-metro",
    href: "/deck-permits-south-denver-metro",
    number: "02",
    hubTitle: "Deck Permits & Code, South Denver Metro",
    hubBlurb:
      "What Centennial, Highlands Ranch, Castle Rock and the rest actually require before you dig.",
    landingTitle: "Permits & Code, South Denver Metro",
    landingBlurb: "What Centennial, Highlands Ranch, Castle Rock and the rest actually require.",
    chip: "GUIDE · PDF",
    pdf: "/guides/deck-permits-south-denver-metro.pdf",
    readLabel: "4 min read",
    updated: "July 2026",
  },
  {
    key: "diy-checklist",
    slug: "diy-deck-building-checklist",
    href: "/diy-deck-building-checklist",
    number: "03",
    hubTitle: "The DIY Deck Building Guide & Checklist",
    hubBlurb:
      "Real instructions for every step — plus span tables, a worked 12×16 plan, and tool list. Printable.",
    landingTitle: "The DIY Build Guide & Checklist",
    landingBlurb: "Real instructions for every step, with span tables and a worked example plan.",
    chip: "GUIDE · PDF",
    pdf: "/guides/diy-deck-building-checklist.pdf",
    readLabel: "Printable",
    updated: "July 2026",
  },
  {
    key: "gallery",
    slug: "deck-design-ideas-colorado",
    href: "/deck-design-ideas-colorado",
    number: "04",
    hubTitle: "Deck Design Ideas — Real Colorado Builds",
    hubBlurb: "A gallery of finished Haka projects to steal ideas from — railings, covers, lighting.",
    landingTitle: "Deck Design Ideas",
    landingBlurb: "A gallery of finished Haka projects to steal ideas from.",
    chip: "GALLERY",
    readLabel: "Gallery",
    updated: "July 2026",
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);

// Every public route this system owns — consumed by the sitemap. The estimator
// is intentionally excluded (unlinked phase-two page).
export const guideRoutes = [GUIDES_HUB, costGuide.href, ...guides.map((g) => g.href)];
