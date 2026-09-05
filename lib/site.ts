/**
 * TRAX.50 — central site & brand configuration.
 * Single source of truth for identity, navigation, and socials.
 */

export const site = {
  name: "Trax.50",
  handle: "@trax.50",
  tagline: "Luxury & streetwear sneaker drops.",
  description:
    "Trax.50 curates the hottest luxury and streetwear sneaker drops — Nike, Jordan, Adidas, New Balance and more — so you can cop the fire before it's gone.",
  url: "https://trax50.example.com", // TODO Phase 5: production domain
  instagramUrl: "https://instagram.com/trax.50",
  instagramFollowers: "161K",
  categories: [
    { label: "Jordan", value: "jordan" },
    { label: "Nike", value: "nike" },
    { label: "Adidas", value: "adidas" },
    { label: "New Balance", value: "new-balance" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Drops", href: "/drops" },
    { label: "Categories", href: "/#categories" },
    { label: "About", href: "/#about" },
  ],
  affiliateDisclaimer:
    "As an affiliate, Trax.50 earns from qualifying purchases. Prices and availability are accurate at the time of publishing and may change.",
} as const;

export const formatPrice = (price: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
