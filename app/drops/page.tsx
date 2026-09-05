import type { Metadata } from "next";
import { DropsGrid } from "@/components/drops-grid";

export const metadata: Metadata = {
  title: "All Drops",
  description:
    "Browse every curated Trax.50 sneaker drop — Nike, Jordan, Adidas, New Balance and more.",
};

export default async function DropsPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const { brand } = await searchParams;
  return (
    <div className="pt-24 sm:pt-28">
      <header className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          The vault
        </p>
        <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          All drops, <span className="volt-gradient-text">zero filler</span>
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          Every pair on this page is hand-picked and verified by the Trax.50
          community. Filter, search, and cop before it&apos;s gone.
        </p>
      </header>
      <DropsGrid initialBrand={brand} />
    </div>
  );
}
