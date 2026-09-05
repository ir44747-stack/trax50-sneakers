import { Hero } from "@/components/hero";
import { BrandMarquee } from "@/components/brand-marquee";
import { FeaturedDrops } from "@/components/featured-drops";
import { Categories } from "@/components/categories";
import { WhyTrax } from "@/components/why-trax";
import { CTA } from "@/components/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <FeaturedDrops />
      <Categories />
      <WhyTrax />
      <CTA />
    </>
  );
}
