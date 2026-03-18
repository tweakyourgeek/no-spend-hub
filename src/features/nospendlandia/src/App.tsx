import React, { useEffect } from 'react';
import { GameStateProvider, useGameState, useGameDispatch } from './contexts/GameStateContext';
import ScreenTransition from './components/ScreenTransition';
import EntryScreen from './screens/EntryScreen';
import RealmMapScreen from './screens/RealmMapScreen';
import DialogueScreen from './components/DialogueScreen';
import EndingScreen from './screens/EndingScreen';
import JournalScreen from './screens/JournalScreen';
import { suggestPatterns } from './data/spending-integration';

/** Load spending pattern suggestions on first visit */
function SpendingIntegration() {
  const dispatch = useGameDispatch();
  const { flags } = useGameState();

  useEffect(() => {
    if (flags.spending_checked) return;
    const suggested = suggestPatterns();
    for (const pid of suggested) {
      dispatch({ type: 'REVEAL_PATTERN', patternId: pid });
    }
    if (suggested.length > 0) {
      dispatch({ type: 'SET_FLAG', key: 'spending_checked', value: true });
    }
  }, []);

  return null;
}

/** State machine router — renders the active screen */
function GameRouter() {
  const { currentScreen } = useGameState();

  const screen = (() => {
    switch (currentScreen) {
      case 'entry':
        return <EntryScreen />;
      case 'realm-map':
        return <RealmMapScreen />;
      case 'dialogue':
        return <DialogueScreen />;
      case 'ending':
        return <EndingScreen />;
      case 'journal':
        return <JournalScreen />;
      default:
        return <EntryScreen />;
    }
  })();

  return (
    <ScreenTransition screenKey={currentScreen}>
      {screen}
    </ScreenTransition>
  );
}

export default function App() {
  return (
    <GameStateProvider>
      <SpendingIntegration />
      <GameRouter />
    </GameStateProvider>
  );
}
