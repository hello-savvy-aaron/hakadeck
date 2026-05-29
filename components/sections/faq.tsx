import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow, Section } from "./section";

const FAQS = [
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
    a: "It depends on size, materials, and features — but a typical 300–400 sq ft composite deck in the Denver area runs $15,000–$30,000 fully installed, with stairs, railing, and permits included. Pergolas and covered structures, outdoor kitchens, multi-level designs, and structural foundations all move the number. We give itemized estimates so you can see exactly where the budget goes.",
  },
  {
    q: "Will a deck increase my home's value?",
    a: "Yes — according to Remodeling Magazine's annual Cost vs. Value report, a composite deck addition recoups roughly 80% of its cost at resale, and outperforms most kitchen and bath remodels on a dollar-for-dollar basis. In south Denver specifically, listings with finished outdoor living spaces consistently move faster than comps without.",
  },
];

export function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="font-display mt-4 text-balance text-4xl leading-[1.04] font-medium tracking-tight sm:text-5xl lg:text-6xl">
            The questions most homeowners ask first.
          </h2>
          <p className="text-muted-foreground mt-6 text-base leading-relaxed">
            Don&apos;t see yours? Call Pete at{" "}
            <a href="tel:+17205895680" className="text-foreground underline-offset-4 hover:underline">
              720-589-5680
            </a>{" "}
            — happy to talk it through.
          </p>
        </div>

        <Accordion className="w-full">
          {FAQS.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border/40">
              <AccordionTrigger className="font-display text-left text-lg font-medium tracking-tight sm:text-xl">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
