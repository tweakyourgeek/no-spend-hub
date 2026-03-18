import type { DialogueNode } from '../types';

/**
 * Legacy dialogue nodes — preserved from existing encounters.
 * Character IDs updated to new system. Pattern references updated to metaphorical names.
 * These power the original encounter-based flow (realm-map → dialogue tree).
 */
export const dialogues: Record<string, DialogueNode> = {

  // ─── QUEEN OF PENTACLES (LEXI) — Opening encounter ────────────────────
  'lexi-intro': {
    id: 'lexi-intro',
    characterId: 'queen_of_pentacles',
    text: 'Welcome, Fool. I am Lexi, the Queen of Pentacles. You stand at the edge of something new. Your spending is data — not a verdict. Shall we begin?',
    choices: [
      { id: 'ready', label: 'I am ready to see clearly.', nextDialogue: 'lexi-ready' },
      { id: 'curious', label: 'Tell me more about the Chasing Patterns.', nextDialogue: 'lexi-patterns' },
      { id: 'afraid', label: 'I am afraid of what I might find.', nextDialogue: 'lexi-afraid' },
    ],
  },
  'lexi-ready': {
    id: 'lexi-ready',
    characterId: 'queen_of_pentacles',
    text: 'Good. Courage is not the absence of fear — it\'s the willingness to look. The Crossroads await. Each path holds encounters with those who have walked before you. Listen to them. Learn your patterns. Then choose differently.',
    choices: [
      { id: 'continue', label: 'Show me the way.', nextScreen: 'realm-map', setsFlag: 'met_lexi' },
    ],
  },
  'lexi-patterns': {
    id: 'lexi-patterns',
    characterId: 'queen_of_pentacles',
    text: 'Ah, the Chasing Patterns. They are the invisible currents that pull your wallet open. Moonbeams, Rainbows, Ambrosia... everyone has them. The trick isn\'t to defeat them — it\'s to recognize them. Once you see the pattern, you reclaim the choice.',
    choices: [
      { id: 'which', label: 'How will I know which ones are mine?', nextDialogue: 'lexi-which-patterns' },
      { id: 'ready', label: 'I understand. Let\'s begin.', nextScreen: 'realm-map', setsFlag: 'met_lexi' },
    ],
  },
  'lexi-which-patterns': {
    id: 'lexi-which-patterns',
    characterId: 'queen_of_pentacles',
    text: 'You\'ll meet travelers along the way who will hold up mirrors. When a reflection stings — that\'s recognition. Don\'t look away. That moment of discomfort is where the real magic happens.',
    choices: [
      { id: 'go', label: 'Then I\'ll face whatever comes.', nextScreen: 'realm-map', setsFlag: 'met_lexi' },
    ],
  },
  'lexi-afraid': {
    id: 'lexi-afraid',
    characterId: 'queen_of_pentacles',
    text: 'Fear is honest. Most people spend to avoid exactly this feeling — the quiet terror of looking at the truth. But here\'s the secret: what you find won\'t destroy you. It will set you free. The numbers are just numbers. You are not your bank balance.',
    choices: [
      { id: 'okay', label: 'Okay. I\'ll try.', nextDialogue: 'lexi-ready' },
      { id: 'not-ready', label: 'I need a moment.', nextScreen: 'entry' },
    ],
  },

  // ─── THE MAGICIAN (ARDEN) — Second encounter ─────────────────────────
  'arden-intro': {
    id: 'arden-intro',
    characterId: 'magician',
    text: 'So, the Fool arrives. I am Arden, The Magician. I deal in transformation — turning "I can\'t" into "I choose not to." Tell me, what brought you to this path?',
    choices: [
      { id: 'saving', label: 'I want to save money.', nextDialogue: 'arden-saving' },
      { id: 'control', label: 'I feel out of control with spending.', nextDialogue: 'arden-control' },
      { id: 'curious', label: 'Honestly? Just curious.', nextDialogue: 'arden-curious' },
    ],
  },
  'arden-saving': {
    id: 'arden-saving',
    characterId: 'magician',
    text: 'Saving is the surface goal. Beneath it lies something deeper — freedom, security, self-trust. The magic isn\'t in the money you keep. It\'s in discovering you don\'t need what you thought you did.',
    choices: [
      { id: 'deep', label: 'That\'s... deeper than I expected.', nextDialogue: 'arden-teach', setsFlag: 'arden_saving' },
      { id: 'practical', label: 'I was hoping for practical tips.', nextDialogue: 'arden-practical' },
    ],
  },
  'arden-control': {
    id: 'arden-control',
    characterId: 'magician',
    text: 'Control is an illusion. What you\'re really seeking is awareness. When you\'re aware, you don\'t need willpower — you need wisdom. Let me show you something.',
    choices: [
      { id: 'show', label: 'Show me.', nextDialogue: 'arden-teach', setsFlag: 'arden_control', revealsPattern: 'ambrosia' },
    ],
  },
  'arden-curious': {
    id: 'arden-curious',
    characterId: 'magician',
    text: 'Curiosity is the first spell any magician learns. It\'s more powerful than discipline, more lasting than motivation. Stay curious about your habits, and change follows naturally.',
    choices: [
      { id: 'learn', label: 'What can you teach me?', nextDialogue: 'arden-teach', setsFlag: 'arden_curious' },
    ],
  },
  'arden-practical': {
    id: 'arden-practical',
    characterId: 'magician',
    text: 'Fair enough. Here\'s one: before any purchase, wait. Not a day — just three breaths. In that pause, ask yourself: "Is this for who I am, or who I\'m pretending to be?" You\'d be surprised how often the answer changes everything.',
    choices: [
      { id: 'good', label: 'Three breaths. I can do that.', nextDialogue: 'arden-teach', setsFlag: 'learned_pause', revealsPattern: 'ambrosia' },
    ],
  },
  'arden-teach': {
    id: 'arden-teach',
    characterId: 'magician',
    text: 'Here is the Magician\'s truth: every "no" to a mindless purchase is a "yes" to your future self. You have more power than you know. The wand was always in your hand — you just forgot you were holding it.',
    choices: [
      { id: 'continue', label: 'I\'ll remember that.', nextScreen: 'realm-map', setsFlag: 'met_arden' },
    ],
  },

  // ─── THE HERMIT (SABLE) — Third encounter ────────────────────────────
  'sable-intro': {
    id: 'sable-intro',
    characterId: 'hermit',
    text: '...you found me. Most don\'t bother looking in the quiet places. I\'m Sable. I\'ve been watching your spending patterns from afar. Would you like to know what I see?',
    choices: [
      { id: 'yes', label: 'Tell me what you see.', nextDialogue: 'sable-see' },
      { id: 'scared', label: 'I\'m not sure I want to know.', nextDialogue: 'sable-gentle' },
    ],
  },
  'sable-see': {
    id: 'sable-see',
    characterId: 'hermit',
    text: 'I see someone who fills silence with purchases. When the world gets too loud, you buy something. When it gets too quiet, you buy something else. The spending isn\'t the problem — it\'s the symptom. The question is: what are you avoiding?',
    choices: [
      { id: 'loneliness', label: 'Maybe... loneliness.', nextDialogue: 'sable-loneliness', revealsPattern: 'moonbeams' },
      { id: 'boredom', label: 'Boredom, I think.', nextDialogue: 'sable-boredom', revealsPattern: 'moonbeams' },
      { id: 'stress', label: 'Stress. Definitely stress.', nextDialogue: 'sable-stress', revealsPattern: 'moonbeams' },
    ],
  },
  'sable-gentle': {
    id: 'sable-gentle',
    characterId: 'hermit',
    text: 'That\'s alright. Hermits understand the value of timing. When you\'re ready, the truth will still be here. It\'s patient like that. For now, just notice — don\'t judge, just notice — what happens right before you spend.',
    choices: [
      { id: 'notice', label: 'I\'ll start noticing.', nextScreen: 'realm-map', setsFlag: 'met_sable' },
    ],
  },
  'sable-loneliness': {
    id: 'sable-loneliness',
    characterId: 'hermit',
    text: 'Loneliness is an honest answer. We buy things to feel connected — to a lifestyle, to an identity, to a version of ourselves that has friends over for dinner. But the packages on the doorstep don\'t fill the empty chair. What might?',
    choices: [
      { id: 'think', label: 'I need to think about that.', nextDialogue: 'sable-wisdom', setsFlag: 'pattern_loneliness' },
    ],
  },
  'sable-boredom': {
    id: 'sable-boredom',
    characterId: 'hermit',
    text: 'Boredom is underrated. It\'s the mind\'s way of saying "I\'m ready for something real." But instead of sitting with it, we scroll, we click, we buy. What if boredom was the doorway to creativity instead of consumption?',
    choices: [
      { id: 'try', label: 'I\'ve never thought of it that way.', nextDialogue: 'sable-wisdom', setsFlag: 'pattern_boredom' },
    ],
  },
  'sable-stress': {
    id: 'sable-stress',
    characterId: 'hermit',
    text: 'Stress spending is the Moonbeams spiral. You buy to feel better, then stress about the money, then buy again to cope with that stress. It\'s a loop. The exit isn\'t at the store — it\'s in the pause between the urge and the action.',
    choices: [
      { id: 'pause', label: 'The pause again. Arden mentioned that too.', nextDialogue: 'sable-wisdom', setsFlag: 'pattern_stress' },
    ],
  },
  'sable-wisdom': {
    id: 'sable-wisdom',
    characterId: 'hermit',
    text: 'The Hermit\'s lantern doesn\'t show the whole path — just the next step. Your next step is this: the next time you reach for your wallet, pause and ask, "Am I spending to add something, or to avoid something?" That\'s all. Just the question.',
    choices: [
      { id: 'go', label: 'Just the question. I can do that.', nextScreen: 'realm-map', setsFlag: 'met_sable' },
    ],
  },

  // ─── THE TOWER (CAEL) — Crisis encounter ─────────────────────────────
  'cael-intro': {
    id: 'cael-intro',
    characterId: 'tower',
    text: 'BOOM. Hello. I\'m Cael. The Tower. I\'m the card nobody wants to draw. But here\'s the thing — I\'m also the most honest one. I destroy what isn\'t real so you can build what is. Ready for some truth?',
    choices: [
      { id: 'bring-it', label: 'Bring it.', nextDialogue: 'cael-truth' },
      { id: 'nervous', label: 'That sounds intense...', nextDialogue: 'cael-gentle' },
    ],
  },
  'cael-truth': {
    id: 'cael-truth',
    characterId: 'tower',
    text: 'Here it is: you\'ve been performing wealth you don\'t have. Or performing poverty you don\'t need. Either way, you\'re performing. What if you just... stopped? What if your spending reflected your actual values instead of your image?',
    choices: [
      { id: 'performing', label: 'I didn\'t realize I was performing.', nextDialogue: 'cael-mirror', revealsPattern: 'unicorns' },
      { id: 'know', label: 'I know. I just don\'t know how to stop.', nextDialogue: 'cael-how', revealsPattern: 'rainbows' },
    ],
  },
  'cael-gentle': {
    id: 'cael-gentle',
    characterId: 'tower',
    text: 'Intense is my whole thing. But here\'s the gentler version: every habit that no longer serves you is a tower waiting to fall. You can either wait for it to crumble on its own, or you can choose which bricks to remove. I recommend the second option.',
    choices: [
      { id: 'which', label: 'Which bricks should I start with?', nextDialogue: 'cael-mirror' },
    ],
  },
  'cael-mirror': {
    id: 'cael-mirror',
    characterId: 'tower',
    text: 'Look at your last five purchases. Which ones were for you — the real you, not the Instagram you, not the "keeping up" you? If a purchase wouldn\'t make sense to someone who truly knows you, it\'s a brick from the wrong tower.',
    choices: [
      { id: 'ouch', label: 'Ouch. But fair.', nextDialogue: 'cael-rebuild', setsFlag: 'tower_truth' },
    ],
  },
  'cael-how': {
    id: 'cael-how',
    characterId: 'tower',
    text: 'Knowing is half the demolition. The other half? Unfollow three accounts that make you feel "less than." Delete one shopping app. Tell one person you trust about this challenge. Small demolitions, big results.',
    choices: [
      { id: 'try', label: 'Small demolitions. Got it.', nextDialogue: 'cael-rebuild', setsFlag: 'tower_action' },
    ],
  },
  'cael-rebuild': {
    id: 'cael-rebuild',
    characterId: 'tower',
    text: 'The Tower\'s gift isn\'t destruction — it\'s the cleared ground where something real can grow. You\'re not losing anything that was truly yours. Go now. Build something honest.',
    choices: [
      { id: 'go', label: 'I\'ll build on solid ground.', nextScreen: 'realm-map', setsFlag: 'met_cael' },
    ],
  },

  // ─── THE WORLD (NOVA) — Quest ending ──────────────────────────────────
  // Voice: short, specific, never surprised, always proud.
  'nova-intro': {
    id: 'nova-intro',
    characterId: 'world',
    text: 'You made it. I\'m Nova. The World. I appear at the end — after the work is done. How are you?',
    choices: [
      { id: 'lighter', label: 'Lighter, actually.', nextDialogue: 'nova-lighter' },
      { id: 'overwhelmed', label: 'A bit overwhelmed.', nextDialogue: 'nova-overwhelmed' },
      { id: 'determined', label: 'Determined.', nextDialogue: 'nova-determined' },
    ],
  },
  'nova-lighter': {
    id: 'nova-lighter',
    characterId: 'world',
    text: 'Good. That\'s what happens when you put down what wasn\'t yours to carry. Every pattern you named lightened the load.',
    choices: [
      { id: 'continue', label: 'What comes next?', nextDialogue: 'nova-guidance' },
    ],
  },
  'nova-overwhelmed': {
    id: 'nova-overwhelmed',
    characterId: 'world',
    text: 'That\'s honest. You saw a lot. You don\'t have to change everything today. Just keep looking.',
    choices: [
      { id: 'continue', label: 'One step at a time.', nextDialogue: 'nova-guidance' },
    ],
  },
  'nova-determined': {
    id: 'nova-determined',
    characterId: 'world',
    text: 'Determined is good. Don\'t let it become another performance. Be determined and kind. That lasts.',
    choices: [
      { id: 'continue', label: 'Determined and kind. I like that.', nextDialogue: 'nova-guidance' },
    ],
  },
  'nova-guidance': {
    id: 'nova-guidance',
    characterId: 'world',
    text: 'Here. A journal. Each day, write one sentence about how you felt when you didn\'t spend. Not what you saved — how you felt.',
    choices: [
      { id: 'accept', label: 'I accept the gift.', nextDialogue: 'nova-farewell', setsFlag: 'has_journal' },
    ],
  },
  'nova-farewell': {
    id: 'nova-farewell',
    characterId: 'world',
    text: 'You walked the path. Pentacles, magic, lantern, tower, and now — the whole world. Your spending is data. Not a verdict. Go well.',
    choices: [
      { id: 'end', label: 'Thank you, Nova.', nextScreen: 'ending', setsFlag: 'met_nova' },
    ],
  },

  // ─── WEEKEND QUEST VARIANTS ──────────────────────────────────────────
  'lexi-weekend': {
    id: 'lexi-weekend',
    characterId: 'queen_of_pentacles',
    text: 'A weekend quest. Smart choice — small enough to complete, big enough to learn from. Two days, Fool. Forty-eight hours of watching your impulses without obeying them. What do you think will be hardest?',
    choices: [
      { id: 'food', label: 'Not ordering food delivery.', nextDialogue: 'lexi-weekend-food', revealsPattern: 'moonbeams' },
      { id: 'bored', label: 'Having nothing to "do" that costs money.', nextDialogue: 'lexi-weekend-bored', revealsPattern: 'ambrosia' },
      { id: 'social', label: 'Saying no to plans with friends.', nextDialogue: 'lexi-weekend-social', revealsPattern: 'rainbows' },
    ],
  },
  'lexi-weekend-food': {
    id: 'lexi-weekend-food',
    characterId: 'queen_of_pentacles',
    text: 'Food delivery. The Moonbeams love that one. Here\'s a weekend spell: cook one meal you\'ve never tried. Make it an event, not a chore. The act of creating replaces the act of ordering. Feed yourself with intention.',
    choices: [
      { id: 'go', label: 'One new recipe. I can do that.', nextScreen: 'realm-map', setsFlag: 'met_lexi' },
    ],
  },
  'lexi-weekend-bored': {
    id: 'lexi-weekend-bored',
    characterId: 'queen_of_pentacles',
    text: 'Boredom is the mind knocking at the door. This weekend, let it in. Go for a walk with no destination. Sit in a park. Reorganize one drawer. You\'ll be amazed what shows up when you stop buying entertainment.',
    choices: [
      { id: 'go', label: 'I\'ll let the boredom in.', nextScreen: 'realm-map', setsFlag: 'met_lexi' },
    ],
  },
  'lexi-weekend-social': {
    id: 'lexi-weekend-social',
    characterId: 'queen_of_pentacles',
    text: 'You don\'t have to say no — say "let\'s do something free." A hike, a potluck, a game night. The friends worth keeping are the ones who stay when the wallet closes.',
    choices: [
      { id: 'go', label: 'Something free. Got it.', nextScreen: 'realm-map', setsFlag: 'met_lexi' },
    ],
  },

  // ─── MONTH QUEST VARIANTS ────────────────────────────────────────────
  'lexi-month': {
    id: 'lexi-month',
    characterId: 'queen_of_pentacles',
    text: 'The Lunar Arch. Thirty days. This is not for the faint of heart, Fool. A month is long enough to break old patterns and forge new ones. But it\'s also long enough to fail — and failure is part of the path. Are you prepared for imperfection?',
    choices: [
      { id: 'yes', label: 'Imperfect progress beats perfect inaction.', nextDialogue: 'lexi-month-go', setsFlag: 'month_imperfect' },
      { id: 'worried', label: 'What if I slip up halfway through?', nextDialogue: 'lexi-month-slip' },
    ],
  },
  'lexi-month-go': {
    id: 'lexi-month-go',
    characterId: 'queen_of_pentacles',
    text: 'Now that\'s wisdom. Thirty days, and each one is a fresh start. Track your non-spending days, but don\'t punish the spending days. Just notice them, learn from them, and keep walking.',
    choices: [
      { id: 'go', label: 'Thirty fresh starts. Let\'s go.', nextScreen: 'realm-map', setsFlag: 'met_lexi' },
    ],
  },
  'lexi-month-slip': {
    id: 'lexi-month-slip',
    characterId: 'queen_of_pentacles',
    text: 'Then you slip. And the next day, you start again. This isn\'t a test you pass or fail — it\'s a practice. Monks don\'t stop meditating because their mind wanders. You don\'t stop because your wallet opens. You notice, you breathe, you begin again.',
    choices: [
      { id: 'go', label: 'Begin again. I like that.', nextScreen: 'realm-map', setsFlag: 'met_lexi' },
    ],
  },
};
