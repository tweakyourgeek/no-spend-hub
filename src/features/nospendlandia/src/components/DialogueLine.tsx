import React, { useState, useEffect } from 'react';
import { colors, fonts, animations } from '../theme';
import { characters } from '../data/characters';
import CharacterPortrait from './CharacterPortrait';
import type { CharacterId } from '../types';

interface Props {
  characterId: CharacterId;
  lines: string[];
  onComplete: () => void;
}

/** Single NPC dialogue block with typewriter effect on each line */
export default function DialogueLine({ characterId, lines, onComplete }: Props) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [lineComplete, setLineComplete] = useState(false);

  const character = characters[characterId];
  const currentLine = lines[lineIndex] || '';
  const isLastLine = lineIndex >= lines.length - 1;

  // Typewriter for current line
  useEffect(() => {
    setDisplayed('');
    setLineComplete(false);
    let i = 0;
    const speed = 18;
    const interval = setInterval(() => {
      i++;
      setDisplayed(currentLine.slice(0, i));
      if (i >= currentLine.length) {
        clearInterval(interval);
        setLineComplete(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [currentLine, lineIndex]);

  function handleClick() {
    if (!lineComplete) {
      // Skip typewriter
      setDisplayed(currentLine);
      setLineComplete(true);
    } else if (!isLastLine) {
      // Advance to next line
      setLineIndex(lineIndex + 1);
    }
  }

  if (!character) return null;

  // Night mode for Moon scenes
  const isMoon = characterId === 'moon';
  const bgColor = isMoon ? '#1a1228' : colors.deepPlum;

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: lineComplete && isLastLine ? 'default' : 'pointer',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Portrait */}
      <div style={{ marginBottom: '1rem' }}>
        <CharacterPortrait character={character} size={90} />
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: fonts.heading,
        fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
        fontWeight: 600,
        margin: '0 0 0.2rem',
        color: character.colors.accent,
        animation: `${animations.fadeIn} 0.3s ease-out`,
      }}>
        {character.name}
      </h3>
      <p style={{
        fontFamily: fonts.heading,
        fontSize: '0.75rem',
        opacity: 0.4,
        margin: '0 0 1.25rem',
        fontStyle: 'italic',
        color: colors.cream,
      }}>
        {character.role}
      </p>

      {/* Dialogue bubble */}
      <div style={{
        background: `${bgColor}cc`,
        border: `1px solid ${character.colors.accent}33`,
        borderRadius: 12,
        padding: '1.25rem 1.75rem',
        maxWidth: 520,
        width: '100%',
        lineHeight: 1.7,
        fontFamily: fonts.body,
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        color: isMoon ? '#d4b8e0' : colors.cream,
        minHeight: 60,
        animation: `${animations.fadeIn} 0.3s ease-out`,
      }}>
        {displayed}
        {!lineComplete && (
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

      {/* Line counter */}
      {lines.length > 1 && (
        <p style={{
          fontFamily: fonts.body,
          fontSize: '0.7rem',
          opacity: 0.3,
          marginTop: '0.5rem',
          color: colors.cream,
        }}>
          {lineIndex + 1} / {lines.length}
        </p>
      )}

      {/* Advance hint or continue button */}
      {lineComplete && !isLastLine && (
        <p style={{
          fontFamily: fonts.body,
          fontSize: '0.75rem',
          opacity: 0.4,
          marginTop: '0.5rem',
          color: colors.cream,
          animation: `${animations.fadeIn} 0.3s ease-out`,
        }}>
          click to continue
        </p>
      )}
      {lineComplete && isLastLine && (
        <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
          <button
            onClick={(e) => { e.stopPropagation(); onComplete(); }}
            style={{
              fontFamily: fonts.body,
              background: 'transparent',
              color: colors.cream,
              border: `1px solid ${colors.lavender}33`,
              borderRadius: 6,
              padding: '0.5rem 1.5rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
              opacity: 0.6,
              transition: 'opacity 0.2s',
              animation: `${animations.fadeIn} 0.3s ease-out`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; }}
          >
            continue
          </button>
        </div>
      )}
    </div>
  );
}
