import { BadgeCheck, Zap, Radar } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

const pillars = [
  {
    icon: BadgeCheck,
    title: "Verified, never fake",
    body: "Every pair is checked before it hits the grid. If we wouldn't wear it, we won't post it.",
  },
  {
    icon: Radar,
    title: "Drops before they blow",
    body: "We track the streetwear radar 24/7 so you're first to the pairs that sell out in minutes.",
  },
  {
    icon: Zap,
    title: "One tap to cop",
    body: "Curated links straight from the feed. No searching, no second-guessing — just checkout.",
  },
];

export function WhyTrax() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow="Why Trax.50"
        title={
          <>
            More than a feed. <span className="text-primary">A shortcut.</span>
          </>
        }
        description={`Born from ${site.instagramUrl.replace("https://instagram.com/", "")}'s ${site.instagramFollowers}-follower community, Trax.50 turns hype into a clean, high-converting shop.`}
      />

      <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <Reveal key={pillar.title} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/5 bg-card p-6 transition-colors hover:border-primary/25 sm:p-8">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-opacity group-hover:bg-primary/10" />
                <div className="relative mb-5 inline-flex rounded-xl bg-primary/10 p-3 text-primary ring-1 ring-primary/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
