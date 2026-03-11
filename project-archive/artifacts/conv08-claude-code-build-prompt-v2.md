# Claude Code Build Prompt V2 (with Brand Specifics)

<!-- Source: Conversation 8 - Four-week money challenge structure -->
<!-- URL: https://claude.ai/chat/6bd3205f-400a-421f-93f8-d9012ea76e98 -->
<!-- Status: CURRENT - Complete prompt with brand colors, fonts, and full content -->
<!-- File: 2026-03-11-Four-week-money-challenge-structure.md -->

---

## Complete Prompt for Claude Code

(Copy and paste this entire thing into Claude Code)

---

I need you to build a single-page HTML roadmap for my 30-Day Business No Spend Challenge. This will be the primary wayfinding tool for people using the challenge workbooks.

### Brand & Style

**Colors:**
- Primary brand color: #3B3B58 (dark navy-purple)
- Accent color: #B375A0 (mauve/dusty rose)
- Secondary accent: #A59880 (muted purple)
- Background: #F8F1F2 (warm off-white/cream)
- Optional accent for "stuck" section: sage green (suggest a hex that works with this palette)

**Fonts:**
- Heading font: "Avenir" (fallback to system sans-serif if unavailable)
- Body font: "Open Sans" (fallback to system sans-serif if unavailable)
- Optional accent font for special elements: "Caveat" (script/handwritten feel)

**Logo:**
Use the uploaded Tweak Your Geek logo in the header.

**Vibe:**
Professional but warm. Grounded, not cutesy. Clean and scannable. Think: "smart friend who's done this before" not "corporate training module" or "Instagram aesthetic." Should feel organized and capable without being sterile. Feminine without being fluffy. Natural textures and warm tones.

### Technical Requirements

- Single HTML file (CSS and JS embedded)
- Mobile-responsive
- Collapsible sections for each week (click to expand/collapse)
- Smooth scroll navigation
- Sticky "You can't do this wrong" banner at top
- "Where am I?" button navigation that scrolls to sections
- Clean, semantic HTML with comments
- Works offline (Google Fonts are okay to import)

### Content Structure

#### Header
Include the Tweak Your Geek logo (uploaded file) at the top.

#### Hero Section
**Heading:** Your 30-Day Business No Spend Roadmap
**Subheading:** This is your map through the Workbook, Journal, and Spreadsheet Pack. You can't do it wrong.

#### Persistent Banner (sticky at top, below logo)
"You can't do this wrong. Spending during the challenge doesn't mean failure—it means data."

#### Three Pillar Boxes

**Workbook**
- What it's for: Structure, tracking, before/after
- Link: # (placeholder - I'll add later)

**Journal**
- What it's for: Daily noticing, feelings, patterns
- Link: # (placeholder - I'll add later)

**Spreadsheet Pack**
- What it's for: Optional. For people who like numbers.
- Link: # (placeholder - I'll add later)

#### "Where Am I?" Navigator

Make this a set of buttons that scroll to the appropriate section:

- I haven't started yet -> Before You Start
- I'm in Week 1 (Days 1-7) -> Week 1
- I'm in Week 2-3 (Days 8-21) -> Weeks 2-3
- I'm in Week 4 or done (Days 22-30+) -> Week 4 & Beyond
- I'm stuck/overwhelmed -> Stuck? Start Here

#### Step 1: Before You Start - Prep & Setup

**If you're brand new, do this first:**

**Workbook** (skim these sections):
- Section 1: Take inventory of where you are
- Section 2: Set your 30-day direction
- Section 3: Decide what your "rules" are

**Journal** (try these):
- Before You Begin prompt
- Money Feelings Mind Map
- Your first word cloud + Word of the Week

**Remember:** This is a light pass. You're orienting yourself, not completing homework. If a section doesn't make sense yet, skip it and come back later.

#### Step 2: Week 1 - Noticing & Naming (Days 1-7)

**You're in Week 1 if:** You're in your first 7 days of the challenge.

**What you're doing:** Paying attention to what happens when you *try* not to spend. Noticing urges, surprises, and what's harder than you expected.

**Journal:**
- Use Week 1 daily pages (or just a few that land)
- Complete Week 1 Wrap-Up

**Workbook:**
- Do your first Weekly Check-in
- Keep the numbers approximate if tracking feels terrible

**If you spend money:** That's fine. Notice what happened before, during, and after. That's the data.

#### Step 3: Weeks 2-3 - Urges & Patterns (Days 8-21)

**You're in Weeks 2-3 if:** You've finished Week 1 and you're noticing patterns.

**What you're doing:** Getting curious about *why* the urges show up and what they're actually about.

**Journal** (pick what's useful):
- Week 2: Urges & Alternatives daily pages + wrap-up
- Week 3: Patterns & Pressure Points daily pages + wrap-up

**Workbook:**
- Weekly Check-ins (2 total)
- Optional: Use the Spreadsheet Pack if you like numbers

**This is the heavy section.** If it feels like too much, you can:
- Do Week 2 OR Week 3, not both
- Sample a few pages from each week instead of all of them
- Just keep a running list of "things I noticed" on your phone

#### Step 4: Week 4 & Beyond - Integration & Next Steps (Days 22-30+)

**You're here if:** You're near the end or already finished the 30 days.

**What you're doing:** Deciding what you learned and what you want to keep.

**Journal:**
- Week 4 daily pages (focus on Integration & Self-Respect)
- End-of-Challenge Reflection

**Workbook:**
- Section 5: Debrief (what happened? what surprised you?)
- Section 6: If you used the spreadsheets, look at your before/after
- Write down 1-3 "gentle experiments" you want to try next

**You don't need to have answers yet.** Some people finish the 30 days and don't know what they learned for another month. That's normal.

#### "Stuck? Start Here" Section

Make this visually distinct (use the sage green accent or a tinted background).

**If you're overwhelmed:**
- Pick literally one page from wherever you are and do that. That still counts.
- Or skip ahead to the Week 4 reflection and work backward from "what do I want to keep?"

**If you spent money and feel bad:**
- That's not failure. That's data. Write down what happened and what you felt before/during/after. That's the work.

**If the structure feels like too much:**
- Ignore the roadmap. Just track your spending urges on scratch paper for a week. The fancy pages aren't the point.

**If you're not sure which tool to use:**
- Workbook = structure, tracking, before/after
- Journal = daily noticing, feelings, patterns
- Spreadsheet Pack = optional if you like numbers
- Pick one and ignore the others if that's easier.

#### Footer

**Questions?**
Link: # (placeholder - I'll add later)

**Last updated:** December 2024

### Design Notes

- Use icons if it makes things clearer or suggest simple custom icons that match the brand
- Each "Step" section should be collapsible (collapsed by default, click to expand)
- "Where Am I?" buttons should be visually prominent and use the brand colors
- "Stuck? Start Here" section should stand out (suggestion: use sage green tinted background)
- Make it easy to scan — use visual hierarchy, white space, clear headings
- The sticky banner should be impossible to miss but not annoying
- The overall aesthetic should feel warm, organized, and professional — like the moodboard
- Use subtle texture or warmth in the design (nothing harsh or clinical)

### Technical Details

- Make sections collapsible with smooth animations
- Smooth scroll when clicking navigator buttons
- Highlight the current section when scrolling (subtle indicator)
- Add a "back to top" button if the page gets long
- Make sure it looks good on mobile (most people will view on phone)
- The logo should scale appropriately on different screen sizes

---

Build this as a single HTML file. Include clear comments in the code so I can find sections easily if I need to update content later. The logo file is uploaded and available for you to reference. Let me know if you need any clarification on the content or design.
