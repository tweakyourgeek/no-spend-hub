import type { QuestDefinition } from '../types';

export const QUESTS: Record<string, QuestDefinition> = {
  no_spend_weekend: {
    id: 'no_spend_weekend',
    title: 'The Weekend Gate',
    description: 'A side quest — two days of stillness',
    durationDays: 3,
    sessionMinutes: 7,
    scenes: ['scene_01_friday_night', 'scene_02_saturday_morning', 'scene_03_sunday_evening'],
  },
  no_spend_week: {
    id: 'no_spend_week',
    title: 'The Seven-Day Door',
    description: 'The main quest — a full week of intention',
    durationDays: 7,
    sessionMinutes: 10,
    scenes: [
      'scene_w1_monday_morning',
      'scene_w2_tuesday_evening',
      'scene_w3_wednesday_night',
      'scene_w4_thursday_surprise',
      'scene_w5_friday_paycheck',
      'scene_w6_weekend_test',
      'scene_w7_sunday_world',
    ],
  },
  low_spend_month: {
    id: 'low_spend_month',
    title: 'The Lunar Arch',
    description: 'The epic — thirty days of transformation',
    durationDays: 30,
    sessionMinutes: 12,
    scenes: [
      'scene_m01_day_one',
      'scene_m05_first_weekend',
      'scene_m10_week_two',
      'scene_m15_halfway',
      'scene_m21_week_three',
      'scene_m30_the_world',
    ],
  },
};
