import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionGrid } from "@/components/collection-grid";
import { getProductsByAudience } from "@/lib/products";
import { audienceLabel } from "@/lib/site";
import type { SovrnAudience } from "@/lib/affiliate";

const VALID: SovrnAudience[] = ["men", "women", "kids"];

type Params = Promise<{ audience: string }>;

export async function generateStaticParams() {
  return VALID.map((audience) => ({ audience }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { audience } = await params;
  if (!VALID.includes(audience as SovrnAudience)) return {};
  const label = audienceLabel(audience);
  return {
    title: `${label} Sneakers`,
    description: `Shop the best curated ${label.toLowerCase()} sneaker drops — verified by Trax.50 with tracked affiliate links.`,
  };
}

const taglines: Record<SovrnAudience, string> = {
  men: "Straight heat for the fellas.",
  women: "Curated exclusively for the ladies.",
  kids: "The next generation flexin' early.",
};

export default async function CollectionPage({ params }: { params: Params }) {
  const { audience } = await params;
  if (!VALID.includes(audience as SovrnAudience)) notFound();

  const aud = audience as SovrnAudience;
  const label = audienceLabel(aud);
  const products = getProductsByAudience(aud);

  return (
    <div className="pt-24 sm:pt-28">
      <header className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          {label} collection
        </p>
        <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {label} <span className="volt-gradient-text">drops</span>
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          {taglines[aud]} Every pair here is verified and carries a tracked
          affiliate link — nothing else makes the cut.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {products.length} {products.length === 1 ? "drop" : "drops"} live
        </p>
      </header>
      <CollectionGrid audience={aud} products={products} />
    </div>
  );
}
