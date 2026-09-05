/**
 * TRAX.50 — Product data & affiliate-link model.
 *
 * Phase 3 will wire `affiliateUrl` to real tracked affiliate programs and add
 * click-tracking. Until then, `affiliateUrl` uses "#" placeholders so the UI
 * ships production-ready without dead external links.
 */

export type Category =
  | "jordan"
  | "nike"
  | "adidas"
  | "new-balance"
  | "luxury";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  currency: string;
  image: string;
  tag?: "HOT" | "DROP" | "RESTOCK" | "GRAIL";
  isNew?: boolean;
  /** Affiliate destination — wired to real tracking in Phase 3. */
  affiliateUrl: string;
};

const ASSET = "/images";

export const products: Product[] = [
  {
    id: "trax-001",
    name: "Retro Court High 'Midnight Volt'",
    brand: "Nike",
    category: "nike",
    price: 185,
    currency: "USD",
    image: `${ASSET}/prod-1.jpg`,
    tag: "DROP",
    isNew: true,
    affiliateUrl: "#",
  },
  {
    id: "trax-002",
    name: "Flux Runner 'Graphite Volt'",
    brand: "Adidas",
    category: "adidas",
    price: 160,
    currency: "USD",
    image: `${ASSET}/prod-2.jpg`,
    tag: "HOT",
    affiliateUrl: "#",
  },
  {
    id: "trax-003",
    name: "Cloudmonster Luxe 'Cream Sand'",
    brand: "New Balance",
    category: "new-balance",
    price: 220,
    currency: "USD",
    image: `${ASSET}/prod-3.jpg`,
    isNew: true,
    affiliateUrl: "#",
  },
  {
    id: "trax-004",
    name: "Skyline Pro 'Slate Blue'",
    brand: "Jordan",
    category: "jordan",
    price: 200,
    currency: "USD",
    image: `${ASSET}/prod-4.jpg`,
    tag: "GRAIL",
    affiliateUrl: "#",
  },
  {
    id: "trax-005",
    name: "Heritage Court 'Triple White'",
    brand: "Nike",
    category: "nike",
    price: 140,
    currency: "USD",
    image: `${ASSET}/prod-5.jpg`,
    tag: "RESTOCK",
    affiliateUrl: "#",
  },
  {
    id: "trax-006",
    name: "Futura Voltic 'Acid Hi'",
    brand: "Jordan",
    category: "jordan",
    price: 260,
    currency: "USD",
    image: `${ASSET}/prod-6.jpg`,
    tag: "HOT",
    isNew: true,
    affiliateUrl: "#",
  },
];

export const featuredProducts = products.filter((p) => p.isNew || p.tag);

export const getProduct = (id: string) => products.find((p) => p.id === id);
