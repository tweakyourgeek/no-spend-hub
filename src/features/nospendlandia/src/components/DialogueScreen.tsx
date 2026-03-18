import React, { useState, useEffect } from 'react';
import { useGameState, useGameDispatch } from '../contexts/GameStateContext';
import { colors, fonts, animations } from '../theme';
import { characters } from '../data/characters';
import { dialogues } from '../data/dialogues';
import { chasingPatterns } from '../data/patterns';
import CharacterPortrait from './CharacterPortrait';
import PatternCard from './PatternCard';
import type { DialogueChoice } from '../types';

export default function DialogueScreen() {
  const { currentDialogueId, flags } = useGameState();
  const dispatch = useGameDispatch();
  const [displayedText, setDisplayedText] = useState('');
  const [textComplete, setTextComplete] = useState(false);
  const [revealedPattern, setRevealedPattern] = useState<string | null>(null);
  const [pendingChoice, setPendingChoice] = useState<DialogueChoice | null>(null);
  const [choicesVisible, setChoicesVisible] = useState(false);

  const node = currentDialogueId ? dialogues[currentDialogueId] : null;
  const character = node ? characters[node.characterId] : null;

  // Typewriter effect
  useEffect(() => {
    if (!node) return;
    setDisplayedText('');
    setTextComplete(false);
    setChoicesVisible(false);
    setRevealedPattern(null);
    setPendingChoice(null);

    let i = 0;
    const text = node.text;
    const speed = 18;

    const interval = setInterval(() => {
      i++;
      setDisplayedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setTextComplete(true);
        setTimeout(() => setChoicesVisible(true), 300);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [node?.id]);

  // Skip typewriter on click
  function skipTypewriter() {
    if (!node || textComplete) return;
    setDisplayedText(node.text);
    setTextComplete(true);
    setTimeout(() => setChoicesVisible(true), 100);
  }

  function handleChoice(choice: DialogueChoice) {
    if (choice.setsFlag) {
      dispatch({ type: 'SET_FLAG', key: choice.setsFlag, value: true });
    }
    if (choice.revealsPattern) {
      dispatch({ type: 'REVEAL_PATTERN', patternId: choice.revealsPattern });
      setRevealedPattern(choice.revealsPattern);
      setPendingChoice(choice);
      return;
    }
    navigateAfterChoice(choice);
  }

  function dismissPattern() {
    if (!pendingChoice) return;
    const choice = pendingChoice;
    setRevealedPattern(null);
    setPendingChoice(null);
    navigateAfterChoice(choice);
  }

  function navigateAfterChoice(choice: DialogueChoice) {
    if (choice.nextDialogue) {
      dispatch({ type: 'SET_DIALOGUE', dialogueId: choice.nextDialogue });
    } else if (choice.nextScreen) {
      if (choice.nextScreen === 'realm-map') {
        dispatch({ type: 'ADVANCE_ENCOUNTER' });
      }
      dispatch({ type: 'NAVIGATE', screen: choice.nextScreen });
    }
  }

  function leaveDialogue() {
    dispatch({ type: 'NAVIGATE', screen: 'realm-map' });
  }

  if (!node || !character) {
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
        <p>No dialogue found. <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: 'realm-map' })}
          style={{
            color: colors.sage,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >Return to crossroads</button></p>
      </div>
    );
  }

  // Pattern reveal overlay — tap to continue
  if (revealedPattern && chasingPatterns[revealedPattern]) {
    return (
      <div
        onClick={dismissPattern}
        style={{
          minHeight: '100vh',
          background: `radial-gradient(ellipse at 50% 40%, ${colors.deepPlum} 0%, ${colors.plum} 70%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          color: colors.cream,
          cursor: 'pointer',
        }}>
        <p style={{
          fontFamily: fonts.heading,
          fontSize: 'clamp(1rem, 3vw, 1.3rem)',
          color: colors.gold,
          marginBottom: '1.5rem',
          animation: `${animations.fadeIn} 0.5s ease-out`,
        }}>
          A Chasing Pattern revealed...
        </p>
        <PatternCard pattern={chasingPatterns[revealedPattern]} isNew />
        <p style={{
          fontFamily: fonts.body,
          fontSize: '0.8rem',
          opacity: 0.5,
          marginTop: '1.5rem',
          animation: `${animations.fadeIn} 1s ease-out 0.5s both`,
        }}>
          tap anywhere to continue
        </p>
      </div>
    );
  }

  return (
    <div
      onClick={skipTypewriter}
      style={{
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${colors.deepPlum} 0%, ${colors.plum} 40%, ${colors.mauve}22 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        color: colors.cream,
        cursor: textComplete ? 'default' : 'pointer',
      }}
    >
      {/* Character portrait */}
      <div style={{ marginBottom: '1.5rem' }}>
        <CharacterPortrait character={character} size={100} />
      </div>

      {/* Character name */}
      <h3 style={{
        fontFamily: fonts.heading,
        fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
        fontWeight: 600,
        margin: '0 0 0.25rem',
        letterSpacing: '0.03em',
        animation: `${animations.fadeIn} 0.4s ease-out`,
      }}>
        {character.name}
      </h3>
      <p style={{
        fontFamily: fonts.heading,
        fontSize: '0.8rem',
        opacity: 0.5,
        margin: '0 0 1.5rem',
        fontStyle: 'italic',
      }}>
        {character.title}
      </p>

      {/* Dialogue text */}
      <div style={{
        background: `${colors.deepPlum}cc`,
        border: `1px solid ${colors.mauve}33`,
        borderRadius: 12,
        padding: '1.5rem 2rem',
        maxWidth: 520,
        width: '100%',
        marginBottom: '2rem',
        lineHeight: 1.7,
        fontFamily: fonts.body,
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        minHeight: 100,
      }}>
        {displayedText}
        {!textComplete && (
          <span style={{
            display: 'inline-block',
            width: 2,
            height: '1em',
            background: colors.cream,
            marginLeft: 2,
            animation: `${animations.cursorBlink} 0.8s step-end infinite`,
          }} />
        )}
      </div>

      {/* Click hint */}
      {!textComplete && (
        <p style={{
          fontFamily: fonts.body,
          fontSize: '0.75rem',
          opacity: 0.4,
          marginBottom: '1rem',
        }}>
          click to skip
        </p>
      )}

      {/* Choice buttons */}
      {choicesVisible && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          maxWidth: 520,
          width: '100%',
          animation: `${animations.slideUp} 0.4s ease-out`,
        }}>
          {node.choices.map((choice, i) => (
            <button
              key={choice.id}
              onClick={(e) => { e.stopPropagation(); handleChoice(choice); }}
              style={{
                fontFamily: fonts.body,
                background: `${colors.deepPlum}`,
                color: colors.cream,
                border: `1px solid ${colors.sage}44`,
                borderRadius: 8,
                padding: '0.85rem 1.25rem',
                cursor: 'pointer',
                fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                animation: `${animations.fadeSlideIn} 0.3s ease-out ${i * 0.08}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${colors.sage}22`;
                e.currentTarget.style.borderColor = colors.sage;
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.deepPlum;
                e.currentTarget.style.borderColor = `${colors.sage}44`;
                e.currentTarget.style.transform = '';
              }}
            >
              {choice.label}
            </button>
          ))}
          {/* Leave dialogue option */}
          <button
            onClick={(e) => { e.stopPropagation(); leaveDialogue(); }}
            style={{
              fontFamily: fonts.body,
              background: 'transparent',
              color: colors.lavender,
              border: `1px solid ${colors.lavender}22`,
              borderRadius: 8,
              padding: '0.6rem 1.25rem',
              cursor: 'pointer',
              fontSize: '0.8rem',
              textAlign: 'center',
              opacity: 0.5,
              transition: 'all 0.2s ease',
              marginTop: '0.25rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.borderColor = `${colors.lavender}55`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.5';
              e.currentTarget.style.borderColor = `${colors.lavender}22`;
            }}
          >
            Leave conversation
          </button>
        </div>
      )}
    </div>
  );
}
