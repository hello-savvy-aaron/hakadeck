import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { site } from "@/lib/site";

export function SiteFooter() {
  const { address, parent } = site;
  return (
    <footer className="bg-background text-foreground border-border/40 border-t">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-display border-border/40 mb-14 border-b pb-12 text-4xl leading-none font-medium tracking-tight sm:text-6xl lg:text-7xl">
          Denver&apos;s Deck BUILDER.
        </p>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <Link href="/" aria-label={`${site.name} home`} className="inline-flex">
              <Image
                src="/assets/brand/haka-badge.png"
                alt=""
                width={120}
                height={126}
                className="h-20 w-auto invert"
              />
            </Link>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              {site.name} is the residential outdoor arm of{" "}
              <Link
                href={parent.url}
                className="text-foreground underline-offset-4 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {parent.name}
              </Link>
              , serving the {address.region}.
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
          </FooterCol>

          <FooterCol heading="Visit">
            <p className="text-muted-foreground text-sm leading-relaxed">
              <MapPin className="text-foreground/60 mr-1.5 inline h-3.5 w-3.5 align-[-2px]" />
              {address.street}
              <br />
              {address.city}, {address.state} {address.zip}
            </p>
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
              className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm break-all"
            >
              <Mail className="mr-1.5 h-3.5 w-3.5 shrink-0" />
              {site.email}
            </a>
            <p className="text-muted-foreground mt-3 text-xs">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
          </FooterCol>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-foreground/60 text-xs font-medium tracking-widest uppercase">{heading}</h3>
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
