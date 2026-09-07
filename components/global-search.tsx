"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Search, X, ArrowUpRight } from "lucide-react";
import { formatPrice, audienceLabel } from "@/lib/site";
import { buildHaystack, scoreProduct } from "@/lib/search";
import type { SearchHit } from "@/lib/products";

/**
 * Real-time, global sneaker search shown in the header.
 *
 * Searches the ENTIRE catalog (Men + Women + Kids, all brands) by name / model
 * / brand as you type. Each hit is a real anchor to its validated Sovrn
 * tracking URL (opens StockX in a new tab) — never a placeholder.
 *
 * NOTE: `catalog` is passed in from a server component (see layout.tsx) rather
 * than importing lib/products.ts directly, so the affiliate URLs are the
 * real, key-validated ones computed at build time.
 */
export function GlobalSearch({
  catalog,
  className = "",
}: {
  catalog: SearchHit[];
  className?: string;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const query = q.trim();

  // Pre-compute a normalized haystack once per catalog change so live typing
  // is cheap (scoreProduct is run only against these lightweight strings).
  const haystacks = useMemo(
    () => new Map(catalog.map((p) => [p.id, buildHaystack(p)])),
    [catalog]
  );

  const results = useMemo(() => {
    if (!query) return [];
    const scored = catalog
      .map((p) => {
        const hay = haystacks.get(p.id) || "";
        return { p, score: scoreProduct(hay, query) };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.p);
    return scored;
  }, [catalog, haystacks, query]);

  const showPanel = open && q.trim().length > 0;

  // Close on outside click / Escape.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActive(-1);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActive(-1);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          value={q}
          role="combobox"
          aria-expanded={showPanel}
          aria-controls="trax-global-search-results"
          aria-autocomplete="list"
          aria-label="Search sneakers by name, model or brand"
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
              setActive((i) => Math.min(i + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter") {
              if (active >= 0 && results[active]) {
                window.open(results[active].affiliateUrl, "_blank", "noopener,noreferrer");
              } else if (results.length === 1) {
                window.open(results[0].affiliateUrl, "_blank", "noopener,noreferrer");
              }
            }
          }}
          placeholder="Search sneakers, models, brands…"
          className="h-10 w-full rounded-full border border-white/10 bg-white/5 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
        />
        {q && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setActive(-1);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showPanel && (
        <div
          id="trax-global-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-12 z-[60] max-h-[70vh] overflow-auto rounded-2xl border border-white/10 bg-surface/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          <p className="px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {results.length} {results.length === 1 ? "result" : "results"} across Men
            · Women · Kids
          </p>

          {results.length === 0 ? (
            <div className="px-3 py-8 text-center">
              <p className="text-foreground">No sneakers match “{q.trim()}”.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a model (e.g. Samba, 550, XT-6) or a brand.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {results.map((p, i) => (
                <a
                  key={p.id}
                  role="option"
                  aria-selected={active === i}
                  href={p.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group flex items-center gap-3 rounded-xl p-2 transition-colors ${
                    active === i
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {p.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="uppercase tracking-wider text-primary">
                        {p.brand}
                      </span>{" "}
                      · {audienceLabel(p.audience)} · {p.id}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <span className="text-sm font-bold text-foreground">
                      {formatPrice(p.price, p.currency)}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                </a>
              ))}
            </div>
          )}

          <p className="px-3 py-2 text-[11px] text-muted-foreground">
            Opens the verified listing on StockX in a new tab. Trax.50 may earn a
            commission.
          </p>
        </div>
      )}
    </div>
  );
}
