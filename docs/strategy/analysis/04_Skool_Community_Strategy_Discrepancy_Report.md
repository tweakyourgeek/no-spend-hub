# 04 Skool Community Strategy — Discrepancy Report

**Date**: March 11, 2026
**Purpose**: Three-way comparison of the current working version of 04_Skool_Community_Strategy.md against the repository extraction doc, the 2026 No Spend Project Plan, and live code.

**Sources compared:**
1. **Working doc** — current version provided March 11, 2026
2. **Repo extraction doc** — `docs/strategy/extraction-docs/04_Skool_Community_Strategy.md` (dated December 28, 2024)
3. **Project plan** — 2026 No Spend Project Plan (last updated March 11, 2026)
4. **Live code** — `src/components/landing/PricingSection.tsx`, `public/coming-soon/index.html`, working docs

---

## The Repo Extraction Doc Is 15 Months Stale

The file at `docs/strategy/extraction-docs/04_Skool_Community_Strategy.md` was last updated **December 28, 2024**. The working doc is dated March 2026. They are completely different documents sharing the same name. The repo version:

- Says launch date is **January 2026** (working doc and project plan say March 20)
- Uses the old pricing: **$27/mo PAID, $97/mo VIP**
- References **17 custom GPTs** as a VIP feature
- Lists Q1 challenge as **30 Bags in 30 Days** (Feb-Mar/Lent)
- Lists Q2 Pantry Challenge as **April-May**
- References "PLR-based workbook" and "$30 standalone guide" conversion paths
- Cross-references `11_Product_Architecture.md` and `09_GPT_Ecosystem.md` (working doc references `2026_No_Spend_Project_Plan_UPDATED.md` instead)
- Has "Source: File X" citations throughout (extraction artifact format)
- Includes lengthy quotes from original conversation files
- Says community name "may have evolved" — it has; the project plan confirms it

**Bottom line:** The working doc is a full rewrite, not an update. The repo version needs to be replaced entirely.

---

## Pricing

### Settled Pricing (working doc + project plan + coming-soon page agree)

| Tier | Price |
|------|-------|
| Standard | Free |
| Premium | $9/mo |
| VIP | $99/yr |

### Files That Contradict This

| File | What It Says | What's Wrong |
|------|-------------|-------------|
| `docs/strategy/extraction-docs/03_Pricing_And_Monetization.md` | PAID $27/mo, VIP $97/mo | Old pricing, monthly VIP |
| `docs/strategy/extraction-docs/04_Skool_Community_Strategy.md` (repo) | PAID $27/mo, VIP $97/mo | Same stale numbers |
| `docs/strategy/working/SKOOL_COMMUNITY_STRUCTURE.md` | $27/mo, $97/mo in header | Same stale numbers |
| `src/components/landing/PricingSection.tsx` | VIP **$125/yr** | Wrong VIP price |

The coming-soon page (`public/coming-soon/index.html`) is correct.

---

## Tier Naming

| Source | Free | Mid | Top |
|--------|------|-----|-----|
| Working doc | Standard | Premium | VIP |
| Project plan | Standard | Premium | VIP |
| Coming-soon page | Standard | Premium | VIP |
| PricingSection.tsx | **Free** | Premium | VIP |
| Repo extraction doc | **FREE** | **PAID** | **VIP/Premium** |
| SKOOL_COMMUNITY_STRUCTURE.md | **FREE** | **PAID** | **VIP** |

The React component uses "Free" instead of "Standard" — minor but inconsistent.

---

## Quarterly Challenge Calendar

| Quarter | Working Doc | Repo Extraction Doc | Project Plan |
|---------|------------|-------------------|--------------|
| Q1 | No-Spend Challenge, April 1 | **30 Bags in 30 Days, Lent (Feb-Mar)** | First 30-day No Spend Challenge, April 1 |
| Q2 | Pantry Challenge, June-July | Pantry Challenge, **April-May** | Not mentioned |
| Q3 | No-Spend Group Round, Aug-Sept | Same | Not mentioned |
| Q4 | Holiday Spending Reset, Nov-Dec | Same | Not mentioned |

The artifact at `project-archive/artifacts/conv11-quarterly-challenge-calendar.md` also has the old Q1 (30 Bags) and Q2 (April-May) timing. Working doc and project plan agree on the current calendar.

---

## GPTs

| Source | Count | Tier Assignment |
|--------|-------|----------------|
| Working doc | No mention | N/A |
| Project plan | **7 GPTs** listed by name | TBD |
| Repo extraction doc | **17 custom GPTs** | VIP-only |
| PricingSection.tsx | "Full GPT suite" | VIP feature |

The working doc should probably acknowledge GPTs exist since the project plan has 7 of them pending tier assignment.

---

## Classroom Structure: 5 vs 6 Sections

**Working doc (5 sections):**
1. START HERE
2. Challenge Content (Weeks 1-4)
3. Resources
4. Community Support
5. Archives (VIP only)

**SKOOL_COMMUNITY_STRUCTURE.md (6 sections):**
1. START HERE
2. 30-Day No-Spend Challenge
3. Quarterly Challenges
4. Toolkit & Resources
5. Community Hub
6. VIP Lounge

**Artifact 29-14** (`skool-classroom-structure-6-sections.md`) also shows 6 sections.

The working doc is missing "Quarterly Challenges" as its own section and "VIP Lounge" entirely. The working doc evolved the structure but this wasn't carried into the strategy doc.

---

## Free Tier Features

| Feature | Working Doc | Project Plan | Coming-Soon | PricingSection.tsx | Repo Extraction Doc |
|---------|------------|-------------|-------------|-------------------|-------------------|
| Community access | Yes | Yes | Yes | Yes | Yes |
| Monthly No-Spend Challenge | Yes | Yes | Yes | Yes | "Quarterly rotating challenges" |
| 7-Day Spending Tracker | Yes | Yes | Yes | No ("Basic worksheets") | No |
| Pattern Quiz | Yes | Yes | Yes | Yes | No |
| Impulse Brake | Yes | Yes | Yes | No | No |
| Decision Matrix | Yes | Yes | Yes | No | No |
| Quarterly community resets | No | No | No | **Yes** | No |
| PLR workbook | No | No | No | No | **Yes** |

The React component generifies the tools. The repo extraction doc still references PLR materials.

---

## Premium Tier Features

| Feature | Working Doc | Project Plan | Repo Extraction Doc |
|---------|------------|-------------|-------------------|
| Monthly Themed Challenge | Yes | Yes | No — says "The No-Spend Guide (personal AND business)" |
| Monthly live check-in | Yes | Yes | No — says "current month's workshops" |
| Current month's tool | Yes | Yes | No — says "Business Central Hub access" |
| Price | $9/mo | $9/mo | **$27/mo** |

The repo extraction doc describes an entirely different Premium/PAID tier built around the Guide as the core product.

---

## VIP Features

| Feature | Working Doc | Project Plan | PricingSection.tsx | Repo Extraction Doc |
|---------|------------|-------------|-------------------|-------------------|
| Quarterly Live VIP Reset | Yes | Not mentioned | "Quarterly resets" | "Live co-working sessions" |
| Updated Journal and Guide | Yes | Not mentioned | No | No |
| Full No Spend Toolkit | Yes | Not mentioned | No | No |
| Archives | Yes | Not mentioned | "Full content archives" | "Full Archives access" |
| Full GPT suite | No | 7 GPTs, tier TBD | **Yes** | **"All 17 custom GPTs"** |
| Couples & Teen Modules | No (listed as add-ons) | Not mentioned | **Yes (in VIP)** | No |

The React component puts Couples & Teen Modules inside VIP. The working doc lists them as separate add-ons. The project plan doesn't mention them at all.

---

## Content Calendar / Engagement

- **SKOOL_COMMUNITY_STRUCTURE.md** has a detailed weekly thread schedule: Monday Momentum, Wednesday Pattern Drop, Friday Wins, monthly Micro-Challenge Drop
- **Working doc** just says "check-in threads (daily or weekly)"
- **Project plan** doesn't address this at all

---

## Founding Member Escalation

| Source | Mechanism |
|--------|-----------|
| Working doc | "Price increases after founding period closes" — no specifics |
| Project plan | "First 100 members lock founding rates forever. Price increases after that." — no specifics |
| Repo extraction doc | "$2 increase per tier for every 100 members" — specific escalation model |
| 03_Pricing doc | Same $2/100 escalation model |

Nobody currently authoritative describes the mechanism. The specific model only exists in stale docs.

---

## Launch Timeline

| Item | Working Doc | Project Plan | Repo Extraction Doc |
|------|------------|-------------|-------------------|
| Pre-launch | March 11-19 | March 11-19 | **December 2025** |
| Launch | March 20 | March 20 | **January 2026** |
| First challenge | April 1 | April 1 | **January 2026 (30 Bags in 30 Days)** |

Working doc and project plan align. The repo extraction doc is 3+ months behind on dates.

---

## Cross-References

### Working Doc References

| Referenced File | Exists in Repo? |
|----------------|-----------------|
| `02_Challenge_Structure.md` | Yes |
| `05_Marketing_And_Launch_Strategy.md` | Yes |
| `2026_No_Spend_Project_Plan_UPDATED.md` | **No — not a committed file** |

### Repo Extraction Doc References

| Referenced File | Exists in Repo? |
|----------------|-----------------|
| `11_Product_Architecture.md` | Yes |
| `02_Challenge_Structure.md` | Yes |
| `05_Marketing_And_Launch_Strategy.md` | Yes |
| `09_GPT_Ecosystem.md` | Yes |

---

## Things in the Project Plan Not in Either Version of the Skool Doc

1. **Brand naming split** — "No Spend Hub = website, No Spend Collective = Skool community" is explicitly defined in the project plan but not stated in either Skool doc
2. **The Lab** — solo user path as a parallel product. Neither Skool doc acknowledges it
3. **Auth decision** (Clerk/Supabase/defer) — affects how tier gating works
4. **Old journal migration** on tweakyourgeek.net — links need updating to Skool
5. **Mailerlite sequence updates** — swapping Facebook links to Skool across all sequences
6. **7 named GPTs** with tier assignment pending
7. **SQLGod financial review** of 3 apps (deadline March 13)
8. **Bundle conversion tracking** as ongoing task
9. **"What Ready to Launch Looks Like"** checklist — clear acceptance criteria not in Skool doc

---

## Things in the Working Doc Not in the Project Plan

1. **Add-Ons** (Couples Module, Teens Module, Pets Module) — project plan doesn't mention
2. **65 micro-challenges** in 6 categories — project plan doesn't mention
3. **Daily email cadence** specifics — project plan says email sequences are "still needed"
4. **About page copy** — claimed live on Skool, not in any repo file
5. **Quarterly challenge details** for Q2-Q4 — project plan only addresses Q1

---

## Summary: What's Out of Sync

### The repo extraction doc is obsolete
The working doc is the current version but it's not committed. The repo file should be replaced entirely.

### Conflicts That Remain Across the Broader Repo

| Priority | Issue | Files Affected |
|----------|-------|---------------|
| High | VIP price: $125/yr in code, should be $99/yr | `src/components/landing/PricingSection.tsx` |
| High | Old $27/$97 pricing still in docs | `docs/strategy/extraction-docs/03_Pricing_And_Monetization.md`, `docs/strategy/working/SKOOL_COMMUNITY_STRUCTURE.md` |
| Medium | GPTs: 0 vs 7 vs 17, no tier assignment | Working doc, project plan, extraction docs, `PricingSection.tsx` |
| Medium | Classroom sections: 5 vs 6 | Working doc vs `docs/strategy/working/SKOOL_COMMUNITY_STRUCTURE.md` |
| Medium | Couples/Teen Modules: add-on vs VIP-included vs unmentioned | Working doc vs `PricingSection.tsx` vs project plan |
| Medium | Founding member escalation mechanics undocumented in current docs | All current docs |
| Low | Free tier name: "Standard" vs "Free" in React component | `src/components/landing/PricingSection.tsx` |
| Low | Weekly content calendar exists in working doc but not in strategy doc | `docs/strategy/working/SKOOL_COMMUNITY_STRUCTURE.md` |
| Low | Cross-reference to nonexistent file | Working doc |

---

## Files to Retrieve from Repo for Review on Regular Claude

These are the files you need to bring into a regular Claude conversation to reconcile the discrepancies above. Grouped by purpose.

### Must-Have: The Stale Docs That Need Updating

These contain outdated pricing, tier names, or structure that conflicts with the current strategy:

1. `docs/strategy/extraction-docs/04_Skool_Community_Strategy.md` — the stale version to be replaced with the working doc
2. `docs/strategy/extraction-docs/03_Pricing_And_Monetization.md` — old $27/$97 pricing, "17 GPTs"
3. `docs/strategy/working/SKOOL_COMMUNITY_STRUCTURE.md` — old pricing in header, but has the 6-section classroom structure and weekly content calendar worth preserving
4. `src/components/landing/PricingSection.tsx` — VIP price wrong ($125 should be $99), tier name "Free" vs "Standard", GPT suite and Couples/Teen in VIP

### Should-Have: Related Strategy Docs for Context

These are referenced by the Skool doc or contain overlapping content:

5. `docs/strategy/extraction-docs/02_Challenge_Structure.md` — cross-referenced by the Skool doc
6. `docs/strategy/extraction-docs/05_Marketing_And_Launch_Strategy.md` — cross-referenced for bundle strategy
7. `docs/strategy/extraction-docs/09_GPT_Ecosystem.md` — referenced by repo extraction doc, likely stale (17 GPTs vs current 7)

### Nice-to-Have: Artifacts with Relevant Detail

These contain specific content that may need to be carried forward or marked obsolete:

8. `project-archive/artifacts/conv11-quarterly-challenge-calendar.md` — old Q1/Q2 calendar, product ecosystem breakdown
9. `project-archive/artifacts/29-14-skool-classroom-structure-6-sections.md` — 6-section classroom detail
10. `project-archive/artifacts/28-6-10-day-skool-launch-sprint-plan.md` — launch sprint task breakdown

### Already Correct (no action needed, but useful as reference)

11. `public/coming-soon/index.html` — pricing and tier features are correct, good baseline to compare against
