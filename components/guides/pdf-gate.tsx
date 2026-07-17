"use client";

import { createContext, useCallback, useContext, useId, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { track } from "@vercel/analytics";
import { Download, X } from "lucide-react";
import { trackGa } from "@/lib/gtag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Soft email gate over a free PDF. Capturing the email records a lead (and
// notifies Pete), but the guide is never withheld: submitting opens it, and a
// "just download it" link bypasses the form entirely. One <PdfGate> wraps a
// page and hosts a single modal; <PdfTrigger> buttons anywhere inside open it.

type GateCtx = { open: () => void };
const Ctx = createContext<GateCtx | null>(null);

function usePdfGate() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("PdfTrigger must be used within <PdfGate>");
  return ctx;
}

function isEmailish(v: string) {
  return /\S+@\S+\.\S+/.test(v.trim());
}

export function PdfGate({
  guideKey,
  pdfHref,
  children,
}: {
  guideKey: string;
  pdfHref: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const inputId = useId();

  const doOpen = useCallback(() => {
    setSent(false);
    setError(null);
    setOpen(true);
    track("Guide PDF gate opened", { guide: guideKey });
  }, [guideKey]);

  function openPdf() {
    window.open(pdfHref, "_blank", "noopener,noreferrer");
  }

  async function submit() {
    if (!isEmailish(email)) {
      setError("Enter a valid email so we know where to send it.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await fetch("/api/guide-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), guide: guideKey }),
      });
      // The lead is best-effort: even if the POST fails the reader still gets
      // the guide, so we don't block the download on a network error.
      track("Guide lead", { guide: guideKey });
      trackGa("generate_lead", { channel: "email", guide: guideKey });
    } catch {
      /* swallow — never block the download */
    } finally {
      setBusy(false);
      setSent(true);
      openPdf();
    }
  }

  return (
    <Ctx.Provider value={{ open: doOpen }}>
      {children}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="bg-foreground/80 fixed inset-0 z-50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup
            className={cn(
              "bg-card fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-[420px] -translate-x-1/2 -translate-y-1/2 flex-col gap-3 rounded-[14px] p-6 shadow-[0_12px_40px_rgba(34,48,42,0.3)] transition duration-150",
              "data-ending-style:opacity-0 data-starting-style:opacity-0",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <Dialog.Title className="font-display text-foreground text-[1.3rem] font-medium tracking-tight">
                Get the PDF.
              </Dialog.Title>
              <Dialog.Close
                aria-label="Close"
                className="text-muted-foreground hover:text-foreground -mr-1 rounded-md p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </Dialog.Close>
            </div>

            {sent ? (
              <>
                <div className="bg-secondary text-secondary-foreground rounded-[10px] p-4 text-sm leading-relaxed">
                  <strong className="font-semibold">On its way.</strong> Check your inbox in a few
                  minutes — we&apos;ve opened the guide in a new tab, too.
                </div>
                <Button asChild variant="outline" className="mt-1 h-11">
                  <a href={pdfHref} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-1.5 h-4 w-4" />
                    Open the PDF again
                  </a>
                </Button>
                <Dialog.Close
                  render={
                    <Button variant="ghost" className="h-10">
                      Done
                    </Button>
                  }
                />
              </>
            ) : (
              <>
                <Dialog.Description className="text-muted-foreground text-sm leading-relaxed">
                  Tell us where to send it. You&apos;ll also get new guides about once a month —
                  unsubscribe anytime.
                </Dialog.Description>
                <div>
                  <label htmlFor={inputId} className="sr-only">
                    Email address
                  </label>
                  <Input
                    id={inputId}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    enterKeyHint="send"
                    placeholder="you@email.com"
                    value={email}
                    aria-invalid={!!error}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submit();
                    }}
                    className="h-12 text-base"
                  />
                  {error ? <p className="mt-1.5 text-[13px] text-[#a05252]">{error}</p> : null}
                </div>
                <Button onClick={submit} disabled={busy} className="h-12 text-base">
                  {busy ? "Sending…" : "Email me the PDF"}
                </Button>
                <p className="text-muted-foreground text-center text-xs">
                  No spam, no sales calls. Just the guide.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    openPdf();
                    setOpen(false);
                    track("Guide PDF direct download", { guide: guideKey });
                  }}
                  className="text-muted-foreground hover:text-foreground text-center text-[13px] underline underline-offset-2 transition-colors"
                >
                  or just download it now →
                </button>
              </>
            )}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </Ctx.Provider>
  );
}

// Trigger that opens the gate. `variant="link"` renders inline text (for the
// meta line); `variant="solid"` renders the primary download button.
export function PdfTrigger({
  variant = "solid",
  className,
  children,
}: {
  variant?: "solid" | "link";
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = usePdfGate();

  if (variant === "link") {
    return (
      <button
        type="button"
        onClick={open}
        className={cn("text-primary hover:text-haka-pine font-semibold transition-colors", className)}
      >
        {children}
      </button>
    );
  }

  return (
    <Button onClick={open} className={cn("h-11", className)}>
      <Download className="mr-1.5 h-4 w-4" />
      {children}
    </Button>
  );
}
