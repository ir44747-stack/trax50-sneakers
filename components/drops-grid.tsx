"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { renderableProducts } from "@/lib/products";
import { site } from "@/lib/site";

type Props = {
  initialAudience?: string;
  initialBrand?: string;
};

const ALL = "all";

export function DropsGrid({ initialAudience, initialBrand }: Props) {
  const [audience, setAudience] = useState<string>(initialAudience ?? ALL);
  const [brand, setBrand] = useState<string>(initialBrand ?? ALL);
  const [query, setQuery] = useState("");

  const audienceChips = [{ label: "All", value: ALL }, ...site.audiences];
  const brandChips = [
    { label: "All brands", value: ALL },
    ...site.categories,
  ];

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return renderableProducts.filter((p) => {
      const matchAudience = audience === ALL || p.audience === audience;
      const matchBrand = brand === ALL || p.brand === brand;
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.audience.toLowerCase().includes(q);
      return matchAudience && matchBrand && matchQuery;
    });
  }, [audience, brand, query]);

  const activeAudienceLabel = audience === ALL ? "all" : audience;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      {/* Audience filter (strict Men / Women / Kids) */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="mr-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Collection
        </span>
        {audienceChips.map((chip) => {
          const activeChip = audience === chip.value;
          return (
            <button
              key={chip.value}
              onClick={() => setAudience(chip.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeChip
                  ? "bg-primary text-primary-foreground"
                  : "border border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Brand
          </span>
          {brandChips.map((chip) => {
            const activeChip = brand === chip.value;
            return (
              <button
                key={chip.value}
                onClick={() => setBrand(chip.value)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                  activeChip
                    ? "bg-foreground text-background"
                    : "border border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the drops…"
            className="h-10 w-full rounded-full border border-white/10 bg-white/5 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {visible.length} {visible.length === 1 ? "drop" : "drops"}
          {audience !== ALL && (
            <>
              {" "}for{" "}
              <span className="capitalize text-foreground">{activeAudienceLabel}</span>
            </>
          )}
          {brand !== ALL && (
            <>
              {" "}·{" "}
              <span className="capitalize text-foreground">
                {site.categories.find((c) => c.value === brand)?.label ?? brand}
              </span>
            </>
          )}
        </p>
      </div>

      {visible.length > 0 ? (
        <div
          key={`${audience}-${brand}-${query}`}
          className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4"
        >
          {visible.map((product, i) => (
            <Reveal key={product.id} delay={i * 45}>
              <ProductCard product={product} priority={i < 4} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">
          <p className="text-foreground">No drops match that.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different collection, brand, or clear your search.
          </p>
        </div>
      )}
    </div>
  );
}
