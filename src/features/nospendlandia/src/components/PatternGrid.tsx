import React from 'react';
import { colors, fonts, animations } from '../theme';
import { usePattern } from '../hooks/usePattern';

/**
 * Fog-of-war pattern unlock display.
 * Shows all six patterns — unlocked ones are revealed, locked ones are fogged.
 */
export default function PatternGrid() {
  const { gridData } = usePattern();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
      gap: '0.75rem',
      maxWidth: 500,
      width: '100%',
    }}>
      {gridData.map(p => (
        <div
          key={p.id}
          style={{
            background: p.unlocked
              ? `linear-gradient(160deg, ${colors.deepPlum}, ${colors.plum})`
              : `${colors.deepPlum}88`,
            border: `1px solid ${p.unlocked ? `${colors.gold}44` : `${colors.lavender}15`}`,
            borderRadius: 10,
            padding: '1rem 0.75rem',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            animation: p.unlocked ? `${animations.fadeSlideIn} 0.4s ease-out` : undefined,
          }}
        >
          {p.unlocked ? (
            <>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {p.icon}
              </div>
              <div style={{
                fontFamily: fonts.heading,
                fontSize: '0.95rem',
                fontWeight: 600,
                color: colors.gold,
                marginBottom: '0.25rem',
              }}>
                {p.name}
              </div>
              <div style={{
                fontFamily: fonts.body,
                fontSize: '0.7rem',
                color: colors.cream,
                opacity: 0.6,
                lineHeight: 1.4,
              }}>
                {p.description.slice(0, 60)}...
              </div>
            </>
          ) : (
            <>
              <div style={{
                fontSize: '1.5rem',
                marginBottom: '0.5rem',
                opacity: 0.2,
                filter: 'blur(2px)',
              }}>
                ?
              </div>
              <div style={{
                fontFamily: fonts.heading,
                fontSize: '0.85rem',
                color: colors.lavender,
                opacity: 0.25,
                fontStyle: 'italic',
              }}>
                Unknown
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
