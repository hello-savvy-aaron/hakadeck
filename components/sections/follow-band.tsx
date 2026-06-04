import { Button } from "@/components/ui/button";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { Eyebrow, Section } from "./section";
import { site } from "@/lib/site";

export function FollowBand() {
  return (
    <Section className="bg-haka-sky">
      <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-xl">
          <Eyebrow>Follow our builds</Eyebrow>
          <h2 className="font-display mt-4 text-balance text-3xl leading-[1.05] font-medium tracking-tight sm:text-4xl lg:text-5xl">
            See every deck we finish — first.
          </h2>
          <p className="text-foreground/75 mt-4 text-base leading-relaxed">
            From first cut to final railing. Follow{" "}
            <span className="text-foreground font-medium">{site.socials.instagramHandle}</span>{" "}
            for fresh project photos across the south Denver metro.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Button asChild size="lg" className="h-12 px-6 text-base">
            <a href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Follow Haka Decks on Instagram">
              <InstagramIcon className="mr-2 size-5" />
              Follow on Instagram
            </a>
          </Button>
          <Button asChild size="icon-lg" variant="outline" className="size-12">
            <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="Haka Decks on LinkedIn">
              <LinkedinIcon className="size-5" />
            </a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
