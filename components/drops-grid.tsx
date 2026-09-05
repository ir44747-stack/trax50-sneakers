"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

type Props = {
  initialBrand?: string;
};

export function DropsGrid({ initialBrand }: Props) {
  const [active, setActive] = useState<string>(initialBrand ?? "all");
  const [query, setQuery] = useState("");

  const chips = [{ label: "All drops", value: "all" }, ...site.categories];

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchBrand = active === "all" || p.category === active;
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q);
      return matchBrand && matchQuery;
    });
  }, [active, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      {/* Filter bar */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => {
            const activeChip = active === chip.value;
            return (
              <button
                key={chip.value}
                onClick={() => setActive(chip.value)}
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
          {active !== "all" && (
            <>
              {" "}in{" "}
              <span className="capitalize text-foreground">
                {site.categories.find((c) => c.value === active)?.label ?? active}
              </span>
            </>
          )}
        </p>
      </div>

      {visible.length > 0 ? (
        <div
          key={`${active}-${query}`}
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
            Try a different brand or clear your search.
          </p>
        </div>
      )}
    </div>
  );
}
