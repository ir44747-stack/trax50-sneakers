"use client";

import { BellRing, ArrowRight } from "lucide-react";
import { InstagramGlyph } from "@/components/social-icons";
import { site } from "@/lib/site";

export function CTA() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 px-6 py-16 text-center sm:px-16 sm:py-24">
        {/* background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f1318] via-[#0a0d10] to-black" />
        <div className="absolute inset-0 -z-10 noise-overlay opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

        <div className="mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <BellRing className="h-3.5 w-3.5" /> Don&apos;t miss the next drop
          </span>
          <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Get drop alerts before <span className="volt-gradient-text">everyone else</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Join the {site.instagramFollowers}-strong community. New heat, restocks
            and grail alerts land in your feed the second they go live.
          </p>

          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              aria-label="Email address"
              className="h-12 flex-1 rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-105"
            >
              Notify me <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            No spam. Only drops. Unsubscribe anytime.
          </p>

          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <InstagramGlyph className="h-4 w-4" /> Follow {site.handle} for daily drops
          </a>
        </div>
      </div>
    </section>
  );
}
