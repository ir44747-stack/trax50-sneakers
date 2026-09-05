import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Copy */}
        <div className="relative z-10 animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Live from {site.instagramUrl.replace("https://instagram.com/", "")}
            <span className="text-foreground">· {site.instagramFollowers} followers</span>
          </div>

          <h1 className="text-balance text-4xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Cop the drops
            <br />
            <span className="volt-gradient-text">before they sell out.</span>
          </h1>

          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            Trax.50 hand-picks the hottest luxury and streetwear sneakers —
            Nike, Jordan, Adidas, New Balance &amp; beyond — so you never miss
            a grail. Tap in, check out, flex.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="gap-2 px-7 py-6 text-base">
              <Link href="/men">
                Explore the drops <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-white/15 bg-white/5 px-7 py-6 text-base backdrop-blur hover:bg-white/10"
            >
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                <Play className="h-4 w-4" /> Watch on IG
              </a>
            </Button>
          </div>

          {/* proof row */}
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {[
              ["161K+", "Instagram"],
              ["100+", "Drops curated"],
              ["0", "Fakes. Ever."],
            ].map(([num, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {num}
                </dd>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual */}
        <div className="relative z-10">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl lg:max-w-none">
            <Image
              src="/images/hero-drop.jpg"
              alt="Trax.50 featured sneaker drop"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="animate-float object-cover"
            />
            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />

            {/* floating chips */}
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3.5 py-2 text-xs font-semibold backdrop-blur">
              <span className="rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-black text-primary-foreground">
                NEW
              </span>
              Drop 050
            </div>
            <div className="absolute right-4 top-4 animate-glow-pulse rounded-full bg-primary/90 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
              In stock
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Featured grail
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Retro Court High · &quot;Midnight Volt&quot;
                  </p>
                </div>
                <div className="shrink-0 rounded-xl bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">
                  $185
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
