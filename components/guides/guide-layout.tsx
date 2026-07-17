import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GUIDES_HUB } from "@/lib/guides";
import { PdfGate, PdfTrigger } from "@/components/guides/pdf-gate";
import { NewsletterSignup } from "@/components/guides/newsletter-signup";

// Shared chrome for the four content guide pages. The site header/footer come
// from the (site) layout; this renders the narrow 680px editorial column:
// breadcrumb → title → meta (with the PDF gate) → white content card → action
// row → newsletter → "next up" cross-link. Everything is wrapped in one PdfGate
// so both the meta link and the action button open the same modal.
export function GuideLayout({
  guideKey,
  pdfHref,
  title,
  meta,
  crossLink,
  nextUp,
  children,
}: {
  guideKey: string;
  pdfHref: string;
  title: string;
  /** e.g. "6 min read · Updated July 2026" — the download link is appended. */
  meta: string;
  /** Secondary outlined button in the action row. */
  crossLink: { href: string; label: string };
  /** "Next up:" cross-link at the foot of the page. */
  nextUp: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <PdfGate guideKey={guideKey} pdfHref={pdfHref}>
      <div className="mx-auto max-w-[42.5rem] px-5 pt-28 pb-20 sm:px-8 sm:pt-32">
        <Link
          href={GUIDES_HUB}
          className="text-primary hover:text-haka-pine inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All guides &amp; tools
        </Link>

        <h1 className="font-display text-foreground mt-3.5 text-[2rem] leading-[1.15] font-medium tracking-tight text-balance">
          {title}
        </h1>
        <p className="text-muted-foreground mt-2 text-[13px]">
          {meta} ·{" "}
          <PdfTrigger variant="link">Download the PDF</PdfTrigger>
        </p>

        <article className="border-border bg-card mt-6 rounded-[14px] border p-6 shadow-[0_1px_3px_rgba(34,48,42,0.06)] sm:px-6">
          {children}
        </article>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <PdfTrigger>Download the PDF</PdfTrigger>
          <Button asChild variant="outline" className="h-11">
            <Link href={crossLink.href}>{crossLink.label}</Link>
          </Button>
        </div>

        <NewsletterSignup />

        <p className="text-muted-foreground mt-6 text-[13px]">
          Next up:{" "}
          <Link href={nextUp.href} className="text-primary hover:text-haka-pine font-semibold">
            {nextUp.label} →
          </Link>
        </p>
      </div>
    </PdfGate>
  );
}
