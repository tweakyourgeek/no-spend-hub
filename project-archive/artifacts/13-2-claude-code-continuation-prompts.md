<!-- Source: Conversation 13 (Resolving prompt length and conversation limits), Item 13.2 -->
<!-- Status: REFERENCE -->

# Multiple Continuation Prompts for Claude Code (7 Variations)

These prompts were developed to solve "prompt too long" errors when continuing extraction work across multiple Claude Code sessions.

---

## Variation 1: Short Batch Prompt (for adding Claude files to existing extraction)

```
Now add the 18 Claude conversation files to your extraction:
- Files: no_spend_claude_1.md through no_spend_claude_18.md
- Apply the same extraction process you're using for the ChatGPT files
- Create the same 16 organized documents, integrating content from both ChatGPT and Claude conversations
- Flag when Claude conversations contradict or expand on ChatGPT conversations
- Continue processing in batches

Start with the first batch of Claude files.
```

---

## Variation 2: Condensed Full Prompt

```
Extract and Organize 30 Day No Spend Content

Read all 36 conversation files (no_spend_chatgpt_1-18.md + no_spend_claude_1-18.md) 
and create 16 organized extraction documents.

Context: Content evolved PLR -> Content Queen -> No Spend Challenge. Much verbally 
processed (dictation). Existing 30-Day No Spend Roadmap product in repository. 
Launch: Jan 1, 2026. Audience: ~2,000 bundle owners.

Create These Documents:
1. Frameworks & Philosophy
2. Challenge Structure
3. Participant Materials
4. Skool Community Strategy
5. Email/Communication Templates
6. Social Media Content
7. Facilitator/Admin Guide
8. Checklists & Tools
9. Strategic Insights
10. Brand Voice Guide
11. Product Architecture
12. Evolution Documentation
13. Parked Ideas
14. Existing Product Cross-Reference
15. Master Index
16. Gaps & Contradictions

For Each Document: Clear headers, source attribution (which file), exact quotes 
for key insights, flag contradictions, show evolution over time, be comprehensive.

Process in batches of 6-8 files. Start with ChatGPT files 1-8.
```

---

## Variation 3: Super Short Version

```
Read 36 conversation files: no_spend_chatgpt_1-18.md + no_spend_claude_1-18.md

Create 16 extraction docs: Frameworks, Challenge Structure, Participant Materials, 
Skool Strategy, Email Templates, Social Content, Facilitator Guide, Checklists, 
Strategic Insights, Brand Voice, Product Architecture, Evolution 
(PLR->Content Queen->No Spend), Parked Ideas, Product Cross-Reference, 
Master Index, Gaps.

Key context: Verbally processed content. FREE tier uses old PLR workbook, PAID 
uses new. Launch Jan 1, 2026. Chasing Series: Ambrosia, Rainbows, Unicorns, 
Stardust, Sunshine, Moonbeams.

Format: Source attribution, exact quotes, flag contradictions, show evolution, 
be comprehensive.

Process in batches of 8 files. Start with chatgpt 1-8.
```

---

## Variation 4: One-Liner Emergency Prompt

```
Extract all content from 36 conversation files (no_spend_chatgpt_1-18 + 
no_spend_claude_1-18) into 16 organized docs: frameworks, structure, materials, 
Skool strategy, emails, social, facilitator guide, checklists, insights, brand 
voice, product architecture, evolution, parked ideas, cross-reference, index, 
gaps. Process in batches starting with chatgpt 1-8.
```

---

## Variation 5: Handoff Prompt (when previous session completed partial work)

```
Previous Claude Code session completed extraction docs 1-7 from chatgpt files 1-12.

Continue extraction: Process remaining chatgpt files 13-18 + all claude files 1-18. 
Create remaining docs 8-16.

Already completed:
- Frameworks & Philosophy
- Challenge Structure
- Participant Materials
- Skool Community Strategy
- Email Templates
- Social Media Content
- Facilitator Guide

Still need:
- Checklists & Tools
- Strategic Insights
- Brand Voice Guide
- Product Architecture
- Evolution Documentation
- Parked Ideas
- Product Cross-Reference
- Master Index
- Gaps & Contradictions

Continue in batches. Start with chatgpt 13-18.
```

---

## Variation 6: Simple Continuation Prompt (after hitting context limit)

```
Continue the extraction work from the previous session.

You already completed:
- Read all 18 ChatGPT files
- Created extraction_docs/ directory
- Created 11_Product_Architecture.md
- Committed and pushed

Now read the 18 Claude conversation files (no_spend_claude_1.md through 
no_spend_claude_18.md) and:
1. Update Doc 11 with any new product architecture info
2. Continue creating the remaining 15 extraction documents

Start by reading claude files 1-6.
```

---

## Variation 7: Post-Batch Continuation

```
Continue extraction from previous session.

Already completed:
- Read all 18 ChatGPT files
- Read Claude files 1-12
- Updated Doc 11 (Product Architecture) - committed and pushed

Now read Claude files 13-18 and:
1. Update Doc 11 if needed
2. Create the remaining 15 extraction documents

Start with claude files 13-18.
```

---

## Key Lessons Learned

- **Don't re-explain the whole project** in continuation prompts - just tell it to continue where it left off
- **Don't mention files already processed** - only reference what still needs doing
- **Batch size matters** - 6-8 files per batch works; all 36 at once triggers "prompt too long"
- **Upload instructions as file** is an alternative when prompt text exceeds single message character limit
- When Claude Code auto-continues to a new conversation, it tries to re-load all context including large files, which triggers "prompt too long"
- The files are in a GitHub repository connected to Claude Code, so telling it "read all 36 files" loads all 36 markdown files from the repo into context at once
- Explicitly tell it to ONLY read specific files at a time from the GitHub repo, not all at once
