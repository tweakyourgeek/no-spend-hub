<!-- Source: Conversation 13 (Resolving prompt length and conversation limits), Item 13.2 -->
<!-- Status: REFERENCE -->

# Multiple Continuation Prompts for Claude Code (7 Variations)

These prompts were developed to solve "prompt too long" errors when continuing extraction work across multiple Claude Code sessions. The key principle: keep continuation prompts SHORT. Don't re-explain the project. Just tell it where you left off.

---

## Variation 1: Initial Continuation (ChatGPT to Claude files)

```
Continue the extraction work from the previous session.

You already completed:
- Read all 18 ChatGPT files
- Created extraction_docs/ directory
- Created 11_Product_Architecture.md
- Committed and pushed

Now read the 18 Claude conversation files (no_spend_claude_1.md through no_spend_claude_18.md) and:
1. Update Doc 11 with any new product architecture info
2. Continue creating the remaining 15 extraction documents

Start by reading claude files 1-6.
```

---

## Variation 2: After Files 1-12 Completed

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

## Variation 3: High-Priority Documents First

```
Option B - Create the 5 high-priority documents first:

- 02_Challenge_Structure.md
- 04_Skool_Community_Strategy.md
- 10_Brand_Voice_Guide.md
- 12_Evolution_Documentation.md
- 14_Existing_Product_Cross_Reference.md

Then commit, push, and we'll review before continuing.
```

---

## Variation 4: Remaining 9 Documents (with repo sync note)

```
Option A - Create the remaining 9 extraction documents now.

NOTE: I've already pulled/merged the previous work, so everything is up to date in the repo.

Complete the full 16-document set:
- 03_Pricing_And_Monetization.md
- 05_Marketing_And_Launch_Strategy.md
- 06_Content_Delivery_Systems.md
- 07_Technical_Implementation.md
- 08_Lead_Magnets_And_Funnels.md
- 09_GPT_Ecosystem.md
- 13_Worksheet_And_Template_Inventory.md
- 15_Brand_Positioning.md
- 16_Implementation_Roadmap.md

Then commit and push everything.
```

---

## Variation 5: Simple Stop Point

```
Option B - Stop here. Core documentation is complete.

The extraction work has captured all critical information from 36 conversation files. The remaining 9 documents can be created later if needed.

Please create a final commit summarizing the complete extraction work, then close this task.
```

---

## Variation 6: Master Index Creation

```
Continue from previous session. All 16 extraction documents are created.

Now create 15_Master_Index.md:
- Cross-reference all 16 documents
- Create a searchable index of key topics
- Note which documents reference each other

Then commit and push.
```

---

## Variation 7: Gaps and Contradictions

```
Continue from previous session. Docs 01-15 are complete.

Now create 16_Gaps_And_Contradictions.md:
- Flag contradictions between documents
- Identify gaps in coverage
- Note evolution points where decisions changed
- Flag false gaps (things that look missing but exist elsewhere)

Then commit and push.
```

---

## Key Rules for Continuation Prompts

1. **Keep it SHORT** - Don't re-explain the entire project
2. **Reference what's done** - So it doesn't redo work
3. **Be specific about next task** - Tell it exactly what to create
4. **Chunk the work** - Ask for 5-6 documents at a time, not all at once
5. **Mention repo status** - Note if you've already pulled/merged
6. **Stay in the active conversation** - Only start new when you get an error
7. **Don't include the original prompt** - That's what causes "prompt too long"
