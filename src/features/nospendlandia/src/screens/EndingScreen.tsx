import React from 'react';
import { useGameState, useGameDispatch } from '../contexts/GameStateContext';
import { colors, fonts, animations } from '../theme';
import { chasingPatterns } from '../data/patterns';
import PatternCard from '../components/PatternCard';

export default function EndingScreen() {
  const { activeQuest, revealedPatterns, completedQuests, flags } = useGameState();
  const dispatch = useGameDispatch();

  const questName = activeQuest
    ? { 'no-spend-weekend': 'The Weekend Gate', 'no-spend-week': 'The Seven-Day Door', 'low-spend-month': 'The Lunar Arch' }[activeQuest]
    : 'your quest';

  return (
    <div style={{
      minHeight: '100vh',
      background: `radial-gradient(ellipse at 50% 30%, ${colors.starBlue}44 0%, ${colors.deepPlum} 50%, ${colors.plum} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '3rem 2rem',
      color: colors.cream,
      animation: `${animations.fadeIn} 1s ease-out`,
    }}>
      {/* Star burst */}
      <div style={{
        fontSize: '3rem',
        marginBottom: '1rem',
        animation: `${animations.float} 3s ease-in-out infinite`,
      }}>
        ⚝
      </div>

      <h1 style={{
        fontFamily: fonts.heading,
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 700,
        marginBottom: '0.5rem',
        textAlign: 'center',
        background: `linear-gradient(135deg, ${colors.cream}, ${colors.gold})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Journey Complete
      </h1>

      <p style={{
        fontFamily: fonts.heading,
        fontSize: 'clamp(1rem, 3vw, 1.2rem)',
        opacity: 0.6,
        marginBottom: '2.5rem',
        textAlign: 'center',
        fontStyle: 'italic',
      }}>
        You have walked through {questName}.
      </p>

      {/* Summary */}
      <div style={{
        background: `${colors.deepPlum}cc`,
        border: `1px solid ${colors.gold}33`,
        borderRadius: 16,
        padding: '2rem',
        maxWidth: 500,
        width: '100%',
        marginBottom: '2rem',
      }}>
        <h3 style={{
          fontFamily: fonts.heading,
          fontSize: '1.2rem',
          color: colors.gold,
          marginBottom: '1rem',
        }}>
          What You Discovered
        </h3>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          fontFamily: fonts.body,
          fontSize: '0.9rem',
        }}>
          <div style={{
            background: `${colors.sage}22`,
            border: `1px solid ${colors.sage}33`,
            borderRadius: 8,
            padding: '0.75rem 1rem',
            flex: 1,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
              {revealedPatterns.length}
            </div>
            <div style={{ opacity: 0.7, fontSize: '0.8rem' }}>Patterns Found</div>
          </div>
          <div style={{
            background: `${colors.mauve}22`,
            border: `1px solid ${colors.mauve}33`,
            borderRadius: 8,
            padding: '0.75rem 1rem',
            flex: 1,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
              {Object.keys(flags).filter(k => k.startsWith('met_')).length}
            </div>
            <div style={{ opacity: 0.7, fontSize: '0.8rem' }}>Guides Met</div>
          </div>
          <div style={{
            background: `${colors.gold}22`,
            border: `1px solid ${colors.gold}33`,
            borderRadius: 8,
            padding: '0.75rem 1rem',
            flex: 1,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
              {completedQuests.length + (activeQuest && !completedQuests.includes(activeQuest) ? 1 : 0)}
            </div>
            <div style={{ opacity: 0.7, fontSize: '0.8rem' }}>Quests Done</div>
          </div>
        </div>

        {/* Revealed patterns */}
        {revealedPatterns.length > 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}>
            <p style={{
              fontFamily: fonts.heading,
              fontSize: '0.95rem',
              color: colors.gold,
              opacity: 0.7,
            }}>
              Your Chasing Patterns:
            </p>
            {revealedPatterns.map((pid) => {
              const pat = chasingPatterns[pid];
              if (!pat) return null;
              return <PatternCard key={pid} pattern={pat} />;
            })}
          </div>
        )}
      </div>

      {/* Mantra */}
      <p style={{
        fontFamily: fonts.heading,
        fontSize: 'clamp(1rem, 3vw, 1.2rem)',
        fontStyle: 'italic',
        opacity: 0.5,
        marginBottom: '2rem',
        textAlign: 'center',
        maxWidth: 400,
        lineHeight: 1.6,
      }}>
        "Your spending is data. Not a verdict."
      </p>

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {flags.has_journal && (
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', screen: 'journal' })}
            style={{
              fontFamily: fonts.body,
              background: `linear-gradient(135deg, ${colors.gold}, ${colors.gold}cc)`,
              color: colors.deepPlum,
              border: 'none',
              borderRadius: 8,
              padding: '0.85rem 2rem',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
          >
            Open Journal
          </button>
        )}
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: 'entry' })}
          style={{
            fontFamily: fonts.body,
            background: `linear-gradient(135deg, ${colors.sage}, ${colors.sage}cc)`,
            color: colors.plum,
            border: 'none',
            borderRadius: 8,
            padding: '0.85rem 2rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.95rem',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
        >
          Begin Another Quest
        </button>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          style={{
            fontFamily: fonts.body,
            background: 'transparent',
            color: colors.lavender,
            border: `1px solid ${colors.lavender}33`,
            borderRadius: 8,
            padding: '0.85rem 1.5rem',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${colors.lavender}88`; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${colors.lavender}33`; }}
        >
          Start Fresh
        </button>
      </div>
    </div>
  );
}
