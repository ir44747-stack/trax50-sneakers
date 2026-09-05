const brands = [
  "NIKE",
  "JORDAN",
  "ADIDAS",
  "NEW BALANCE",
  "YEEZY",
  "AIR MAX",
  "DUNK",
  "ONITSUKA",
  "HOKA",
  "SALOMON",
];

export function BrandMarquee() {
  const loop = [...brands, ...brands];
  return (
    <section className="border-y border-white/5 bg-surface/60 py-5">
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {loop.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-xl font-bold uppercase tracking-[0.28em] text-foreground/35 transition-colors hover:text-primary sm:text-2xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
