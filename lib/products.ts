/**
 * TRAX.50 — Product catalog.
 *
 * Every product MUST satisfy BOTH strict rules enforced in this data layer:
 *   1. Belongs to exactly one Men / Women / Kids audience (`audience` required).
 *   2. Carries a VALID Sovrn tracking URL (`affiliateUrl`) — never "#", never empty.
 *   3. Carries a usable, non-empty image path (`image`).
 *
 * Products that fail ANY rule are DROPPED here (see `renderableProducts`) so no
 * product, image or sneaker ever reaches the render layer without a valid
 * affiliate tracking link and a valid image.
 *
 * NOTE ON DEMO LINKS: `affiliateUrl` is a well-formed Sovrn/VigLink URL that
 * points at a clearly-marked `shop.example.com` demo destination. Swap in your
 * real merchant product URLs and set `SOVRN_PUBLISHER_KEY` to go live.
 */

import {
  buildSovrnAffiliateUrl,
  isSovrnAffiliateUrlValid,
  type SovrnAudience,
} from "@/lib/affiliate";

export type Brand =
  | "jordan"
  | "nike"
  | "adidas"
  | "new-balance"
  | "luxury";

export type Product = {
  id: string;
  name: string;
  brand: Brand;
  audience: SovrnAudience; // STRICT: men | women | kids
  price: number;
  currency: string;
  image: string;
  tag?: "HOT" | "DROP" | "RESTOCK" | "GRAIL";
  isNew?: boolean;
  /** Real merchant/product page that Sovrn should affiliate. */
  destinationUrl: string;
  /** Validated Sovrn tracking URL. Always set; see lib/affiliate.ts. */
  affiliateUrl: string;
};

const ASSET = "/images";

/** Demo retailer origin used only until real merchant URLs are supplied. */
const DEMO_DEST = "https://shop.example.com";

type Seed = Omit<Product, "affiliateUrl">;

function seedToProduct(seed: Seed): Product {
  return { ...seed, affiliateUrl: buildSovrnAffiliateUrl(seed.destinationUrl) };
}

const seeds: Seed[] = [
  {
    id: "trax-001",
    name: "Retro Court High 'Midnight Volt'",
    brand: "nike",
    audience: "men",
    price: 185,
    currency: "USD",
    image: `${ASSET}/prod-1.jpg`,
    tag: "DROP",
    isNew: true,
    destinationUrl: `${DEMO_DEST}/nike-retro-court-high-midnight-volt`,
  },
  {
    id: "trax-002",
    name: "Flux Runner 'Graphite Volt'",
    brand: "adidas",
    audience: "men",
    price: 160,
    currency: "USD",
    image: `${ASSET}/prod-2.jpg`,
    tag: "HOT",
    destinationUrl: `${DEMO_DEST}/adidas-flux-runner-graphite-volt`,
  },
  {
    id: "trax-003",
    name: "Cloudmonster Luxe 'Cream Sand'",
    brand: "new-balance",
    audience: "women",
    price: 220,
    currency: "USD",
    image: `${ASSET}/prod-3.jpg`,
    isNew: true,
    destinationUrl: `${DEMO_DEST}/new-balance-cloudmonster-luxe-cream-sand`,
  },
  {
    id: "trax-004",
    name: "Skyline Pro 'Slate Blue'",
    brand: "jordan",
    audience: "men",
    price: 200,
    currency: "USD",
    image: `${ASSET}/prod-4.jpg`,
    tag: "GRAIL",
    destinationUrl: `${DEMO_DEST}/jordan-skyline-pro-slate-blue`,
  },
  {
    id: "trax-005",
    name: "Heritage Court 'Triple White'",
    brand: "nike",
    audience: "kids",
    price: 140,
    currency: "USD",
    image: `${ASSET}/prod-5.jpg`,
    tag: "RESTOCK",
    destinationUrl: `${DEMO_DEST}/nike-heritage-court-triple-white-kids`,
  },
  {
    id: "trax-006",
    name: "Futura Voltic 'Acid Hi'",
    brand: "jordan",
    audience: "women",
    price: 260,
    currency: "USD",
    image: `${ASSET}/prod-6.jpg`,
    tag: "HOT",
    isNew: true,
    destinationUrl: `${DEMO_DEST}/jordan-futura-voltic-acid-hi`,
  },
];

/** Full source catalog (including any that may fail validation). */
export const products: Product[] = seeds.map(seedToProduct);

/** A usable image is a non-empty local path ("/...") or an absolute http(s) URL. */
export function isValidProductImage(image: string | undefined | null): boolean {
  if (!image) return false;
  const t = image.trim();
  if (t.length === 0 || t === "#") return false;
  if (t.startsWith("/")) return true; // local asset path under /public
  try {
    const url = new URL(t);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * STRICT RULE — a product is renderable ONLY if it has BOTH a valid Sovrn
 * affiliate tracking URL AND a valid image. Otherwise it is dropped.
 */
export function isRenderable(p: Product): boolean {
  return isSovrnAffiliateUrlValid(p.affiliateUrl) && isValidProductImage(p.image);
}

/** Full catalog, pre-filtered to ONLY renderable products (strict rule). */
export const renderableProducts: Product[] = products.filter(isRenderable);

/** Strict catalog split into the three sections: Men / Women / Kids. */
export function getProductsByAudience(audience: SovrnAudience): Product[] {
  return renderableProducts.filter((p) => p.audience === audience);
}

export const menProducts = getProductsByAudience("men");
export const womenProducts = getProductsByAudience("women");
export const kidsProducts = getProductsByAudience("kids");

/** Featured/hero product pool already constrained to renderable products. */
export const featuredProducts = renderableProducts.filter(
  (p) => p.isNew || p.tag
);

export const getProduct = (id: string) =>
  renderableProducts.find((p) => p.id === id);
