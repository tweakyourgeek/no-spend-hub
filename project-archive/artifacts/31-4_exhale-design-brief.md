# Exhale Design Brief — Claude Artifact Applications
# Source: Conversation 31 (No Spend Collective artifact build specifications)
# URL: https://claude.ai/chat/ca0a8eea-049f-4d40-86b5-13a4f6227cea
# Status: CURRENT
# Notes: Full design system pasted by user as second message. Wellness-First Productivity Aesthetic.

---

## Visual Identity

### Color System
- Primary: #B375A0 (Soft Purple) — Brand color for CTAs, highlights, active states
- Primary Dark: #493751 (Deep Purple) — Grounding accents, text
- Success: #A6C9BB (Sage Green) — Completion, positive actions, balance
- Warning: #E8B4A0 (Peachy Orange) — Alerts, caution (warm, not aggressive)
- Neutrals: Gray scale from #F9FAFB to #111827 with full dark mode support

### Typography
- Font: Inter (Google Fonts, weights 300-700)
- Scale: Page titles (36px/bold) -> Section headers (20-24px/bold) -> Body (14-16px) -> Labels (12-14px/medium)
- Hierarchy: Dark text primary, 60% opacity secondary, 50% muted
- Mood: Calm, contemplative, sophisticated. Designed for focus and intentional work, not frantic productivity.

## Component Patterns

### Buttons
- Primary: px-4 py-2 | bg-primary text-white | rounded-lg | hover:bg-primary-dark transition-colors
- Secondary: px-4 py-2 | bg-gray-100 dark:bg-gray-700 | rounded-lg
- Ghost: text-primary | hover:bg-primary/10 | transition-colors

### Cards
- Standard: bg-white dark:bg-gray-800 | rounded-xl | border border-gray-200 dark:border-gray-700 | p-5 | hover:shadow-md transition-all
- Featured: rounded-2xl | p-6 | bg-gradient-to-br from-primary-light/10 via-white to-info/10

### Modals
- Overlay: fixed inset-0 z-50 | bg-black/50 | flex items-center justify-center
- Container: bg-white dark:bg-gray-800 | rounded-xl shadow-xl | max-w-2xl
- Footer: p-6 | bg-gray-50 dark:bg-gray-800 | border-t | flex justify-end gap-3

### Status Badges
- bg-{color}/20 text-{color} | px-3 py-1 | rounded-full | text-sm font-medium
- Examples: bg-success/20 text-success, bg-warning/20 text-warning

### Inputs
- w-full px-3 py-2 | border border-gray-300 dark:border-gray-600 | rounded-lg
- focus:ring-2 focus:ring-primary focus:border-primary | transition-colors

## Layout & Spacing

### Structure
```
Container (h-screen bg-gray-100 dark:bg-gray-900 p-3)
  Outer wrapper (rounded-lg shadow-xl bg-gray-50 dark:bg-gray-800)
    Sidebar (w-64 fixed, scrollable)
    Main content (flex-1, max-w-6xl centered)
```

### Spacing Scale (Tailwind 4px units)
- Gaps: gap-4 (16px), gap-6 (24px), gap-8 (32px)
- Padding: p-4, p-6, p-8
- Vertical: space-y-4, space-y-6, space-y-8

### Border Radius
- rounded-lg (8px) — Buttons, inputs
- rounded-xl (12px) — Cards, modals
- rounded-2xl (16px) — Featured elements
- rounded-full — Badges, avatars, pills

### Shadows
- shadow-md — Standard cards
- shadow-lg — Popovers, dropdowns
- shadow-xl — Modals, important elements
- Hover states: elevate one level

## Design Principles
- **Generous Whitespace** — Let content breathe. Avoid cramming.
- **Calm Over Energetic** — Warm, muted colors. No bright alerts or aggressive CTAs.
- **Consistency** — Same patterns everywhere. Buttons look like buttons, cards like cards.
- **Dark Mode First-Class** — Not an afterthought. Test both themes always.
- **Intentional Interactions** — Smooth transitions (200-300ms, ease-out). Purposeful animations.
- **Mobile-First Responsive** — Start small, enhance for larger screens.
- **Accessibility** — High contrast, semantic HTML, keyboard navigation.

## Technical Stack
- Framework: React 19 + Vite
- Styling: Tailwind CSS 4 (99% utility classes, 1% custom animations)
- Icons: Lucide React (consistent SVG icons)
- Animation: Framer Motion for complex interactions
- Dark Mode: Context-based, localStorage persisted, system preference fallback

## Key Characteristics
- Sophisticated purple palette (#B375A0) as brand anchor
- Sage green (#A6C9BB) for success/completion states
- Single Inter font family with weight-based hierarchy
- Generous rounded corners (xl/2xl) humanizing the interface
- Subtle elevation changes creating clear hierarchy
- Seamless light/dark mode with proper contrast
- Breathing room through consistent spacing rhythm
- Minimal, flat design — no gradients except featured cards

## Quality Checklist
Before shipping any artifact:
- [ ] Uses theme colors (no hardcoded colors except structural grays)
- [ ] Full dark mode coverage with dark: variants
- [ ] Proper spacing using Tailwind scale (gap-4, p-6, etc.)
- [ ] Transitions on all interactive elements (transition-colors duration-200)
- [ ] Consistent border radius (rounded-xl for cards/modals)
- [ ] Shadows applied thoughtfully (cards get shadow-md, modals shadow-xl)
- [ ] Responsive design tested (mobile-first with md:, lg: breakpoints)
- [ ] Inter font loaded from Google Fonts

**In Summary:** Build applications that feel calm, intentional, and sophisticated. Every element should invite focus, not distraction. Think Sunsama's contemplative productivity meets a modern SaaS interface — warm, not cold; purposeful, not frenetic.
