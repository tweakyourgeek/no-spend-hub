# Changelog

All notable changes to the No Spend Challenge Apps will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.0-beta.1] - 2026-03-15

### Added
- **Beta Release Preparation**
  - Wire MailerLite email subscription to coming-soon page forms (both top and bottom)
  - Create `.env.example` documenting required environment variables
  - Create `CLAUDE.md` project instructions for Claude Code
  - Add comprehensive test suite for challenge-data module (18 tests)
    - Constants validation (prompts, encouragements, patterns, categories)
    - Challenge lifecycle (start, get, save entries)
    - Financial calculations (streaks, no-spend days, freed-up money, pattern tracking)

### Changed
- **Version bump** from 0.0.0 to 1.0.0-beta.1
- **Updated documentation** — Changelog, Roadmap, and Deployment docs brought current

---

## [0.9.0] - 2026-03-14

### Added
- **Repo Audit** — Comprehensive REPO-AUDIT.md documenting all 23 deployable units
- **Removed Lovable scaffold** — Tagger plugin, meta tags, boilerplate README cleaned out

## [0.8.0] - 2026-03-11 – 2026-03-13

### Added
- **Content & Strategy**
  - Complete No-Spend Guide compiled from all conversation sources
  - Skool community strategy discrepancy report and confirmed decisions
  - Developmental edit: cut bloat, fix tone, restructure for engagement
  - Project archive: 206+ items indexed across 46 conversations with artifact extraction

### Changed
- **Coming-soon page** — New title, March 20 launch date, tier pricing, top email form added
- **Stale strategy docs** updated with confirmed Skool decisions

## [0.7.0] - 2026-03-08 – 2026-03-10

### Added
- **Coming-soon landing page** — Countdown timer, Skool CTA, feature cards, animated design
- **7-day tracker component** added to Home view
- **Vercel serverless function** (`api/subscribe.js`) for MailerLite email signup

### Fixed
- Fix `/api/subscribe` 404 by restructuring serverless function placement
- Remove misplaced `subscribe.cjs` from wrong directory

## [0.6.0] - 2026-03-01 – 2026-03-07

### Added
- **Migration**: 22 standalone apps migrated from `nospend-apps` repo into `src/features/`
- **Migration**: `nospend` repo content migrated into `docs/`
- **Archived repos** documented in `ARCHIVED_REPOS.md`

### Changed
- Vercel rewrite: `/` now serves `coming-soon/index.html`

## [0.5.0] - 2026-02-01 – 2026-02-28

### Added
- **Main React app** — MVP scaffold with landing page + app dashboard
- **Design system** — Brand colors, fonts, shadcn/ui components, Tailwind CSS
- **Challenge data layer** — localStorage-based persistence (`challenge-data.ts`)
- **Nav updates** — How It Works, The Lab, Join Free, Login links
- **Email opt-in section** on landing page

### Fixed
- WCAG AA contrast failures across all color combinations
- Mobile responsiveness: hamburger menu, 16px min fonts, 44px touch targets
- Pricing tiers, feature lists, founding member note, font mapping
- Dark mode updated to near-black

---

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
