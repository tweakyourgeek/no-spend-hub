import React, { useEffect } from 'react';
import { GameStateProvider, useGameState, useGameDispatch } from './contexts/GameStateContext';
import ScreenTransition from './components/ScreenTransition';
import EntryScreen from './screens/EntryScreen';
import RealmMapScreen from './screens/RealmMapScreen';
import DialogueScreen from './components/DialogueScreen';
import SceneRunner from './engine/scene-runner';
import EndingScreen from './screens/EndingScreen';
import JournalView from './views/JournalView';
import PatternView from './views/PatternView';
import { suggestPatterns } from './data/spending-integration';
import { LEGACY_PATTERN_MAP } from './data/patterns';

/** Load spending pattern suggestions on first visit */
function SpendingIntegration() {
  const dispatch = useGameDispatch();
  const { flags } = useGameState();

  useEffect(() => {
    if (flags.spending_checked) return;
    const suggested = suggestPatterns();
    for (const pid of suggested) {
      // Suggest patterns using new IDs (already mapped in spending-integration.ts)
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
  const { currentScreen, currentScene, currentDialogueId } = useGameState();

  const screen = (() => {
    switch (currentScreen) {
      case 'entry':
        return <EntryScreen />;
      case 'realm-map':
        return <RealmMapScreen />;
      case 'scene':
        // If we have a scene loaded, use the new scene runner
        if (currentScene) {
          return <SceneRunner />;
        }
        // Fallback to legacy dialogue screen
        return <DialogueScreen />;
      case 'ending':
        return <EndingScreen />;
      case 'journal':
        return <JournalView />;
      case 'patterns':
        return <PatternView />;
      default:
        return <EntryScreen />;
    }
  })();

  return (
    <ScreenTransition screenKey={`${currentScreen}-${currentScene || currentDialogueId || ''}`}>
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
