import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const cards = [
  {
    label: "Jordan",
    sub: "The grail factory",
    image: "/images/prod-4.jpg",
  },
  {
    label: "Nike",
    sub: "Dunks · Air Max · SB",
    image: "/images/prod-1.jpg",
  },
  {
    label: "Adidas",
    sub: "Yeezy & performance",
    image: "/images/prod-2.jpg",
  },
  {
    label: "New Balance",
    sub: "Made in USA staples",
    image: "/images/prod-3.jpg",
  },
];

export function Categories() {
  return (
    <section
      id="categories"
      className="relative border-y border-white/5 bg-surface/40 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Shop by brand"
          title={
            <>
              Pick your <span className="text-primary">obsession</span>
            </>
          }
          description="Filter the feed by the labels you actually wear. Every pick is verified before it hits the grid."
        />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
          {cards.map((card, i) => (
            <Reveal key={card.label} delay={i * 70}>
              <Link
                href={`/drops?brand=${card.label.toLowerCase().replace(/ /g, "-")}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-white/5 bg-surface"
              >
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div>
                    <p className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                      {card.label}
                    </p>
                    <p className="mt-1 text-xs text-white/60">{card.sub}</p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
