import type { Metadata } from "next";
import { CtaFinal } from "@/components/sections/cta-final";
import { GuideLayout } from "@/components/guides/guide-layout";
import { DiyChecklist } from "@/components/guides/diy-checklist";
import { guideBySlug } from "@/lib/guides";
import { site } from "@/lib/site";

const guide = guideBySlug("diy-deck-building-checklist")!;

const title = "The DIY Deck Building Checklist — Step by Step (2026) | Haka Decks";
const description =
  "Every step of a DIY deck build in the right order — plan, permit, footings, framing, decking, finish. Tap the boxes as you go, or print it. Free PDF.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: guide.href },
  openGraph: { title, description, url: `${site.url}${guide.href}` },
};

export default function DiyChecklistPage() {
  return (
    <>
      <GuideLayout
        guideKey={guide.key}
        pdfHref={guide.pdf!}
        title="The DIY Deck Building Checklist."
        meta={`${guide.readLabel} · Updated ${guide.updated}`}
        crossLink={{ href: "/deck-permits-south-denver-metro", label: "Permit guide →" }}
        nextUp={{
          href: "/composite-vs-hardwood-decking-colorado",
          label: "Composite vs. hardwood decking",
        }}
      >
        <DiyChecklist />
      </GuideLayout>

      <CtaFinal />
    </>
  );
}
