import React from 'react';
import { useGameState, useGameDispatch } from '../contexts/GameStateContext';
import { colors, fonts, animations } from '../theme';
import { PATTERNS } from '../data/patterns';

export default function EndingScreen() {
  const { currentQuest, completedQuests, completedScenes, patternData, hermitJournal, flags, revealedPatterns } = useGameState();
  const dispatch = useGameDispatch();

  const questName = currentQuest
    ? { 'no_spend_weekend': 'The Weekend Gate', 'no_spend_week': 'The Seven-Day Door', 'low_spend_month': 'The Lunar Arch' }[currentQuest]
    : 'your quest';

  // Count patterns from both systems
  const unlockedNew = Object.entries(patternData).filter(([_, p]) => p.unlocked).length;
  const patternsCount = Math.max(unlockedNew, revealedPatterns.length);

  // Count guides met from flags
  const guidesMet = Object.keys(flags).filter(k => k.startsWith('met_')).length;

  return (
    <div style={{
      minHeight: '100dvh',
      background: `radial-gradient(ellipse at 50% 30%, ${colors.starBlue}44 0%, ${colors.deepPlum} 50%, ${colors.plum} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 'max(env(safe-area-inset-top, 0px), 2rem) clamp(1rem, 4vw, 2rem) max(env(safe-area-inset-bottom, 0px), 2rem)',
      color: colors.cream,
      animation: `${animations.fadeIn} 1s ease-out`,
      overflowX: 'hidden',
    }}>
      {/* World glyph */}
      <div style={{
        fontSize: '3rem',
        marginBottom: '1rem',
        animation: `${animations.float} 3s ease-in-out infinite`,
      }}>
        ⊕
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
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{patternsCount}</div>
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
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{guidesMet}</div>
            <div style={{ opacity: 0.7, fontSize: '0.8rem' }}>Guides Met</div>
          </div>
          <div style={{
            background: `${colors.peach}22`,
            border: `1px solid ${colors.peach}33`,
            borderRadius: 8,
            padding: '0.75rem 1rem',
            flex: 1,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{completedScenes.length}</div>
            <div style={{ opacity: 0.7, fontSize: '0.8rem' }}>Scenes</div>
          </div>
          <div style={{
            background: `${colors.gold}22`,
            border: `1px solid ${colors.gold}33`,
            borderRadius: 8,
            padding: '0.75rem 1rem',
            flex: 1,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{hermitJournal.length}</div>
            <div style={{ opacity: 0.7, fontSize: '0.8rem' }}>Questions</div>
          </div>
        </div>

        {/* Unlocked patterns */}
        {unlockedNew > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{
              fontFamily: fonts.heading,
              fontSize: '0.95rem',
              color: colors.gold,
              opacity: 0.7,
            }}>
              Your Chasing Patterns:
            </p>
            {Object.entries(patternData)
              .filter(([_, p]) => p.unlocked)
              .map(([pid]) => {
                const def = PATTERNS[pid as keyof typeof PATTERNS];
                if (!def) return null;
                return (
                  <div key={pid} style={{
                    background: `${colors.deepPlum}`,
                    border: `1px solid ${colors.gold}33`,
                    borderRadius: 8,
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>{def.icon}</span>
                    <div>
                      <div style={{ fontFamily: fonts.heading, fontSize: '0.95rem', color: colors.gold }}>{def.name}</div>
                      <div style={{ fontFamily: fonts.body, fontSize: '0.75rem', opacity: 0.6 }}>{def.advice}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Personal insight */}
      {(flags.pattern_loneliness || flags.pattern_boredom || flags.pattern_stress || flags.arden_saving || flags.month_imperfect) && (
        <div style={{
          background: `${colors.deepPlum}88`,
          border: `1px solid ${colors.lavender}22`,
          borderRadius: 12,
          padding: '1.25rem 1.5rem',
          maxWidth: 500,
          width: '100%',
          marginBottom: '1.5rem',
          fontFamily: fonts.body,
          fontSize: '0.9rem',
          lineHeight: 1.6,
          opacity: 0.8,
          fontStyle: 'italic',
        }}>
          <p style={{ color: colors.lavender, fontFamily: fonts.heading, fontSize: '0.95rem', marginBottom: '0.5rem', opacity: 0.7 }}>
            Your path revealed:
          </p>
          {flags.pattern_loneliness && <p>You recognized loneliness as a spending trigger. Connection, not consumption, is the antidote.</p>}
          {flags.pattern_boredom && <p>You saw boredom for what it is — an invitation to create, not consume.</p>}
          {flags.pattern_stress && <p>You understood the Moonbeams spiral. The pause is your power.</p>}
          {flags.arden_saving && <p>You looked beyond saving money to find what saving really means — freedom and self-trust.</p>}
          {flags.month_imperfect && <p>You embraced imperfection. Thirty fresh starts, not one impossible streak.</p>}
        </div>
      )}

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
