/**
 * Tarot card data — all 78 cards with upright/reversed meanings and pattern tags.
 *
 * Stub: full card data to be added as quest content expands.
 * Currently only the cards that appear as characters are defined.
 */

export interface TarotCard {
  id: string;
  name: string;
  numeral: string;
  suit?: 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';
  upright: string;
  reversed: string;
  patternTags?: string[];
}

export const tarotCards: Record<string, TarotCard> = {
  the_fool: {
    id: 'the_fool',
    name: 'The Fool',
    numeral: '0',
    suit: 'major',
    upright: 'New beginnings, innocence, spontaneity',
    reversed: 'Recklessness, risk-taking, holding back',
  },
  the_magician: {
    id: 'the_magician',
    name: 'The Magician',
    numeral: 'I',
    suit: 'major',
    upright: 'Willpower, resourcefulness, skill',
    reversed: 'Manipulation, poor planning, untapped talents',
  },
  the_hermit: {
    id: 'the_hermit',
    name: 'The Hermit',
    numeral: 'IX',
    suit: 'major',
    upright: 'Introspection, solitude, inner guidance',
    reversed: 'Isolation, loneliness, withdrawal',
  },
  wheel_of_fortune: {
    id: 'wheel_of_fortune',
    name: 'Wheel of Fortune',
    numeral: 'X',
    suit: 'major',
    upright: 'Change, cycles, turning point',
    reversed: 'Bad luck, resistance to change, breaking cycles',
  },
  the_devil: {
    id: 'the_devil',
    name: 'The Devil',
    numeral: 'XV',
    suit: 'major',
    upright: 'Bondage, materialism, excess',
    reversed: 'Detachment, breaking free, power reclaimed',
    patternTags: ['moonbeams', 'ambrosia'],
  },
  the_tower: {
    id: 'the_tower',
    name: 'The Tower',
    numeral: 'XVI',
    suit: 'major',
    upright: 'Sudden change, upheaval, revelation',
    reversed: 'Avoidance, fear of change, delaying the inevitable',
  },
  the_moon: {
    id: 'the_moon',
    name: 'The Moon',
    numeral: 'XVIII',
    suit: 'major',
    upright: 'Illusion, fear, anxiety, subconscious',
    reversed: 'Release of fear, clarity, truth',
    patternTags: ['moonbeams'],
  },
  the_world: {
    id: 'the_world',
    name: 'The World',
    numeral: 'XXI',
    suit: 'major',
    upright: 'Completion, accomplishment, travel',
    reversed: 'Incompletion, shortcuts, emptiness',
  },
  queen_of_pentacles: {
    id: 'queen_of_pentacles',
    name: 'Queen of Pentacles',
    numeral: 'XIV',
    suit: 'pentacles',
    upright: 'Nurturing, practical, providing, security',
    reversed: 'Self-centeredness, jealousy, smothering',
  },
};
