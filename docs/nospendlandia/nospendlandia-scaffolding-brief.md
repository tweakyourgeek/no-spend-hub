# NoSpendLandia — Scaffolding Brief
**For Claude Code · tweakyourgeek/no-spend-hub**
**Feature path: `src/features/nospendlandia/`**

---

## What This Is

NoSpendLandia is a tarot-based RPG for financial pattern recognition. It is part of the No Spend Collective ecosystem. It lives inside the existing no-spend-hub repo as a self-contained feature alongside the other apps in `src/features/`.

This is not a finance quiz. It is not a budgeting tool. It is a dialogue-driven game where pattern recognition is the power mechanic — naming your spending pattern unlocks new choices. The writing and character work are done. What needs to be built is the engine that holds them.

---

## What Claude Code Has Already Done

Review the current state of `src/features/nospendlandia/` and tell me what exists before building anything. Do not duplicate. Do not overwrite. Reconcile this brief with whatever is already scaffolded.

---

## Scope

Three quests. Nine characters. One Fool (the player). The full game spans:

| Quest | Duration | Session Length | Scope |
|-------|----------|---------------|-------|
| No-Spend Weekend | 3 days (Fri–Sun) | ~7 min/session | Side quest · entry point · 3 scenes |
| No-Spend Week | 7 days | ~10 min/session | Main quest · full arc · ~10 scenes |
| Low-Spend Month | 30 days (21 active) | ~12 min/session | Epic · boss encounters · pattern mastery |

The weekend quest is the MVP. Build the engine to hold all three. Do not hard-code weekend-only assumptions anywhere.

---

## Directory Structure

```
src/features/nospendlandia/
├── index.tsx                    # Feature entry point, exports NospendlandiaApp
├── router.tsx                   # Internal routing for all quest/scene paths
│
├── data/
│   ├── characters.ts            # Character definitions, voice notes, pattern reactions
│   ├── patterns.ts              # Six Chasing Patterns data + unlock conditions
│   ├── quests.ts                # Quest metadata (id, title, days, scenes[])
│   ├── scenes/
│   │   ├── index.ts             # Scene registry — maps scene_id to scene data
│   │   ├── scene_01_friday_night.ts   # First scene (spec below)
│   │   └── [scene_id].ts        # One file per scene
│   └── cards.ts                 # Tarot card data (all 78, upright/reversed, pattern tags)
│
├── engine/
│   ├── scene-runner.tsx         # Renders any scene from data — NOT scene-specific
│   ├── choice-resolver.ts       # Evaluates choices, checks pattern locks, returns branch
│   ├── pattern-engine.ts        # Tracks pattern exposure, manages unlock thresholds
│   ├── session-timer.ts         # Soft session pacing (7/10/12 min targets, no hard cutoff)
│   └── mercy-engine.ts          # Slip recovery logic — triggers after Pull choices
│
├── state/
│   ├── game-state.ts            # Core state shape (see Data Model below)
│   ├── persistence.ts           # Storage abstraction layer (see Persistence below)
│   └── selectors.ts             # State reads — never read state directly in components
│
├── components/
│   ├── SceneFrame.tsx           # Scene wrapper with character portrait, location, time
│   ├── DialogueLine.tsx         # Single NPC dialogue block
│   ├── ChoicePanel.tsx          # Three-choice panel with pattern lock logic
│   ├── NarrationBlock.tsx       # Italic scene-setting text
│   ├── HermitBeat.tsx           # End-of-scene question (no portrait, ambient only)
│   ├── MercyBeat.tsx            # Slip recovery scene component
│   ├── PatternGrid.tsx          # Fog-of-war pattern unlock display
│   ├── QuestMap.tsx             # Visual quest progress tracker
│   └── EntryScreen.tsx          # Three doors entry (art exists)
│
├── views/
│   ├── WorldView.tsx            # Realm map / quest selection
│   ├── QuestView.tsx            # Active quest container
│   ├── SceneView.tsx            # Active scene container
│   ├── PatternView.tsx          # Player's unlocked pattern cards
│   └── JournalView.tsx          # Hermit's questions export / journal
│
└── hooks/
    ├── useGameState.ts          # State reads and dispatches
    ├── useScene.ts              # Current scene data and progression
    └── usePattern.ts            # Pattern unlock status and history
```

---

## Data Model

### GameState

```typescript
interface GameState {
  playerId: string                    // generated on first play, persisted
  currentQuest: QuestId | null
  currentScene: SceneId | null
  
  // Progress
  completedScenes: SceneId[]
  completedQuests: QuestId[]
  
  // Pattern tracking
  patternData: {
    [patternId: string]: {
      pullCount: number               // times player chose The Pull with this pattern active
      observedCount: number           // times pattern was present but player resisted
      namedCount: number              // times player selected Choice C (pattern named)
      masteryCount: number            // times named on C-arrival branch (highest insight)
      unlocked: boolean               // true when naming threshold met
    }
  }
  
  // Scene-level state tags (accumulate across the whole game)
  stateTags: StateTags
  
  // Hermit's questions (exportable)
  hermitJournal: HermitEntry[]
  
  // Session
  sessionStartTime: number | null
  lastPlayedAt: number | null
}

interface StateTags {
  MOONBEAMS_PULL: number
  MOONBEAMS_OBSERVED: number
  MOONBEAMS_NAMED: number
  PATTERN_MASTERY_MOONBEAMS: number
  FRICTION: number
  MERCY_USED: number
  // ... extend as scenes are written
  [key: string]: number
}

interface HermitEntry {
  sceneId: SceneId
  question: string
  path: 'pull' | 'friction' | 'pattern' | 'mastery'
  timestamp: number
  questDay: number
}
```

### Scene Data Shape

```typescript
interface Scene {
  id: SceneId
  questId: QuestId
  day: number
  title: string
  timeLabel: string                   // e.g. "11:47pm"
  location: string                    // e.g. "The Moon's Apartment"
  characters: CharacterId[]
  patternTags: PatternId[]            // patterns active in this scene
  artKey: string                      // maps to imported image asset
  
  beats: Beat[]                       // ordered sequence of scene beats
  
  // What this scene unlocks
  unlocks: {
    scenes?: SceneId[]
    patterns?: PatternId[]
  }
  
  // State changes by branch outcome
  stateChanges: {
    [branchId: string]: Partial<StateTags>
  }
  
  // Hermit question per branch
  hermitQuestions: {
    pull: string
    friction: string
    pattern: string
    mastery?: string
  }
}

type Beat = NarrationBeat | DialogueBeat | ChoiceBeat | HermitBeat | MercyBeat

interface DialogueBeat {
  type: 'dialogue'
  character: CharacterId
  variant?: string                    // for conditional variants (after-A vs after-B)
  lines: string[]
}

interface ChoiceBeat {
  type: 'choices'
  choices: Choice[]
}

interface Choice {
  id: string                          // 'a' | 'b' | 'c'
  label: string
  patternRequired?: PatternId         // C choices require pattern unlocked
  branchId: string                    // maps to stateChanges and response beats
}
```

---

## The Six Chasing Patterns

These are the core unlock mechanic. Fog-of-war at start — players discover them through play, not a tutorial.

```typescript
const PATTERNS = {
  moonbeams:  { name: 'Moonbeams',  unlock: { namedCount: 2 } },
  rainbows:   { name: 'Rainbows',   unlock: { namedCount: 2 } },
  ambrosia:   { name: 'Ambrosia',   unlock: { namedCount: 2 } },
  stardust:   { name: 'Stardust',   unlock: { namedCount: 2 } },
  sunshine:   { name: 'Sunshine',   unlock: { namedCount: 2 } },
  unicorns:   { name: 'Unicorns',   unlock: { namedCount: 2 } },
}
```

When a pattern is unlocked:
- Choice C becomes available in any scene tagged with that pattern
- PatternGrid card flips from fog to revealed
- Pattern name appears in the player's Pattern Library

Patterns are NOT the primary organizing framework. They are tools available throughout all three quests.

---

## The Mercy System

Every Pull outcome (Choice A) triggers the Mercy Beat. This is not optional. It is a 40% retention mechanism.

The Mercy Beat:
- A single Queen of Pentacles line. Warm, short, zero judgment.
- One Hermit question specific to the pull context.
- A "continue" path that picks up exactly where the scene left off.

No score penalty. No streak broken. No counter visible to the player. The game just continues with more data in it.

```typescript
// mercy-engine.ts
// After any Pull choice resolves, check if MercyBeat should fire.
// It always should. The only variable is which Queen line and Hermit question.
```

Example Queen lines (do not reuse verbatim — generate contextually):
- "That's data. What did you notice?"
- "Okay. Still here. What was happening right before that?"

---

## Persistence Layer

**Current environment:** GitHub Pages (static, no server).
**Future environment:** Authenticated app with user accounts (Clerk or Supabase — TBD).

Build a clean abstraction so the storage backend can be swapped without touching game logic.

```typescript
// state/persistence.ts

interface PersistenceAdapter {
  load(): Promise<GameState | null>
  save(state: GameState): Promise<void>
  clear(): Promise<void>
}

// Current implementation: localStorage
export const localStorageAdapter: PersistenceAdapter = {
  load: async () => { /* read from localStorage */ },
  save: async (state) => { /* write to localStorage */ },
  clear: async () => { /* clear key */ },
}

// Future: swap to supabaseAdapter or clerkAdapter without changing anything upstream
export const activeAdapter = localStorageAdapter
```

Storage key: `nospendlandia_gamestate`

Do not call localStorage directly anywhere outside `persistence.ts`.

---

## Session Pacing

Session targets are soft design constraints, not hard cutoffs. A scene should never be interrupted mid-beat. The timer informs pacing decisions during scene authoring, not player experience.

```typescript
// session-timer.ts
// Track session duration.
// Expose: sessionMinutes, isApproachingTarget, questSessionTarget
// questSessionTarget: weekend=7, week=10, month=12
// Do NOT show a timer to the player.
// DO use this to inform when a natural scene-end is near.
```

---

## The Real-World Bridge

The Hermit's end-of-scene question is the game's bridge to real life. After every scene, the question is:
1. Displayed on screen with no answer box (just reads it, sits with it)
2. Logged to `hermitJournal` in GameState
3. Exportable from JournalView as a plain text list

JournalView should:
- Show all Hermit questions in chronological order
- Label each with the scene and day
- Have a "copy all" button
- Eventually: post directly to Skool community thread (future — stub the function, don't build it yet)

---

## Characters

Nine characters. Full voice briefs live in the writing guide. Data shape:

```typescript
interface Character {
  id: CharacterId
  name: string
  romanNumeral: string
  role: string                        // "The Tempter", "The Guide" etc.
  glyph: string                       // symbol used in portrait
  colors: { bg: string; text: string; accent: string }
  // Voice and dialogue are in scene data, not here
}
```

Characters:
- `fool` — the player, no portrait needed
- `queen_of_pentacles` — the guide
- `magician` — the toolkit
- `moon` — the tempter
- `devil` — the shopkeeper
- `hermit` — the journal (ambient only, no portrait in scenes)
- `tower` — the unexpected bill
- `wheel` — the paycheck
- `world` — the destination (quest-end only)

---

## Design System

**Colors (CSS variables):**
```
--plum:     #493751
--mauve:    #B375A0
--sage:     #A6C9BB
--peach:    #E8B4A0
--lavender: #E0DAE7
--cream:    #F8F1F2
--night:    #1a1228      ← Moon scenes only
--moon-glow: #d4b8e0     ← Moon scenes only
```

**Fonts:** Cormorant Garamond (headings, dialogue, character names) + Open Sans (body, UI)

**No graph paper background.** That is SchoolhouseBot only.

---

## Scene 01 — Friday Night (Already Written)

The full scene spec lives in `nospendlandia-scene-01-friday-night.html` in the project files. Summarized for the data file:

```typescript
// scenes/scene_01_friday_night.ts
export const scene_01_friday_night: Scene = {
  id: 'scene_01_friday_night',
  questId: 'no_spend_weekend',
  day: 1,
  title: 'Friday Night',
  timeLabel: '11:47pm',
  location: "The Moon's Apartment",
  characters: ['moon', 'hermit'],
  patternTags: ['moonbeams', 'rainbows'],
  artKey: 'moon_apartment',
  
  // Four beats: Narration → Arrival Dialogue + Choice → Cart Dialogue + Choice → Hermit
  // Full beat sequence: see scene spec HTML
  
  stateChanges: {
    'arrival_c':     { MOONBEAMS_NAMED: 1 },
    'cart_a':        { MOONBEAMS_PULL: 1 },
    'cart_b':        { FRICTION: 1, MOONBEAMS_OBSERVED: 1 },
    'cart_c':        { MOONBEAMS_NAMED: 1 },
    'arrival_c_any': { MOONBEAMS_NAMED: 1, PATTERN_MASTERY_MOONBEAMS: 1 },
  },
  
  hermitQuestions: {
    pull:     "What were you actually going for?",
    friction: "What did you want the thing to do for you?",
    pattern:  "What does Friday night feel like when it's actually good?",
  },
  
  unlocks: {
    scenes: ['scene_02_saturday_morning'],   // always
    // hermit's friday optional scene unlocks on C paths
  }
}
```

---

## What to Build

1. **Audit** what's already in `src/features/nospendlandia/` and report back before writing new files.
2. **Stand up the directory structure** above — create any missing files with correct exports and stubs.
3. **Implement the data model** — GameState interface, persistence abstraction, pattern data.
4. **Wire up the scene engine** — SceneFrame, DialogueLine, ChoicePanel, NarrationBlock, HermitBeat should all render from data, not hardcoded content.
5. **Implement Scene 01** using the data shape above and the full spec in the HTML file.
6. **Implement the Mercy system** — Queen line + Hermit question after every Pull choice.
7. **Build the PatternGrid** — fog-of-war, unlocks at threshold, six patterns.
8. **Build JournalView** — Hermit questions log, copy-all, stub the Skool post function.
9. **Report what's missing** — anything in this brief that couldn't be built yet, and why.

Do not build auth. Do not build the Skool integration. Do not build Scenes 02+. Do not build the Week or Month quest content. Build the engine that holds all of that when it arrives.

---

## What Success Looks Like

A player can:
1. Open NoSpendLandia from the hub app
2. See the entry screen (three doors art)
3. Start the No-Spend Weekend quest
4. Play through Scene 01 — Friday Night in full, with all branches working
5. See The Moon's apartment art
6. Have their pattern data tracked correctly
7. Reach the Hermit beat and see the right question for their path
8. If they chose The Pull, encounter the Mercy beat first
9. Open JournalView and see their Hermit question logged
10. Refresh the page and have their progress still there

That is the MVP. Everything else is the next session.
