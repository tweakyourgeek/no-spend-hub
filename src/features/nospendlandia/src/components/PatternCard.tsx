import React from 'react';
import type { ChasingPattern } from '../types';
import { colors, fonts, animations } from '../theme';

interface Props {
  pattern: ChasingPattern;
  isNew?: boolean;
}

/** Displays a revealed Chasing Pattern as a card */
export default function PatternCard({ pattern, isNew }: Props) {
  return (
    <div style={{
      background: `linear-gradient(160deg, ${colors.deepPlum}, ${colors.plum})`,
      border: `1px solid ${colors.gold}44`,
      borderRadius: 12,
      padding: '1.25rem 1.5rem',
      maxWidth: 360,
      width: '100%',
      animation: isNew ? `${animations.slideUp} 0.6s ease-out` : undefined,
      boxShadow: isNew ? `0 0 30px ${colors.gold}33` : `0 2px 12px ${colors.plum}44`,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '0.75rem',
      }}>
        <span style={{ fontSize: '1.5rem' }}>{pattern.icon}</span>
        <div>
          <div style={{
            fontFamily: fonts.heading,
            fontSize: '1.1rem',
            fontWeight: 600,
            color: colors.gold,
          }}>
            {pattern.name}
          </div>
        </div>
      </div>
      <p style={{
        fontFamily: fonts.body,
        fontSize: '0.85rem',
        color: colors.cream,
        opacity: 0.85,
        lineHeight: 1.6,
        marginBottom: '0.75rem',
      }}>
        {pattern.description}
      </p>
      <p style={{
        fontFamily: fonts.body,
        fontSize: '0.8rem',
        color: colors.sage,
        lineHeight: 1.5,
        fontStyle: 'italic',
      }}>
        {pattern.advice}
      </p>
    </div>
  );
}
