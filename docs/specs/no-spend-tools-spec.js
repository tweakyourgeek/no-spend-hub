# No Spend Collective — Complete Build Specification
## For Claude Code Deployment to nospend-apps Repo

**Document Purpose:** Everything needed to build and deploy 9 interactive tools to Vercel. This is the single source of truth.

**Target Repo:** nospend-apps (already connected to Vercel)
**Launch Date:** January 15, 2026
**Build Priority:** Get it done, polish later

---

# PART 1: DESIGN SYSTEM (EXHALE)

## Brand Colors

```javascript
const colors = {
  // Primary - Purple (brand color, CTAs, active states)
  primary: '#B375A0',
  primaryDark: '#493751',
  
  // Success - Sage Green (completion, winner states, positive feedback)
  success: '#A6C9BB',
  successDark: '#7BA396',
  
  // Warning/Close Call - Peachy Orange (near-miss, attention needed)
  warning: '#E8B4A0',
  warningDark: '#D49880',
  
  // Neutrals
  background: '#FDFCFB',        // Warm off-white
  backgroundDark: '#1a1a1a',    // Dark mode background
  surface: '#FFFFFF',           // Cards, containers
  surfaceDark: '#2d2d2d',       // Dark mode cards
  text: '#2D2D2D',              // Primary text
  textDark: '#E8E8E8',          // Dark mode text
  textMuted: '#6B6B6B',         // Secondary text
  textMutedDark: '#A0A0A0',     // Dark mode secondary
  border: '#E8E4E1',            // Borders, dividers
  borderDark: '#404040',        // Dark mode borders
};
```

## Typography

```css
/* Load Inter from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

**Font Weights:**
- Regular (400): Body text
- Medium (500): Labels, secondary headers
- Semibold (600): Buttons, emphasis
- Bold (700): Headers, important numbers

## Spacing & Radius

```javascript
// Spacing scale
spacing: {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
}

// Border radius
radius: {
  sm: '6px',      // Small elements, pills
  md: '8px',      // Buttons, inputs
  lg: '12px',     // Cards, containers
  xl: '16px',     // Large cards, modals
  full: '9999px', // Circles, fully rounded
}
```

## Shadows

```javascript
shadows: {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 2px 4px rgba(0,0,0,0.1)',
  lg: '0 4px 12px rgba(0,0,0,0.15)',
}
```

## Dark Mode

All tools MUST support dark mode toggle. Use localStorage to remember preference.

```javascript
// Dark mode detection
const [darkMode, setDarkMode] = useState(() => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('darkMode') === 'true';
  }
  return false;
});

// Persist preference
useEffect(() => {
  localStorage.setItem('darkMode', darkMode);
}, [darkMode]);
```

## Component Patterns

**Buttons (Primary):**
```javascript
{
  padding: '12px 24px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: colors.primary,
  color: '#FFFFFF',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 200ms ease-out',
}
// Hover: backgroundColor: colors.primaryDark
// Disabled: opacity: 0.5, cursor: 'not-allowed'
```

**Cards:**
```javascript
{
  backgroundColor: darkMode ? colors.surfaceDark : colors.surface,
  borderRadius: '12px',
  padding: '24px',
  boxShadow: shadows.md,
  border: `1px solid ${darkMode ? colors.borderDark : colors.border}`,
}
```

**Inputs:**
```javascript
{
  padding: '12px 16px',
  borderRadius: '8px',
  border: `1px solid ${darkMode ? colors.borderDark : colors.border}`,
  backgroundColor: darkMode ? colors.surfaceDark : colors.surface,
  color: darkMode ? colors.textDark : colors.text,
  fontSize: '14px',
  width: '100%',
  transition: 'border-color 200ms ease-out',
}
// Focus: borderColor: colors.primary, outline: 'none'
```

---

# PART 2: CORE PHILOSOPHY (NON-NEGOTIABLE)

## The AAL Clarity Definition

**Clarity = A decision the user can act on without reopening the debate.**

The decision doesn't require revisiting:
- What matters most (priorities)
- How much they can handle (capacity)
- Who they are or should be (identity)

**Clarity is about closure, not confidence.**

## Clarity Stopping Rule

Once a decision is clear:
- Stop introducing new angles
- Stop reopening values or priorities
- Stop exploring alternatives
- Stop asking questions

**More thinking after clarity is noise.**

## Non-Negotiable Principles

1. **No shame, no guilt language. Ever.** Not even subtle implications.
2. **No financial, legal, or tax advice.** These are awareness tools, not professional advice.
3. **Use-what-you-have bias** - Always default to existing resources first
4. **Capacity-aware** - Offer options scaled to energy, time, money, emotional bandwidth
5. **Progress over perfection** - Small, realistic steps matter more than ideal outcomes
6. **You can't do this wrong** - Spending during challenge = data, not failure

## The C3 Framework

When helping with spending decisions, use C3 language:

- **CUT** - Reduce frequency (keep it, but less often)
- **CANCEL** - Stop entirely or downgrade to lower tier
- **COMBINE** - Consolidate services, share costs, find cheaper alternative

## Voice Guidelines

**DO:**
- Conversational and direct
- Grounded, practical, calm
- Clear without being clinical
- Support without cheerleading
- Humor is allowed (the user specifically wants this)

**DON'T:**
- Binary framing ("It's not X, it's Y")
- Em dashes (use commas or periods instead)
- Toxic positivity ("You've got this!" "Amazing!")
- Therapy language ("How does that make you feel?")
- Hustle language ("Crush your goals!")
- Guru tone
- Forced enthusiasm

---

# PART 3: THE 9 TOOLS TO BUILD

## Tool Success Criteria

Every tool must:
✅ Be fully functional in ONE interaction
✅ Have clear input → output flow
✅ Work without conversation history
✅ Support dark mode
✅ Use the Exhale design system
✅ Follow voice guidelines (no shame, practical, grounded)

---

## TOOL 1: Decision Matrix

**Moment of Need:** "I'm stuck between options and keep going in circles without deciding."

**What It Does:**
- User inputs 2-5 options they're deciding between
- User inputs 3-6 criteria that matter for the decision
- Optional: weight criteria by importance (1-10 scale)
- User scores each option against each criteria
- Tool calculates weighted scores and shows clear winner
- Includes closure language: "This decision is clear. More thinking is noise."

**UI Flow:**
1. Step 1: Enter your options (text inputs, 2-5 options)
2. Step 2: What matters? (criteria inputs, 3-6 criteria, optional weight sliders)
3. Step 3: Score each option (matrix grid with dropdowns or number inputs)
4. Results: Visual ranking with winner highlighted in sage green

**Design Notes:**
- Progress indicator at top (3 steps)
- Winner gets sage green highlight
- Close second gets peachy orange "close call" indicator
- "Start New Decision" button to reset
- Don't overthink it, functional > fancy

---

## TOOL 2: Marketing Decoder

**Moment of Need:** "I see marketing copy that's making me want to buy something. I need to decode what tactics they're using so I can make a clear decision."

**What It Does:**
- User pastes marketing copy (email, ad, sales page text)
- Tool analyzes and highlights persuasion tactics being used
- Outputs breakdown with explanations of each tactic
- Helps user see the manipulation clearly

**Tactics to Detect:**
- Urgency/Scarcity ("Only 3 left!", "Ends tonight!")
- Social proof ("10,000 happy customers")
- Authority ("As featured in...")
- Fear of missing out (FOMO)
- Anchoring (showing high price first, then discount)
- Future pacing ("Imagine yourself...")
- Pain point agitation
- False exclusivity ("Not for everyone")
- Bandwagon effect
- Risk reversal ("Money-back guarantee")
- Reciprocity triggers ("Free gift with purchase")

**UI Flow:**
1. Large text area: "Paste the marketing copy here"
2. "Decode This" button
3. Results panel showing:
   - Original text with highlighted sections
   - List of tactics found with explanations
   - Summary: "X tactics detected. This copy is designed to [create urgency/trigger FOMO/etc.]"
4. Optional: "Does this change your mind?" Yes/No/Still thinking buttons (for user closure)

**Design Notes:**
- Each tactic gets a color-coded badge
- Explanations should be educational but brief
- Tone: matter-of-fact, not preachy
- The act of pasting and analyzing IS the intervention

---

## TOOL 3: Talk Me Out (Impulse Brake)

**Moment of Need:** "I'm about to buy something impulsively. I need friction RIGHT NOW."

**What It Does:**
- User enters what they want to buy and price
- Tool asks rapid-fire questions to create pause
- Questions are designed to surface the real motivation
- Ends with clear "buy it" or "wait" recommendation

**Question Flow:**
1. What do you want to buy? (text input)
2. How much? (number input)
3. Have you wanted this for more than 48 hours? (yes/no)
4. Do you already own something that does this? (yes/no/not sure)
5. What need is this actually meeting? (dropdown: boredom, stress relief, reward, practical need, social pressure, FOMO, other)
6. If you don't buy this, what happens? (text input, short)
7. On a scale of 1-10, how much will you care about this purchase in 30 days? (slider)

**Output:**
- Based on answers, shows one of:
  - 🟢 "This seems like a considered purchase. If you have the budget, go for it."
  - 🟡 "This might be emotional spending. Wait 48 hours and see if you still want it."
  - 🔴 "This has impulse buy written all over it. Close the tab."
- Shows which of their answers triggered the recommendation
- "Log to Almost Bought It list" button (optional feature)

**Design Notes:**
- Should feel FAST, not like a form
- One question at a time, not all at once
- Progress bar so they know it's quick
- Tone: direct, not judgmental

---

## TOOL 4: Subscription Audit

**Moment of Need:** "I have no idea what I'm actually subscribed to or if I'm wasting money on stuff I don't use."

**What It Does:**
- User enters subscriptions (name, cost, how often used)
- Tool categorizes and totals
- Gives C3 recommendations for each subscription

**Input Fields Per Subscription:**
- Name (text)
- Monthly cost (number, auto-calculate annual if they enter weekly/annual)
- Category (dropdown: streaming, software, food/delivery, fitness, news/media, shopping/memberships, other)
- Last used (dropdown: today, this week, this month, can't remember, never)
- Could you live without it? (yes, probably, no)

**Output:**
- Total monthly spend
- Total annual spend
- Color-coded list:
  - 🟢 KEEP: Used regularly, clear value
  - 🟡 CUT: Downgrade to lower tier or reduce usage
  - 🔴 CANCEL: Not using, cancel immediately
  - 🔵 COMBINE: Could share with family/friends or consolidate
- "Potential savings" calculation
- Exportable list (copy to clipboard)

**Design Notes:**
- Start with 3 empty subscription rows, "Add another" button
- Auto-total as they enter
- Make the "potential savings" number prominent (sage green, big font)
- This is the "quick wins" tool, should feel satisfying

---

## TOOL 5: Trigger Decoder Quiz

**Moment of Need:** "I know I have spending patterns but I don't know which ones are mine."

**What It Does:**
- Short quiz (10-15 questions) to identify primary Chasing Pattern
- Results show which pattern(s) are dominant
- Brief explanation of what drives that pattern
- Practical suggestions for that specific pattern

**The 6 Chasing Patterns:**

1. **Chasing Rainbows** - Buying the next fix/solution
   - "This course/tool/resource will finally make it work"
   - Collecting things with potential
   - C3 Strategy: CANCEL (stop collecting, use what you have)

2. **Chasing Unicorns** - Comparison and ideal-self spending
   - Research spirals, trying to find the "perfect" option
   - Spending to become who you think you should be
   - C3 Strategy: CUT (reduce comparison shopping, choose "enough")

3. **Chasing Ambrosia** - Emotional escape/soothing
   - Buying to change how you feel
   - Numbing or regulating through spending
   - C3 Strategy: CUT (reduce frequency, build non-spending comfort menu)

4. **Chasing Stardust** - Identity and legitimacy spending
   - Buying to look more professional/organized/legitimate
   - Aesthetic over function
   - C3 Strategy: CANCEL or COMBINE (use what you have, stop "upgrading")

5. **Chasing Sunshine** - Mood-seeking treats
   - "I deserve this" spending
   - Small frequent purchases that add up
   - C3 Strategy: CUT (limit treats to 1-2x per week)

6. **Chasing Moonbeams** - Fantasy and someday purchases
   - Buying for an imagined future life
   - Vague longing, "when I..." thinking
   - C3 Strategy: CANCEL (keep a "someday" list but don't buy)

**Quiz Questions (sample):**
- When I'm stressed, I'm most likely to: [multiple choice]
- My browser history probably shows: [multiple choice]
- The purchases I regret most are usually: [multiple choice]
- I tell myself "this is different because...": [multiple choice]
- After buying something, I usually feel: [multiple choice]

**Output:**
- Primary pattern (1-2 dominant)
- Brief description
- "Your C3 strategy" recommendation
- "What to watch for" list

**Design Notes:**
- One question per screen
- Progress bar
- Results should feel insightful, not attacking
- Option to retake or share results

---

## TOOL 6: No-Spend Meal Planner

**Moment of Need:** "I want to eat what I already have instead of ordering food or buying groceries I don't need."

**What It Does:**
- User enters what's in their fridge/pantry
- Tool generates meal ideas using only those ingredients
- Focus on simple, realistic meals (not gourmet)

**Input Options:**
- Checkbox grid of common ingredients (proteins, veggies, grains, dairy, pantry staples)
- OR free-text "What do you have?" field
- Meal type filter (breakfast, lunch, dinner, snack)
- Time available (5 min, 15 min, 30 min, no limit)
- Effort level (zero effort, some effort, actual cooking)

**Output:**
- 3-5 meal ideas that use ONLY the ingredients they have
- Simple instructions (3-5 steps max)
- "Missing one thing?" section showing what would expand options
- "I'd rather just order food" acknowledgment with gentle redirect

**Design Notes:**
- This should feel helpful, not preachy about cooking
- Acknowledge that sometimes you're going to order food anyway
- Keep recipes SIMPLE, this isn't a cooking site
- Visual ingredient icons if possible

---

## TOOL 7: Use-What-You-Have Activity Generator

**Moment of Need:** "I'm bored/restless/stressed and I want to DO something but I don't want to spend money."

**What It Does:**
- User inputs: current mood, energy level, time available
- Tool generates activity suggestions that don't cost money
- Activities use existing resources or are completely free

**Input:**
- How are you feeling? (bored, stressed, restless, lonely, overwhelmed, need reward, avoiding something)
- Energy level (1-5 or: depleted, low, medium, high)
- Time available (5 min, 15 min, 30 min, 1 hour, unlimited)
- Indoor/outdoor preference
- Solo or with others

**Activity Database Categories:**
- Physical movement (walks, stretches, dance, etc.)
- Creative (art with stuff you have, writing, etc.)
- Organizing/cleaning (satisfying completion tasks)
- Learning (free videos, articles, etc.)
- Social (texting, calling, video chat)
- Rest (actual rest, not disguised productivity)
- Play (games, puzzles, fun with no purpose)

**Output:**
- 5 activity suggestions tailored to inputs
- "Try this one" featured suggestion
- "Not for me" button to regenerate
- "I did it!" tracking option

**Design Notes:**
- Should feel like a fun spin-wheel, not a lecture
- Include unexpected/playful suggestions
- Acknowledge when they need rest, not another activity
- Don't be precious about it

---

## TOOL 8: Digital Declutter

**Moment of Need:** "I have too much digital stuff (subscriptions, apps, files, tabs) and I need help deciding what to cut."

**What It Does:**
- Guided walkthrough of digital clutter categories
- User marks items for keep/delete/decide later
- Creates actionable declutter list

**Categories to Audit:**
1. Subscriptions & memberships (link to Subscription Audit tool)
2. Apps on phone (used daily, weekly, monthly, never)
3. Browser tabs currently open
4. Email subscriptions/newsletters
5. Social media follows that drain you
6. Files/folders you're "saving for later"
7. Courses/resources you bought but never used

**For Each Category:**
- Quick inventory prompt
- Keep / Delete / Decide Later options
- Time estimate to actually complete the declutter

**Output:**
- Declutter action list organized by category
- Estimated time to complete
- "Start with this one" recommendation (quickest wins first)
- Progress tracking (if they come back)

**Design Notes:**
- Break into manageable chunks
- Don't try to do everything at once
- Celebrate completed sections
- This is a crossover tool from the broader ecosystem

---

## TOOL 9: Post-Decision Rumination Interrupter

**Moment of Need:** "I already made a decision (bought something or didn't buy something) and now I can't stop second-guessing myself."

**What It Does:**
- User describes the decision they're ruminating about
- Tool helps them recognize rumination vs. legitimate reconsideration
- Provides closure techniques

**Input:**
- What decision are you stuck on? (text)
- Did you buy it or not buy it? (bought / didn't buy / other decision)
- How long ago? (today, yesterday, this week, longer)
- What's the rumination loop? (I should have / What if / I'm so stupid for / Other)
- Can you change the decision? (yes easily, yes but hassle, no)

**Decision Tree:**
- If changeable + legitimate concern → "Here's how to revisit it cleanly"
- If changeable + just anxiety → "You're ruminating. Here's why the original decision was fine."
- If unchangeable → "This is done. Here's how to release it."

**Output:**
- Clear statement: "This is rumination, not useful reconsideration" OR "This might be worth revisiting"
- If rumination: grounding statement, permission to move on, reminder that no purchase is that serious
- If worth revisiting: specific next step only
- Closure ritual: "Say out loud: 'I made the best decision I could with what I knew. It's done.'"

**Design Notes:**
- This one handles post-purchase AND post-non-purchase anxiety
- Tone is warm but firm
- The goal is CLOSURE
- Build last, test if actually needed

---

# PART 4: BUILD ORDER

**Priority Sequence:**

1. **Decision Matrix** - Most versatile, use case is broad
2. **Marketing Decoder** - High user demand, immediate practical value
3. **Talk Me Out / Impulse Brake** - Emergency tool, high friction value
4. **Subscription Audit** - Quick wins, satisfying results
5. **Trigger Decoder Pattern Quiz** - Identification/awareness tool
6. **Meal Planner** - Practical daily use
7. **Activity Generator** - Practical daily use
8. **Digital Declutter** - Lower priority but useful
9. **Post-Decision Rumination** - Build last, evaluate if needed

---

# PART 5: TECHNICAL REQUIREMENTS

## Stack
- React (functional components, hooks)
- Tailwind CSS or inline styles matching design system
- No external API dependencies (all logic runs client-side)
- Dark mode support via state + localStorage

## Deployment
- Deploy to existing nospend-apps Vercel project
- Each tool gets its own route (/decision-matrix, /marketing-decoder, etc.)
- OR each tool is standalone app (your call on architecture)

## Mobile Responsiveness
- All tools must work on mobile
- Touch-friendly inputs
- Readable text sizes (min 14px body, 16px inputs)

## Accessibility Basics
- Proper contrast ratios
- Focusable interactive elements
- Label your inputs

---

# PART 6: QUALITY CHECKLIST

Before marking any tool complete, verify:

- [ ] Works on mobile
- [ ] Dark mode toggle works
- [ ] No shame/guilt language anywhere
- [ ] Voice is conversational, not clinical
- [ ] Creates closure, not more questions
- [ ] Can be used in ONE interaction
- [ ] Colors match design system
- [ ] Inter font is loading
- [ ] Buttons have hover states
- [ ] Inputs have focus states

---

# FINAL NOTES

**For Claude Code:**

This document contains everything you need. Don't ask clarifying questions unless something is genuinely ambiguous. Build, deploy, move to the next one.

User wants these done in under an hour. Make them functional first, pretty second. Ship it.

The user (Lexi) has a sense of humor and hates corporate tone. Keep the voice human.

**Go.**
