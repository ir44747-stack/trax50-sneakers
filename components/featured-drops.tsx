import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { featuredProducts } from "@/lib/products";

export function FeaturedDrops() {
  return (
    <section id="drops" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow="Heat of the week"
        title={
          <>
            The drops everyone&apos;s <span className="text-primary">talking about</span>
          </>
        }
        description="Curated from the @trax.50 feed. When it's here, it's verified — and moving fast."
      />

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {featuredProducts.map((product, i) => (
          <Reveal key={product.id} delay={i * 70}>
            <ProductCard product={product} priority={i < 2} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
