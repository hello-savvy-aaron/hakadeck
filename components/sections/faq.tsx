import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow, Section } from "./section";
import { FAQS, type Faq as FaqItem } from "@/lib/faqs";

export function Faq({
  faqs = FAQS,
  heading = "The questions most homeowners ask first.",
}: {
  faqs?: FaqItem[];
  heading?: string;
}) {
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="font-display mt-4 text-4xl leading-[1.04] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {heading}
          </h2>
        </div>

        <Accordion className="w-full">
          {faqs.map((item, i) => (
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
