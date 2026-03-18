import type { QuestLine } from '../types';

export const questLines: Record<string, QuestLine> = {
  'no-spend-weekend': {
    questId: 'no-spend-weekend',
    title: 'The Weekend Gate',
    description: 'A 2-day side quest of stillness',
    encounters: [
      { id: 'enc-weekend-1', dialogueNodeId: 'lexi-weekend' },
      { id: 'enc-weekend-2', dialogueNodeId: 'arden-intro' },
      { id: 'enc-weekend-3', dialogueNodeId: 'nova-intro', requiredFlags: { met_arden: true } },
    ],
    endingDialogueId: 'nova-farewell',
  },
  'no-spend-week': {
    questId: 'no-spend-week',
    title: 'The Seven-Day Door',
    description: 'The main quest — a full week of intention',
    encounters: [
      { id: 'enc-week-1', dialogueNodeId: 'lexi-intro' },
      { id: 'enc-week-2', dialogueNodeId: 'arden-intro' },
      { id: 'enc-week-3', dialogueNodeId: 'sable-intro' },
      { id: 'enc-week-4', dialogueNodeId: 'cael-intro', requiredFlags: { met_sable: true } },
      { id: 'enc-week-5', dialogueNodeId: 'nova-intro', requiredFlags: { met_cael: true } },
    ],
    endingDialogueId: 'nova-farewell',
  },
  'low-spend-month': {
    questId: 'low-spend-month',
    title: 'The Lunar Arch',
    description: 'The epic — thirty days of transformation',
    encounters: [
      { id: 'enc-month-1', dialogueNodeId: 'lexi-month' },
      { id: 'enc-month-2', dialogueNodeId: 'arden-intro' },
      { id: 'enc-month-3', dialogueNodeId: 'sable-intro' },
      { id: 'enc-month-4', dialogueNodeId: 'cael-intro', requiredFlags: { met_sable: true } },
      { id: 'enc-month-5', dialogueNodeId: 'nova-intro', requiredFlags: { met_cael: true } },
    ],
    endingDialogueId: 'nova-farewell',
  },
};
