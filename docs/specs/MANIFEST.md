# Documentation Manifest

This manifest catalogs all documentation in the No Spend Hub repo and tracks currency status.

**Last Updated**: March 12, 2026

### Canonical Locations & Duplicates

Some documents exist in multiple locations. **Canonical** copies are the source of truth; duplicates are synced from them.

| Document | Canonical Location | Duplicate(s) |
|----------|-------------------|--------------|
| Product Manual | `docs/product/No_Spend_Challenge_Product_Manual.md` | `docs/apps/roadmap/` (synced copy) |
| Integration Roadmap | `docs/planning/No_Spend_Integration_Roadmap.md` | `docs/apps/roadmap/` (synced copy) |

### Current Naming Conventions

| Item | Current Value |
|------|--------------|
| Tier names | Standard ($0) / Premium ($9/mo) / VIP ($99/yr) |
| GPT count | 7 (reduced from original 17) |
| Launch date | March 20, 2026 (soft launch) |
| Q1 challenge | No-Spend Challenge (April) |
| Q2 challenge | Pantry Challenge (June-July) |
| Q3 challenge | No-Spend Group Round (Aug-Sep) |
| Q4 challenge | Holiday Spending Reset (Nov-Dec) |

---

## Core Product Documentation

### `No_Spend_Challenge_Product_Manual.md`
**Purpose:** Complete product overview and framework
**Use For:** Understanding the entire No Spend Challenge concept, structure, and approach
**Key Sections:** Challenge overview, participant journey, tools and resources
**Status:** Current (updated March 12, 2026)

### `No_Spend_Integration_Roadmap.md`
**Purpose:** Integration strategy and implementation roadmap
**Use For:** Understanding how all pieces fit together, planned integrations
**Key Sections:** Product ecosystem, integration points, technical requirements
**Status:** Partially updated (tiers and challenge calendar current; task lists reflect original timeline)

---

## Framework Deep Dives (`extraction_docs/`)

### Philosophy & Structure
- **`01_Frameworks_And_Philosophy.md`** - Core philosophy, anti-shame approach, "you can't do it wrong" messaging — **Current**
- **`02_Challenge_Structure.md`** - 30-day structure, week-by-week breakdown, participant experience — **Current**

### Business & Community
- **`03_Pricing_And_Monetization.md`** - Business model, pricing tiers, monetization strategy — **Current** (updated Mar 11)
- **`04_Skool_Community_Strategy.md`** - Community platform strategy, engagement approach — **Current** (updated Mar 11)
- **`05_Marketing_And_Launch_Strategy.md`** - Marketing plans, launch approach, positioning — **Current** (updated Mar 11)

### Content & Delivery
- **`06_Content_Delivery_Systems.md`** - How content is delivered to participants — **Current** (updated Mar 12)
- **`08_Lead_Magnets_And_Funnels.md`** - Lead generation, funnel strategy — **Current** (updated Mar 12)

### Product Ecosystem
- **`09_GPT_Ecosystem.md`** - AI tools and GPT integrations (7 GPTs confirmed) — **Current** (updated Mar 11)
- **`11_Product_Architecture.md`** - Overall product structure, how pieces connect — **Current** (updated Mar 12)
- **`13_Worksheet_And_Template_Inventory.md`** - Inventory of all worksheets and templates — **Current**
- **`14_Existing_Product_Cross_Reference.md`** - How this relates to existing products — **Current**

### Brand & Implementation
- **`10_Brand_Voice_Guide.md`** - **CRITICAL** - Detailed voice, tone, messaging guidelines — **Current**
- **`15_Brand_Positioning.md`** - Market positioning, competitive analysis — **Current**
- **`07_Technical_Implementation.md`** - Technical approach and requirements — **Current** (updated Mar 12)
- **`16_Implementation_Roadmap.md`** - Step-by-step implementation plan — **Current** (updated Mar 12)
- **`17_Integration_Roadmap.md`** - Integration planning and priorities — **Current** (updated Mar 12)

### Evolution Documentation
- **`12_Evolution_Documentation.md`** - How the product evolved, decision history — **Current** (updated Mar 12)

---

## Design System Reference

### `index.html`
**Purpose:** Complete working implementation of the brand design system
**Use For:** CSS patterns, component structure, interactive elements, responsive design
**Extract:** Color variables, typography scales, component patterns, animations

---

## Conversation Transcripts

### ChatGPT Conversations (`no_spend_chatgpt_*.md`)
18 conversation files documenting:
- Concept development
- Feature ideation
- Problem-solving discussions
- Framework evolution

**Files:**
- `no_spend_chatgpt_1.md` through `no_spend_chatgpt_18.md`

**Use For:** Additional context, understanding "why" decisions were made, alternative approaches considered

### Claude Conversations (`no_spend_claude_*.md`)
19 conversation files documenting:
- Product architecture discussions
- Technical implementation planning
- Content strategy development
- Brand voice refinement

**Files:**
- `no_spend_claude_1.md` through `no_spend_claude_19.md`

**Use For:** Deep context on decisions, technical reasoning, detailed explorations

---

## Quick Reference Guide

### When Building UI/Design
→ `index.html` (design system)
→ `10_Brand_Voice_Guide.md` (messaging)
→ `15_Brand_Positioning.md` (market context)

### When Understanding Product
→ `No_Spend_Challenge_Product_Manual.md` (start here!)
→ `01_Frameworks_And_Philosophy.md` (core concepts)
→ `02_Challenge_Structure.md` (how it works)

### When Planning Features
→ `11_Product_Architecture.md` (ecosystem view)
→ `No_Spend_Integration_Roadmap.md` (integration strategy)
→ `09_GPT_Ecosystem.md` (AI feature ideas)

### When Writing Copy
→ `10_Brand_Voice_Guide.md` (tone and voice)
→ `01_Frameworks_And_Philosophy.md` (key messages)
→ Conversation transcripts (examples of voice in practice)

### When Stuck
→ Conversation transcripts (see how problems were solved)
→ `12_Evolution_Documentation.md` (decision history)
→ Ask the user!

---

## File Organization in New Repo

All files will be copied to `/docs` in the new repository:

```
nospend-apps/
├── docs/
│   ├── HANDOFF.md (this overview)
│   ├── MANIFEST.md (this file)
│   ├── No_Spend_Challenge_Product_Manual.md
│   ├── No_Spend_Integration_Roadmap.md
│   ├── index.html
│   ├── extraction_docs/
│   │   ├── 01_Frameworks_And_Philosophy.md
│   │   ├── 02_Challenge_Structure.md
│   │   ├── ... (all 17 files)
│   ├── conversations/
│   │   ├── chatgpt/
│   │   │   ├── no_spend_chatgpt_1.md
│   │   │   └── ... (all 18 files)
│   │   └── claude/
│   │       ├── no_spend_claude_1.md
│   │       └── ... (all 19 files)
│   └── assets/
│       ├── tyg-logo.png
│       ├── 00 Tweak Your Geek Logo New.png
│       └── favicon.svg
```

---

## Document Statistics

- **Core Docs:** 2 files
- **Framework Docs:** 17 files
- **Design Reference:** 1 file
- **Conversation Transcripts:** 37 files (18 ChatGPT + 19 Claude)
- **Assets:** 3 files
- **Total:** 60 files

---

**Note:** All documentation is copied for reference. The source of truth remains in this repository (`no-spend-hub`).

**Last Updated:** March 12, 2026
