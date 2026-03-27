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

/** Visual novel dialogue — portrait beside the dialogue box */
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
      setDisplayed(currentLine);
      setLineComplete(true);
    } else if (!isLastLine) {
      setLineIndex(lineIndex + 1);
    }
  }

  if (!character) return null;

  const isMoon = characterId === 'moon';

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: lineComplete && isLastLine ? 'default' : 'pointer',
        width: '100%',
        maxWidth: 560,
        margin: '0 auto',
        animation: `${animations.fadeSlideIn} 0.4s ease-out`,
      }}
    >
      {/* Visual novel layout — portrait left, dialogue right */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 'clamp(0.75rem, 3vw, 1.25rem)',
      }}>
        {/* Character portrait — tarot card style, left side */}
        <div style={{
          flexShrink: 0,
          animation: `${animations.fadeIn} 0.6s ease-out`,
          alignSelf: 'flex-end',
        }}>
          <CharacterPortrait character={character} size={80} />
        </div>

        {/* Dialogue box */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Speaker name tag */}
          <div style={{
            fontFamily: fonts.heading,
            fontSize: '0.8rem',
            fontWeight: 600,
            color: character.colors.accent,
            marginBottom: '0.35rem',
            letterSpacing: '0.04em',
            opacity: 0.8,
          }}>
            {character.name}
            <span style={{
              fontFamily: fonts.heading,
              fontSize: '0.65rem',
              fontWeight: 400,
              fontStyle: 'italic',
              color: colors.cream,
              opacity: 0.35,
              marginLeft: '0.5rem',
            }}>
              {character.role}
            </span>
          </div>

          {/* Speech bubble */}
          <div style={{
            background: `rgba(26, 18, 40, 0.85)`,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: `1px solid ${character.colors.accent}22`,
            borderRadius: '12px 12px 12px 2px',
            padding: '1rem 1.25rem',
            lineHeight: 1.7,
            fontFamily: fonts.body,
            fontSize: 'clamp(0.88rem, 2.5vw, 0.98rem)',
            color: isMoon ? '#d4b8e0' : colors.cream,
            minHeight: 50,
            position: 'relative',
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
        </div>
      </div>

      {/* Line counter + advance hint */}
      <div style={{
        textAlign: 'right',
        marginTop: '0.4rem',
        paddingRight: '0.25rem',
      }}>
        {lines.length > 1 && (
          <span style={{
            fontFamily: fonts.body,
            fontSize: '0.65rem',
            opacity: 0.25,
            color: colors.cream,
            marginRight: '0.75rem',
          }}>
            {lineIndex + 1} / {lines.length}
          </span>
        )}
        {lineComplete && !isLastLine && (
          <span style={{
            fontFamily: fonts.body,
            fontSize: '0.7rem',
            opacity: 0.35,
            color: colors.cream,
            animation: `${animations.fadeIn} 0.3s ease-out`,
          }}>
            click to continue
          </span>
        )}
      </div>

      {/* Continue button on last line */}
      {lineComplete && isLastLine && (
        <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
          <button
            onClick={(e) => { e.stopPropagation(); onComplete(); }}
            style={{
              fontFamily: fonts.body,
              background: 'transparent',
              color: colors.cream,
              border: `1px solid ${colors.lavender}22`,
              borderRadius: 6,
              padding: '0.5rem 1.5rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
              opacity: 0.5,
              transition: 'opacity 0.2s',
              animation: `${animations.fadeIn} 0.3s ease-out`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5'; }}
          >
            continue
          </button>
        </div>
      )}
    </div>
  );
}
