"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { GlobalSearch } from "@/components/global-search";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import type { SearchHit } from "@/lib/products";

export function Navbar({ catalog = [] }: { catalog?: SearchHit[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/5 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Trax.50 home" onClick={() => setOpen(false)} className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop links — strict: Home / Men / Women / Kids only */}
        <div className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Real-time global search across the whole catalog */}
        <div className="ml-auto hidden w-64 shrink md:block lg:w-80">
          <GlobalSearch catalog={catalog} className="w-full" />
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden ml-auto"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile menu — strict: Home / Men / Women / Kids only */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 border-t border-white/5 bg-background/95 px-4 py-4 backdrop-blur-xl">
          {site.nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
