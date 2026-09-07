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
 * NOTE ON IMAGERY: images in /public/images are the OFFICIAL StockX product
 * images for each destination, downloaded from images.stockx.com/images/ so
 * each card's photo matches its product title, brand and affiliate link.
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
  | "asics"
  | "salomon"
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

/**
 * Explicit product -> image mapping (single source of truth).
 *
 * Each active product id maps to the exact official product image filename in
 * /public/images that corresponds to that product's title, brand and StockX
 * destination. Kept as an explicit lookup so no product can silently reference
 * a wrong, swapped or missing image file. The active catalog is trax-001..006
 * and trax-011..040 (ids 007-010 were retired, so their prod-N files are legacy).
 */
export const PRODUCT_IMAGE_MAP: Readonly<Record<string, string>> = {
  "trax-001": "prod-1.jpg",
  "trax-002": "prod-2.jpg",
  "trax-003": "prod-3.jpg",
  "trax-004": "prod-4.jpg",
  "trax-005": "prod-5.jpg",
  "trax-006": "prod-6.jpg",
  "trax-011": "prod-11.jpg",
  "trax-012": "prod-12.jpg",
  "trax-013": "prod-13.jpg",
  "trax-014": "prod-14.jpg",
  "trax-015": "prod-15.jpg",
  "trax-016": "prod-16.jpg",
  "trax-017": "prod-17.jpg",
  "trax-018": "prod-18.jpg",
  "trax-019": "prod-19.jpg",
  "trax-020": "prod-20.jpg",
  "trax-021": "prod-21.jpg",
  "trax-022": "prod-22.jpg",
  "trax-023": "prod-23.jpg",
  "trax-024": "prod-24.jpg",
  "trax-025": "prod-25.jpg",
  "trax-026": "prod-26.jpg",
  "trax-027": "prod-27.jpg",
  "trax-028": "prod-28.jpg",
  "trax-029": "prod-29.jpg",
  "trax-030": "prod-30.jpg",
  "trax-031": "prod-31.jpg",
  "trax-032": "prod-32.jpg",
  "trax-033": "prod-33.jpg",
  "trax-034": "prod-34.jpg",
  "trax-035": "prod-35.jpg",
  "trax-036": "prod-36.jpg",
  "trax-037": "prod-37.jpg",
  "trax-038": "prod-38.jpg",
  "trax-039": "prod-39.jpg",
  "trax-040": "prod-40.jpg",
};

/** Resolve a product's absolute /images/... path from the explicit image map. */
function resolveProductImage(id: string): string {
  const file = PRODUCT_IMAGE_MAP[id];
  if (!file) {
    throw new Error(`Missing product image mapping for ${id}`);
  }
  return `${ASSET}/${file}`;
}

type Seed = Omit<Product, "affiliateUrl" | "image">;

function seedToProduct(seed: Seed): Product {
  return {
    ...seed,
    image: resolveProductImage(seed.id),
    affiliateUrl: buildSovrnAffiliateUrl(seed.destinationUrl),
  };
}


const seeds: Seed[] = [
  {
    id: "trax-001",
    name: "Nike Dunk Low Retro 'Panda' (2021)",
    brand: "nike",
    audience: "men",
    price: 58,
    currency: "USD",
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
    price: 60,
    currency: "USD",
    tag: "HOT",
    isNew: true,
    destinationUrl: "https://stockx.com/adidas-samba-og-cloud-white-core-black",
  },
  {
    id: "trax-003",
    name: "New Balance 574 'Nimbus Cloud White'",
    brand: "new-balance",
    audience: "women",
    price: 60,
    currency: "USD",
    isNew: true,
    destinationUrl: "https://stockx.com/new-balance-574-nimbus-cloud-white-w",
  },
  {
    id: "trax-004",
    name: "Air Jordan 1 Retro High OG 'Chicago Lost & Found'",
    brand: "jordan",
    audience: "men",
    price: 167,
    currency: "USD",
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
    tag: "DROP",
    isNew: true,
    destinationUrl: "https://stockx.com/nike-dunk-low-retro-white-black-gs",
  },
  {
    id: "trax-006",
    name: "Air Jordan 1 Mid 'Panda' (Women's)",
    brand: "jordan",
    audience: "women",
    price: 72,
    currency: "USD",
    tag: "HOT",
    destinationUrl: "https://stockx.com/air-jordan-1-mid-panda-womens",
  },
  {
    id: "trax-011",
    name: "Air Jordan 4 Retro 'Bred Reimagined' (2024)",
    brand: "jordan",
    audience: "men",
    price: 203,
    currency: "USD",
    tag: "DROP",
    isNew: true,
    destinationUrl:
      "https://stockx.com/air-jordan-4-retro-bred-reimagined",
  },
  {
    id: "trax-012",
    name: "New Balance 990v6 MiUSA 'Grey Day' (2023)",
    brand: "new-balance",
    audience: "men",
    price: 157,
    currency: "USD",
    tag: "RESTOCK",
    isNew: true,
    destinationUrl:
      "https://stockx.com/new-balance-990v6-miusa-teddy-santis-marblehead-vintage-indigo",
  },
  {
    id: "trax-013",
    name: "ASICS Gel-Kayano 14 'Black/Cream'",
    brand: "asics",
    audience: "men",
    price: 117,
    currency: "USD",
    tag: "HOT",
    isNew: true,
    destinationUrl: "https://stockx.com/asics-gel-kayano-14-black-cream",
  },
  {
    id: "trax-014",
    name: "Salomon XT-6 'Vanilla Ice / Black / Silver Cloud'",
    brand: "salomon",
    audience: "men",
    price: 189,
    currency: "USD",
    tag: "HOT",
    isNew: true,
    destinationUrl:
      "https://stockx.com/salomon-xt-6-vanilla-ice-black-silver-cloud",
  },
  {
    id: "trax-015",
    name: "Air Jordan 11 Retro DMP 'Gratitude' (2023)",
    brand: "jordan",
    audience: "men",
    price: 227,
    currency: "USD",
    tag: "GRAIL",
    destinationUrl:
      "https://stockx.com/air-jordan-11-retro-dmp-defining-moments-2023",
  },
  {
    id: "trax-016",
    name: "New Balance 550 'White/Green'",
    brand: "new-balance",
    audience: "men",
    price: 65,
    currency: "USD",
    tag: "HOT",
    isNew: true,
    destinationUrl: "https://stockx.com/new-balance-550-white-green",
  },
  {
    id: "trax-017",
    name: "ASICS Gel-Lyte III Remastered 'Kith Seoul'",
    brand: "asics",
    audience: "men",
    price: 143,
    currency: "USD",
    tag: "DROP",
    isNew: true,
    destinationUrl:
      "https://stockx.com/asics-gel-lyte-iii-remastered-kith-seoul",
  },
  {
    id: "trax-018",
    name: "Salomon ACS Pro Advanced 'Black/Grey'",
    brand: "salomon",
    audience: "men",
    price: 213,
    currency: "USD",
    tag: "DROP",
    isNew: true,
    destinationUrl: "https://stockx.com/salomon-acs-pro-advanced-black-grey",
  },
  {
    id: "trax-019",
    name: "Air Jordan 1 Retro High 'Shattered Backboard 3.0'",
    brand: "jordan",
    audience: "men",
    price: 209,
    currency: "USD",
    tag: "GRAIL",
    destinationUrl:
      "https://stockx.com/air-jordan-1-retro-high-shattered-backboard-3",
  },
  {
    id: "trax-020",
    name: "New Balance 990v3 'Joe Freshgoods Outside Clothes'",
    brand: "new-balance",
    audience: "men",
    price: 224,
    currency: "USD",
    tag: "DROP",
    destinationUrl:
      "https://stockx.com/new-balance-990v3-joe-freshgoods-outside-clothes",
  },
  {
    id: "trax-021",
    name: "adidas Samba OG 'Black White Gum'",
    brand: "adidas",
    audience: "men",
    price: 62,
    currency: "USD",
    tag: "HOT",
    isNew: true,
    destinationUrl: "https://stockx.com/adidas-samba-black-white-gum",
  },
  {
    id: "trax-022",
    name: "adidas Gazelle 85 'Core Black / Footwear White'",
    brand: "adidas",
    audience: "men",
    price: 130,
    currency: "USD",
    tag: "RESTOCK",
    isNew: true,
    destinationUrl:
      "https://stockx.com/adidas-gazelle-85-core-black-footwear-white",
  },
  {
    id: "trax-023",
    name: "ASICS Gel-Kayano 14 'White Pure Silver'",
    brand: "asics",
    audience: "men",
    price: 146,
    currency: "USD",
    tag: "HOT",
    isNew: true,
    destinationUrl: "https://stockx.com/asics-gel-kayano-14-white-pure-silver",
  },
  {
    id: "trax-024",
    name: "Salomon XT-6 'Lunar Rock / Magnet / Lime'",
    brand: "salomon",
    audience: "men",
    price: 190,
    currency: "USD",
    tag: "DROP",
    isNew: true,
    destinationUrl: "https://stockx.com/salomon-xt-6-lunar-rock-magnet-lime",
  },
  {
    id: "trax-025",
    name: "New Balance 2002R 'Protection Pack Sea Moss Raincloud'",
    brand: "new-balance",
    audience: "men",
    price: 194,
    currency: "USD",
    tag: "RESTOCK",
    isNew: true,
    destinationUrl:
      "https://stockx.com/new-balance-2002r-protection-pack-sea-moss-raincloud",
  },
  {
    id: "trax-026",
    name: "adidas Samba OG 'Black White Gum' (GS)",
    brand: "adidas",
    audience: "kids",
    price: 59,
    currency: "USD",
    tag: "HOT",
    isNew: true,
    destinationUrl: "https://stockx.com/adidas-samba-og-black-white-gum-gs",
  },
  {
    id: "trax-027",
    name: "New Balance 9060 'Castlerock' (GS)",
    brand: "new-balance",
    audience: "kids",
    price: 110,
    currency: "USD",
    tag: "RESTOCK",
    isNew: true,
    destinationUrl: "https://stockx.com/new-balance-9060-castlerock-gs",
  },
  {
    id: "trax-028",
    name: "New Balance 550 'White Incense' (Women's)",
    brand: "new-balance",
    audience: "women",
    price: 41,
    currency: "USD",
    tag: "HOT",
    isNew: true,
    destinationUrl: "https://stockx.com/new-balance-550-white-incense-womens",
  },
  {
    id: "trax-029",
    name: "New Balance 550 'White Lilac' (Women's)",
    brand: "new-balance",
    audience: "women",
    price: 79,
    currency: "USD",
    tag: "DROP",
    isNew: true,
    destinationUrl: "https://stockx.com/new-balance-550-white-lilac-womens",
  },
  {
    id: "trax-030",
    name: "New Balance 990v3 'Grey' (GS)",
    brand: "new-balance",
    audience: "kids",
    price: 146,
    currency: "USD",
    isNew: true,
    destinationUrl: "https://stockx.com/new-balance-990v3-grey-gs",
  },
  {
    id: "trax-031",
    name: "Nike Air Force 1 Low '07 'White'",
    brand: "nike",
    audience: "men",
    price: 74,
    currency: "USD",
    tag: "HOT",
    isNew: true,
    destinationUrl: "https://stockx.com/nike-air-force-1-low-white-07",
  },
  {
    id: "trax-032",
    name: "New Balance 9060 'Black Castlerock Grey'",
    brand: "new-balance",
    audience: "men",
    price: 76,
    currency: "USD",
    tag: "RESTOCK",
    isNew: true,
    destinationUrl:
      "https://stockx.com/new-balance-9060-black-castlerock-grey",
  },
  {
    id: "trax-033",
    name: "Salomon XT-6 'Vanilla Ice / Almond Milk'",
    brand: "salomon",
    audience: "men",
    price: 140,
    currency: "USD",
    tag: "DROP",
    isNew: true,
    destinationUrl: "https://stockx.com/salomon-xt-6-vanilla-ice-almond-milk",
  },
  {
    id: "trax-034",
    name: "adidas Samba OG 'Cloud White / Core Black' (Women's)",
    brand: "adidas",
    audience: "women",
    price: 55,
    currency: "USD",
    tag: "HOT",
    isNew: true,
    destinationUrl:
      "https://stockx.com/adidas-samba-og-cloud-white-core-black-womens",
  },
  {
    id: "trax-035",
    name: "New Balance 550 'White Rain Cloud' (Women's)",
    brand: "new-balance",
    audience: "women",
    price: 61,
    currency: "USD",
    tag: "DROP",
    isNew: true,
    destinationUrl: "https://stockx.com/new-balance-550-white-rain-cloud-womens",
  },
  {
    id: "trax-036",
    name: "Nike Air Max 90 Recraft 'Triple White' (GS)",
    brand: "nike",
    audience: "kids",
    price: 72,
    currency: "USD",
    tag: "RESTOCK",
    isNew: true,
    destinationUrl: "https://stockx.com/nike-air-max-90-recraft-triple-white-gs",
  },
  {
    id: "trax-037",
    name: "New Balance 550 'White Burgundy Navy' (GS)",
    brand: "new-balance",
    audience: "kids",
    price: 125,
    currency: "USD",
    tag: "DROP",
    isNew: true,
    destinationUrl: "https://stockx.com/new-balance-550-white-burgundy-navy-gs",
  },
  {
    id: "trax-038",
    name: "ASICS Gel-Kayano 14 'Black Lemon Spark'",
    brand: "asics",
    audience: "men",
    price: 107,
    currency: "USD",
    tag: "DROP",
    isNew: true,
    destinationUrl:
      "https://stockx.com/asics-gel-kayano-14-black-lemon-spark",
  },
  {
    id: "trax-039",
    name: "Nike Air Max 90 'Triple White'",
    brand: "nike",
    audience: "men",
    price: 120,
    currency: "USD",
    tag: "RESTOCK",
    isNew: true,
    destinationUrl: "https://stockx.com/air-max-90-triple-white",
  },
  {
    id: "trax-040",
    name: "New Balance 550 'White Grey Dark Grey'",
    brand: "new-balance",
    audience: "men",
    price: 57,
    currency: "USD",
    tag: "HOT",
    isNew: true,
    destinationUrl: "https://stockx.com/new-balance-550-white-grey-dark-grey",
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

/**
 * Serializable search snapshot used by the header search.
 *
 * IMPORTANT: this is computed HERE (server/data layer, at build time) so the
 * `affiliateUrl` on every hit is the REAL Sovrn-wrapped URL already validated
 * against the configured publisher key. Client search components must NOT
 * import `lib/products.ts` (that would re-evaluate seedToProduct with whatever
 * key is present in the client bundle); instead they receive this snapshot as
 * a prop from a server component.
 */
export type SearchHit = {
  id: string;
  name: string;
  brand: Product["brand"];
  audience: Product["audience"];
  price: number;
  currency: string;
  image: string;
  tag?: Product["tag"];
  isNew?: boolean;
  affiliateUrl: string;
};

export const searchIndex: SearchHit[] = renderableProducts.map((p) => ({
  id: p.id,
  name: p.name,
  brand: p.brand,
  audience: p.audience,
  price: p.price,
  currency: p.currency,
  image: p.image,
  tag: p.tag,
  isNew: p.isNew,
  affiliateUrl: p.affiliateUrl,
}));

export const searchIndexCount = searchIndex.length;
