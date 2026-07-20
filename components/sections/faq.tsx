import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Eyebrow, Section } from "./section";
import { FAQS, type Faq as FaqItem } from "@/lib/faqs";

// Server-rendered FAQ accordion built on native <details>/<summary> — the
// answer text must be in the initial HTML (not mounted by client JS) so
// crawlers and AI engines can read it and FAQ rich results stay eligible.
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

        <div className="w-full">
          {faqs.map((item, i) => (
            <details key={i} className="group border-border/40 not-last:border-b">
              <summary className="font-display flex cursor-pointer list-none items-start justify-between gap-3 rounded-lg py-2.5 text-left text-lg font-medium tracking-tight hover:underline sm:text-xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDownIcon className="text-muted-foreground mt-1.5 size-4 shrink-0 group-open:hidden" />
                <ChevronUpIcon className="text-muted-foreground mt-1.5 hidden size-4 shrink-0 group-open:inline" />
              </summary>
              <p className="text-muted-foreground pb-3 text-base leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
