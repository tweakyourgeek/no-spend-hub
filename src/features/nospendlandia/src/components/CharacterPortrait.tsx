import React from 'react';
import type { Character } from '../types';
import { colors, fonts, animations } from '../theme';

interface Props {
  character: Character;
  size?: number;
}

/** Tarot card-styled character portrait with layered CSS effects */
export default function CharacterPortrait({ character, size = 120 }: Props) {
  const innerSize = size * 0.7;
  const bgColor = character.colors.bg;
  const accentColor = character.colors.accent;

  return (
    <div style={{
      width: size,
      height: size * 1.35,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      animation: `${animations.fadeIn} 0.6s ease-out`,
    }}>
      {/* Outer glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: size * 1.2,
        height: size * 1.2,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${bgColor}44 0%, transparent 70%)`,
        animation: `${animations.pulseGlow} 3s ease-in-out infinite`,
      }} />

      {/* Card frame */}
      <div style={{
        width: size,
        height: size * 1.35,
        borderRadius: 12,
        border: `2px solid ${accentColor}66`,
        background: `linear-gradient(160deg, ${bgColor}dd, ${colors.deepPlum})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 4px 30px ${bgColor}44, inset 0 0 30px ${bgColor}22`,
      }}>
        {/* Decorative top arc */}
        <svg
          viewBox="0 0 100 30"
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            opacity: 0.3,
          }}
        >
          <path d="M0 30 Q50 0 100 30" fill="none" stroke={accentColor} strokeWidth="1" />
          <circle cx="50" cy="8" r="3" fill={accentColor} opacity="0.5" />
        </svg>

        {/* Roman numeral */}
        <div style={{
          position: 'absolute',
          top: 6,
          right: 8,
          fontFamily: fonts.heading,
          fontSize: size * 0.1,
          color: accentColor,
          opacity: 0.5,
        }}>
          {character.romanNumeral}
        </div>

        {/* Character glyph */}
        <div style={{
          width: innerSize,
          height: innerSize,
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${accentColor}44, ${bgColor}88, ${colors.deepPlum})`,
          border: `2px solid ${accentColor}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: innerSize * 0.45,
          color: colors.cream,
          fontFamily: fonts.heading,
          fontWeight: 700,
          textShadow: `0 0 20px ${accentColor}`,
          animation: `${animations.float} 4s ease-in-out infinite`,
          overflow: 'hidden',
        }}>
          {character.glyph}
        </div>

        {/* Role label */}
        <div style={{
          fontFamily: fonts.heading,
          fontSize: size * 0.1,
          color: accentColor,
          marginTop: 8,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          opacity: 0.7,
        }}>
          {character.role}
        </div>

        {/* Bottom decorative line */}
        <svg
          viewBox="0 0 100 10"
          style={{
            position: 'absolute',
            bottom: 4,
            width: '60%',
            opacity: 0.3,
          }}
        >
          <line x1="0" y1="5" x2="40" y2="5" stroke={accentColor} strokeWidth="0.5" strokeLinecap="round" />
          <circle cx="50" cy="5" r="2" fill={accentColor} />
          <line x1="60" y1="5" x2="100" y2="5" stroke={accentColor} strokeWidth="0.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
