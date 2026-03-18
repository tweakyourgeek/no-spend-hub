/** All navigable screens in the game */
export type Screen = 'entry' | 'realm-map' | 'dialogue' | 'journal' | 'ending';

/** The three quest lines */
export type Quest = 'no-spend-weekend' | 'no-spend-week' | 'low-spend-month';

/** A recognized spending pattern (oracle card mechanic) */
export interface ChasingPattern {
  id: string;
  name: string;
  description: string;
  icon: string;
  advice: string;
}

/** Arbitrary flags / inventory items keyed by id */
export type Flags = Record<string, boolean | string | number>;

/** Tarot-themed NPC character */
export interface Character {
  id: string;
  name: string;
  title: string;
  icon: string;
  portraitColor: string;
  portraitAccent: string;
  arcana: string;
}

/** A single dialogue node in a conversation tree */
export interface DialogueNode {
  id: string;
  characterId: string;
  text: string;
  choices: DialogueChoice[];
}

/** A single dialogue choice */
export interface DialogueChoice {
  id: string;
  label: string;
  /** Optional flag key to set when chosen */
  setsFlag?: string;
  /** Screen to navigate to after choosing (defaults to staying on dialogue) */
  nextScreen?: Screen;
  /** Next dialogue node to show */
  nextDialogue?: string;
  /** Pattern to reveal when chosen */
  revealsPattern?: string;
}

/** Props fed into the Dialogue screen component */
export interface DialogueData {
  characterName: string;
  portraitColor: string;
  dialogueText: string;
  choices: DialogueChoice[];
}

/** An encounter in a quest's story */
export interface Encounter {
  id: string;
  dialogueNodeId: string;
  requiredFlags?: Record<string, boolean | string | number>;
}

/** A full quest storyline */
export interface QuestLine {
  questId: Quest;
  title: string;
  description: string;
  encounters: Encounter[];
  endingDialogueId: string;
}

/** Full game state shape */
export interface GameState {
  currentScreen: Screen;
  activeQuest: Quest | null;
  chasingPattern: ChasingPattern | null;
  revealedPatterns: string[];
  flags: Flags;
  currentDialogueId: string | null;
  encounterIndex: number;
  completedQuests: Quest[];
  journalEntries: string[];
}

/** Actions the game state reducer can handle */
export type GameAction =
  | { type: 'NAVIGATE'; screen: Screen }
  | { type: 'SET_QUEST'; quest: Quest }
  | { type: 'SET_CHASING_PATTERN'; pattern: ChasingPattern }
  | { type: 'REVEAL_PATTERN'; patternId: string }
  | { type: 'SET_FLAG'; key: string; value: boolean | string | number }
  | { type: 'SET_DIALOGUE'; dialogueId: string }
  | { type: 'ADVANCE_ENCOUNTER' }
  | { type: 'COMPLETE_QUEST'; quest: Quest }
  | { type: 'ADD_JOURNAL'; entry: string }
  | { type: 'LOAD_STATE'; state: GameState }
  | { type: 'RESET' };
