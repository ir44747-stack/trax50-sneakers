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
- [ ] Wire real merchant product URLs into `lib/products.ts` destinations.
- [ ] Set real `SOVRN_PUBLISHER_KEY`, add click-tracking/analytics.

## Phase 2/3 hardening — Clean Navigation & Strict Sections
- [x] **Clean navbar:** nav is ONLY Home / Men / Women / Kids (removed Shop Drops CTA, IG icon, and old Home/Drops/Collections/About). Mobile menu matches.
- [x] **Footer cleanup:** removed dead `#` links (X, Privacy/Terms/Disclosure) and dead "Brands" column.
- [x] **Strict routes:** removed generic `/drops`; dedicated SSG pages `/men`, `/women`, `/kids` (`app/[audience]`); anything else → 404. Deleted old `drops-grid`.
- [x] **Strict data-layer rule:** `renderableProducts` now drops products lacking a valid Sovrn tracking URL OR a valid image (`isRenderable`). Added `getProductsByAudience`, `menProducts`, `womenProducts`, `kidsProducts`.
- [x] Verified: build clean; pages 200; no cross-audience leak (Men=3, Women=2, Kids=1).

## Next Action
- **Phase 3 (finish):** replace demo `shop.example.com` destinations with real merchant URLs; set real Sovrn key; add click analytics.
- **Then:** Phase 4 (SEO/OG/content) and Phase 5 (domain + Vercel).

## Deployment note
- Vercel target (`next build` clean). Repo reconciled to a single clean root tree and **pushed to `main`** on `ir44747-stack/trax50-sneakers`.
- ⚠️ Cleanup: earlier web-UI uploads nested duplicate copies under `work/` and `trax50-sneakers/` plus `trax50-sneakers.zip` in the repo — removed in the reconcile commit.
