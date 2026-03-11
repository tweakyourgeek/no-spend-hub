<!-- Source: Conversation 28 (Technical review package for SQLGod), Item 28.3 -->
<!-- Status: REFERENCE -->

# Prompt for Claude Code (Apps Repository Technical Docs)

This prompt was designed to get technical documentation from the Claude Code apps repository for a senior developer reviewer (SQLGod).

---

## PROMPT FOR CLAUDE CODE

```
I need to create a technical documentation package for a senior developer 
who will be reviewing our NoSpend-related apps/tools.

REVIEWER PROFILE:
- 60+ years old
- Enterprise-level programming background (Python, SQL)
- Master's in Finance
- Expects professional documentation, not handholding
- Will review both CODE QUALITY and FINANCIAL LOGIC accuracy

PLEASE PROVIDE:

1. APP/TOOL INVENTORY
For each app or tool you've built in this project:
   - Name
   - Deployment URL (if deployed) or file location
   - Primary function (one sentence)
   - Tech stack (Python/JS/HTML/etc.)
   - Current status (MVP, testing, stable, broken)

2. ARCHITECTURE OVERVIEW
   - How the apps connect to each other (if at all)
   - Data flow diagram or description
   - Any external dependencies or APIs

3. FINANCIAL LOGIC DOCUMENTATION
For any calculations (budgets, runway, savings, etc.):
   - Document the formulas/logic used
   - Note any assumptions built into the math
   - Flag edge cases (negative numbers, zero division, decimals, etc.)

4. KNOWN ISSUES
   - What's broken or incomplete
   - What I already know needs fixing
   - So reviewer doesn't waste time "discovering" known problems

5. CODE LOCATION
   - GitHub repo(s) if applicable
   - File structure overview
   - Entry points for review

Export this as a single markdown file I can share with the reviewer.
```
