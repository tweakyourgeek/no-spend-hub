/** All navigable screens in the game */
export type Screen = 'entry' | 'realm-map' | 'dialogue';

/** The three quest lines */
export type Quest = 'no-spend-weekend' | 'no-spend-week' | 'low-spend-month';

/** A recognized spending pattern (oracle card mechanic) */
export type ChasingPattern = string | null;

/** Arbitrary flags / inventory items keyed by id */
export type Flags = Record<string, boolean | string | number>;

/** Full game state shape */
export interface GameState {
  currentScreen: Screen;
  activeQuest: Quest | null;
  chasingPattern: ChasingPattern;
  flags: Flags;
}

/** A single dialogue choice */
export interface DialogueChoice {
  id: string;
  label: string;
  /** Optional flag key to set when chosen */
  setsFlag?: string;
  /** Screen to navigate to after choosing (defaults to staying on dialogue) */
  nextScreen?: Screen;
}

/** Props fed into the Dialogue screen component */
export interface DialogueData {
  characterName: string;
  portraitColor: string;        // placeholder — CSS color for the portrait area
  dialogueText: string;
  choices: DialogueChoice[];
}

/** Actions the game state reducer can handle */
export type GameAction =
  | { type: 'NAVIGATE'; screen: Screen }
  | { type: 'SET_QUEST'; quest: Quest }
  | { type: 'SET_CHASING_PATTERN'; pattern: string }
  | { type: 'SET_FLAG'; key: string; value: boolean | string | number }
  | { type: 'RESET' };
