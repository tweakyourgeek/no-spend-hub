# REPO-AUDIT.md — no-spend-hub

**Audit Date:** 2026-03-14
**Auditor:** Claude Code (automated scan)

---

## Repo Overview

- **Git Remote URL:** `https://github.com/tweakyourgeek/no-spend-hub`
- **GitHub Account:** tweakyourgeek
- **Repo Name:** no-spend-hub
- **Full URL:** https://github.com/tweakyourgeek/no-spend-hub

### Deployable Apps / Units

This repo contains **1 main app** (the root-level React/Vite app) plus **22 standalone sub-apps** nested inside `src/features/`. Each sub-app has its own `package.json`, `vite.config.js`, and `index.html` — they are independently buildable Vite apps.

**Main App (root):**
| # | Name | Path | Stack |
|---|------|------|-------|
| 1 | No Spend Hub (main site) | `/` (root) | React 18, TypeScript, Vite, shadcn/ui, Tailwind CSS |

**Sub-Apps (src/features/):**
| # | Name | Path | Stack |
|---|------|------|-------|
| 2 | Activity Generator | `src/features/activity-generator` | React, Vite, JSX |
| 3 | C3 Single Action | `src/features/c3-single-action` | React, Vite, JSX |
| 4 | Challenge Roadmap | `src/features/challenge-roadmap` | React, Vite, JSX |
| 5 | Comfort Menu | `src/features/comfort-menu` | React, Vite, JSX |
| 6 | Commitment Builder | `src/features/commitment-builder` | React, Vite, JSX |
| 7 | Crisis Helper | `src/features/crisis-helper` | React, Vite, JSX |
| 8 | Decision Matrix | `src/features/decision-matrix` | React, Vite, JSX |
| 9 | Digital Declutter | `src/features/digital-declutter` | React, Vite, JSX |
| 10 | Expense Log | `src/features/expense-log` | React, Vite, JSX |
| 11 | Four Lenses Diagnostic | `src/features/four-lenses-diagnostic` | React, Vite, JSX |
| 12 | Impulse Brake | `src/features/impulse-brake` | React, Vite, JSX |
| 13 | Journal 30-Day | `src/features/journal-30day` | React, Vite, JSX |
| 14 | Lab Loop Tracker | `src/features/lab-loop-tracker` | React, Vite, JSX |
| 15 | Marketing Decoder | `src/features/marketing-decoder` | React, Vite, JSX |
| 16 | Meal Planner | `src/features/meal-planner` | React, Vite, JSX |
| 17 | Pattern Quiz | `src/features/pattern-quiz` | React, Vite, JSX |
| 18 | Rumination Interrupter | `src/features/rumination-interrupter` | React, Vite, JSX |
| 19 | Savings Calculator | `src/features/savings-calculator` | React, Vite, JSX |
| 20 | Subscription Analyzer | `src/features/subscription-analyzer` | React, Vite, JSX |
| 21 | Subscription Audit | `src/features/subscription-audit` | React, Vite, JSX |
| 22 | Testing Lab | `src/features/testing-lab` | React, Vite, JSX |
| 23 | Trigger Quiz | `src/features/trigger-quiz` | React, Vite, JSX |

Additionally, there is a **standalone coming-soon page** at `public/coming-soon/index.html` — a self-contained static HTML page with an email capture form and countdown timer targeting March 20, 2026. The root `vercel.json` rewrites `/` to this page, so it is what visitors currently see.

### Vercel Connection

- **Yes** — `vercel.json` exists at the root with a rewrite rule: `/ → /coming-soon/index.html`.
- 10 of the 22 sub-apps also have their own `vercel.json` files (activity-generator, decision-matrix, digital-declutter, impulse-brake, marketing-decoder, meal-planner, rumination-interrupter, subscription-audit, testing-lab, trigger-quiz), suggesting they were deployed or intended to be deployed as separate Vercel projects.
- Whether there are multiple Vercel projects currently pointed at this single repo is **unknown** from repo contents alone, but the presence of multiple `vercel.json` files strongly suggests it.

---

## Repo Classification

- **📦 MULTI-APP REPO:** Contains 1 main app + 22 sub-apps (23 total deployable units) + 1 static coming-soon page.
- **📄 DATA/EXTRACTION:** Contains extensive extracted conversation data from ChatGPT and Claude (37+ conversation exports in `docs/history/conversations/` and 200+ files in `project-archive/`).
- **📝 CONTENT/DOCS:** Contains brand strategy, product documentation, marketing copy, email sequences, content plans, and detailed project planning.

---

## Non-App Content Inventory

### `docs/` directory (135 files)
This is a massive documentation library organized into subdirectories:

- **`docs/apps/roadmap/`** — Deployment docs, handoff docs, product manual, and a standalone roadmap HTML page.
- **`docs/brand/`** — Brand assets (logos, images), brand voice sections (hero, footer, crisis section, how-to-use, three pillars, wayfinding, alignment lab codex).
- **`docs/content/`** — Written product content: 7-day spending trackers (two versions: encouraging + irreverent), 30 daily prompts, 8 expense log versions.
- **`docs/history/conversations/`** — 18 ChatGPT conversation exports (`no_spend_chatgpt_1` through `no_spend_chatgpt_18`) and 19 Claude conversation exports (`no_spend_claude_1` through `no_spend_claude_19`). These are extracted conversation transcripts from the project's development history.
- **`docs/planning/`** — CHANGELOG, enhancements doc, gap analysis, roadmap, integration roadmap.
- **`docs/product/`** — Beta readiness assessment, deployment guide, getting started guide, handoff doc, product manual.
- **`docs/products/`** — Detailed product content: design system, master guide, C3 integration guide, daily page structures, commitment/support/strategy worksheets, comfort menu reference, weekly review template, pattern reference, spreadsheet files (.xlsx) for cash buffers, parking lots, core packs (business + personal versions).
- **`docs/references/`** — Archived repos list.
- **`docs/specs/`** — Technical specs: C3 single-action tool concept, complete beta system, manifest, technical review docs, tools spec JS file, apps README.
- **`docs/strategy/`** — Extensive strategy documentation organized into:
  - `extraction-docs/` — 17 extraction documents covering frameworks, challenge structure, pricing, Skool community strategy, marketing, content delivery, tech implementation, lead magnets, GPT ecosystem, brand voice, product architecture, evolution docs, worksheets, cross-references, brand positioning, and roadmaps.
  - `analysis/` — Skool community discrepancy report, C3 framework integration analysis.
  - `research/` — Business working document, Perplexity research prompts, research findings executive summary.
  - `working/` — Active working documents: brand voice examples, email sequences, GPT instructions, landing page copy, lead magnets, marketing launch strategy, 30-day themes, challenge gap analysis, launch plan, Skool community structure.

### `project-archive/` directory (208 files)
Contains exported conversation transcripts and extracted artifacts from Claude/ChatGPT sessions. Includes:
- **~50 dated conversation exports** (e.g., `2026-03-11-Rewriting-PLR-workbook-content.md`, `2026-03-11-Cloud-project-artifacts-inventory.md`) — some are very large (100KB–260KB).
- **`artifacts/`** subdirectory with ~90 numbered artifacts extracted from conversations (e.g., `conv04-b2b-nurture-sequence-5-emails.md`, `33-4-claude-code-build-9-tools-prompt.md`, `42-8_vercel-serverless-function-prompt.md`).
- **`MASTER_INDEX.md`** — Master index of all archived content (41KB).
- **`master_extraction_compilation.md`** — Compiled extraction data (30KB).

### `api/` directory
- `subscribe.js` — A Vercel serverless function for email subscription via MailerLite API. References `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID` environment variables.

### Purpose of Non-App Content
This non-app content represents the **complete development history and knowledge base** for the No Spend Challenge / No Spend Collective project. It includes every conversation with AI assistants used during development, all strategic planning documents, product specifications, brand guidelines, and marketing materials.

### Recommendation
- **`docs/`** — Keep. This is active reference documentation. Consider whether `docs/history/conversations/` (37 conversation exports) should be moved to a separate archive repo to reduce repo size.
- **`project-archive/`** — Archive/consolidate. At 208 files and likely several MB, this is historical data that's useful for reference but bloats the repo. Could be moved to a dedicated archive repo.
- **`api/`** — Keep. Active serverless function code.

---

## Documentation Suite

- ✅ **README.md** — Exists but is a **Lovable platform boilerplate/placeholder**. Contains generic instructions from Lovable's project template. Not customized for this project. No project-specific description, architecture overview, or setup instructions.
- ❌ **CLAUDE.md** — Missing. No Claude Code instructions file.
- ❌ **.claudeignore** — Missing.
- ✅ **.gitignore** — Exists. Appropriate for a Vite/Node.js project (covers logs, node_modules, dist, editor files). Does not explicitly ignore `.env` files (only ignores `*.local`).
- ❌ **LICENSE** — Missing.
- ✅ **CHANGELOG.md** — Exists at `docs/planning/CHANGELOG.md` (not at root). Documents changes to the No Spend Challenge Apps starting from v1.2.0.
- ❌ **CONTRIBUTING.md** — Missing.
- ✅ **package.json** — Exists.
  - `"name": "vite_react_shadcn_ts"` (generic Lovable template name, not project-specific)
  - `"description"`: not present
  - `"scripts"`: `dev`, `build`, `build:dev`, `lint`, `preview`, `test`, `test:watch`
- ✅ **tsconfig.json** — Exists. Plus `tsconfig.app.json` and `tsconfig.node.json`.
- ❌ **.env.example** — Missing. The app requires `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID` but there is no example env file.
- ✅ **Tests** — Vitest is configured (`vitest.config.ts`). One placeholder test file exists (`src/test/example.test.ts`) with a single trivially-passing test. Testing libraries installed: `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`. Effectively **no meaningful tests**.
- ❌ **CI/CD** — No `.github/workflows/` directory, no GitHub Actions, no CI/CD automation. Deployment appears to be manual via Vercel.
- ✅ **Other docs** — Extensive documentation in `docs/` directory (135 files across brand, content, planning, product, specs, strategy, history subdirectories). Also `docs/products/` contains spreadsheet files (.xlsx).

**Doc Suite Score: 5 out of 12** (README is placeholder, CHANGELOG not at root, tests are trivial)

---

## Per-App Deep Dive

### App 1: No Spend Hub — Main Site (root)

**Path:** `/` (root directory)
**Stack:** React 18, TypeScript, Vite 5, shadcn/ui, Tailwind CSS, React Router, Framer Motion, Recharts, React Query

#### Authentication
- **No.** No user login or authentication system. No auth providers (Clerk, Supabase Auth, NextAuth, etc.) are integrated.
- No auth-related environment variables.

#### Database
- **No.** No database connection. All data is stored in the browser's `localStorage` via a custom `challenge-data.ts` module. The storage keys are `nospend-challenge` and `nospend-started`.
- No ORM (Prisma, Drizzle, etc.).

#### API Routes / Server-Side Logic
- **Yes (minimal).** One serverless function exists at `api/subscribe.js` — a Vercel serverless function that accepts POST requests with an email and subscribes the user to a MailerLite mailing list.
- The coming-soon page's email forms currently have the API call **commented out** (using a fake `setTimeout` instead with a TODO comment).
- The main React app is a **client-side SPA** (single-page application) — no SSR, purely client-rendered via Vite.
- No calls to custom-built APIs beyond the subscribe endpoint.

#### Payments
- **No.** No Stripe, PayPal, LemonSqueezy, or any payment processor integration. The coming-soon page displays pricing tiers (Free, $9/mo, $99/yr) but these are informational only with no payment processing wired up. Payments are handled externally via Skool.

#### Email / Notifications
- **Yes (via serverless function).** The `api/subscribe.js` endpoint integrates with **MailerLite** for email list subscription. However, this is not yet wired up in the coming-soon page (the API call is commented out with a TODO).
- No other notification systems.

#### Hosting Other People's Content
- **No.** No user-generated content storage. No file upload features. All challenge data is stored locally in the user's browser.

#### Environment Variables
Referenced in the codebase:
- `MAILERLITE_API_KEY` — MailerLite API key for email subscription
- `MAILERLITE_GROUP_ID` — MailerLite group ID for subscriber list

#### Verdict
**🟡 STATIC WITH CAVEATS**

The main React app is fully client-side and could theoretically run on GitHub Pages. However:
1. The email subscription serverless function (`api/subscribe.js`) requires a server environment (Vercel serverless functions).
2. The `vercel.json` rewrite rule depends on Vercel's routing.
3. React Router with `BrowserRouter` would need fallback routing configuration on a static host.

If the email subscription feature is removed or handled externally, and routing is adjusted, this could be fully static.

---

### Apps 2–23: Feature Sub-Apps (src/features/)

All 22 sub-apps share the same characteristics:

**Stack:** React (JSX, not TypeScript), Vite, vanilla CSS
**Authentication:** No
**Database:** No — all use localStorage or are purely stateless
**API Routes:** No
**SSR:** No — all are client-side SPAs
**Payments:** No
**Email:** No
**Hosts User Content:** No
**Environment Variables:** None

These are small, single-purpose interactive tools for the No Spend Challenge. They include:

| Sub-App | Purpose |
|---------|---------|
| Activity Generator | Suggests no-spend activities |
| C3 Single Action | C3 framework single action tool |
| Challenge Roadmap | Interactive challenge tracker with calendar |
| Comfort Menu | Alternative comfort activities menu |
| Commitment Builder | Build spending commitments |
| Crisis Helper | Help during impulse spending moments |
| Decision Matrix | Spending decision analysis tool |
| Digital Declutter | Digital spending declutter guide |
| Expense Log | Track daily expenses |
| Four Lenses Diagnostic | Spending pattern diagnostic |
| Impulse Brake | Interrupt impulse spending |
| Journal 30-Day | 30-day guided journal |
| Lab Loop Tracker | Track lab/experiment loops |
| Marketing Decoder | Decode marketing tactics |
| Meal Planner | No-spend meal planning |
| Pattern Quiz | Identify spending patterns |
| Rumination Interrupter | Stop spending rumination loops |
| Savings Calculator | Calculate savings from no-spend days |
| Subscription Analyzer | Analyze subscriptions |
| Subscription Audit | Audit active subscriptions |
| Testing Lab | Try free samples of tools |
| Trigger Quiz | Identify spending triggers |

10 of these sub-apps have their own `vercel.json` files, suggesting they were individually deployed to Vercel at some point.

#### Verdict for All Sub-Apps
**🟢 STATIC**

Every sub-app is a pure client-side React app with no server dependencies, no APIs, no database, no auth, and no environment variables. They can all run on GitHub Pages or any static host.

---

### Coming-Soon Page

**Path:** `public/coming-soon/index.html`
**Stack:** Vanilla HTML, CSS, JavaScript (no framework)

This is a standalone static page currently served as the site's homepage via Vercel rewrite. Features:
- Countdown timer to March 20, 2026
- Email capture forms (2) — currently using fake setTimeout, not wired to MailerLite
- Skool community CTA linking to `skool.com/nospend-8052/about`
- Pricing tier display (Free / $9/mo / $99/yr)
- Animated mesh background, scroll reveal effects

#### Verdict
**🟢 STATIC**

Pure HTML/CSS/JS. No server dependencies. The email forms are currently non-functional (TODO comments in code). When wired up, they would call the `api/subscribe.js` serverless function.
