# Trax.50 Progress Tracker

## Current Phase: Phase 3
## Status: ✅ In Progress (strict categorization + Sovrn validation shipped; real merchant links + analytics pending)

| Phase | Description | Status | Notes |
|-------|-------------|--------|-------|
| Phase 0 | Project Setup & Documentation | ✅ Completed | Next.js 15 + Tailwind v4 + shadcn/ui initialized; docs added |
| Phase 1 | Branding & Logo Assets | ✅ Completed | "Volt Monochrome" palette, SVG logo mark, `app/icon.svg`, OG imagery |
| Phase 2 | Core Website UI (Next.js + Tailwind) | ✅ Completed | Dark homepage, layout, navbar/footer, product grid, `/drops` catalog |
| Phase 3 | Products Data & Affiliate Link Tracking | 🔄 In Progress | **Men/Women/Kids taxonomy + strict Sovrn validation shipped**; real merchant URLs + click analytics next |
| Phase 4 | SEO, Open Graph & Content | ⬜ Pending | Metadata scaffolding added; on-page copy/content polish pending |
| Phase 5 | Deployment & Domain Setup | 🔄 In Progress | Vercel CI target; repo pushed to `main` |

## Phase 0 — Delivered
- [x] Repo `trax50-sneakers` initialized (Next.js 15.5.25, App Router, TypeScript, Tailwind v4, ESLint, `@/*` alias).
- [x] Docs created: `README.md`, `PROGRESS.md`, `AGENT_LOG.md`, hardened `.gitignore`, `.env.example`.
- [x] shadcn/ui (Radix stack) initialized; foundational components added: `button`, `card`, `badge`.
- [x] `npm run build` passes cleanly.

## Phase 1 — Branding & Logo Assets
- [x] **Design system:** "Volt Monochrome" — deep dark-slate monochrome base (#07090b) with high-energy volt-lime accent (#d6ff3f) in `app/globals.css`.
- [x] **Logo:** inline SVG `Trax` mark + `TRAX.50` wordmark (`components/logo.tsx`).
- [x] **Favicon / app icon:** `app/icon.svg` (Next.js auto-detected).
- [x] **Hero/OG imagery:** AI-generated dark-studio sneaker shots in `public/images/`.

## Phase 2 — Core Website UI
- [x] Root layout with display typography (Space Grotesk + Geist), dark-mode-first, metadata.
- [x] **Homepage:** Hero, brand marquee, featured-drops, Men/Women/Kids collection tiles, "Why Trax", email CTA.
- [x] **Routing:** `/` and `/drops` (audience + brand filters); `app/not-found.tsx`.
- [x] **Components:** `navbar`, `footer`, `product-card`, `drops-grid`, `reveal`, `cta`, `social-icons`, `logo`.
- [x] Responsive mobile-first grid; micro-interactions; reduced-motion support.

## Phase 3 — Affiliate & Categorization (this batch)
- [x] **STRICT Men / Women / Kids taxonomy:** products carry required `audience: 'men'|'women'|'kids'`; home tiles + drops filters + footer organized by audience.
- [x] **Removed all dummy links:** no `"#"` `affiliateUrl` anywhere in the catalog.
- [x] **Sovrn/VigLink gateway** (`lib/affiliate.ts`): `buildSovrnAffiliateUrl` + `validateSovrnAffiliateUrl` against Sovrn spec `https://redirect.viglink.com?key=..&u=..`.
- [x] **STRICT rule — no product renders without a valid tracking link:** `renderableProducts` (data layer) + `ProductCard` guard drop any invalid product.
- [x] Affiliate anchors use `rel="noopener noreferrer nofollow sponsored"`.
- [x] Demo `shop.example.com` destinations + demo key keep pipeline testable; `.env.example` documents `SOVRN_PUBLISHER_KEY`.
- [x] Verified: build clean; `/drops?audience=men|women|kids` render 200 with valid Sovrn links; invalid-link products correctly dropped (unit-checked).
- [x] **Real merchant product URLs** replace demo `shop.example.com` destinations (StockX, gender-accurate, live pages) in `lib/products.ts`; titles/prices aligned, audience+brand+image keys kept, Sovrn-wrapped.
- [ ] Set real `SOVRN_PUBLISHER_KEY` in **Vercel** (dashboard), add click-tracking/analytics.

## Phase 2/3 hardening — Clean Navigation & Strict Sections
- [x] **Clean navbar:** nav is ONLY Home / Men / Women / Kids (removed Shop Drops CTA, IG icon, and old Home/Drops/Collections/About). Mobile menu matches.
- [x] **Footer cleanup:** removed dead `#` links (X, Privacy/Terms/Disclosure) and dead "Brands" column.
- [x] **Strict routes:** removed generic `/drops`; dedicated SSG pages `/men`, `/women`, `/kids` (`app/[audience]`); anything else → 404. Deleted old `drops-grid`.
- [x] **Strict data-layer rule:** `renderableProducts` now drops products lacking a valid Sovrn tracking URL OR a valid image (`isRenderable`). Added `getProductsByAudience`, `menProducts`, `womenProducts`, `kidsProducts`.
- [x] Verified: build clean; pages 200; no cross-audience leak (Men=3, Women=2, Kids=1).

## Phase 3 — Catalog expansion batch 2 (10 more real Men's products)
- [x] Appended trax-011…020 to `lib/products.ts` (10 real, live StockX products, all validated via fetch this turn): AJ4 Bred Reimagined, NB 990v6 Grey Day, ASICS Gel-Kayano 14, Salomon XT-6 Vanilla Ice, AJ11 Gratitude, NB 550 White/Green, ASICS Kith Gel-Lyte III, Salomon ACS Pro, AJ1 Shattered Backboard 3.0, NB 990v3 JFG.
- [x] Mapped to new renders `prod-11…20.jpg`; extended `Brand` union + `site.categories` with `asics` & `salomon`.
- [x] Audience (all listings are Men's on StockX → Men): total renderable = **16** (Men 13, Women 2, Kids 1).
- [x] Strict audit on served HTML (real key): Men=13 / Women=2 / Kids=1 cards; each Cop-it = `redirect.viglink.com/?key=<real>` → StockX; **demo=0, bare `#`=0, other-host=0**. Build clean.
- [ ] **Women/Kids enrichment is PENDING** (interrupted full-expansion task): add more real Women's/GS shoes with matched renders so /women & /kids grow beyond 2/1.

## Phase 3 — Catalog expansion batch 3 (trax-021…030 → 26 renderable)
- [x] Added 10 more real, live StockX products with freshly generated renders prod-21…30 (Men +5: Samba BW Gum, Gazelle 85 CB/FW, Kayano 14 White Pure Silver, Salomon XT-6 Lunar Rock Magnet Lime, NB 2002R Sea Moss; Kids +3: Samba BW Gum GS, NB 9060 Castlerock GS, NB 990v3 Grey GS; Women +2: NB 550 White Incense, NB 550 White Lilac).
- [x] Audience now **Men 18 / Women 4 / Kids 4 = 26** renderable (was 16). All Cop-it links real-key → StockX; demo=0, bare `#`=0; build clean.
- [ ] **Remaining:** full ~36-50 target still pending — needs more matched renders + validated real slugs (multi-turn; no fabrication). prod-7..10 unmapped (unidentified).

## Phase 3 — Production Sovrn key wiring
- [x] `lib/affiliate.ts` reads `SOVRN_PUBLISHER_KEY` from env; added `isUsingDemoKey()` + `assertProductionKeyConfigured()` demo-key warning (build-time safeguard).
- [x] `.env.example` documents `SOVRN_PUBLISHER_KEY` (API key) + optional `SOVRN_API_SECRET` (kept out of code). No secrets committed.
- [x] Strict audit passed with real key injected: `/`, `/men`, `/women`, `/kids` → 12/3/2/1 real-key Sovrn links, 0 demo-key, 0 `#`.
- [ ] **ACTION NEEDED (owner):** add `SOVRN_PUBLISHER_KEY` = real Sovrn API key in the **Vercel dashboard** (Settings → Environment Variables → Production/Preview/Development). No Vercel token/project link available to this agent.

## Next Action
- **Phase 3 (finish):** replace demo `shop.example.com` destinations with real merchant URLs; set real Sovrn key; add click analytics.
- **Then:** Phase 4 (SEO/OG/content) and Phase 5 (domain + Vercel).

## Deployment note
- Vercel target (`next build` clean). Repo reconciled to a single clean root tree and **pushed to `main`** on `ir44747-stack/trax50-sneakers`.
- ⚠️ Cleanup: earlier web-UI uploads nested duplicate copies under `work/` and `trax50-sneakers/` plus `trax50-sneakers.zip` in the repo — removed in the reconcile commit.
## Phase 3 — Catalog expansion batch 4 (trax-031…035 → 31 renderable)
- [x] Added 5 more real products + renders prod-31…35 (Men +3: AF1 '07 White, NB 9060 Black Castlerock, Salomon XT-6 Vanilla Ice Almond Milk; Women +2: adidas Samba OG CW/CB W, NB 550 White Rain Cloud W).
- [x] Audience now **Men 21 / Women 6 / Kids 4 = 31**. Build clean; audit real-key, demo=0, bare #=0.
- [ ] Scaling to ~36-50 continues (multi-turn: generate renders + validate real slugs per pass).
## Phase 3 — Catalog expansion batch 5 (trax-036…040 → 36 renderable ✅ target)
- [x] Added 5 more real products + renders prod-36…40 (Kids +2: AM90 Recraft TW GS, NB 550 White Burgundy Navy GS; Men +3: ASICS Kayano 14 Black Lemon Spark, Nike AM90 Triple White, NB 550 White Grey Dark Grey).
- [x] Audience now **Men 24 / Women 6 / Kids 6 = 36 renderable** (target ~36 reached). Build clean; audit real-key, demo=0, bare #=0.
- [ ] Optional further scale to ~40-50 in future passes (validate slugs + generate renders per pass).
## UX fixes — real-time header search + whole-card affiliate links
- [x] **Global header search** (`components/global-search.tsx` + Navbar): real-time full-catalog search by name/model/brand; keyboard nav; each hit opens its Sovrn link (new tab).
- [x] **Correct key plumbing:** server-computed `searchIndex` (products.ts) fed to Navbar via layout; collection grids receive server `products` prop instead of re-importing products.ts on the client (prevents demo-key recompute).
- [x] **ProductCard:** entire card = single real Sovrn anchor (new tab), no nested links/overlay; "Cop it" part of the same anchor.
- [x] Build clean; audit real-key, demo=0, bare #=0; counts 36/24/6/6.
## Phase 4 — Full price parity audit vs live StockX (all 36)
- [x] Re-fetched every product's StockX destination page; set each card `price` to the live market value.
- [x] Live lowest-ask applied for 30 products; last-sale fallback (user-chosen) for 2 (trax-030 $146, trax-037 $125); kept at retail for 4 low-liquidity GS/niche (trax-005/022/024/027) + trax-025 (no market; retail $194 = real Sea Moss Raincloud M20028ZH).
- [x] Clean real-key build; served audit: valid Viglink/Sovrn URLs (real runtime key), updated prices render; counts 36/24/6/6.
- [ ] Standing: replace studio renders (public/images/prod-*.jpg) with official StockX product images to match each title/brand/link (user-chosen; not yet done).
## Phase 5 — Official image replacement (all 36) + AM90 price guardrail
- [x] Replaced all studio renders with official StockX product images (images.stockx.com) matched per destination; 36/36 valid JPEGs.
- [x] trax-039 AM90 Triple White price fixed to $120 (removed inflated $275 size artifact).
- [x] Clean real-key build; counts 36/24/6/6.
