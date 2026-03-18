import React from 'react';
import { GameStateProvider, useGameState } from './contexts/GameStateContext';
import EntryScreen from './screens/EntryScreen';
import RealmMapScreen from './screens/RealmMapScreen';
import DialogueScreen from './components/DialogueScreen';
import { colors } from './theme';
import type { DialogueData } from './types';

/** Placeholder encounter for scaffolding — will be replaced with real content */
const placeholderDialogue: DialogueData = {
  characterName: 'Queen of Pentacles',
  portraitColor: colors.mauve,
  dialogueText:
    'Welcome, Fool. I am Lexi, the Queen of Pentacles. You stand at the edge of something new. ' +
    'Your spending is data — not a verdict. Shall we begin?',
  choices: [
    { id: 'yes', label: 'I am ready to see clearly.', nextScreen: 'realm-map' },
    { id: 'curious', label: 'Tell me more about the Chasing Patterns.' },
    { id: 'afraid', label: 'I am afraid of what I might find.' },
    { id: 'back', label: 'Let me return to the crossroads.', nextScreen: 'realm-map' },
  ],
};

/** State machine router — renders the active screen */
function GameRouter() {
  const { currentScreen } = useGameState();

  switch (currentScreen) {
    case 'entry':
      return <EntryScreen />;
    case 'realm-map':
      return <RealmMapScreen />;
    case 'dialogue':
      return <DialogueScreen data={placeholderDialogue} />;
    default:
      return <EntryScreen />;
  }
}

export default function App() {
  return (
    <GameStateProvider>
      <GameRouter />
    </GameStateProvider>
  );
}
