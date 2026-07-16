export type Faq = {
  q: string;
  a: string;
};

// Single source of truth for the home-page FAQ accordion and the FAQPage
// JSON-LD. Google requires the schema answer text to match the visible copy,
// so both <Faq> and <FaqJsonLd> read from this one array — edit answers here.
export const FAQS: Faq[] = [
  {
    q: "What materials do you use?",
    a: "We build almost exclusively with composite decking — Deckorators is our go-to brand, with Trex and TimberTech where the design calls for it. Composite holds up to Colorado's freeze-thaw, hail, and altitude UV in a way natural wood just doesn't, and the manufacturer warranties run 25–50 years. We'll also build in clear-grade cedar or thermally-modified hardwood when that's the look you want — we just want you to know what you're signing up for on maintenance.",
  },
  {
    q: "How long does a deck project take?",
    a: "Most residential decks take 3–10 days of on-site build time once we break ground. Permit and HOA approvals usually run 2–4 weeks before that, and we'll order materials during the wait so we hit the ground running. Bigger builds — covered decks, pergola integrations, multi-tier — run 2–4 weeks on site. We'll give you a realistic schedule in writing before you sign anything.",
  },
  {
    q: "How much does a new deck cost?",
    a: "It depends on size, materials, and features — but a typical 300–400 sq ft composite deck in the Denver area runs $15,000–$30,000 fully installed, with stairs, railing, and permits included. Pergolas and covered structures, outdoor kitchens, multi-level designs, and structural foundations all move the number. Our free deck cost calculator gives you a planning range in thirty seconds, and we give itemized estimates so you can see exactly where the budget goes.",
  },
  {
    q: "Will a deck increase my home's value?",
    a: "Yes — according to Remodeling Magazine's annual Cost vs. Value report, a composite deck addition recoups roughly 80% of its cost at resale, and outperforms most kitchen and bath remodels on a dollar-for-dollar basis. In the Denver area specifically, listings with finished outdoor living spaces consistently move faster than comps without.",
  },
];
