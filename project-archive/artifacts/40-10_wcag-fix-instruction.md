<!-- Source: Conversation 40 (030926 Update Website App), Item 40.10 -->
<!-- Status: REFERENCE -->

# WCAG Fix Instruction for Claude Code

## Full WCAG AA Audit Prompt

**"Run a WCAG AA contrast audit on the No Spend Collective site. Check all color combinations in use across every section — text on backgrounds, buttons, cards, chips, labels, everything. Report the failures and warnings with ratios, then fix them all in the same session. Brand palette for reference:**

```
--cream: #F8F1F2
--off-white: #F9F0F5
--plum: #493751
--sage: #A6C9BB
--periwinkle: #A7AFC8
--lavender: #E0DAE7
--mauve: #B375A0
--navy: #3B3B58
--peach: #E8B4A0
```

**WCAG AA requires 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold). Report findings first, then fix without changing any design decisions — just swap text colors where needed to hit the ratios."**

---

## Specific Fix (from mid-conversation)

"Find all instances of color: #A7AFC8 used on text elements with light backgrounds, replace with #3B3B58."

*Note: Captured in wcag-audit-results.md.*
