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
  /** STRICT Men / Women / Kids taxonomy — every product must belong to one. */
  audiences: [
    { value: "men", label: "Men", plural: "Men" },
    { value: "women", label: "Women", plural: "Women" },
    { value: "kids", label: "Kids", plural: "Kids" },
  ],
  /** Secondary brand taxonomy used for brand filtering/search. */
  categories: [
    { label: "Jordan", value: "jordan" },
    { label: "Nike", value: "nike" },
    { label: "Adidas", value: "adidas" },
    { label: "New Balance", value: "new-balance" },
    { label: "ASICS", value: "asics" },
    { label: "Salomon", value: "salomon" },
  ],
  /** Strict navigation — ONLY Home, Men, Women, Kids. No filler links. */
  nav: [
    { label: "Home", href: "/" },
    { label: "Men", href: "/men" },
    { label: "Women", href: "/women" },
    { label: "Kids", href: "/kids" },
  ],
  affiliateDisclaimer:
    "As an affiliate, Trax.50 earns from qualifying purchases. Prices and availability are accurate at the time of publishing and may change. All outbound links are monetized via Sovrn Commerce.",
} as const;

export const formatPrice = (price: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);

/** Look up the human label for an audience value (falls back to capitalized). */
export function audienceLabel(value: string): string {
  const found = site.audiences.find((a) => a.value === value);
  if (found) return found.label;
  return value.charAt(0).toUpperCase() + value.slice(1);
}
