import React, { useState, useCallback, useEffect } from 'react';
import { useGameState, useGameDispatch } from '../contexts/GameStateContext';
import { useScene } from '../hooks/useScene';
import { resolveChoice, buildHermitEntry } from './choice-resolver';
import { getQueenLine, getHermitPullQuestion } from './mercy-engine';
import SceneFrame from '../components/SceneFrame';
import NarrationBlock from '../components/NarrationBlock';
import DialogueLine from '../components/DialogueLine';
import ChoicePanel from '../components/ChoicePanel';
import HermitBeatComp from '../components/HermitBeat';
import MercyBeatComp from '../components/MercyBeat';
import PatternGrid from '../components/PatternGrid';
import LocationTransition from '../components/LocationTransition';
import type { Choice, Beat } from '../types';
import { colors, fonts } from '../theme';

/**
 * Scene Runner — renders any scene from data. NOT scene-specific.
 *
 * Beat index walks the FULL scene.beats array.
 * useScene() resolves the current relevant beat by skipping non-matching
 * dialogue variants and mercy beats (which fire dynamically).
 */
export default function SceneRunner() {
  const state = useGameState();
  const dispatch = useGameDispatch();
  const { scene, currentBeat, currentBeatIndex } = useScene();

  // Location transition state — shows when entering a new scene
  const [showTransition, setShowTransition] = useState(true);

  // Mercy state — dynamically inserted after Pull choices
  const [mercyActive, setMercyActive] = useState(false);
  const [mercyQueenLine, setMercyQueenLine] = useState('');
  const [mercyHermitQ, setMercyHermitQ] = useState('');
  const [mercyHandled, setMercyHandled] = useState(false);

  // Track the player's last path for hermit resolution
  const [lastPath, setLastPath] = useState<'pull' | 'friction' | 'pattern' | 'mastery'>('friction');

  // Track which patterns just changed for animation
  const [changedPatterns, setChangedPatterns] = useState<string[]>([]);

  // Track how many narration beats we've shown (for establishing shot detection)
  const [narrationCount, setNarrationCount] = useState(0);

  // Reset state when scene changes
  useEffect(() => {
    setMercyActive(false);
    setMercyHandled(false);
    setShowTransition(true);
    setNarrationCount(0);
  }, [state.currentScene]);

  // Advance from the RESOLVED beat index (not the raw stored index)
  // so that skipped variants/mercy beats don't cause index drift
  const advanceBeat = useCallback(() => {
    dispatch({ type: 'ADVANCE_BEAT', fromIndex: currentBeatIndex });
  }, [dispatch, currentBeatIndex]);

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

  // Location transition — the Fool arriving at this place
  if (showTransition) {
    return (
      <LocationTransition
        location={scene.location}
        timeLabel={scene.timeLabel}
        onComplete={() => setShowTransition(false)}
      />
    );
  }

  // If mercy is active, show the mercy beat overlay
  if (mercyActive) {
    return (
      <SceneFrame scene={scene}>
        <MercyBeatComp
          queenLine={mercyQueenLine}
          hermitQuestion={mercyHermitQ}
          onContinue={() => {
            setMercyActive(false);
            setMercyHandled(true);
            // Advance past the choice beat to the next relevant beat
            advanceBeat();
          }}
        />
        <div style={{ marginTop: 'auto', paddingTop: '2rem', width: '100%', opacity: 0.5 }}>
          <PatternGrid compact changedPatterns={changedPatterns} />
        </div>
      </SceneFrame>
    );
  }

  // Scene complete — no more relevant beats
  if (!currentBeat) {
    const completeScene = () => {
      dispatch({ type: 'COMPLETE_SCENE', sceneId: scene.id });
      // Process scene unlocks
      if (scene.unlocks.scenes) {
        for (const sid of scene.unlocks.scenes) {
          dispatch({ type: 'SET_FLAG', key: `scene_unlocked_${sid}`, value: true });
        }
      }
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
    setMercyHandled(false);

    // Dispatch all actions (SET_BRANCH, APPLY_STATE_CHANGES, pattern tracking)
    for (const action of result.actions) {
      dispatch(action);
    }

    // Animate affected pattern cards
    setChangedPatterns([...scene.patternTags]);
    const timer = setTimeout(() => setChangedPatterns([]), 2000);

    // If pull, trigger mercy overlay (don't advance beat yet)
    if (result.triggersMercy) {
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

    // Non-pull choice: advance to next beat
    advanceBeat();
  }

  // Handle hermit beat completion
  function handleHermit() {
    if (!scene) return;

    // If mercy already handled the pull question, use a different path for the hermit
    const effectivePath = (lastPath === 'pull' && mercyHandled) ? 'friction' : lastPath;
    const entry = buildHermitEntry(scene, effectivePath);
    dispatch({ type: 'ADD_HERMIT_ENTRY', entry });
    advanceBeat();
  }

  // Render the current beat
  function renderBeat(beat: Beat) {
    switch (beat.type) {
      case 'narration': {
        const isFirst = narrationCount === 0;
        return (
          <NarrationBlock
            key={currentBeatIndex}
            text={beat.text}
            onComplete={() => {
              setNarrationCount(c => c + 1);
              advanceBeat();
            }}
            isEstablishing={isFirst}
          />
        );
      }

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
        // If mercy already asked the pull question, show the friction question instead
        const effectivePath = (lastPath === 'pull' && mercyHandled) ? 'friction' : lastPath;
        const question = beat.question
          || (effectivePath === 'mastery' && scene!.hermitQuestions.mastery)
          || scene!.hermitQuestions[effectivePath]
          || scene!.hermitQuestions.friction;
        return (
          <HermitBeatComp
            key={currentBeatIndex}
            question={question}
            onContinue={handleHermit}
          />
        );
      }

      // Mercy beats should never be reached here (skipped by useScene),
      // but guard against it just in case
      case 'mercy':
        advanceBeat();
        return null;

      default:
        return null;
    }
  }

  return (
    <SceneFrame scene={scene}>
      {renderBeat(currentBeat)}
      {/* Persistent mini pattern strip at bottom of scene */}
      <div style={{
        marginTop: 'auto',
        paddingTop: '2rem',
        width: '100%',
        opacity: 0.7,
        transition: 'opacity 0.3s ease',
      }}>
        <PatternGrid compact changedPatterns={changedPatterns} />
      </div>
    </SceneFrame>
  );
}
