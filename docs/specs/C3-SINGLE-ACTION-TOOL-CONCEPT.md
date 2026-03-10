# C3 Single-Action Tool
## Product Concept Document

*One action. One win. That's it.*

---

## The Problem

The full Savings Calculator is powerful but overwhelming for beginners. It shows ALL the options—Cut, Cancel, Combine—plus presets, charts, exports.

For someone who just finished tracking their spending for 7 days and saw where their money goes... they don't need a dashboard. They need ONE thing to do.

---

## The Solution

**A focused entry point that asks one question:**

> "Pick ONE: Are you going to Cut, Cancel, or Combine?"

Then it takes them through ONLY that process. No distractions. No "you should also..." Just one action, start to finish.

---

## User Flow

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   You tracked your spending. You saw the data. │
│   Now pick ONE thing to change.                │
│                                                 │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│   │   CUT   │  │ CANCEL  │  │ COMBINE │       │
│   │         │  │         │  │         │       │
│   │ Reduce  │  │ Remove  │  │  Merge  │       │
│   │ a cost  │  │ entirely│  │ services│       │
│   └─────────┘  └─────────┘  └─────────┘       │
│                                                 │
└─────────────────────────────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │  User selects ONE path  │
        └─────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   ┌─────────┐  ┌─────────┐  ┌─────────┐
   │ CUT     │  │ CANCEL  │  │ COMBINE │
   │ Process │  │ Process │  │ Process │
   └─────────┘  └─────────┘  └─────────┘
```

---

## The Three Paths

### Path 1: CUT
**"Reduce something you're keeping"**

Best for:
- Downgrading a subscription tier
- Reducing frequency (weekly → monthly)
- Finding a cheaper alternative
- Setting spending limits on categories

**The Process:**
1. What are you cutting back on?
2. Current cost: $____/month
3. What's your target? (suggestions based on common options)
4. New cost: $____/month
5. **You'll save: $____ /month ($____/year)**
6. Action step: What do you need to do to make this happen?
7. When will you do it? (Calendar prompt)

**Example scenarios:**
- Premium Spotify → Free tier
- Unlimited data → 5GB plan
- Weekly takeout → Twice a month
- Premium gym → Basic membership

---

### Path 2: CANCEL
**"Remove something entirely"**

Best for:
- Subscriptions you forgot about
- Services you don't use
- Duplicate tools/apps
- "I'll use it someday" things

**The Process:**
1. What are you canceling?
2. Current cost: $____/month
3. When did you last use it? (Reality check)
4. What will you miss? (Usually: nothing)
5. **You'll save: $____ /month ($____/year)**
6. Action step: Cancel link/instructions
7. Did you do it? (Confirmation + celebration)

**The "Cancel Script" (for phone calls):**
> "Hi, I'd like to cancel my subscription. No, I don't want to pause. No, I don't want a discount. I just want to cancel. Thank you."

**Common cancel targets:**
- Streaming services (especially #3, #4, #5...)
- Unused apps with subscriptions
- Gym memberships you don't use
- Magazine/news subscriptions
- Software you replaced with something else

---

### Path 3: COMBINE
**"Merge services to reduce total cost"**

Best for:
- Multiple streaming services
- Family plans you're not using
- Bundled services (internet + phone)
- Shared subscriptions with friends/family

**The Process:**
1. What services could you combine?
2. Current total cost: $____/month
3. Combined option: ____________
4. New cost: $____/month
5. **You'll save: $____ /month ($____/year)**
6. Who do you need to coordinate with?
7. Action steps to make the switch

**Common combine opportunities:**
- Individual streaming → Family plan split
- Separate phone plans → Family plan
- Multiple cloud storage → One service
- Gym + apps → Bundled fitness membership
- Internet + cable + phone bundles

---

## After They Complete ONE Action

```
┌─────────────────────────────────────────────────┐
│                                                 │
│           🎉 You did it!                        │
│                                                 │
│   You [cut/canceled/combined] your [thing]     │
│   Monthly savings: $XX                         │
│   Annual savings: $XXX                         │
│                                                 │
│   ─────────────────────────────────────────    │
│                                                 │
│   What's next?                                 │
│                                                 │
│   [ Do another C3 action ]                     │
│   [ Share your win with the community ]        │
│   [ Try the 30-Day Challenge ]                 │
│   [ I'm good for now ]                         │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Design Principles

### 1. One Thing Only
Don't show all three paths at once after selection. Once they pick CUT, they only see CUT. No sidebar showing "you could also cancel..."

### 2. Immediate Gratification
Show the savings calculation AS they fill in the numbers. Watch the annual number grow in real-time.

### 3. Action-Oriented
Every path ends with "What's the ONE action you need to take?" and "When will you do it?"

### 4. Celebration
When they confirm they did the thing, celebrate. Make it feel like a win. Because it is.

### 5. Low Pressure Exit
"I'm good for now" is always an option. No guilt. They did ONE thing. That's more than most people.

---

## How It Connects to the Ecosystem

```
Pattern Quiz ──→ 7-Day Tracker ──→ C3 Single Action ──→ Full Challenge
     │                │                    │                  │
     ▼                ▼                    ▼                  ▼
  "I'm a           "I spend            "I canceled         "Now I'm
   stress           $180 on             Netflix #2"         ready for
   spender"         takeout"                                the work"
```

**The funnel:**
1. **Pattern Quiz** = Why you spend
2. **7-Day Tracker** = Where you spend
3. **C3 Single Action** = ONE change (you are here)
4. **Full Savings Calculator** = Multiple changes
5. **30-Day Challenge** = Behavior transformation

---

## Technical Notes

### Could be built as:
- Standalone React app (like other tools in repo)
- Section within existing Savings Calculator
- Interactive guide (HTML/CSS only)

### Key features needed:
- Path selection (3 buttons)
- Dynamic form based on path
- Real-time savings calculation
- Calendar/reminder integration (optional)
- Completion celebration
- Progress saving (localStorage)

### Suggested file structure:
```
c3-single-action/
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── PathSelector.jsx
│   │   ├── CutPath.jsx
│   │   ├── CancelPath.jsx
│   │   ├── CombinePath.jsx
│   │   ├── SavingsDisplay.jsx
│   │   └── Celebration.jsx
│   └── utils/
│       └── calculations.js
├── public/
└── package.json
```

---

## Content Tone Options

**Encouraging:**
> "You don't have to change everything. Just pick one thing. That's how real change happens—one decision at a time."

**Irreverent:**
> "Look, you're not going to become a financial genius overnight. But you CAN cancel that streaming service you haven't opened since 2022. Baby steps."

---

## Success Metrics

- Completion rate (how many people finish their chosen path)
- Action confirmation rate (did they actually do the thing)
- Return rate (do they come back for another C3 action)
- Funnel progression (do they move to full calculator or 30-day challenge)

---

## Open Questions

1. **Should this be free or paid?**
   - Argument for free: It's a funnel step, gets people hooked
   - Argument for paid: It delivers real value (actual savings)
   - Hybrid: Free for one action, paid for unlimited?

2. **Should it integrate with 7-Day Tracker?**
   - Could auto-suggest targets based on tracked spending
   - "You spent $47 on subscriptions. Want to cancel one?"

3. **Mobile-first or desktop?**
   - People often cancel things from their phones
   - Should work great on mobile for "do it now" energy

---

## Next Steps

1. Decide: Standalone app or feature within Savings Calculator?
2. Choose tone (or build both like the tracker?)
3. Design the three path flows in detail
4. Build MVP with one path first (suggest: CANCEL - easiest win)
5. Test with community members
6. Add remaining paths

---

*This tool is the bridge between "I see the problem" and "I did something about it."*
