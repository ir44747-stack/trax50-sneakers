# 👟 Trax.50 Sneakers

**Affiliate website for luxury & streetwear sneakers**, monetizing traffic from the **[@trax.50](https://instagram.com/trax.50)** Instagram account (161K followers).

Trax.50 connects a large streetwear/sneakerhead audience with the hottest drops — Nike, Jordan, Adidas, New Balance, and more — and earns affiliate commissions when followers discover and buy through our curated product links.

---

## 🎯 Mission

Turn the @trax.50 Instagram audience (161K+ followers) into a monetizable, high-converting sneaker discovery destination:

- **Curate** the best luxury & streetwear sneaker drops.
- **Guide** visitors to buy via tracked affiliate links.
- **Capture** product-interest data to optimize monetization and future content.
- **Monetize** through affiliate programs (brand/retailer programs) while keeping a premium, mobile-first brand experience.

## ✨ Core Concept

| Pillar | Description |
|--------|-------------|
| **Curated Drops** | Hand-picked, on-trend sneakers matching the @trax.50 feed aesthetic. |
| **Affiliate Links** | Every product links out to the retailer/brand; clicks are tracked for commission attribution. |
| **Mobile-First** | Dark-mode, swipe-friendly experience built for Instagram-driven traffic. |
| **Conversion-Focused** | Clean product cards, social proof, and frictionless "buy" paths. |

---

## 🏗️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix + Tailwind)
- **Code Quality:** ESLint
- **Import Alias:** `@/*`
- **Version Control:** Git + GitHub (single source of truth)
- **Package Manager:** npm

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → http://localhost:3000
```

Other scripts:

```bash
npm run build       # Production build
npm run start       # Serve production build
npm run lint        # ESLint
```

---

## 🎯 Strict Categorization — Men / Women / Kids

Every product belongs to exactly **one** audience: `men`, `women`, or `kids`
(required field `audience`). The drops page and home collection tiles filter by
these three buckets; brand is a secondary filter. No "unisex/other" escape hatch —
each pair is placed strictly.

## 🔗 Affiliate Monetization — Sovrn Commerce (strict)

Trax.50 monetizes every outbound product click through **Sovrn Commerce**
(VigLink gateway). Links follow Sovrn's manual-wrap format:

```
https://redirect.viglink.com?key=[API_KEY]&u=[HTML-ENCODED_DESTINATION]
```

**STRICT RULE — no product renders without a valid tracking link.**
`lib/affiliate.ts` validates every product's `affiliateUrl` against the Sovrn
spec. A product is dropped from the UI (home, featured, drops grid) if its link:
is missing, empty, a bare `#`, relative, non-HTTPS, not on `redirect.viglink.com`,
or lacks a valid `key` + `u` destination. Enforcement lives in two places:
1. **Data layer** — `renderableProducts` filters the catalog before rendering.
2. **UI guard** — `ProductCard` returns nothing if a link fails validation.

All affiliate anchors use `rel="noopener noreferrer nofollow sponsored"`.

> **Going live:** set `SOVRN_PUBLISHER_KEY` to your real Sovrn API key and replace
> the demo `shop.example.com` `destinationUrl` values in `lib/products.ts` with
> real merchant product URLs. Until then a clearly-marked **demo key** is used so
> the pipeline stays testable.

---

## 🗺️ Roadmap (Phases)

| Phase | Description | Status |
|-------|-------------|--------|
| **Phase 0** | Project Setup & Documentation | ✅ Completed |
| **Phase 1** | Branding & Logo Assets | ✅ Completed |
| **Phase 2** | Core Website UI (Next.js + Tailwind) | ✅ Completed |
| **Phase 3** | Products Data & Affiliate Link Tracking | 🔄 In Progress (Men/Women/Kids + Sovrn strict validation shipped) |
| **Phase 4** | SEO, Open Graph & Content | ⬜ Pending |
| **Phase 5** | Deployment & Domain Setup | 🔄 In Progress (Vercel; push enabled) |

> **Live status is tracked in [`PROGRESS.md`](./PROGRESS.md).**

---

## 📁 Project Structure

```
trax50-sneakers/
├── app/                # Next.js App Router pages & layouts
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   ├── [audience]/     # Strict sections: /men, /women, /kids
│   ├── not-found.tsx   # Custom 404
│   └── globals.css     # Global styles / design system
├── components/         # Reusable UI components (shadcn/ui + custom)
├── lib/
│   ├── affiliate.ts    # Sovrn link builder + STRICT validation (core rule)
│   ├── products.ts     # Catalog (audience + validated Sovrn affiliateUrl)
│   ├── site.ts         # Brand/config + audiences taxonomy
│   └── utils.ts
├── public/images/      # Hero + product imagery
├── README.md           # ← You are here
├── PROGRESS.md         # Phase-by-phase progress tracker
└── AGENT_LOG.md        # Chronological agent action log
```

---

## 🧭 Git & Contribution Workflow

- **GitHub is the single source of truth.** Every change is committed and pushed.
- Each Phase ends with an update to `PROGRESS.md` + `AGENT_LOG.md` and a conventional commit (e.g. `feat: Phase 1 complete`).
- Future AI agents should **read `PROGRESS.md` and `AGENT_LOG.md` first** to resume cleanly.

Conventional commit prefix examples: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.

---

## 📝 Docs for Agents

- **`PROGRESS.md`** — overall phase tracker; shows what's done and what's next.
- **`AGENT_LOG.md`** — append-only chronological log of every agent action.

---

## 🏁 Status

- **Current phase:** Phase 3 (Products Data & Affiliate Link Tracking — strict categorization + Sovrn validation)
- **Status:** see [`PROGRESS.md`](./PROGRESS.md)
- **Production repo:** `github.com/ir44747-stack/trax50-sneakers` (pushed to `main`)

<!--
Author: Trax.50 AI Agent
Repos owned/maintained by: ir44747-stack
-->
