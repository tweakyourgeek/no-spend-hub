<!-- Source: Conversation 28 (Technical review package for SQLGod), Item 28.5 -->
<!-- Status: REFERENCE -->

# Updated Claude Code Prompt with Vercel App Names

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

## Vercel App Inventory (from email notification)

| App Name | Likely URL | Function (based on name) | Notes |
|----------|------------|-------------------------|-------|
| **comfort-menu** | comfort-menu.vercel.app | Non-spending alternatives when triggered | Core challenge tool |
| **commitment-builder** | commitment-builder.vercel.app | Build your 30-day commitments | Duplicate exists? |
| **nospend-apps-zh8a** | nospend-apps-zh8a.vercel.app | Hub/parent app? | Need to check |
| **nospend-c3-savingscalc** | nospend-c3-savingscalc.vercel.app | C3 Framework savings calculator | Financial logic review needed |
| **nospend-commitment-builder** | nospend-commitment-builder.vercel.app | Same as commitment-builder? | Possible duplicate |
| **nospend-expense-log** | nospend-expense-log.vercel.app | Track expenses during challenge | Financial logic review needed |
| **nospend-journal-30day** | nospend-journal-30day.vercel.app | Digital version of 30-day journal | Core product |
| **nospend-lab-loop** | nospend-lab-loop.vercel.app | Lab Loop phase tracker | Alignment Lab integration |
| **nospend-subscription-analyzer** | nospend-subscription-analyzer.vercel.app | Analyze subscriptions for C3 decisions | Financial logic review needed |
| **subscriptoin-analyzer** | subscriptoin-analyzer.vercel.app | Same as above with typo | Duplicate to clean up |

## Duplicates to Sort Out:
- commitment-builder vs nospend-commitment-builder
- nospend-subscription-analyzer vs subscriptoin-analyzer (typo)

## Priority for SQLGod's Financial Review:
1. nospend-c3-savingscalc (calculations)
2. nospend-expense-log (tracking math)
3. nospend-subscription-analyzer (C3 decision logic)
