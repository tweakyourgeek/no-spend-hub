<!-- Source: Conversation 28 (Technical review package for SQLGod), Item 28.5 -->
<!-- Status: REFERENCE -->

# Updated Claude Code Prompt with Vercel App Names

This is the updated version of the technical documentation prompt, created after the user provided the actual Vercel deployment list showing 10 apps.

---

## UPDATED PROMPT FOR CLAUDE CODE

```
I have 10 Vercel apps deployed. I need a technical spec document for 
a senior developer (Python/SQL background, Master's in Finance) who 
will review them.

APPS TO DOCUMENT:
- comfort-menu
- commitment-builder  
- nospend-apps-zh8a
- nospend-c3-savingscalc
- nospend-commitment-builder
- nospend-expense-log
- nospend-journal-30day
- nospend-lab-loop
- nospend-subscription-analyzer
- subscriptoin-analyzer

FOR EACH APP PROVIDE:
1. Deployment URL
2. Primary function (one sentence)
3. Tech stack
4. Any financial calculations or logic (formulas, assumptions)
5. Known issues or incomplete features
6. Data flow (inputs -> processing -> outputs)

ALSO FLAG:
- Which apps are duplicates that should be consolidated
- Which apps have financial logic requiring accuracy review
- Any edge cases in the math (negative numbers, decimals, zero division)

Export as a single markdown file formatted for a senior technical reviewer.
```

---

## VERCEL APP INVENTORY (from user's Vercel email)

| App Name | Likely URL | Function (based on name) | Notes |
|----------|------------|-------------------------|-------|
| comfort-menu | comfort-menu.vercel.app | Non-spending alternatives when triggered | Core challenge tool |
| commitment-builder | commitment-builder.vercel.app | Build your 30-day commitments | Duplicate exists? |
| nospend-apps-zh8a | nospend-apps-zh8a.vercel.app | Hub/parent app? | Need to check |
| nospend-c3-savingscalc | nospend-c3-savingscalc.vercel.app | C3 Framework savings calculator | Financial logic review needed |
| nospend-commitment-builder | nospend-commitment-builder.vercel.app | Same as commitment-builder? | Possible duplicate |
| nospend-expense-log | nospend-expense-log.vercel.app | Track expenses during challenge | Financial logic review needed |
| nospend-journal-30day | nospend-journal-30day.vercel.app | Digital version of 30-day journal | Core product |
| nospend-lab-loop | nospend-lab-loop.vercel.app | Lab Loop phase tracker | Alignment Lab integration |
| nospend-subscription-analyzer | nospend-subscription-analyzer.vercel.app | Analyze subscriptions for C3 decisions | Financial logic review needed |
| subscriptoin-analyzer | subscriptoin-analyzer.vercel.app | Same as above with typo | Duplicate to clean up |

---

## OBSERVATIONS

**Duplicates to sort out:**
- commitment-builder vs nospend-commitment-builder
- nospend-subscription-analyzer vs subscriptoin-analyzer (typo)

**Priority for SQLGod's financial review:**
1. nospend-c3-savingscalc (calculations)
2. nospend-expense-log (tracking math)
3. nospend-subscription-analyzer (C3 decision logic)

**Priority for UX testing:**
1. comfort-menu
2. nospend-journal-30day
3. nospend-lab-loop

---

## KEY FINDINGS FROM CLAUDE CODE REVIEW

**Good news:**
- All 11 apps deploy and run
- Financial math is sound (within stated assumptions)
- No security vulnerabilities
- Simple architecture (no backend complexity)

**Needs attention:**
- CSV export bug (2 minute fix)
- Expense log accepts negative numbers (5 minute fix)
- Zero unit tests
- Hardcoded assumptions (30% CUT savings, 50% COMBINE split, 1.7x family plan multiplier)

**Priority review targets:**
1. savings-calculator/src/App.jsx lines 184-211
2. subscription-analyzer/src/App.jsx lines 229-350
3. expense-log/src/App.jsx lines 251-262

**Note:** Apps were on GitHub Pages, not Vercel. The Vercel deployments might be duplicates or later versions. GitHub Pages URLs: https://tweakyourgeek.github.io/nospend-apps/[app-name]/
