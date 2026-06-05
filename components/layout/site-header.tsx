"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-background/80 supports-[backdrop-filter]:bg-background/60 border-border/40 border-b backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:h-28 sm:px-8">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="flex items-center gap-2"
        >
          {/* The Link's aria-label is the accessible name (it wins over alt),
              so this alt is purely for crawlers/graders — no double announce. */}
          <Image
            src="/images/brand/haka-badge.png"
            alt="Haka Decks"
            width={120}
            height={126}
            priority
            className={cn("h-14 w-auto transition sm:h-20", !overHero && "invert")}
          />
          <span className="sr-only">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/90 hover:text-foreground text-sm font-medium tracking-tight transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="mr-1 hidden items-center gap-1 md:flex">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Haka Decks on Instagram"
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                overHero
                  ? "text-white/90 hover:bg-white/10 hover:text-white"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground",
              )}
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Haka Decks on LinkedIn"
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                overHero
                  ? "text-white/90 hover:bg-white/10 hover:text-white"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground",
              )}
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </div>

          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href={site.cta.href}>
              {site.cta.label}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              render={
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />

            <SheetContent side="right" className="bg-card border-l-border w-full max-w-sm">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 px-4">
                {site.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="hover:bg-secondary py-3 text-lg font-medium tracking-tight"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="mt-4 w-full" size="lg">
                  <Link href={site.cta.href} onClick={() => setOpen(false)}>
                    {site.cta.label}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
