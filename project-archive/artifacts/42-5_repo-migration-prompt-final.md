# Repo Migration Prompt (Final)
# Source: Conversation 42 (No Spend #3 031026)
# URL: https://claude.ai/chat/46827ba3-40b1-4cd8-a990-476a130ed304
# Status: CURRENT
# Notes: Final version of the migration prompt. "Move everything except exclusions" approach.

---

## CLAUDE CODE PROMPT:

Migrate everything from the source repo into `no-spend-hub` EXCEPT the items on the exclusion list. Move the whole thing.

**Source repo:** https://github.com/Tweak-Your-Geek/nospend
**Destination:** no-spend-hub (your current working repo)

Clone the source repo first, then move everything into `docs/` using this structure:

- Root-level `.md` files -> `docs/products/`
- `extraction_docs/` -> `docs/strategy/extraction-docs/`
- `docs/working/` -> `docs/strategy/working/`
- `docs/analysis/` -> `docs/strategy/analysis/`
- `docs/research/` -> `docs/strategy/research/`
- `assets/images/` -> `docs/brand/assets/`
- `app/` -> `docs/apps/roadmap/`
- `products/` -> `docs/products/`
- `.xlsx` files -> `docs/products/spreadsheets/`
- `conversations/` -> `docs/history/conversations/`

**Do NOT move these:**
- `archive/` folder
- Any `.xlsx` file with `(1)` in the filename (delete those, they're junk duplicates)
- `app/ENHANCEMENTS.md`, `app/ROADMAP_ENHANCEMENTS.md`, `app/MANIFEST.md`
- `STATUS_REPORT_FOR_SQLGOD.md`
- `REPO_INVENTORY_AND_GAP_ANALYSIS.md`

After migration, create `docs/references/ARCHIVED_REPOS.md` with the source repo URL, archive date March 10 2026, and a note that `docs/history/conversations/` contains 37 threads (18 ChatGPT, 19 Claude) covering the full product development history.

Before committing, output a complete list of every file moved so we can verify nothing was missed. Commit with message `feat: migrate nospend repo content to docs/` and push to main.
