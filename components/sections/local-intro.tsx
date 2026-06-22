import { Eyebrow, Section, SectionHeading } from "./section";
import { site } from "@/lib/site";

export function LocalIntro() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div>
          <Eyebrow>Your local deck builder</Eyebrow>
          <SectionHeading className="mt-4">
            The deck builder south Denver homeowners call first.
          </SectionHeading>
        </div>

        <div className="text-muted-foreground space-y-5 text-base leading-relaxed sm:text-lg">
          <p>
            {site.name} is a licensed deck builder based in {site.address.city},{" "}
            {site.address.state}, building custom decks, pergolas, and covered outdoor living for
            homeowners across the {site.address.region}. Since {site.founded} we&apos;ve designed
            and built outdoor spaces in Greenwood Village, Cherry Hills Village, Lone Tree,
            Highlands Ranch, Castle Rock, and the surrounding Denver suburbs.
          </p>
          <p>
            Decks here have to survive 300-plus days of high-altitude sun, summer hail, and a
            freeze-thaw cycle that tears apart anything built to flatland standards. As a specialist
            deck contractor — not a general construction company that builds decks on the side —
            every structure we engineer is permitted, code-compliant, and built for Colorado&apos;s
            climate from the footings up.
          </p>
          <p>
            Whether you want a low-maintenance composite deck, a cedar or hardwood build, a pergola
            or patio cover, an outdoor kitchen, or new railings, we handle the design, HOA and
            permit paperwork, and the build end to end. Most projects start with a free on-site
            walkthrough across {site.address.city} and the south Denver area.
          </p>
        </div>
      </div>
    </Section>
  );
}
