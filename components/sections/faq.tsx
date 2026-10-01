import { Icon } from "@/components/icons/icon";
import { Eyebrow, Section } from "./section";
import { FAQS, type Faq as FaqItem } from "@/lib/faqs";

// Server-rendered FAQ accordion built on native <details>/<summary> — the
// answer text must be in the initial HTML (not mounted by client JS) so
// crawlers and AI engines can read it and FAQ rich results stay eligible.
// Styles are the .faq-* classes in globals.css.
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
          <h2 className="section-heading">{heading}</h2>
        </div>

        <div className="w-full">
          {faqs.map((item, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">
                {item.q}
                <Icon name="chevron-down" className="faq-chevron" />
              </summary>
              <p className="faq-a">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
