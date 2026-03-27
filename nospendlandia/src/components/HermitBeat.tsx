import React from 'react';
import { colors, fonts, animations } from '../theme';

interface Props {
  question: string;
  onContinue: () => void;
}

/**
 * End-of-scene Hermit question.
 * No portrait, ambient only. The question is displayed with no answer box —
 * the player just reads it and sits with it.
 */
export default function HermitBeat({ question, onContinue }: Props) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem',
      maxWidth: 480,
      width: '100%',
      animation: `${animations.fadeIn} 1s ease-out`,
    }}>
      {/* Hermit glyph — ambient */}
      <div style={{
        fontSize: '1.5rem',
        opacity: 0.3,
        color: colors.cream,
        animation: `${animations.float} 4s ease-in-out infinite`,
      }}>
        ☽
      </div>

      {/* The question */}
      <p style={{
        fontFamily: fonts.heading,
        fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
        fontWeight: 400,
        fontStyle: 'italic',
        color: colors.cream,
        textAlign: 'center',
        lineHeight: 1.7,
        opacity: 0.85,
      }}>
        {question}
      </p>

      {/* Quiet pause indicator */}
      <div style={{
        width: 40,
        height: 1,
        background: colors.lavender,
        opacity: 0.3,
      }} />

      <button
        onClick={onContinue}
        style={{
          fontFamily: fonts.body,
          background: 'transparent',
          color: colors.lavender,
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
