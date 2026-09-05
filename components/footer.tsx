import Link from "next/link";
import { Logo } from "@/components/logo";
import { InstagramGlyph } from "@/components/social-icons";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-xs">
            <Link href="/" aria-label="Trax.50 home">
              <Logo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
            <p className="mt-4 text-xs text-muted-foreground/70">
              Curated drops for {site.handle}&apos;s {site.instagramFollowers}
              -strong community. Built mobile-first for the culture.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Trax.50 on Instagram"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <InstagramGlyph />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-foreground">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {site.nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-foreground">
              Collections
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {site.audiences.map((a) => (
                <li key={a.value}>
                  <Link
                    href={`/${a.value}`}
                    className="transition-colors hover:text-primary"
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground/80">
            {site.affiliateDisclaimer}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
