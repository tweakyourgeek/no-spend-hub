import React from 'react';
import { useGameDispatch } from '../contexts/GameStateContext';
import { colors, fonts } from '../theme';
import type { Quest } from '../types';

const quests: { id: Quest; label: string; icon: string; description: string }[] = [
  {
    id: 'no-spend-weekend',
    label: 'The Weekend Gate',
    icon: '☽',
    description: 'A side quest — two days of stillness',
  },
  {
    id: 'no-spend-week',
    label: 'The Seven-Day Door',
    icon: '⚝',
    description: 'The main quest — a full week of intention',
  },
  {
    id: 'low-spend-month',
    label: 'The Lunar Arch',
    icon: '☾',
    description: 'The epic — thirty days of transformation',
  },
];

export default function EntryScreen() {
  const dispatch = useGameDispatch();

  function selectQuest(quest: Quest) {
    dispatch({ type: 'SET_QUEST', quest });
    dispatch({ type: 'NAVIGATE', screen: 'realm-map' });
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(170deg, ${colors.plum} 0%, ${colors.plum}ee 40%, ${colors.mauve}44 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      color: colors.cream,
    }}>
      {/* The Fool */}
      <div style={{
        width: 80,
        height: 120,
        borderRadius: '50% 50% 45% 45%',
        background: `linear-gradient(${colors.lavender}, ${colors.peach})`,
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2.5rem',
        boxShadow: `0 0 40px ${colors.mauve}66`,
      }}>
        0
      </div>

      <h1 style={{
        fontFamily: fonts.heading,
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 700,
        margin: '0 0 0.25rem',
        letterSpacing: '0.04em',
      }}>
        Nospendlandia
      </h1>

      <p style={{
        fontFamily: fonts.body,
        fontSize: '1rem',
        opacity: 0.8,
        marginBottom: '2.5rem',
        textAlign: 'center',
        maxWidth: 420,
        lineHeight: 1.6,
      }}>
        The Fool stands at the crossroads.<br />
        Three doors shimmer before you. Choose your path.
      </p>

      {/* Three Doors */}
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 720,
      }}>
        {quests.map((q) => (
          <button
            key={q.id}
            onClick={() => selectQuest(q.id)}
            style={{
              background: `linear-gradient(160deg, ${colors.plum}cc, ${colors.plum})`,
              border: `2px solid ${colors.mauve}88`,
              borderRadius: 16,
              padding: '2rem 1.5rem',
              width: 200,
              cursor: 'pointer',
              color: colors.cream,
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
              boxShadow: `0 4px 24px ${colors.plum}44`,
              fontFamily: fonts.body,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
              e.currentTarget.style.boxShadow = `0 8px 32px ${colors.mauve}66`;
              e.currentTarget.style.borderColor = colors.sage;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = `0 4px 24px ${colors.plum}44`;
              e.currentTarget.style.borderColor = `${colors.mauve}88`;
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{q.icon}</div>
            <div style={{
              fontFamily: fonts.heading,
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
            }}>
              {q.label}
            </div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.5 }}>
              {q.description}
            </div>
          </button>
        ))}
      </div>

      {/* Mantra */}
      <p style={{
        fontFamily: fonts.heading,
        fontStyle: 'italic',
        fontSize: '1rem',
        opacity: 0.5,
        marginTop: '3rem',
      }}>
        "Your spending is data. Not a verdict."
      </p>
    </div>
  );
}
