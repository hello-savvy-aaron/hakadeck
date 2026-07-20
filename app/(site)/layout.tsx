import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-jsonld";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Site-wide business entity — every page carries the NAP + @id that
          per-page Service blocks reference. */}
      <LocalBusinessJsonLd />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: "bg-card text-foreground border-border",
          },
        }}
      />
    </>
  );
}
