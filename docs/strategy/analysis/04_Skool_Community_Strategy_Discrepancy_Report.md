# 04 Skool Community Strategy — Discrepancy Report

**Date**: March 11, 2026
**Purpose**: Three-way comparison of the current working version of 04_Skool_Community_Strategy.md against the repository extraction doc, the 2026 No Spend Project Plan, and live code.
**Updated**: March 11, 2026 — confirmed decisions applied, repo extraction doc replaced, PricingSection.tsx updated.

**Sources compared:**
1. **Working doc** — current version provided March 11, 2026
2. **Repo extraction doc** — `docs/strategy/extraction-docs/04_Skool_Community_Strategy.md` (was dated December 28, 2024 — now replaced)
3. **Project plan** — 2026 No Spend Project Plan (last updated March 11, 2026)
4. **Live code** — `src/components/landing/PricingSection.tsx`, `public/coming-soon/index.html`, working docs

---

## Confirmed Decisions (March 11, 2026)

The following decisions have been made and applied to the repo:

### 1. Classroom Structure — 7 Classrooms (APPLIED)

Replaces all previous 5-section and 6-section structures:

| # | Classroom | Access |
|---|-----------|--------|
| 1 | START HERE | All members regardless of tier |
| 2 | À La Carte Toolkit | All members regardless of tier |
| 3 | Bonuses | All members regardless of tier |
| 4 | 30-Day No-Spend Challenge | Standard and above |
| 5 | Monthly Themes | Premium and above |
| 6 | Quarterly Challenges | VIP only |
| 7 | Annual Bonuses | VIP only |

**Updated in**: `docs/strategy/extraction-docs/04_Skool_Community_Strategy.md` (replaced entirely)
**Still stale**: `docs/strategy/working/SKOOL_COMMUNITY_STRUCTURE.md` (shows old 6-section structure)

### 2. VIP Price — $99/year (APPLIED)

**Updated in**: `src/components/landing/PricingSection.tsx` (was $125/yr)
**Already correct**: `public/coming-soon/index.html`
**Still stale**: `docs/strategy/extraction-docs/03_Pricing_And_Monetization.md` (says $97/mo), `docs/strategy/working/SKOOL_COMMUNITY_STRUCTURE.md` (says $97/mo)

### 3. Free Tier Name — Standard (APPLIED)

**Updated in**: `src/components/landing/PricingSection.tsx` (was "Free")
**Already correct**: `public/coming-soon/index.html`
**Still stale**: `docs/strategy/working/SKOOL_COMMUNITY_STRUCTURE.md` (says "FREE")

### 4. Q1 Challenge — No-Spend Challenge, April 1 (APPLIED)

30 Bags in 30 Days is retired as a standalone quarterly event.

**Updated in**: `docs/strategy/extraction-docs/04_Skool_Community_Strategy.md`
**Still stale**: `project-archive/artifacts/conv11-quarterly-challenge-calendar.md` (shows 30 Bags as Q1)

### 5. GPT Count — 7, Not 17 (APPLIED)

Tier assignment is still TBD — flagged as pending in the strategy doc.

**Updated in**: `docs/strategy/extraction-docs/04_Skool_Community_Strategy.md`
**Still stale**: `docs/strategy/extraction-docs/09_GPT_Ecosystem.md` (likely references 17)

### 6. Repo Extraction Doc — Replaced Entirely (APPLIED)

The December 2024 extraction doc at `docs/strategy/extraction-docs/04_Skool_Community_Strategy.md` has been replaced with the current working version.

---

## Remaining Discrepancies (Not Yet Resolved)

These conflicts still exist across the repo and need decisions or updates:

### Pricing in Other Docs

| File | What It Says | What's Wrong |
|------|-------------|-------------|
| `docs/strategy/extraction-docs/03_Pricing_And_Monetization.md` | PAID $27/mo, VIP $97/mo, "17 GPTs" | Old pricing, old GPT count |
| `docs/strategy/working/SKOOL_COMMUNITY_STRUCTURE.md` | $27/mo, $97/mo in header | Old pricing |

### SKOOL_COMMUNITY_STRUCTURE.md — Multiple Issues

This file at `docs/strategy/working/SKOOL_COMMUNITY_STRUCTURE.md` has:
- Old pricing ($27/mo, $97/mo) in the header
- Old tier names (FREE/PAID/VIP instead of Standard/Premium/VIP)
- Old 6-section classroom structure (now 7 classrooms)
- Weekly content calendar detail (Monday Momentum, Wednesday Pattern Drop, Friday Wins) that doesn't appear in the strategy doc — worth preserving or migrating

### VIP Features in PricingSection.tsx

The VIP features list was updated to match the strategy doc, but there are items that were removed and may need a decision:
- **"Full GPT suite"** — removed because GPT tier assignment is TBD. Once assigned, relevant GPT access should be added back to the correct tier's feature list
- **"Couples & Teen Modules"** — removed from VIP. The strategy doc lists these as separate add-ons, not VIP-included. The project plan doesn't mention them at all. Decision needed on whether these are real products and where they live.

### Premium Features in PricingSection.tsx

The Premium tier feature "Priority community support" was replaced with "Current month's tool" to match the strategy doc and project plan. Verify this is the intended Premium differentiator.

### Founding Member Escalation Mechanics

| Source | Mechanism |
|--------|-----------|
| Strategy doc | "Price increases after founding period closes" — no specifics |
| Project plan | "First 100 members lock founding rates forever. Price increases after that." — no specifics |
| 03_Pricing doc (stale) | "$2 increase per tier for every 100 members" — specific model |

Nobody currently authoritative describes the escalation mechanism. Decide whether the $2/100 model is still the plan.

### Content Calendar / Engagement

- `SKOOL_COMMUNITY_STRUCTURE.md` has a detailed weekly thread schedule: Monday Momentum, Wednesday Pattern Drop, Friday Wins, monthly Micro-Challenge Drop
- Strategy doc just says "check-in threads (daily or weekly)"
- Project plan doesn't address this

### Cross-Reference to Nonexistent File

The original working doc referenced `2026_No_Spend_Project_Plan_UPDATED.md`. This file doesn't exist in the repo. The updated strategy doc now references "2026 No Spend Project Plan" generically, but the project plan itself is not a committed file.

---

## Things in the Project Plan Not in the Strategy Doc

1. **Brand naming split** — "No Spend Hub = website, No Spend Collective = Skool community" — not stated in the strategy doc
2. **The Lab** — solo user path as a parallel product, not acknowledged in the strategy doc
3. **Auth decision** (Clerk/Supabase/defer) — affects how tier gating works
4. **Old journal migration** on tweakyourgeek.net — links need updating to Skool
5. **Mailerlite sequence updates** — swapping Facebook links to Skool across all sequences
6. **SQLGod financial review** of 3 apps (deadline March 13)
7. **Bundle conversion tracking** as ongoing task
8. **"What Ready to Launch Looks Like"** checklist — clear acceptance criteria

---

## Things in the Strategy Doc Not in the Project Plan

1. **Add-Ons** (Couples Module, Teens Module, Pets Module) — project plan doesn't mention
2. **65 micro-challenges** in 6 categories — project plan doesn't mention
3. **Daily email cadence** specifics — project plan says email sequences are "still needed"
4. **About page copy** — claimed live on Skool, not in any repo file
5. **Quarterly challenge details** for Q2-Q4 — project plan only addresses Q1

---

## Summary: What Still Needs Updating

### Docs Updated (March 11, 2026)

All previously stale docs have been updated:

| File | Status |
|------|--------|
| `docs/strategy/extraction-docs/03_Pricing_And_Monetization.md` | ✅ Updated — pricing, tier names, GPT count |
| `docs/strategy/extraction-docs/04_Skool_Community_Strategy.md` | ✅ Replaced entirely with current version |
| `docs/strategy/extraction-docs/05_Marketing_And_Launch_Strategy.md` | ✅ Updated — launch timeline, pricing, conversion funnels |
| `docs/strategy/extraction-docs/08_Lead_Magnets_And_Funnels.md` | ✅ Updated — pricing, tier names, Q1 challenge, conversion paths |
| `docs/strategy/extraction-docs/09_GPT_Ecosystem.md` | ✅ Updated — 17 → 7 GPTs, tier assignment TBD |
| `docs/strategy/extraction-docs/11_Product_Architecture.md` | ✅ Partially updated — key pricing, GPTs, Q1, tier names corrected |
| `docs/strategy/working/SKOOL_COMMUNITY_STRUCTURE.md` | ✅ Updated — 7-classroom structure, pricing, tier names |
| `src/components/landing/PricingSection.tsx` | ✅ Updated — VIP $99/yr, Standard tier name, features |

### Still Stale (archive artifacts — not blocking)

| File | Issues |
|------|--------|
| `project-archive/artifacts/conv11-quarterly-challenge-calendar.md` | 30 Bags as Q1, Pantry as April-May |
| `project-archive/artifacts/29-14-skool-classroom-structure-6-sections.md` | Old 6-section structure |

### Decisions Still Needed

| Item | Status |
|------|--------|
| GPT tier assignments (7 GPTs) | Pending |
| Couples/Teens/Pets Modules — real products? Where do they live? | Pending |
| Founding member escalation mechanics | Undocumented in current docs |
| Weekly content calendar (Monday/Wednesday/Friday threads) | Preserved in SKOOL_COMMUNITY_STRUCTURE.md, not in strategy doc |
| Project plan as committed file | Not in repo |
