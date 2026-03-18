// ─── Core IDs ────────────────────────────────────────────────────────────────

/** All navigable screens in the game */
export type Screen = 'entry' | 'realm-map' | 'scene' | 'journal' | 'ending' | 'patterns';

/** The three quest lines */
export type QuestId = 'no_spend_weekend' | 'no_spend_week' | 'low_spend_month';

/** Scene identifier — one file per scene */
export type SceneId = string;

/** Character identifier */
export type CharacterId =
  | 'fool'
  | 'queen_of_pentacles'
  | 'magician'
  | 'moon'
  | 'devil'
  | 'hermit'
  | 'tower'
  | 'wheel'
  | 'world';

/** Pattern identifier — internal ID (clinical mapping) */
export type PatternId =
  | 'moonbeams'
  | 'rainbows'
  | 'ambrosia'
  | 'stardust'
  | 'sunshine'
  | 'unicorns';

// ─── Characters ──────────────────────────────────────────────────────────────

export interface Character {
  id: CharacterId;
  name: string;
  romanNumeral: string;
  role: string;
  glyph: string;
  colors: { bg: string; text: string; accent: string };
}

// ─── Patterns ────────────────────────────────────────────────────────────────

export interface PatternDefinition {
  id: PatternId;
  name: string;
  description: string;
  icon: string;
  advice: string;
  /** Hermit-voice one-liner shown on revealed cards — a question, not a label */
  hermitQuestion: string;
  unlock: { namedCount: number };
}

export interface PatternTracking {
  pullCount: number;
  observedCount: number;
  namedCount: number;
  masteryCount: number;
  unlocked: boolean;
}

// ─── Scenes & Beats ──────────────────────────────────────────────────────────

export interface Scene {
  id: SceneId;
  questId: QuestId;
  day: number;
  title: string;
  timeLabel: string;
  location: string;
  characters: CharacterId[];
  patternTags: PatternId[];
  artKey: string;

  beats: Beat[];

  unlocks: {
    scenes?: SceneId[];
    patterns?: PatternId[];
  };

  stateChanges: {
    [branchId: string]: Partial<StateTags>;
  };

  hermitQuestions: {
    pull: string;
    friction: string;
    pattern: string;
    mastery?: string;
  };
}

export type Beat = NarrationBeat | DialogueBeat | ChoiceBeat | HermitBeat | MercyBeat;

export interface NarrationBeat {
  type: 'narration';
  text: string;
}

export interface DialogueBeat {
  type: 'dialogue';
  character: CharacterId;
  variant?: string;
  lines: string[];
}

export interface ChoiceBeat {
  type: 'choices';
  choices: Choice[];
}

export interface Choice {
  id: string;
  label: string;
  patternRequired?: PatternId;
  branchId: string;
}

export interface HermitBeat {
  type: 'hermit';
  /** If null, resolved from scene's hermitQuestions based on player path */
  question?: string;
}

export interface MercyBeat {
  type: 'mercy';
  queenLine: string;
  hermitQuestion: string;
}

// ─── Quests ──────────────────────────────────────────────────────────────────

export interface QuestDefinition {
  id: QuestId;
  title: string;
  description: string;
  durationDays: number;
  sessionMinutes: number;
  scenes: SceneId[];
}

// ─── Legacy Dialogue (preserved from existing encounters) ────────────────────

export interface DialogueNode {
  id: string;
  characterId: string;
  text: string;
  choices: DialogueChoice[];
}

export interface DialogueChoice {
  id: string;
  label: string;
  setsFlag?: string;
  nextScreen?: Screen;
  nextDialogue?: string;
  revealsPattern?: string;
}

// ─── Game State ──────────────────────────────────────────────────────────────

export interface StateTags {
  [key: string]: number;
}

export interface HermitEntry {
  sceneId: SceneId;
  question: string;
  path: 'pull' | 'friction' | 'pattern' | 'mastery';
  timestamp: number;
  questDay: number;
}

export interface GameState {
  // Navigation
  currentScreen: Screen;
  previousScreen: Screen | null;

  // Quest & scene progress
  currentQuest: QuestId | null;
  currentScene: SceneId | null;
  currentBeatIndex: number;
  currentBranch: string | null;

  // Progress
  completedScenes: SceneId[];
  completedQuests: QuestId[];

  // Pattern tracking
  patternData: {
    [patternId: string]: PatternTracking;
  };

  // Scene-level state tags
  stateTags: StateTags;

  // Hermit's questions (exportable)
  hermitJournal: HermitEntry[];

  // Session
  sessionStartTime: number | null;
  lastPlayedAt: number | null;

  // Legacy support — flags from existing dialogue encounters
  flags: Record<string, boolean | string | number>;
  /** Old-style revealed patterns for backward compat with existing encounters */
  revealedPatterns: string[];
  /** Legacy encounter index */
  encounterIndex: number;
  /** Legacy current dialogue id */
  currentDialogueId: string | null;
  /** Legacy journal entries */
  journalEntries: string[];
}

// ─── Actions ─────────────────────────────────────────────────────────────────

export type GameAction =
  // Navigation
  | { type: 'NAVIGATE'; screen: Screen }
  // Quest
  | { type: 'START_QUEST'; questId: QuestId }
  | { type: 'COMPLETE_QUEST'; questId: QuestId }
  // Scene
  | { type: 'START_SCENE'; sceneId: SceneId }
  | { type: 'ADVANCE_BEAT'; fromIndex?: number }
  | { type: 'SET_BRANCH'; branchId: string }
  | { type: 'COMPLETE_SCENE'; sceneId: SceneId }
  // Patterns
  | { type: 'RECORD_PULL'; patternId: PatternId }
  | { type: 'RECORD_OBSERVED'; patternId: PatternId }
  | { type: 'RECORD_NAMED'; patternId: PatternId }
  | { type: 'RECORD_MASTERY'; patternId: PatternId }
  | { type: 'UNLOCK_PATTERN'; patternId: PatternId }
  // State tags
  | { type: 'APPLY_STATE_CHANGES'; changes: Partial<StateTags> }
  // Hermit
  | { type: 'ADD_HERMIT_ENTRY'; entry: HermitEntry }
  // Session
  | { type: 'START_SESSION' }
  // Legacy support
  | { type: 'SET_FLAG'; key: string; value: boolean | string | number }
  | { type: 'REVEAL_PATTERN'; patternId: string }
  | { type: 'SET_DIALOGUE'; dialogueId: string }
  | { type: 'ADVANCE_ENCOUNTER' }
  | { type: 'ADD_JOURNAL'; entry: string }
  // Persistence
  | { type: 'LOAD_STATE'; state: GameState }
  | { type: 'RESET' };
