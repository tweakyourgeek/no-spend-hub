# Nospendlandia — Component Structure & State

## Overview
Nospendlandia is an RPG-style interactive experience for the No Spend Collective.
Players take on the role of **The Fool**, guided by the **Queen of Pentacles (Lexi)**,
navigating dialogue encounters with nine tarot characters across three quest lines.

**No combat.** Encounters are dialogue choices. The core mechanic is recognizing
your spending pattern ("Chasing Patterns") — the oracle card system that gives
power in encounters.

**Core mantra:** *"Your spending is data. Not a verdict."*

---

## Directory Structure

```
src/features/nospendlandia/
├── index.html              # Sub-app HTML entry
├── package.json            # Standalone dependencies
├── vite.config.ts          # Vite config
├── tsconfig.json           # TypeScript config
├── NOSPENDLANDIA.md        # This file
└── src/
    ├── main.tsx            # ReactDOM mount + global styles
    ├── App.tsx             # State machine router (entry → realm-map → dialogue)
    ├── types.ts            # All shared TypeScript types
    ├── theme.ts            # Design tokens (colors, fonts)
    ├── contexts/
    │   └── GameStateContext.tsx   # React context + useReducer for game state
    ├── screens/
    │   ├── EntryScreen.tsx       # Three doors — quest selection
    │   └── RealmMapScreen.tsx    # Crossroads map with path signs
    └── components/
        └── DialogueScreen.tsx    # Reusable dialogue encounter component
```

## State Shape (`GameState`)

```ts
{
  currentScreen: 'entry' | 'realm-map' | 'dialogue',
  activeQuest: 'no-spend-weekend' | 'no-spend-week' | 'low-spend-month' | null,
  chasingPattern: string | null,   // discovered oracle pattern
  flags: Record<string, boolean | string | number>,  // inventory/progress flags
}
```

### Actions

| Action               | Payload                     | Effect                          |
|----------------------|-----------------------------|---------------------------------|
| `NAVIGATE`           | `screen: Screen`            | Change active screen            |
| `SET_QUEST`          | `quest: Quest`              | Set the active quest line       |
| `SET_CHASING_PATTERN`| `pattern: string`           | Record a discovered pattern     |
| `SET_FLAG`           | `key: string, value: any`   | Set an inventory/progress flag  |
| `RESET`              | —                           | Reset to initial state          |

## Screens

### Entry Screen
- The Fool stands before three doors (No-Spend Weekend, No-Spend Week, Low-Spend Month)
- Selecting a door sets the active quest and navigates to the Realm Map
- Atmospheric gradient background, CSS-illustrated Fool figure

### Realm Map
- SVG crossroads layout with three glowing path signs
- Active quest path is highlighted
- "Begin Encounter" navigates to the Dialogue screen

### Dialogue Screen (component)
- Accepts a `DialogueData` prop with character name, portrait color, text, and choices
- Renders character portrait area, name, dialogue box, and 2–4 choice buttons
- Choices can set flags and/or navigate to other screens
- Designed to be fed different content for each encounter

## Design System

| Token    | Value     |
|----------|-----------|
| Plum     | `#493751` |
| Mauve    | `#B375A0` |
| Sage     | `#A6C9BB` |
| Peach    | `#E8B4A0` |
| Lavender | `#E0DAE7` |
| Cream    | `#F8F1F2` |
| Heading  | Cormorant Garamond |
| Body     | Open Sans |

## Characters (planned)
1. **The Fool** — the player
2. **Queen of Pentacles (Lexi)** — guide
3. Seven more tarot characters — TBD

## Quests
- **No-Spend Weekend** — side quest (2 days)
- **No-Spend Week** — main quest (7 days)
- **Low-Spend Month** — the epic (30 days)

## Next Steps
- Wire up real encounter content (dialogue trees per quest)
- Implement Chasing Pattern discovery mechanic
- Add remaining tarot characters with unique encounters
- Add transition animations between screens
- Connect to localStorage for progress persistence
