import React from 'react';
import { useGameState, useGameDispatch } from '../contexts/GameStateContext';
import { colors, fonts } from '../theme';

const paths = [
  { label: 'Weekend Gate', glow: colors.peach, quest: 'no-spend-weekend' as const },
  { label: 'Seven-Day Door', glow: colors.sage, quest: 'no-spend-week' as const },
  { label: 'Lunar Arch', glow: colors.mauve, quest: 'low-spend-month' as const },
];

export default function RealmMapScreen() {
  const { activeQuest } = useGameState();
  const dispatch = useGameDispatch();

  return (
    <div style={{
      minHeight: '100vh',
      background: `radial-gradient(ellipse at 50% 30%, ${colors.plum}dd 0%, ${colors.plum} 70%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      color: colors.cream,
    }}>
      <h2 style={{
        fontFamily: fonts.heading,
        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
        fontWeight: 700,
        marginBottom: '0.5rem',
      }}>
        The Crossroads
      </h2>

      <p style={{
        fontFamily: fonts.body,
        fontSize: '0.95rem',
        opacity: 0.7,
        marginBottom: '3rem',
        textAlign: 'center',
      }}>
        {activeQuest
          ? `You walk the ${activeQuest.replace(/-/g, ' ')} path.`
          : 'Three paths diverge beneath a starlit sky.'}
      </p>

      {/* Crossroads SVG layout */}
      <svg
        viewBox="0 0 400 300"
        width="100%"
        style={{ maxWidth: 500, marginBottom: '2rem' }}
      >
        {/* Center circle — the crossroads */}
        <circle cx="200" cy="200" r="18" fill={colors.lavender} opacity={0.3} />
        <circle cx="200" cy="200" r="6" fill={colors.cream} />

        {/* Path lines */}
        <line x1="200" y1="200" x2="80" y2="60" stroke={colors.peach} strokeWidth={2} opacity={0.5} />
        <line x1="200" y1="200" x2="200" y2="40" stroke={colors.sage} strokeWidth={2} opacity={0.5} />
        <line x1="200" y1="200" x2="320" y2="60" stroke={colors.mauve} strokeWidth={2} opacity={0.5} />

        {/* Glowing sign posts */}
        {paths.map((p, i) => {
          const positions = [
            { x: 80, y: 50 },
            { x: 200, y: 30 },
            { x: 320, y: 50 },
          ];
          const pos = positions[i];
          const isActive = activeQuest === p.quest;
          return (
            <g key={p.quest}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 28 : 22}
                fill={p.glow}
                opacity={isActive ? 0.6 : 0.25}
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fill={colors.cream}
                fontFamily={fonts.heading}
                fontSize={10}
                fontWeight={600}
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: 'dialogue' })}
          style={{
            fontFamily: fonts.body,
            background: colors.sage,
            color: colors.plum,
            border: 'none',
            borderRadius: 8,
            padding: '0.75rem 1.5rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.95rem',
          }}
        >
          Begin Encounter
        </button>
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: 'entry' })}
          style={{
            fontFamily: fonts.body,
            background: 'transparent',
            color: colors.lavender,
            border: `1px solid ${colors.lavender}44`,
            borderRadius: 8,
            padding: '0.75rem 1.5rem',
            cursor: 'pointer',
            fontSize: '0.95rem',
          }}
        >
          Back to Doors
        </button>
      </div>
    </div>
  );
}
