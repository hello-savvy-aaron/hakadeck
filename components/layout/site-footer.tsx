import Link from "next/link";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone, Star } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { getAllLocations } from "@/lib/locations";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// GBP cities without their own location page, shown to round the footer list
// out to two columns of seven. They link to the /locations hub, which lists
// the full service area.
const EXTRA_AREAS = ["Castle Pines", "Englewood", "Golden", "Lakewood"];

export async function SiteFooter() {
  const { address, hours } = site;
  // Footer list reads alphabetically; elsewhere locations keep their curated `order`.
  const locations = await getAllLocations();
  const areas = [
    ...locations.map((l) => ({ href: `/locations/${l.slug}`, label: `${l.name}, CO` })),
    ...EXTRA_AREAS.map((name) => ({ href: "/locations", label: `${name}, CO` })),
  ].toSorted((a, b) => a.label.localeCompare(b.label));
  areas.push({ href: "/locations", label: "All service areas" });
  const areaColumns = [areas.slice(0, 7), areas.slice(7)];
  return (
    <footer className="bg-background text-foreground border-border/40 border-t">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-display border-border/40 mb-14 border-b pb-12 text-4xl leading-none font-medium tracking-tight sm:text-6xl lg:text-7xl">
          Denver&apos;s Deck BUILDER.
        </p>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.8fr_1fr_1fr]">
          <div className="space-y-5">
            <Link href="/" aria-label={`${site.name} home`} className="inline-flex">
              {/* The Link's aria-label is the accessible name (it wins over
                  alt), so this alt is purely for crawlers/graders. */}
              <Image
                src="/images/brand/haka-badge.png"
                alt="Haka Decks"
                width={120}
                height={126}
                className="h-20 w-auto invert"
              />
            </Link>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              {site.name} builds custom decks, pergolas, and covered outdoor living for homeowners
              across the {address.region}, from our shop in the {address.district}.
            </p>
            <div className="flex gap-3">
              <SocialLink href={site.socials.instagram} label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={site.socials.linkedin} label="LinkedIn">
                <LinkedinIcon className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <FooterCol heading="Explore">
            {site.nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
            <FooterLink href="/process">Our Process</FooterLink>
            <FooterLink href="/warranty">Warranty &amp; Guarantee</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="/financing">Financing</FooterLink>
            <FooterLink href="/deck-guides-and-tools">Free Guides &amp; Tools</FooterLink>
          </FooterCol>

          <FooterCol heading="Service Areas" className="sm:col-span-2 lg:col-span-1">
            <div className="grid grid-cols-2 gap-x-4">
              {areaColumns.map((column, i) => (
                <div key={i} className="flex flex-col gap-2">
                  {column.map((area) => (
                    <FooterLink key={area.label} href={area.href}>
                      {area.label}
                    </FooterLink>
                  ))}
                </div>
              ))}
            </div>
          </FooterCol>

          <FooterCol heading="Visit">
            <p className="text-muted-foreground text-sm leading-relaxed">
              <MapPin className="text-foreground/60 mr-1.5 inline h-3.5 w-3.5 align-[-2px]" />
              {address.street}
              <br />
              {address.city}, {address.state} {address.zip}
            </p>
            <div className="mt-5">
              <p className="text-foreground/60 mb-1.5 flex items-center text-xs font-medium tracking-widest uppercase">
                <Clock className="mr-1.5 h-3.5 w-3.5" />
                Hours
              </p>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                {hours.display.map((h) => (
                  <div key={h.label} className="text-muted-foreground contents">
                    <dt className="whitespace-nowrap">{h.label}</dt>
                    <dd className="text-foreground/80 whitespace-nowrap tabular-nums">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FooterCol>

          <FooterCol heading="Contact">
            <a
              href={site.phoneHref}
              className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm"
            >
              <Phone className="mr-1.5 h-3.5 w-3.5" />
              {site.phone}
            </a>
            <a
              href={site.emailHref}
              className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm whitespace-nowrap"
            >
              <Mail className="mr-1.5 h-3.5 w-3.5 shrink-0" />
              {site.email}
            </a>
            <a
              href={site.reviewWriteUrl}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm"
            >
              <Star className="mr-1.5 h-3.5 w-3.5" />
              Leave us a review
            </a>
            <p className="text-muted-foreground mt-3 text-xs">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs">
              Site by{" "}
              <a
                href="https://www.hellosavvy.design"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground underline-offset-4 hover:underline"
              >
                hellosavvy.design
              </a>
            </p>
          </FooterCol>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  heading,
  children,
  className,
}: {
  heading: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-foreground/60 text-xs font-medium tracking-widest uppercase">
        {heading}
      </h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-muted-foreground hover:text-foreground text-sm">
      {children}
    </Link>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="border-border/60 text-foreground/70 hover:text-foreground hover:border-foreground/40 inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
    >
      {children}
    </a>
  );
}
