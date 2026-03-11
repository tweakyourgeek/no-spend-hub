# Design Specifications Reference
# Source: Conversation 18 - Native Google Sheets integration
# URL: https://claude.ai/chat/f43d7cf2-256a-42e7-a2d2-76fd5f7129a0
# Status: CURRENT
#
# NOTE: Full design spec artifacts were created as downloadable files in the original
# conversation but were not renderable in the markdown export. Below is the specification
# extracted from visible conversation text.

## Design Specifications: Business No-Spend Spreadsheet Pack v2

### Color Palette
- **Deep purple** - Headers, branding
- **Mauve** - Secondary accent
- **Sage green** - Positive indicators, savings highlights, CHANGE column
- **Cream** - Background warmth
- **Light gray** - Input cells (user fills these in)
- **Darker gray** - Formula/auto-calculated cells (locked)
- **Light red** - Cancelled subscriptions, "Yes" spend days
- **Light yellow** - Unused purchases
- **Light green** - "No" spend days, money saved items

### Visual Indicators
- Pencil emoji = Input cell (user fills in)
- Lock emoji = Formula cell (auto-calculated)
- Piggy bank emoji = Savings/gamification elements

### Cell Formatting Rules
- **Light gray cells** = User fills these in
- **Darker gray cells** = Auto-calculated formulas (protected)
- Conditional formatting applied throughout for visual feedback

### Gamification Design
- Piggy bank as central metaphor
- Streak counters with fire emoji
- Success rate percentage displays
- Victory/celebration messages on milestones
- "Your piggy has saved $X this month!" messaging

### Dashboard Layout (Core Pack v2)
- Charts properly spaced (not stacked/overlapping)
- Clickable navigation links to all tabs
- Metrics cards with color-coded savings in sage green
- Auto-calculated Before/After comparison
- Top 3 Categories table
- Freed-Up Money by Purpose breakdown

### Dropdown Options

**Category:**
- Software - Design
- Marketing
- Website
- Insurance
- Banking & Fees
- Legal & Accounting
- Contractors
- Education

**Status:**
- Keep
- Pause
- Cancel

**Billing Cycle:**
- Monthly
- Annual
- Quarterly
- Semi-Annual

**Freed-Up Money Purpose:**
- Runway
- Taxes
- Debt
- Team
- Profit
- Reinvest
- Emergency Fund

### Sheet Protection
- Dashboard has light protection to prevent accidental formula deletion
- No password required to unlock
- Instructions: Review -> Unprotect Sheet

### Weekly Overview
- Expanded to 5 weeks (not just 4) because some months are long

### File Structure (v2 Enhanced)
1. Business_No_Spend_Core_Pack_v2.xlsx (9 tabs)
2. Business_No_Spend_Day_Tracker_v2.xlsx (3 tabs + Apps Script)
3. Business_No_Spend_Cash_Buffer_Runway_v2.xlsx (single tab)
4. Business_No_Spend_Maybe_Later_List_v2.xlsx (single tab)

### Core Pack v2 Tabs (9 total)
1. README
2. Dashboard
3. Subscriptions & Autopays
4. One-Time Purchases
5. Category Summary
6. Monthly Overview
7. Weekly Overview
8. Before/After Comparison (auto-calculated)
9. Freed-Up Money Plan
