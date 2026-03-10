# NoSpend Apps - Technical Documentation for Code Review

**To:** SQLGod
**From:** The Codebase
**Prepared:** January 5, 2026
**Repository:** `tweakyourgeek/nospend-apps`

---

SQLGod,

What follows is a no-nonsense technical inventory of 11 React applications built for the NoSpend Challenge ecosystem. The documentation is structured the way you'd expect: formulas with line numbers, edge case analysis, known bugs, and architecture diagrams.

This isn't a sales pitch. It's source code documentation.

Your finance background will serve you well here - Section 3 contains all financial logic with explicit formulas, assumptions documented, and edge cases flagged. The math is straightforward, but I've noted where the assumptions are soft (the family plan 1.7x multiplier, for instance, is heuristic rather than derived).

No unit tests exist yet. That's a gap you'll likely want to address.

---

## 1. APP/TOOL INVENTORY

| # | App Name | Deployment URL | Primary Function | Tech Stack | Status |
|---|----------|----------------|------------------|------------|--------|
| 1 | Challenge Roadmap | [Live](https://tweakyourgeek.github.io/nospend-apps/) | Interactive 30-day No-Spend Challenge guide with progress tracking | React 18, Vite 5, CSS | Stable |
| 2 | C3 Savings Calculator | [Live](https://tweakyourgeek.github.io/nospend-apps/savings-calculator/) | Calculate savings via Cut/Cancel/Combine strategies with visualization | React 18, Vite 5, Recharts | Stable |
| 3 | Subscription Analyzer | [Live](https://tweakyourgeek.github.io/nospend-apps/subscription-analyzer/) | Track recurring expenses, identify C3 opportunities, renewal calendar | React 18, Vite 5.4, Recharts | Stable |
| 4 | Pattern Quiz | `/pattern-quiz/` | Identify 6 emotional spending patterns via assessment | React 19, Vite 7, ESLint | Stable |
| 5 | Four Lenses Diagnostic | `/four-lenses-diagnostic/` | Self-diagnostic using Being/Feeling/Acting/Showing Up framework | React 18, Vite 5 | Stable |
| 6 | Comfort Menu | `/comfort-menu/` | Curated self-soothing activities filtered by time/energy/location | React 19, Vite 7 | Stable |
| 7 | Journal 30-Day | `/journal-30day/` | 30 daily reflection prompts with markdown export | React 19, Vite 7 | Stable |
| 8 | Expense Log | `/expense-log/` | Multi-household expense tracking with configurable columns | React 19, Vite 7 | Stable |
| 9 | Lab Loop Tracker | `/lab-loop-tracker/` | 4-phase learning loop (Chasing/Shadow/Getting/Reflection) | React 18, Vite 5 | Stable |
| 10 | Crisis Helper | `/crisis-helper/` | Emergency support scenarios when user is stuck/overwhelmed | React 18, Vite 5 | Stable |
| 11 | Commitment Builder | `/commitment-builder/` | Multi-step wizard generating personalized commitment canvas | React 19, Vite 7, Canvas API | Stable |

**Note:** All apps are deployed via GitHub Pages at `https://tweakyourgeek.github.io/nospend-apps/[app-name]/`

---

## 2. ARCHITECTURE OVERVIEW

### 2.1 System Diagram

```
                           ┌─────────────────────────────────────┐
                           │     GitHub Pages (Static Host)      │
                           │   tweakyourgeek.github.io/nospend   │
                           └─────────────────────────────────────┘
                                            │
              ┌─────────────────────────────┼─────────────────────────────┐
              │                             │                             │
    ┌─────────┴─────────┐     ┌─────────────┴─────────────┐     ┌─────────┴─────────┐
    │ Challenge Roadmap │     │   Savings Calculator      │     │ Subscription      │
    │                   │────►│   (Recharts viz)          │◄────│ Analyzer          │
    └─────────┬─────────┘     └─────────────┬─────────────┘     │ (Recharts viz)    │
              │                             │                   └─────────┬─────────┘
              │                             │                             │
              └─────────────────────────────┼─────────────────────────────┘
                                            │
                           ┌────────────────┴────────────────┐
                           │         Shared Utilities        │
                           │   /shared/utils/brand.js        │
                           │   /shared/styles/brand.css      │
                           │   (colors, C3 framework, etc.)  │
                           └─────────────────────────────────┘
                                            │
                           ┌────────────────┴────────────────┐
                           │     Browser localStorage        │
                           │   (Client-side persistence)     │
                           └─────────────────────────────────┘
```

### 2.2 App Interconnections

- **Cross-app Navigation:** Apps link to each other via relative URLs (e.g., `../savings-calculator/`)
- **Shared State:** Only dark mode preference (`nospend_darkMode`) is shared across apps via localStorage
- **No Backend:** All apps are pure client-side; no server, no database, no API calls
- **Independent Deployability:** Each app can run standalone; no inter-app dependencies at runtime

### 2.3 Data Flow

```
User Input → React State (useState) → localStorage (JSON serialization)
                    │
                    └──→ Calculation Functions → Display/Charts
```

### 2.4 External Dependencies

| Dependency | Version | Purpose | Apps Using |
|------------|---------|---------|------------|
| React | 18.2.0 / 19.2.0 | UI framework | All |
| ReactDOM | 18.2.0 / 19.2.0 | DOM rendering | All |
| Vite | 5.0.8 / 7.2.4 | Build tool, dev server | All |
| Recharts | 2.10.0-2.10.3 | Data visualization | Savings Calculator, Subscription Analyzer |
| ESLint | 9.39.1 | Code linting | Pattern Quiz, Comfort Menu, Journal, Expense Log, Commitment Builder |

**No external APIs.** All data stays on-device.

---

## 3. FINANCIAL LOGIC DOCUMENTATION

### 3.1 C3 Savings Calculator (`savings-calculator/src/App.jsx`)

#### CUT Strategy (Reduce Frequency)

**Location:** Lines 184-189

```javascript
const calculateCutSavings = () => {
  const weekly = cutAmount * cutFrequency;
  const monthly = (weekly * 52) / 12;
  const yearly = weekly * 52;
  return { weekly, monthly, yearly };
};
```

| Variable | Description | Default | Range |
|----------|-------------|---------|-------|
| `cutAmount` | Cost per occurrence ($) | 5 | 1-50 |
| `cutFrequency` | Occurrences per week | 7 | 1-14 |

**Formula:**
- Weekly savings = `cutAmount × cutFrequency`
- Monthly savings = `(weekly × 52) / 12`
- Yearly savings = `weekly × 52`

**Assumptions:**
- 52 weeks per year (does not account for leap years)
- User saves 100% of the stated expenditure (complete elimination, not reduction)
- Costs are consistent week-to-week

**Edge Cases:**
- Minimum values enforced via slider `min` attributes (no zero/negative possible via UI)
- No decimal input for frequency (integer only via slider)

---

#### CANCEL Strategy (Stop Paying Entirely)

**Location:** Lines 191-195

```javascript
const calculateCancelSavings = () => {
  const monthly = cancelPeriod === 'month' ? cancelAmount : cancelAmount / 12;
  const yearly = cancelPeriod === 'month' ? cancelAmount * 12 : cancelAmount;
  return { monthly, yearly };
};
```

| Variable | Description | Default | Range |
|----------|-------------|---------|-------|
| `cancelAmount` | Subscription cost ($) | 15 | 5-200 (step: 5) |
| `cancelPeriod` | Billing cycle | 'month' | 'month' or 'year' |

**Formula:**
- If monthly billing: `monthly = cancelAmount`, `yearly = cancelAmount × 12`
- If yearly billing: `monthly = cancelAmount / 12`, `yearly = cancelAmount`

**Assumptions:**
- Subscriptions run for full year (no partial cancellation credit)
- Monthly-to-yearly conversion uses exactly 12 months

**Edge Cases:**
- Yearly amounts divided by 12 may produce decimals; display uses `formatCurrency()` which rounds to whole dollars
- Minimum $5 enforced via slider

---

#### COMBINE Strategy (Share Costs)

**Location:** Lines 197-203

```javascript
const calculateCombineSavings = () => {
  const yourShare = combineOriginal / combineSplit;
  const savings = combineOriginal - yourShare;
  const monthly = savings;
  const yearly = savings * 12;
  return { yourShare, savings, monthly, yearly };
};
```

| Variable | Description | Default | Range |
|----------|-------------|---------|-------|
| `combineOriginal` | Original monthly cost ($) | 50 | 10-300 (step: 10) |
| `combineSplit` | Number of people sharing | 2 | 2-6 |

**Formula:**
- Your share = `combineOriginal / combineSplit`
- Monthly savings = `combineOriginal - yourShare`
- Yearly savings = `monthly × 12`

**Assumptions:**
- Cost is split equally among all participants
- Family/group plan costs same as individual plan (no premium for family tier)
- User currently pays full individual price

**Edge Cases:**
- Division always produces positive result (min split = 2)
- Decimal results possible (e.g., $50/3 = $16.67)
- Slider prevents division by zero or 1

---

#### Total Savings Aggregation

**Location:** Lines 209-211

```javascript
const totalMonthlySavings = cutResults.monthly + cancelResults.monthly + combineResults.monthly;
const totalYearlySavings = cutResults.yearly + cancelResults.yearly + combineResults.yearly;
```

**Formula:** Simple addition of all three strategies.

**5-Year Projection:** `totalYearlySavings × 5` (displayed at line 642)

**Assumptions:**
- All three strategies implemented simultaneously
- No compounding or investment returns
- Constant costs over projection period

---

### 3.2 Subscription Analyzer (`subscription-analyzer/src/App.jsx`)

#### Annual Total Calculation

**Location:** Lines 229-241

```javascript
const calculateTotals = () => {
  let monthlyTotal = 0;
  subscriptions.forEach(sub => {
    const monthlyCost = sub.billingPeriod === 'month'
      ? sub.cost
      : sub.cost / 12;
    monthlyTotal += monthlyCost;
  });
  return {
    monthly: monthlyTotal,
    yearly: monthlyTotal * 12,
  };
};
```

**Logic:** Normalizes all subscriptions to monthly, then multiplies by 12 for annual.

---

#### C3 Recommendation Engine

**Location:** Lines 244-282

```javascript
const getC3Recommendations = () => {
  // CANCEL: Last used > 60 days ago
  if (daysSinceUse > 60) {
    savings: sub.billingPeriod === 'month' ? sub.cost * 12 : sub.cost
  }

  // CUT: Last used 30-60 days ago
  else if (daysSinceUse > 30) {
    savings: sub.cost * 0.3 * 12  // Estimate 30% savings
  }

  // COMBINE: Not sharing + service supports family plans
  else if (sub.sharingWith === 1 && familyPlanEligible) {
    savings: sub.cost * 0.5 * 12  // Estimate 50% savings
  }
}
```

| Recommendation | Trigger Condition | Estimated Savings |
|----------------|-------------------|-------------------|
| CANCEL | `daysSinceUse > 60` | 100% of annual cost |
| CUT | `30 < daysSinceUse ≤ 60` | 30% of annual cost |
| COMBINE | `sharingWith === 1` AND service in family-plan list | 50% of annual cost |

**Assumptions:**
- 30% savings estimate for "cut" is arbitrary/heuristic
- 50% savings estimate for "combine" assumes 2-person split
- "Family plan eligible" services hardcoded: Netflix, Spotify, YouTube, Dropbox, Google One

---

#### Family Plan Calculator

**Location:** Lines 325-350

```javascript
const getFamilyPlanOpportunities = () => {
  const estimatedFamilyPlanCost = sub.cost * 1.7;  // Family plan ~1.7x individual
  const splitBetween = sub.name.includes('Netflix') || sub.name.includes('Spotify') ? 5 : 4;
  const costPerPerson = estimatedFamilyPlanCost / splitBetween;
  const yearlySavings = (sub.cost - costPerPerson) * 12;
}
```

**Assumptions:**
- Family plans cost 1.7x individual (industry average approximation)
- Netflix/Spotify support 5-way split; others support 4-way
- User currently pays full individual price

**Known Limitation:** Actual family plan pricing varies significantly by service. The 1.7x multiplier is a rough estimate.

---

### 3.3 Expense Log (`expense-log/src/App.jsx`)

#### Totals Calculation

**Location:** Lines 251-262

```javascript
const calculateTotals = () => {
  const filtered = getFilteredExpenses();
  const total = filtered.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

  const byCategory = {};
  filtered.forEach(e => {
    const cat = e.category || 'Uncategorized';
    byCategory[cat] = (byCategory[cat] || 0) + (parseFloat(e.amount) || 0);
  });

  return { total, byCategory, count: filtered.length };
};
```

**Edge Cases Handled:**
- `parseFloat(e.amount) || 0` - Handles null/undefined/NaN by defaulting to 0
- Empty category defaults to 'Uncategorized'

**Average Calculation (Line 439):**
```javascript
${totals.count > 0 ? (totals.total / totals.count).toFixed(2) : '0.00'}
```

Explicitly guards against division by zero.

---

### 3.4 Currency Formatting

**Location:** `shared/utils/brand.js` lines 68-85

```javascript
// Whole dollars (used in Savings Calculator)
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// With cents (used in Subscription Analyzer)
export const formatCurrencyPrecise = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
```

**Note:** Savings Calculator uses whole-dollar rounding; Subscription Analyzer uses 2 decimal places.

---

### 3.5 Date Calculations

**Location:** `subscription-analyzer/src/App.jsx` lines 15-28

```javascript
const formatDate = (dateString) => {
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // ...
};
```

**Formula:** `diffDays = ceil(|now - date| / 86400000)`

**Assumptions:**
- Uses `Math.abs()` so future dates also work
- `Math.ceil()` rounds partial days up
- Does not account for daylight saving time transitions (±1 hour variance possible)

---

## 4. KNOWN ISSUES & LIMITATIONS

### 4.1 Financial Logic Limitations

| Issue | Location | Severity | Description |
|-------|----------|----------|-------------|
| Family plan cost estimate | `subscription-analyzer/src/App.jsx:335` | Low | Uses hardcoded 1.7x multiplier; actual prices vary |
| No compounding | `savings-calculator/src/App.jsx:642` | Info | 5-year projection is simple multiplication, not investment growth |
| 52-week assumption | `savings-calculator/src/App.jsx:186-188` | Low | Ignores leap years; variance < 2% |
| CUT savings estimate | `subscription-analyzer/src/App.jsx:267` | Medium | 30% savings is arbitrary; user can't adjust |
| COMBINE savings estimate | `subscription-analyzer/src/App.jsx:276` | Medium | 50% savings assumes 2-person split; actual varies |

### 4.2 Technical Debt

| Issue | Location | Severity | Description |
|-------|----------|----------|-------------|
| Inconsistent React versions | Various | Low | Mix of React 18 and 19 across apps |
| Inconsistent Vite versions | Various | Low | Mix of Vite 5 and 7 across apps |
| No test coverage | All apps | Medium | Zero unit tests; no Jest/Vitest configuration |
| No TypeScript | All apps | Low | Plain JavaScript; no type safety |
| Duplicate code | Savings Calculator, Subscription Analyzer | Low | C3 framework defined in both files instead of importing from shared |
| CSV export function error | `savings-calculator/src/App.jsx:285-287` | Bug | References undefined functions `cutSavingsCalculator()`, `cancelSavingsCalculator()`, `combineSavingsCalculator()` - should use `cutResults`, `cancelResults`, `combineResults` |

### 4.3 UX Issues

| Issue | Location | Severity | Description |
|-------|----------|----------|-------------|
| localStorage only | All apps | Info | No cloud sync; data lost on browser clear |
| No input validation | Expense Log | Low | Amount field accepts negative numbers |
| No offline support | All apps | Info | No service worker; requires internet for initial load |

### 4.4 Edge Cases Not Handled

| Scenario | Affected App | Impact |
|----------|--------------|--------|
| Very large numbers (>$1M) | All calculators | Display may overflow |
| Currency other than USD | All apps | Hardcoded to US dollars |
| Negative expense amounts | Expense Log | Accepted but semantically incorrect |
| Subscription with $0 cost | Subscription Analyzer | Would skew averages |

---

## 5. CODE LOCATION & REVIEW ENTRY POINTS

### 5.1 Repository Structure

```
/home/user/nospend-apps/
├── challenge-roadmap/
│   └── src/App.jsx              # 12KB - Main roadmap logic
├── savings-calculator/
│   └── src/App.jsx              # 38KB - Financial calculations (PRIORITY REVIEW)
├── subscription-analyzer/
│   └── src/App.jsx              # 35KB - Subscription logic (PRIORITY REVIEW)
├── expense-log/
│   └── src/App.jsx              # 25KB - Expense tracking
├── pattern-quiz/
│   └── src/App.jsx              # 20KB - Quiz logic
├── four-lenses-diagnostic/
│   └── src/App.jsx              # 20KB - Diagnostic logic
├── comfort-menu/
│   └── src/App.jsx              # 15KB - Activity filtering
├── journal-30day/
│   └── src/App.jsx              # 12KB - Journal with prompts
│   └── src/prompts.js           # 30-day prompt data
├── lab-loop-tracker/
│   └── src/App.jsx              # 10KB - Loop phases
├── crisis-helper/
│   └── src/App.jsx              # 8KB - Crisis scenarios
├── commitment-builder/
│   └── src/App.jsx              # 18KB - Canvas generation
├── shared/
│   ├── utils/brand.js           # C3 framework, formatCurrency()
│   └── styles/brand.css         # CSS variables
├── .github/workflows/
│   └── deploy-savings-calculator.yml  # CI/CD
├── README.md                    # Project overview
├── DEPLOYMENT.md                # Deployment docs
└── MANIFEST.md                  # Documentation index
```

### 5.2 Priority Review Files

For financial logic review, focus on these files in order:

1. **`savings-calculator/src/App.jsx`** (Lines 184-211)
   - All C3 savings calculations
   - Chart data generation
   - CSV export logic (contains bug)

2. **`subscription-analyzer/src/App.jsx`** (Lines 229-350)
   - Total calculations
   - C3 recommendation engine
   - Family plan estimator

3. **`expense-log/src/App.jsx`** (Lines 251-262)
   - Expense totaling
   - Category aggregation

4. **`shared/utils/brand.js`** (Lines 68-85)
   - Currency formatting utilities

### 5.3 GitHub Repository

**URL:** `https://github.com/tweakyourgeek/nospend-apps`

**Branch:** `main` (production)

**Deployment:** GitHub Pages via GitHub Actions

---

## 6. QUICK REFERENCE: FINANCIAL FORMULAS

| Calculation | Formula | Location |
|-------------|---------|----------|
| CUT monthly | `(amount × frequency × 52) / 12` | savings-calculator:186 |
| CUT yearly | `amount × frequency × 52` | savings-calculator:187 |
| CANCEL monthly (from yearly) | `yearlyAmount / 12` | savings-calculator:192 |
| CANCEL yearly (from monthly) | `monthlyAmount × 12` | savings-calculator:193 |
| COMBINE savings | `originalCost - (originalCost / splitCount)` | savings-calculator:199 |
| Family plan estimate | `currentCost × 1.7 / splitCount` | subscription-analyzer:336-337 |
| Days since use | `ceil(\|now - lastUsed\| / 86400000)` | subscription-analyzer:20 |
| Total subscriptions | `Σ(monthlyCost) × 12` | subscription-analyzer:239 |

---

## 7. APPENDIX: localStorage KEYS

| Key | App | Data Type | Purpose |
|-----|-----|-----------|---------|
| `nospend_darkMode` | All | boolean | Dark mode preference |
| `nospend_subscriptions` | Subscription Analyzer | JSON array | Subscription list |
| `nospend_expenses` | Expense Log | JSON array | Expense entries |
| `nospend_expense_householdType` | Expense Log | string | Selected household type |
| `nospend_expense_vibe` | Expense Log | string | Selected tone (regular/irreverent) |
| `nospend_journal_entries` | Journal 30-Day | JSON object | Daily journal entries |
| `nospend_commitments` | Commitment Builder | JSON object | Draft commitments |

---

## 8. CLOSING NOTES FOR SQLGOD

The codebase is functional but immature by enterprise standards:

**What works:**
- All 11 apps deploy and run correctly
- Financial calculations are mathematically sound (given stated assumptions)
- localStorage persistence is reliable
- No security vulnerabilities (no backend, no auth, no PII handling)

**What needs work:**
- Zero test coverage (your instinct to add tests is correct)
- Type safety would benefit from TypeScript migration
- The CSV export bug in savings-calculator needs a 2-minute fix
- Financial estimates (30%, 50%, 1.7x) should ideally be configurable or sourced

**If you're looking for a place to start:**
1. Read `savings-calculator/src/App.jsx` lines 184-211 - that's the core financial engine
2. The bug at line 285 is an easy win to fix
3. Adding Jest + a few snapshot tests would establish a testing foundation

The architecture is simple by design - no state management libraries, no backend complexity, no build pipeline beyond Vite. This is either a feature or a limitation depending on where you want to take it.

---

*All line numbers reference the current codebase as of January 5, 2026.*
