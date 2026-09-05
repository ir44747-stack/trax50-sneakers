/**
 * TRAX.50 — Product catalog.
 *
 * Every product MUST satisfy BOTH rules enforced in this data layer:
 *   1. Belongs to a STRICT Men / Women / Kids audience (`audience` is required).
 *   2. Carries a VALID Sovrn tracking URL (`affiliateUrl`) — never "#", never empty.
 *
 * Products that fail either rule are excluded from what the UI renders
 * (see `renderableProducts` and `lib/affiliate.ts`).
 *
 * NOTE ON DEMO LINKS: `affiliateUrl` is a well-formed Sovrn/VigLink URL that
 * points at a clearly-marked `shop.example.com` demo destination. Swap in your
 * real merchant product URLs and set `SOVRN_PUBLISHER_KEY` to go live.
 */

import {
  buildSovrnAffiliateUrl,
  filterToRenderable,
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
  /** Real merchant/product page that Sovrn should affiliate (Phase 3: real URLs). */
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

/**
 * STRICT-affiliate-filtered catalog.
 * Only products whose Sovrn tracking URL passes validation are shown.
 * A product without a valid link is DROPPED here — before the UI renders.
 */
export const renderableProducts: Product[] =
  filterToRenderable<Product>(products);

/** Catalog already constrained to renderable products (for featured/hero). */
export const featuredProducts = renderableProducts.filter(
  (p) => p.isNew || p.tag
);

export const getProduct = (id: string) =>
  renderableProducts.find((p) => p.id === id);
