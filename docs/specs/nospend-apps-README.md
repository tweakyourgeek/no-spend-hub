# No Spend Challenge Apps

A suite of financial wellness applications for the No Spend Challenge ecosystem by Tweak Your Geek.

**Project Started:** December 29, 2024
**Last Updated:** December 31, 2024
**Current Status:** All 3 Core Apps Complete + 8 Major Enhancements Shipped ✅

## 🎯 Core Philosophy: The C3 Framework

All apps are built around the **C3 Framework** - three ways to take control of spending without deprivation:

- **✂️ CUT** - Reduce frequency (e.g., coffee 3x/week instead of daily)
- **❌ CANCEL** - Stop paying entirely (unused subscriptions)
- **🔗 COMBINE** - Share costs with others (family plans, carpools)

This framework prevents "all-or-nothing" thinking and gives users choices that work for them.

## 🚀 Live Apps

### 1. Challenge Roadmap ✅
**Interactive 30-day guide** | [View Live](https://tweakyourgeek.github.io/nospend-apps/)

Your step-by-step companion through the No Spend Challenge:
- **Progress tracking** with section completion and day counter
- **No-Spend Day Tracker** 🆕 - Visual calendar to mark no-spend vs spending days with streak tracking
- **Milestone celebrations** at 3, 7, 14, and 30-day streaks
- **Contextual Skool community prompts** 🆕 - Encouragement to share progress at each stage
- **Week-by-week guidance** from prep through integration
- **"Stuck?" resources** with practical alternatives
- **Cross-app navigation** 🆕 - Links to Calculator and Analyzer at key moments
- Dark mode with system preference detection

### 2. C3 Savings Calculator ✅
**Calculate potential savings** | [View Live](https://tweakyourgeek.github.io/nospend-apps/savings-calculator/)

Interactive tool organized around the C3 Framework:
- **Three dedicated calculators**: ✂️ CUT, ❌ CANCEL, 🔗 COMBINE
- **Quick presets** for common scenarios (coffee, subscriptions, family plans)
- **C3 Decision Matrix Quiz** 🆕 - 3-question flow recommends the best strategy for you
- **Visual charts** comparing all three strategies side-by-side
- **CSV export** 🆕 - Download calculations to track or share
- **Total savings projection** with monthly and yearly breakdowns
- **Cross-app navigation** 🆕 - Links to Roadmap and Subscription Analyzer
- "You can't do this wrong" messaging throughout
- Full dark mode support

### 3. Subscription Analyzer ✅
**Track & optimize recurring expenses** | [View Live](https://tweakyourgeek.github.io/nospend-apps/subscription-analyzer/)

Deep-dive C3 tool specifically for subscriptions:
- **Annual Total Projection** 🆕 - Big callout showing yearly subscription spending
- **Renewal Calendar** 🆕 - See next 90 days of renewals with urgency color-coding
- **Family Plan Calculator** 🆕 - Identifies sharing opportunities and calculates split costs
- **Smart C3 recommendations** for each subscription
- **Category-based organization** (streaming, productivity, fitness, etc.)
- **Visual analytics** with pie charts and spending breakdowns
- **Usage tracking** - Mark when you last used each service
- **Cross-app navigation** 🆕 - Links to Calculator and Roadmap
- Full dark mode support
- localStorage persistence

## 🎨 Brand Identity

- **Primary Color**: #3B3B58 (navy-purple)
- **Accent Color**: #B375A0 (mauve/dusty rose)
- **Secondary**: #A59880 (muted tan)
- **Background**: #F8F1F2 (warm cream)
- **Sage**: #7A9B7A (for encouraging messages)
- **Fonts**: Avenir/Inter (headings), Open Sans (body), Caveat (handwritten accents)
- **Tone**: Warm, non-judgmental, anti-shame ("This isn't deprivation, it's empowerment")

## ✨ Recent Enhancements (Dec 31, 2024)

### Subscription Analyzer
- ✅ **Annual Total Hero** - Prominent display of yearly subscription spending
- ✅ **Renewal Calendar** - 90-day view with color-coded urgency (7 days = red, 30 days = purple)
- ✅ **Family Plan Opportunities** - Auto-detects sharable subscriptions (Netflix, Spotify, etc.) and calculates savings

### Savings Calculator
- ✅ **C3 Decision Matrix Quiz** - Interactive 3-question flow recommends Cut, Cancel, or Combine
- ✅ **CSV Export** - Download all calculations with monthly/yearly savings

### Challenge Roadmap
- ✅ **No-Spend Day Tracker** - Interactive calendar with streak tracking and milestone celebrations
- ✅ **Contextual Skool Prompts** - Stage-specific community engagement at each milestone

### Cross-App Integration
- ✅ **Related Tools Navigation** - Each app links to the others at contextually relevant moments
- ✅ **Consistent UX** - Shared design patterns and dark mode across all apps

## 📁 Project Structure

```
/challenge-roadmap        - Interactive 30-day guide (GitHub Pages site)
/savings-calculator       - C3 framework calculator (React app)
/subscription-analyzer    - Subscription management tool (React app)
/docs                     - Product manuals and roadmaps
```

## 🛠️ Development

Each app is designed to work standalone while sharing common design patterns.

### Running Locally

**Challenge Roadmap:**
```bash
# Static site - open directly or use a local server
open challenge-roadmap/index.html
# Or: python3 -m http.server 3100 --directory challenge-roadmap
```

**Savings Calculator:**
```bash
cd savings-calculator
npm install
npm run dev  # Runs on http://localhost:3100
npm run build  # Build for production
```

**Subscription Analyzer:**
```bash
cd subscription-analyzer
npm install
npm run dev  # Runs on http://localhost:3101
npm run build  # Build for production
```

### Technology Stack

- **React 18** with functional components (useState, useEffect hooks)
- **Vite 5** for fast builds and hot module replacement
- **Recharts** for data visualization
- **CSS Custom Properties** for theming and dark mode
- **localStorage API** for client-side persistence
- **GitHub Pages** for deployment

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - GitHub Pages deployment guide
- [ROADMAP.md](./ROADMAP.md) - Development roadmap and status
- [GAP_ANALYSIS_AND_RECOMMENDATIONS.md](./GAP_ANALYSIS_AND_RECOMMENDATIONS.md) - Comprehensive feature analysis
- [No_Spend_Integration_Roadmap.md](./No_Spend_Integration_Roadmap.md) - Product integration strategy
- [HANDOFF.md](./HANDOFF.md) - Project overview and guidelines
- [MANIFEST.md](./MANIFEST.md) - Documentation index

## 🎯 Principles

- **C3 Framework First**: Every app centers on Cut, Cancel, or Combine
- **Mobile-first responsive design** - Works beautifully on all devices
- **Non-judgmental tone**: Spending = data, not failure
- **Simple, accessible interfaces** - Clear navigation and instructions
- **Empowerment, not deprivation**: "You can't do this wrong"
- **User choice**: Pick what works for YOU
- **Privacy-first**: All data stays on your device (localStorage only)
- **Dark mode support**: Respects system preferences

## 🔄 Version History

### v1.2.0 - December 31, 2024
- 🆕 No-Spend Day Tracker with streak tracking
- 🆕 C3 Decision Matrix Quiz
- 🆕 Annual subscription totals & renewal calendar
- 🆕 Family plan calculator
- 🆕 CSV export functionality
- 🆕 Cross-app navigation & integration
- 🆕 Contextual Skool community prompts

### v1.1.0 - December 30, 2024
- ✅ Subscription Analyzer complete
- ✅ Dark mode for both React apps
- ✅ Challenge Roadmap deployed

### v1.0.0 - December 29, 2024
- ✅ C3 Savings Calculator launched
- ✅ Initial deployment to GitHub Pages

## 📝 License

Copyright © 2024 Tweak Your Geek. All rights reserved.
