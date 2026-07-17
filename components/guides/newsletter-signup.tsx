"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// The recurring newsletter box on the hub and every guide page. Posts to the
// shared lead route with guide="newsletter"; the design copy is preserved.
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setError(true);
      return;
    }
    setBusy(true);
    setError(false);
    try {
      await fetch("/api/guide-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), guide: "newsletter" }),
      });
      track("Guide newsletter signup");
    } catch {
      /* best-effort */
    } finally {
      setBusy(false);
      setDone(true);
    }
  }

  return (
    <div className="border-border bg-card mt-7 rounded-xl border p-5 sm:px-6">
      {done ? (
        <p className="text-foreground text-sm leading-relaxed">
          <strong className="font-semibold">You&apos;re on the list.</strong>{" "}
          <span className="text-muted-foreground">
            We&apos;ll send the next guide when it&apos;s ready — one email a month, no pitch.
          </span>
        </p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <p className="text-foreground text-sm">
            New guides as we publish them.{" "}
            <span className="text-muted-foreground">One email a month, no pitch.</span>
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={email}
              aria-label="Email address"
              aria-invalid={error}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 flex-1 text-base"
            />
            <Button type="submit" disabled={busy} className="h-11 sm:w-auto">
              {busy ? "…" : "Sign up"}
            </Button>
          </div>
          {error ? (
            <p className="text-[13px] text-[#a05252]">Enter a valid email address.</p>
          ) : null}
        </form>
      )}
    </div>
  );
}
