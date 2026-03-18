import React from 'react';
import { colors, fonts, animations } from '../theme';
import { characters } from '../data/characters';
import CharacterPortrait from './CharacterPortrait';

interface Props {
  queenLine: string;
  hermitQuestion: string;
  onContinue: () => void;
}

/**
 * Mercy Beat — fires after every Pull choice.
 *
 * Queen of Pentacles line (warm, short, zero judgment) +
 * Hermit question specific to the pull context +
 * "continue" button.
 */
export default function MercyBeat({ queenLine, hermitQuestion, onContinue }: Props) {
  const queen = characters.queen_of_pentacles;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      maxWidth: 500,
      width: '100%',
      animation: `${animations.fadeIn} 0.8s ease-out`,
    }}>
      {/* Queen portrait — smaller, gentler */}
      <div style={{ opacity: 0.8 }}>
        <CharacterPortrait character={queen} size={70} />
      </div>

      {/* Queen line */}
      <p style={{
        fontFamily: fonts.body,
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        color: colors.cream,
        textAlign: 'center',
        lineHeight: 1.7,
        maxWidth: 400,
      }}>
        {queenLine}
      </p>

      {/* Divider */}
      <div style={{
        width: 30,
        height: 1,
        background: colors.mauve,
        opacity: 0.4,
      }} />

      {/* Hermit question */}
      <p style={{
        fontFamily: fonts.heading,
        fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
        fontStyle: 'italic',
        color: colors.lavender,
        textAlign: 'center',
        lineHeight: 1.6,
        opacity: 0.8,
        animation: `${animations.fadeIn} 1s ease-out 0.5s both`,
      }}>
        {hermitQuestion}
      </p>

      {/* Continue */}
      <button
        onClick={onContinue}
        style={{
          fontFamily: fonts.body,
          background: 'transparent',
          color: colors.cream,
          border: `1px solid ${colors.lavender}22`,
          borderRadius: 6,
          padding: '0.6rem 2rem',
          cursor: 'pointer',
          fontSize: '0.85rem',
          opacity: 0.5,
          transition: 'opacity 0.2s',
          animation: `${animations.fadeIn} 1s ease-out 1s both`,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5'; }}
      >
        continue
      </button>
    </div>
  );
}
