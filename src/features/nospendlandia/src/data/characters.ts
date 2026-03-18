import { colors } from '../theme';
import type { Character } from '../types';

export const characters: Record<string, Character> = {
  'queen-of-pentacles': {
    id: 'queen-of-pentacles',
    name: 'Lexi',
    title: 'Queen of Pentacles',
    icon: '♛',
    portraitColor: colors.mauve,
    portraitAccent: colors.peach,
    arcana: 'XIV',
  },
  'the-magician': {
    id: 'the-magician',
    name: 'Arden',
    title: 'The Magician',
    icon: '✦',
    portraitColor: colors.sage,
    portraitAccent: colors.lavender,
    arcana: 'I',
  },
  'the-hermit': {
    id: 'the-hermit',
    name: 'Sable',
    title: 'The Hermit',
    icon: '☽',
    portraitColor: '#5a6b7a',
    portraitAccent: colors.cream,
    arcana: 'IX',
  },
  'the-tower': {
    id: 'the-tower',
    name: 'Cael',
    title: 'The Tower',
    icon: '⚡',
    portraitColor: '#8b4557',
    portraitAccent: colors.peach,
    arcana: 'XVI',
  },
  'the-star': {
    id: 'the-star',
    name: 'Nova',
    title: 'The Star',
    icon: '⚝',
    portraitColor: '#6b7fa3',
    portraitAccent: colors.lavender,
    arcana: 'XVII',
  },
  'the-fool': {
    id: 'the-fool',
    name: 'You',
    title: 'The Fool',
    icon: '0',
    portraitColor: colors.lavender,
    portraitAccent: colors.peach,
    arcana: '0',
  },
};
