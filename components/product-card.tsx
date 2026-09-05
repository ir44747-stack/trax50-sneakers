import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Flame, Repeat, Crown } from "lucide-react";
import { formatPrice, audienceLabel } from "@/lib/site";
import { getValidatedAffiliateUrl, isSovrnAffiliateUrlValid } from "@/lib/affiliate";
import type { Product } from "@/lib/products";

const tagStyles: Record<NonNullable<Product["tag"]>, string> = {
  HOT: "bg-foreground text-background",
  DROP: "bg-primary text-primary-foreground",
  RESTOCK: "bg-white/10 text-foreground backdrop-blur",
  GRAIL: "bg-gradient-to-r from-primary to-lime-300 text-primary-foreground",
};

const tagIcons = {
  HOT: Flame,
  DROP: Sparkles,
  RESTOCK: Repeat,
  GRAIL: Crown,
} as const;

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  // STRICT Sovrn rule: a product without a valid tracking link must NOT render.
  if (!isSovrnAffiliateUrlValid(product.affiliateUrl)) return null;

  const TagIcon = product.tag ? tagIcons[product.tag] : null;
  const buyUrl = getValidatedAffiliateUrl(product.affiliateUrl) as string;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_rgba(214,255,63,0.25)]">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={product.image}
          alt={`${product.brand} — ${product.name}`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Tags */}
        {product.tag && (
          <span
            className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${tagStyles[product.tag]}`}
          >
            {TagIcon && <TagIcon className="h-3 w-3" />}
            {product.tag}
          </span>
        )}
        {product.isNew && (
          <span className="absolute right-3 top-3 inline-flex items-center rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur">
            New
          </span>
        )}

        {/* Hover quick-buy */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:brightness-105"
          >
            Cop it <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
            {product.brand}
          </span>
          <span className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {audienceLabel(product.audience)}
          </span>
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="rounded-full bg-white/5 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {product.id}
          </span>
        </div>
      </div>
    </article>
  );
}
