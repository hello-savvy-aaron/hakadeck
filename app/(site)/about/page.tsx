import Image from "next/image";
import type { Metadata } from "next";
import { Eyebrow, Section } from "@/components/sections/section";
import { CtaFinal } from "@/components/sections/cta-final";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Pete & Haka Decks",
  description:
    "Haka Decks was founded in 2017 by Pete Borlase — a former pro rugby player turned Denver deck builder, with a service-first approach to outdoor living.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Section top="loose" bottom="tight">
        <Eyebrow>About</Eyebrow>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl lg:text-8xl">
          Denver&apos;s Deck Builder.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          A Centennial deck shop with a service-first attitude, rugby roots, and a stubborn
          opinion about how things should be built.
        </p>
      </Section>

      <Section top="none">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <div className="border-border/40 relative aspect-[4/5] overflow-hidden rounded-2xl border">
              <Image
                src="/images/projects/double-decker/02.jpeg"
                alt="A double-decker composite deck Haka built in Centennial."
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="space-y-6">
              <Eyebrow>Founder</Eyebrow>
              <h2 className="font-display text-3xl leading-[1.06] font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Meet Pete Borlase.
              </h2>
              <div className="text-muted-foreground space-y-5 text-base leading-relaxed sm:text-lg">
                <p>
                  Haka Decks was founded in 2017 by Pete Borlase. Pete is a former rugby player from
                  New Zealand with a long line of experience on and off the field. On the field, he
                  played professionally in several countries and coached several elite-level rugby
                  teams.
                </p>
                <p>
                  Off the field, he&apos;s hard at work helping his customers build their outdoor
                  dream. Pete believes in looking at projects from as many angles as possible, but
                  always with an attitude grounded in service and hard work.
                </p>
                <p>
                  He founded Haka Decks so he could do this whole deck-building thing a bit
                  differently from the rest — and he&apos;s excited to bring that value-added
                  approach to your project. Today, Pete is a proud husband and father of two boys.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section top="tight">
        <div className="border-border/40 grid gap-8 border-t pt-16 sm:grid-cols-3 lg:gap-12">
          {[
            {
              n: "01",
              t: "Service over sales.",
              b: "We don't pitch packages. We listen, walk the yard, and propose what we'd actually build for our own house.",
            },
            {
              n: "02",
              t: "Every angle, then commit.",
              b: "Sun, sightlines, drainage, grade, code — we look at all of it before drawing a single line. Then we build it once.",
            },
            {
              n: "03",
              t: "Rugby-bench mentality.",
              b: "Show up. Do the work. Finish strong. The handshake at the end matters as much as the project itself.",
            },
          ].map((v) => (
            <div key={v.n}>
              <div className="text-muted-foreground/60 text-sm tracking-[0.18em] uppercase tabular-nums">
                {v.n}
              </div>
              <h3 className="font-display mt-3 text-xl font-medium tracking-tight sm:text-2xl">
                {v.t}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{v.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaFinal
        heading="Want to meet Pete in your backyard?"
        body={`Pete walks every project personally. Call ${site.phone} or send a few photos and we'll set up a no-pressure visit.`}
      />
    </>
  );
}
