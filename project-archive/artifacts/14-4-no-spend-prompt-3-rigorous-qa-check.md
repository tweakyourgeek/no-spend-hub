# No Spend Prompt 3: Rigorous QA Check
# Source: Conversation 14 - Gap analysis after context limit
# URL: https://claude.ai/chat/b4e0d870-e612-42cc-b4e5-bd16b89d3a52
# Status: CURRENT

## PROMPT 3: Rigorous QA Check

Task: Find problems in no_spend_product_manual.md (NOT confirmation)

Critical Mindset: Assume there ARE gaps. Your job is to FIND them.

Systematic Verification:

### Step 1: Section Completeness Check
For EACH of 8 sections, document:
- Section name
- Expected content (from integration plan)
- What's actually there (line numbers/headers)
- What's MISSING (be specific)
- Evidence

### Step 2: Source File Audit
Table showing:
- All 16 extraction files
- Key topics from each
- WHERE in manual those topics appear
- Topics NOT found in manual

### Step 3: Blueprint Compliance Check
From `no-spend-journal-rewrite-blueprint.md`:
- Are all 5 main sections present?
- Are all page types created?
- Are daily prompts mapped to Lab Loop phases?
- Are weekly overviews complete?

### Step 4: Critical Content Verification
Confirm these MUST exist:
- Complete Alignment Lab Codex integration
- All 6 Chasing patterns (as recognition tools only)
- 30 daily prompts organized by Lab Loop phases
- Weekly overview pages
- Pattern-based rules worksheets
- Expense tracking templates
- All intervention taglines (locked)
- Voice guidelines (no binary, no dashes, etc.)
- Free vs. paid boundaries clearly defined

For each: Exact location. If missing: FLAG IT.

### Step 5: Cross-Reference Check
Look for:
- Contradictions
- Redundancy
- Gaps
- Orphan references

Output:

**QA Report: Issues Found**
- High Priority Gaps
- Medium Priority Issues
- Low Priority Polish

**QA Report: Verification Evidence**
For each section/topic: "Found in Section X..."

Bottom Line:
- Total sections planned: 8
- Total sections present: X
- Topics verified present: X
- Topics flagged missing: X
- Critical issues requiring fix: X

SHOW YOUR WORK. No hand-waving.

After QA: FIX any issues found.
