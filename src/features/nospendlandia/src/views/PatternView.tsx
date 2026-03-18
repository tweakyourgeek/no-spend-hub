import React from 'react';
import { useGameDispatch } from '../contexts/GameStateContext';
import { usePattern } from '../hooks/usePattern';
import { colors, fonts, animations } from '../theme';
import PatternGrid from '../components/PatternGrid';

/** Player's pattern library — fog-of-war grid with unlocked pattern details */
export default function PatternView() {
  const dispatch = useGameDispatch();
  const { unlockedPatterns, allPatterns } = usePattern();

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(180deg, ${colors.deepPlum} 0%, ${colors.plum} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      color: colors.cream,
      animation: `${animations.fadeIn} 0.5s ease-out`,
    }}>
      <h2 style={{
        fontFamily: fonts.heading,
        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
        fontWeight: 700,
        marginBottom: '0.25rem',
        marginTop: '1rem',
        color: colors.gold,
      }}>
        Chasing Patterns
      </h2>

      <p style={{
        fontFamily: fonts.body,
        fontSize: '0.9rem',
        opacity: 0.6,
        marginBottom: '2rem',
        textAlign: 'center',
        maxWidth: 400,
        lineHeight: 1.6,
      }}>
        {unlockedPatterns.length === 0
          ? 'Patterns reveal themselves as you play. Name them to unlock them.'
          : `${unlockedPatterns.length} of 6 patterns discovered.`}
      </p>

      <PatternGrid />

      {/* Unlocked pattern details */}
      {unlockedPatterns.length > 0 && (
        <div style={{
          marginTop: '2rem',
          maxWidth: 500,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}>
          {unlockedPatterns.map(pid => {
            const p = allPatterns[pid];
            return (
              <div key={pid} style={{
                background: `${colors.deepPlum}cc`,
                border: `1px solid ${colors.gold}33`,
                borderRadius: 10,
                padding: '1rem 1.25rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>{p.icon}</span>
                  <span style={{
                    fontFamily: fonts.heading,
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: colors.gold,
                  }}>
                    {p.name}
                  </span>
                </div>
                <p style={{
                  fontFamily: fonts.body,
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  opacity: 0.8,
                  marginBottom: '0.5rem',
                }}>
                  {p.description}
                </p>
                <p style={{
                  fontFamily: fonts.body,
                  fontSize: '0.8rem',
                  color: colors.sage,
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                }}>
                  {p.advice}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={() => dispatch({ type: 'NAVIGATE', screen: 'realm-map' })}
        style={{
          fontFamily: fonts.body,
          background: 'transparent',
          color: colors.lavender,
          border: `1px solid ${colors.lavender}33`,
          borderRadius: 8,
          padding: '0.75rem 1.5rem',
          cursor: 'pointer',
          fontSize: '0.9rem',
          marginTop: '2rem',
        }}
      >
        Back to Map
      </button>
    </div>
  );
}
