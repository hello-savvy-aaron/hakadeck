import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Toaster } from "@/components/ui/sonner";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
