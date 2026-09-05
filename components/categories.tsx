import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { renderableProducts } from "@/lib/products";

const visuals: Record<string, { sub: string; image: string }> = {
  men: { sub: "Heat for the fellas", image: "/images/prod-4.jpg" },
  women: { sub: "Strictly for the ladies", image: "/images/prod-6.jpg" },
  kids: { sub: "Future flexin'", image: "/images/prod-5.jpg" },
};

export function Categories() {
  const audiences = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "kids", label: "Kids" },
  ];

  return (
    <section
      id="collections"
      className="relative border-y border-white/5 bg-surface/40 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Shop by collection"
          title={
            <>
              Men. Women. <span className="text-primary">Kids.</span>
            </>
          }
          description="Every drop is strictly categorized — no guesswork. Tap a collection to see only what fits who you're copping for."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {audiences.map((a, i) => {
            const visual = visuals[a.value];
            const count = renderableProducts.filter(
              (p) => p.audience === a.value
            ).length;
            return (
              <Reveal key={a.value} delay={i * 70}>
                <Link
                  href={`/${a.value}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-white/5 bg-surface"
                >
                  <Image
                    src={visual.image}
                    alt={`${a.label} sneakers`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                        {count} {count === 1 ? "drop" : "drops"}
                      </p>
                      <p className="font-display text-3xl font-bold tracking-tight text-white">
                        {a.label}
                      </p>
                      <p className="mt-1 text-xs text-white/60">{visual.sub}</p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
