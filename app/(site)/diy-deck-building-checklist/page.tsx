import type { Metadata } from "next";
import Link from "next/link";
import { CtaFinal } from "@/components/sections/cta-final";
import { GuideLayout } from "@/components/guides/guide-layout";
import { DiyChecklist } from "@/components/guides/diy-checklist";
import {
  Lead,
  H2,
  P,
  Muted,
  Callout,
  DataTable,
  StatRows,
} from "@/components/guides/guide-content";
import { guideBySlug } from "@/lib/guides";
import { site } from "@/lib/site";

const guide = guideBySlug("diy-deck-building-checklist")!;

const title = "The DIY Deck Building Guide & Checklist — Plans, Steps, Spans (2026) | Haka Decks";
const description =
  "A real DIY deck build guide for Colorado — every step with actual instructions, joist span tables, a worked 12×16 materials plan, tool list, and inspection checkpoints. Free printable PDF.";

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
        title="The DIY Deck Building Guide & Checklist."
        meta={`${guide.readLabel} · Updated ${guide.updated}`}
        crossLink={{ href: "/deck-permits-south-denver-metro", label: "Permit guide →" }}
        nextUp={{
          href: "/composite-vs-hardwood-decking-colorado",
          label: "Composite vs. hardwood decking",
        }}
      >
        <Lead>
          Building it yourself? Respect. This is the order we run every job in, with the details
          that actually matter at each step — skip one and it usually costs a weekend (or an
          inspection). Tap the boxes as you go, use the span table and worked example at the
          bottom for your drawings, and download the PDF for the garage wall.
        </Lead>

        <div className="mt-4">
          <Callout>
            The steps and numbers here reflect how decks are typically built to code on the Front
            Range, but they are general guidance — your stamped permit drawings and your
            jurisdiction&apos;s adopted code govern your build, and this page isn&apos;t
            engineering advice for your specific site.
          </Callout>
        </div>

        <DiyChecklist />

        <H2>The cheat sheet: joist spans</H2>
        <P>
          These are the deck-joist spans most Front Range permit reviewers work from (IRC Table
          R507.6, Douglas fir-larch #2, 40 psf live load) — the distance a joist can safely cover
          between the ledger and the beam at 16-inch spacing:
        </P>
        <DataTable
          headers={["Joist size", "16\" on center", "12\" on center"]}
          rows={[
            ["2×6", "9' 0\"", "9' 11\""],
            ["2×8", "11' 10\"", "13' 1\""],
            ["2×10", "14' 0\"", "16' 2\""],
            ["2×12", "16' 6\"", "18' 0\""],
          ]}
        />
        <Muted>
          Beams are sized from the joist span they carry — a doubled 2×10 typically runs 7–9 ft
          between posts on a 12-ft joist span. Your plan reviewer (or the lumberyard&apos;s free
          takeoff desk) will confirm both against IRC Table R507.5 for your exact layout, and some
          foothills jurisdictions require higher snow-load designs.
        </Muted>

        <H2>A worked example: 12×16 attached composite deck</H2>
        <P>
          To make the framing plan concrete, here&apos;s the complete structure for the most common
          starter deck — 12 ft deep, 16 ft wide, about 2 ft off grade, attached to the house: a
          ledger on the house wall, one doubled 2×10 beam on three posts near the outer edge, and
          2×8 joists at 16&quot; on center spanning the 12 ft between them.
        </P>
        <StatRows
          rows={[
            { label: "Footings — 12\" dia × 36\" deep", value: "3" },
            { label: "Concrete, 80-lb bags (~4 per hole)", value: "12" },
            { label: "Posts — 6×6 pressure-treated", value: "3" },
            { label: "Beam — 2×10×16' PT (doubled)", value: "2" },
            { label: "Ledger + rim — 2×8×16' PT", value: "2" },
            { label: "Joists — 2×8×12' PT (16\" OC)", value: "13" },
            { label: "Blocking — cut from 2×8×12' PT", value: "2" },
            { label: "Deck boards — 16' grooved composite", value: "27" },
            { label: "Hidden fastener clips (~90 / 100 sq ft)", value: "~175" },
            { label: "Joist hangers + structural ledger screws", value: "13 + ~24" },
            { label: "Railing — posts, rail & infill", value: "~40 lin ft" },
          ]}
        />
        <Muted>
          Quantities include normal cut waste on decking but no mistakes allowance — first build,
          buy one extra board per bunk. Every metal part (hangers, post bases, screws) must be
          hot-dip galvanized or better; modern pressure-treated lumber corrodes bare steel.
        </Muted>

        <H2>The tools that actually get used</H2>
        <P>
          Beyond a normal homeowner kit (drill, tape, hammer, speed square, chalk line):
          a <strong className="font-semibold">two-person power auger</strong> (rent it),
          a <strong className="font-semibold">4-ft level</strong> plus a string or laser level for
          post heights, an <strong className="font-semibold">impact driver</strong> — structural
          ledger screws will smoke a drill — a circular saw, a miter saw for railing and decking
          cuts, batter-board stakes and mason&apos;s string, and two sawhorses. For composite,
          the manufacturer&apos;s hidden-fastener bit saves hours. Budget rental days, not
          ownership, for the auger and (if you skirt the deck) a small concrete mixer.
        </P>

        <H2>Where DIY builds actually go wrong</H2>
        <P>
          After taking over a lot of half-finished decks, the pattern is consistent: the ledger
          (attached with lag screws through siding, no flashing), footings poured before
          inspection, railing posts lagged instead of through-bolted, and stringers cut with
          9-inch treads. None of these look wrong from a lawn chair; all four fail inspection.
          If you read one section of your code book, make it the ledger and guard details — and
          our <Link href="/deck-permits-south-denver-metro" className="text-primary font-semibold hover:underline">permit guide</Link>{" "}
          covers what each south-metro city checks hardest.
        </P>

        <div className="mt-5">
          <Callout>
            In over your head at any step? No judgment — we take over half-finished decks more
            often than you&apos;d think, and the framing inspection is the usual breaking point.
            We&apos;ll tell you honestly what&apos;s salvageable.{" "}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              Send us photos
            </Link>{" "}
            and we&apos;ll take a look.
          </Callout>
        </div>
      </GuideLayout>

      <CtaFinal />
    </>
  );
}
