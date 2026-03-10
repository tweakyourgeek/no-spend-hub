# Changelog

All notable changes to the No Spend Challenge Apps will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.2.0] - 2024-12-31

### Added

#### Challenge Roadmap
- **No-Spend Day Tracker** - Interactive calendar component
  - Click days to toggle between unmarked → no-spend (green) → spent (red)
  - Real-time statistics: Current Streak, Total No-Spend Days, Best Streak
  - Month navigation to view/edit past months
  - Milestone celebrations at 3, 7, 14, and 30-day streaks
  - Animated alerts with confetti for achievements
  - Future dates disabled (no cheating!)
  - Today highlighted with special border
  - Legend showing color codes
  - localStorage persistence
  - Full dark mode support

- **Contextual Skool Community Prompts** - Stage-specific engagement
  - Before You Start: "Introduce yourself and share what brought you to the challenge"
  - Week 1: "What surprised you most? What spending urges did you notice?"
  - Weeks 2-3: "Share patterns you're discovering. What alternatives are working?"
  - Week 4: "Challenge Complete! What did you learn?"
  - Sage-colored highlighting for visibility
  - Gradient backgrounds with dark mode support

- **Related Tools Callouts** - In-context navigation
  - Before You Start section: Links to Calculator and Analyzer
  - Week 1 section: Contextual tool recommendations

#### Savings Calculator
- **C3 Decision Matrix Quiz** - Interactive decision helper
  - 3-question flow: Usage frequency, Enjoyment level, Sharing potential
  - Smart recommendation logic routes to Cut, Cancel, or Combine
  - Progress bar showing quiz completion
  - Animated result reveal with bounce effect
  - Auto-scrolls to recommended calculator section
  - "Start over" functionality
  - Fully styled with gradient buttons and hover effects
  - Complete dark mode support

- **CSV Export** - Download functionality
  - Exports all three C3 scenarios with savings calculations
  - Includes monthly and yearly projections
  - Formatted filename: `c3-savings-YYYY-MM-DD.csv`
  - Clean CSV structure for Excel/Google Sheets
  - Gradient button matching design system

- **Related Tools Section** - Cross-app navigation
  - Links to Challenge Roadmap and Subscription Analyzer
  - Gradient card design with hover lift effects
  - Contextual descriptions of each tool

#### Subscription Analyzer
- **Annual Total Projection** - Hero callout
  - Large, prominent display of yearly subscription spending
  - Shows monthly breakdown
  - Shimmer animation on background
  - Gradient purple-to-navy design
  - Dark mode support

- **Renewal Calendar** - 90-day view
  - Shows upcoming subscription renewals
  - Color-coded urgency: Red (≤7 days), Purple (≤30 days), Neutral (31-90 days)
  - Pulsing animation for urgent items
  - Added `nextBillingDate` field to subscription data model
  - Sortable by renewal date
  - Dark mode support

- **Family Plan Calculator** - Sharing opportunities
  - Auto-detects sharable subscriptions (Netflix, Spotify, Disney+, etc.)
  - Calculates family plan costs and split scenarios
  - Shows yearly savings potential
  - Card-based grid layout
  - Sorted by highest savings first
  - Dark mode support

- **Related Tools Section** - Cross-app navigation
  - Links to Challenge Roadmap and C3 Savings Calculator
  - Matching design with Calculator

### Changed
- **Cross-App Integration** - All apps now link to each other contextually
- **Consistent UX** - Shared gradient patterns and hover effects across apps
- **Dark Mode Consistency** - Unified dark mode palette and behavior

### Technical
- All localStorage keys use consistent `nospend_` prefix
- Improved dark mode handling across all apps
- Added streak calculation algorithms
- Enhanced calendar rendering logic
- Quiz state management with React hooks
- CSV blob generation and download

## [1.1.0] - 2024-12-30

### Added
- **Subscription Analyzer** - Complete application launch
  - Category-based subscription organization
  - Visual analytics with Recharts
  - Smart C3 recommendations
  - Usage tracking
  - localStorage persistence

- **Dark Mode** - System preference detection for both React apps
  - CSS custom properties for theming
  - Smooth transitions
  - Persists user preference

### Changed
- **Challenge Roadmap** - Deployed to GitHub Pages as main site

## [1.0.0] - 2024-12-29

### Added
- **C3 Savings Calculator** - Initial release
  - Three dedicated calculators: Cut, Cancel, Combine
  - Quick presets for common scenarios
  - Visual charts with Recharts
  - Total savings summary
  - Dark mode support
  - Deployed to GitHub Pages

- **Project Infrastructure**
  - Monorepo structure
  - React 18 + Vite 5 setup
  - Brand design system
  - Documentation files

### Brand Identity Established
- Color palette: Navy-purple (#3B3B58), Mauve (#B375A0), Sage (#7A9B7A)
- Typography: Avenir/Inter, Open Sans, Caveat
- Tone: "This isn't deprivation, it's empowerment"

---

## Future Roadmap

### Potential Enhancements
- **Comfort Menu Builder** - Free/cheap alternatives database
- **Pattern Quiz** - Spending pattern identification tool
- **Expense Log** - Daily spending tracker
- **Freed-Up Money Planner** - Visualize what you'll do with savings

### Cross-App Features
- Shared localStorage layer for personalization
- Household type selector
- Smart recommendations engine
- Data export/import between apps

---

## Notes

- All apps work offline (static files + localStorage)
- No backend required
- Privacy-first (all data stays on device)
- Mobile-responsive design
- Accessibility features (ARIA labels, keyboard navigation)
