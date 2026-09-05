/**
 * TRAX.50 — Product catalog (real products).
 *
 * Every product MUST satisfy the strict rules enforced in this data layer:
 *   1. Belongs to exactly one Men / Women / Kids audience (`audience` required).
 *   2. Carries a VALID Sovrn tracking URL (`affiliateUrl`) — never "#", never empty.
 *   3. Carries a usable, non-empty image path (`image`).
 *
 * Products that fail ANY rule are DROPPED here (see `renderableProducts`) so no
 * product, image or sneaker ever reaches the render layer without a valid
 * affiliate tracking link and a valid image.
 *
 * `destinationUrl` points to a real, live merchant product page (StockX). Each
 * destination is Sovrn-wrapped into `affiliateUrl` (see lib/affiliate.ts) using
 * the publisher key from `SOVRN_PUBLISHER_KEY`.
 *
 * NOTE ON IMAGERY: images in /public/images are stylized studio renders of each
 * model/colorway. Replace them with the official merchant product images from
 * the destination pages before full go-live for 1:1 accuracy.
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

type Seed = Omit<Product, "affiliateUrl">;

function seedToProduct(seed: Seed): Product {
  return { ...seed, affiliateUrl: buildSovrnAffiliateUrl(seed.destinationUrl) };
}

const seeds: Seed[] = [
  {
    id: "trax-001",
    name: "Nike Dunk Low Retro 'Panda' (2021)",
    brand: "nike",
    audience: "men",
    price: 115,
    currency: "USD",
    image: `${ASSET}/prod-1.jpg`,
    tag: "RESTOCK",
    isNew: true,
    destinationUrl:
      "https://stockx.com/nike-dunk-low-retro-white-black-2021",
  },
  {
    id: "trax-002",
    name: "adidas Samba OG 'Cloud White / Core Black'",
    brand: "adidas",
    audience: "men",
    price: 100,
    currency: "USD",
    image: `${ASSET}/prod-2.jpg`,
    tag: "HOT",
    isNew: true,
    destinationUrl: "https://stockx.com/adidas-samba-og-cloud-white-core-black",
  },
  {
    id: "trax-003",
    name: "New Balance 574 'Nimbus Cloud White'",
    brand: "new-balance",
    audience: "women",
    price: 100,
    currency: "USD",
    image: `${ASSET}/prod-3.jpg`,
    isNew: true,
    destinationUrl: "https://stockx.com/new-balance-574-nimbus-cloud-white-w",
  },
  {
    id: "trax-004",
    name: "Air Jordan 1 Retro High OG 'Chicago Lost & Found'",
    brand: "jordan",
    audience: "men",
    price: 180,
    currency: "USD",
    image: `${ASSET}/prod-4.jpg`,
    tag: "GRAIL",
    destinationUrl:
      "https://stockx.com/air-jordan-1-retro-high-og-chicago-reimagined-lost-and-found",
  },
  {
    id: "trax-005",
    name: "Nike Dunk Low Retro 'Panda' (GS)",
    brand: "nike",
    audience: "kids",
    price: 85,
    currency: "USD",
    image: `${ASSET}/prod-5.jpg`,
    tag: "DROP",
    isNew: true,
    destinationUrl: "https://stockx.com/nike-dunk-low-retro-white-black-gs",
  },
  {
    id: "trax-006",
    name: "Air Jordan 1 Mid 'Panda' (Women's)",
    brand: "jordan",
    audience: "women",
    price: 125,
    currency: "USD",
    image: `${ASSET}/prod-6.jpg`,
    tag: "HOT",
    destinationUrl: "https://stockx.com/air-jordan-1-mid-panda-womens",
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
