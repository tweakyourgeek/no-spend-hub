# The Lab Architecture Plan — 3 Buckets
# Source: Conversation 41 (No Spend Collective homepage copy and Lab structure)
# URL: https://claude.ai/chat/182cbbbe-3745-43c9-b5a3-d63a9bbd3306
# Status: CURRENT
# Notes: Architecture for The Lab page, tiered by access level. Decided before Claude Code builds it.

---

## The Lab = Your Tool Hub, Tiered by Access

### Bucket 1: Always Free (no login, no email required)
The tools that function as public lead magnets. Someone lands here from a bundle or a search, pokes around, does the quiz, gets the itch to go deeper. These should work completely with no friction.

**Candidates:**
- Pattern Quiz
- Impulse Brake (maybe)

### Bucket 2: Free with Email (drives Skool signup)
Tools that are still lightweight and one-time-use, but you capture the email before revealing the output, or the submit button sends them to Skool.

**Candidates:**
- Subscription Audit
- C3 Implementation Guide flowchart

### Bucket 3: Member-Only (login required, Premium or VIP)
Tools that require ongoing use, saving state, or are part of the higher-value tier.

**Candidates:**
- No-Spend Day Tracker (needs date persistence)
- Paycheck & Budget Buddy (needs pay cycle memory)
- Full GPT suite links

---

## What This Means for the Build

Right now without auth, The Lab page is basically a **card grid** that shows all the tools, and the free ones are live links, the rest show a "Members get access" prompt with a join CTA. The gating logic doesn't need to be built yet. The page just needs to exist with the right architecture so auth can slot in later.

This also means the card grid needs a tier label on each card: free / free with email / premium / VIP. Not a badge necessarily, but something that sets expectations before someone clicks.

## Open Decision
Where do the tool pages live? Three options:

1. As routes in the main site repo (`/lab/pattern-quiz`, `/lab/subscription-audit`) — cleaner, single repo, member auth can be applied at the route level
2. As separate Vercel deployments that the Lab page links to (current setup, `nospend-apps`) — more isolated but harder to gate
3. Hybrid: free tools stay as external apps, member tools move into main repo behind auth

Option 1 is the cleanest long-term if you're adding auth. Option 2 is fine for now if you want to defer that decision.
