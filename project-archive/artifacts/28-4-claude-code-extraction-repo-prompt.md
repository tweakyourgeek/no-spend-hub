<!-- Source: Conversation 28 (Technical review package for SQLGod), Item 28.4 -->
<!-- Status: REFERENCE -->

# Prompt for Claude Code (Extraction Repository Status)

This prompt was designed to get a status report from the Claude Code extraction repository, covering documentation inventory, gap analysis, and current project state.

---

## PROMPT FOR CLAUDE CODE (EXTRACTION REPO)

```
I need a status report on the No Spend Collective documentation work.

WHAT I NEED:

1. DOCUMENTATION INVENTORY
List every document you've created or updated in this repository:
   - File name
   - Location/path
   - What it covers
   - Status (complete, draft, needs review)

2. GAP ANALYSIS
You created a gap analysis at some point. Please surface that document 
and summarize:
   - What's missing
   - What's incomplete
   - What contradictions or conflicts exist between documents

3. CURRENT STATE OF THE NO SPEND COLLECTIVE
Based on everything in this repo, summarize:
   - What products/components are documented as DONE
   - What's documented as IN PROGRESS
   - What's documented as NOT STARTED
   - Any decisions that were made but not yet implemented

4. FRAMEWORK STATUS
   - Alignment Lab Codex integration: complete?
   - C3 Framework integration: complete?
   - Chasing Patterns: where do they currently live?

5. WHAT YOU NEED FROM ME
   - Are there open questions waiting on my decision?
   - Anything blocked?

Export as a single markdown status report I can bring to another 
conversation for planning.
```
