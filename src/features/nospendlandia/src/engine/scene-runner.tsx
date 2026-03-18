import React, { useState, useCallback } from 'react';
import { useGameState, useGameDispatch } from '../contexts/GameStateContext';
import { useScene } from '../hooks/useScene';
import { resolveChoice, buildHermitEntry } from './choice-resolver';
import { shouldTriggerMercy, getQueenLine, getHermitPullQuestion } from './mercy-engine';
import SceneFrame from '../components/SceneFrame';
import NarrationBlock from '../components/NarrationBlock';
import DialogueLine from '../components/DialogueLine';
import ChoicePanel from '../components/ChoicePanel';
import HermitBeatComp from '../components/HermitBeat';
import MercyBeatComp from '../components/MercyBeat';
import type { Choice, Beat } from '../types';
import { getCurrentPath } from '../state/selectors';
import { colors, fonts } from '../theme';

/**
 * Scene Runner — renders any scene from data. NOT scene-specific.
 *
 * Walks through the beat sequence, rendering each beat type,
 * and handling choice resolution, mercy, and hermit beats.
 */
export default function SceneRunner() {
  const state = useGameState();
  const dispatch = useGameDispatch();
  const { scene, currentBeat, activeBeats, currentBeatIndex } = useScene();

  // Mercy state — inserted dynamically after Pull choices
  const [mercyActive, setMercyActive] = useState(false);
  const [mercyQueenLine, setMercyQueenLine] = useState('');
  const [mercyHermitQ, setMercyHermitQ] = useState('');

  // Track the player's last path for hermit resolution
  const [lastPath, setLastPath] = useState<'pull' | 'friction' | 'pattern' | 'mastery'>('friction');

  const advanceBeat = useCallback(() => {
    dispatch({ type: 'ADVANCE_BEAT' });
  }, [dispatch]);

  if (!scene) {
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.plum,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.cream,
        fontFamily: fonts.body,
      }}>
        <p>No scene loaded. <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: 'realm-map' })}
          style={{
            color: colors.sage,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >Return to map</button></p>
      </div>
    );
  }

  // If mercy is active, show the mercy beat
  if (mercyActive) {
    return (
      <SceneFrame scene={scene}>
        <MercyBeatComp
          queenLine={mercyQueenLine}
          hermitQuestion={mercyHermitQ}
          onContinue={() => {
            setMercyActive(false);
            advanceBeat();
          }}
        />
      </SceneFrame>
    );
  }

  // Scene complete — no more beats
  if (!currentBeat) {
    // Complete the scene and navigate
    const completeScene = () => {
      dispatch({ type: 'COMPLETE_SCENE', sceneId: scene.id });
      dispatch({ type: 'NAVIGATE', screen: 'realm-map' });
    };

    return (
      <SceneFrame scene={scene}>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={completeScene}
            style={{
              fontFamily: fonts.body,
              background: `linear-gradient(135deg, ${colors.sage}, ${colors.sage}cc)`,
              color: colors.plum,
              border: 'none',
              borderRadius: 8,
              padding: '0.85rem 2rem',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
            }}
          >
            Continue your journey
          </button>
        </div>
      </SceneFrame>
    );
  }

  // Handle choice selection
  function handleChoice(choice: Choice) {
    if (!scene) return;

    const result = resolveChoice(choice, scene, state);
    setLastPath(result.path);

    // Dispatch all actions
    for (const action of result.actions) {
      dispatch(action);
    }

    // If pull, trigger mercy
    if (result.triggersMercy) {
      // Find the mercy beat in the scene for contextual lines
      const mercyBeat = scene.beats.find(b => b.type === 'mercy');
      const queenLine = mercyBeat && mercyBeat.type === 'mercy'
        ? getQueenLine(mercyBeat.queenLine)
        : getQueenLine();
      const hermitQ = mercyBeat && mercyBeat.type === 'mercy'
        ? getHermitPullQuestion(mercyBeat.hermitQuestion)
        : getHermitPullQuestion();

      setMercyQueenLine(queenLine);
      setMercyHermitQ(hermitQ);
      setMercyActive(true);
      return;
    }

    // Otherwise advance to next beat
    advanceBeat();
  }

  // Handle hermit beat — resolve the question from the scene's hermitQuestions
  function handleHermit() {
    if (!scene) return;

    const path = lastPath;
    const entry = buildHermitEntry(scene, path);
    dispatch({ type: 'ADD_HERMIT_ENTRY', entry });
    advanceBeat();
  }

  // Render the current beat
  function renderBeat(beat: Beat) {
    switch (beat.type) {
      case 'narration':
        return <NarrationBlock key={currentBeatIndex} text={beat.text} onComplete={advanceBeat} />;

      case 'dialogue':
        return (
          <DialogueLine
            key={`${currentBeatIndex}-${beat.character}`}
            characterId={beat.character}
            lines={beat.lines}
            onComplete={advanceBeat}
          />
        );

      case 'choices':
        return (
          <ChoicePanel
            key={currentBeatIndex}
            choices={beat.choices}
            state={state}
            onChoice={handleChoice}
          />
        );

      case 'hermit': {
        const path = lastPath;
        const question = beat.question
          || (path === 'mastery' && scene!.hermitQuestions.mastery)
          || scene!.hermitQuestions[path]
          || scene!.hermitQuestions.friction;
        return (
          <HermitBeatComp
            key={currentBeatIndex}
            question={question}
            onContinue={handleHermit}
          />
        );
      }

      case 'mercy':
        // Mercy beats are handled dynamically by the choice resolver,
        // not rendered in sequence. Skip if we reach one directly.
        advanceBeat();
        return null;

      default:
        return null;
    }
  }

  return (
    <SceneFrame scene={scene}>
      {renderBeat(currentBeat)}
    </SceneFrame>
  );
}
