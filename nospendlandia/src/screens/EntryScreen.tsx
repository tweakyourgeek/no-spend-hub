import React from 'react';
import { useGameState, useGameDispatch } from '../contexts/GameStateContext';
import { colors, fonts, animations } from '../theme';
import type { QuestId } from '../types';

const quests: { id: QuestId; label: string; icon: string; description: string; color: string }[] = [
  {
    id: 'no_spend_weekend',
    label: 'The Weekend Gate',
    icon: '☽',
    description: 'A side quest — two days of stillness',
    color: colors.peach,
  },
  {
    id: 'no_spend_week',
    label: 'The Seven-Day Door',
    icon: '⚝',
    description: 'The main quest — a full week of intention',
    color: colors.sage,
  },
  {
    id: 'low_spend_month',
    label: 'The Lunar Arch',
    icon: '☾',
    description: 'The epic — thirty days of transformation',
    color: colors.mauve,
  },
];

export default function EntryScreen() {
  const { completedQuests, currentQuest } = useGameState();
  const dispatch = useGameDispatch();

  function selectQuest(quest: QuestId) {
    dispatch({ type: 'START_QUEST', questId: quest });
    dispatch({ type: 'NAVIGATE', screen: 'realm-map' });
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: `linear-gradient(170deg, ${colors.deepPlum} 0%, ${colors.plum} 40%, ${colors.mauve}33 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'max(env(safe-area-inset-top, 0px), 1.5rem) clamp(1rem, 4vw, 2rem) max(env(safe-area-inset-bottom, 0px), 1.5rem)',
      color: colors.cream,
      animation: `${animations.fadeIn} 0.6s ease-out`,
      overflowX: 'hidden',
    }}>
      {/* The Fool card */}
      <div style={{
        width: 80,
        height: 110,
        borderRadius: 12,
        background: `linear-gradient(160deg, ${colors.lavender}cc, ${colors.peach}88, ${colors.mauve}66)`,
        marginBottom: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 0 40px ${colors.mauve}44, inset 0 0 20px ${colors.cream}22`,
        border: `1.5px solid ${colors.cream}33`,
        animation: `${animations.float} 4s ease-in-out infinite`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <span style={{ fontSize: '2rem', marginBottom: 2 }}>0</span>
        <span style={{
          fontFamily: fonts.heading,
          fontSize: '0.55rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          opacity: 0.6,
        }}>
          The Fool
        </span>
        {/* Shimmer overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(110deg, transparent 30%, ${colors.cream}15 50%, transparent 70%)`,
          backgroundSize: '200% 100%',
          animation: `${animations.shimmer} 3s linear infinite`,
        }} />
      </div>

      <h1 style={{
        fontFamily: fonts.heading,
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 700,
        margin: '0 0 0.25rem',
        letterSpacing: '0.04em',
        animation: `${animations.slideUp} 0.6s ease-out 0.1s both`,
      }}>
        Nospendlandia
      </h1>

      <p style={{
        fontFamily: fonts.body,
        fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
        opacity: 0.7,
        marginBottom: '2.5rem',
        textAlign: 'center',
        maxWidth: 420,
        lineHeight: 1.6,
        animation: `${animations.slideUp} 0.6s ease-out 0.2s both`,
      }}>
        The Fool stands at the crossroads.<br />
        Three doors shimmer before you. Choose your path.
      </p>

      {/* Three Doors — stack vertically on narrow screens */}
      <div style={{
        display: 'flex',
        gap: 'clamp(0.75rem, 2vw, 1.5rem)',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 720,
        width: '100%',
      }}>
        {quests.map((q, i) => {
          const isCompleted = completedQuests.includes(q.id);
          const isActive = currentQuest === q.id && !isCompleted;
          return (
            <button
              key={q.id}
              onClick={() => selectQuest(q.id)}
              style={{
                background: `linear-gradient(160deg, ${colors.deepPlum}, ${colors.plum})`,
                border: `2px solid ${isActive ? q.color : `${q.color}44`}`,
                borderRadius: 16,
                padding: 'clamp(1.25rem, 3vw, 2rem) clamp(1rem, 2vw, 1.5rem)',
                width: 'clamp(160px, 28vw, 200px)',
                cursor: 'pointer',
                color: colors.cream,
                textAlign: 'center',
                transition: 'all 0.25s ease',
                boxShadow: `0 4px 24px ${colors.plum}44`,
                fontFamily: fonts.body,
                animation: `${animations.slideUp} 0.5s ease-out ${0.3 + i * 0.1}s both`,
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
                e.currentTarget.style.boxShadow = `0 12px 36px ${q.color}44`;
                e.currentTarget.style.borderColor = q.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = `0 4px 24px ${colors.plum}44`;
                e.currentTarget.style.borderColor = `${q.color}44`;
              }}
            >
              {isCompleted && (
                <div style={{
                  position: 'absolute',
                  top: 8,
                  right: 10,
                  fontSize: '0.7rem',
                  color: colors.sage,
                  opacity: 0.7,
                }}>✓</div>
              )}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: 8,
                  right: 10,
                  fontSize: '0.6rem',
                  fontFamily: fonts.body,
                  color: q.color,
                  opacity: 0.8,
                  letterSpacing: '0.03em',
                }}>in progress</div>
              )}
              <div style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                marginBottom: '0.75rem',
                filter: `drop-shadow(0 0 8px ${q.color}66)`,
              }}>
                {q.icon}
              </div>
              <div style={{
                fontFamily: fonts.heading,
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}>
                {q.label}
              </div>
              <div style={{
                fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                opacity: 0.6,
                lineHeight: 1.5,
              }}>
                {q.description}
              </div>
            </button>
          );
        })}
      </div>

      {/* Mantra */}
      <p style={{
        fontFamily: fonts.heading,
        fontStyle: 'italic',
        fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
        opacity: 0.4,
        marginTop: '3rem',
        animation: `${animations.fadeIn} 1s ease-out 0.8s both`,
      }}>
        "Your spending is data. Not a verdict."
      </p>

      {completedQuests.length > 0 && (
        <p style={{
          fontFamily: fonts.body,
          fontSize: '0.8rem',
          opacity: 0.35,
          marginTop: '1rem',
        }}>
          {completedQuests.length} quest{completedQuests.length !== 1 ? 's' : ''} completed
        </p>
      )}
    </div>
  );
}
