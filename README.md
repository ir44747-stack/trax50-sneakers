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

## 🗺️ Roadmap (Phases)

| Phase | Description | Status |
|-------|-------------|--------|
| **Phase 0** | Project Setup & Documentation | 🔄 In Progress |
| **Phase 1** | Branding & Logo Assets | ⬜ Pending |
| **Phase 2** | Core Website UI (Next.js + Tailwind) | ⬜ Pending |
| **Phase 3** | Products Data & Affiliate Link Tracking | ⬜ Pending |
| **Phase 4** | SEO, Open Graph & Content | ⬜ Pending |
| **Phase 5** | Deployment & Domain Setup | ⬜ Pending |

> **Live status is tracked in [`PROGRESS.md`](./PROGRESS.md).**

---

## 📁 Project Structure

```
trax50-sneakers/
├── app/                # Next.js App Router pages & layouts
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/         # Reusable UI components (shadcn/ui + custom)
├── lib/                # Utilities, types, config
├── public/             # Static assets (favicon, images, fonts)
├── data/               # Products / affiliate link data (Phase 3)
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

- **Current phase:** Phase 0 (Project Setup & Documentation)
- **Status:** see [`PROGRESS.md`](./PROGRESS.md)

<!--
Author: Trax.50 AI Agent
Repos owned/maintained by: [GitHub owner — to be added]
-->
