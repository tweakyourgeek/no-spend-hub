import type { QuestId } from '../types';

/** Legacy quest encounter structure — used by the realm-map dialogue flow */
export interface Encounter {
  id: string;
  dialogueNodeId: string;
  requiredFlags?: Record<string, boolean | string | number>;
}

export interface QuestLine {
  questId: QuestId;
  title: string;
  description: string;
  encounters: Encounter[];
  endingDialogueId: string;
}

export const questLines: Record<string, QuestLine> = {
  // Weekend quest uses the new scene-based system (data/quests.ts + data/scenes/).
  // Legacy encounters removed to prevent conflict.
  'no_spend_weekend': {
    questId: 'no_spend_weekend',
    title: 'The Weekend Gate',
    description: 'A 2-day side quest of stillness',
    encounters: [],
    endingDialogueId: 'nova-farewell',
  },
  // Week quest uses the new scene-based system.
  'no_spend_week': {
    questId: 'no_spend_week',
    title: 'The Seven-Day Door',
    description: 'The main quest — a full week of intention',
    encounters: [],
    endingDialogueId: 'nova-farewell',
  },
  // Month quest uses the new scene-based system.
  'low_spend_month': {
    questId: 'low_spend_month',
    title: 'The Lunar Arch',
    description: 'The epic — thirty days of transformation',
    encounters: [],
    endingDialogueId: 'nova-farewell',
  },
};
