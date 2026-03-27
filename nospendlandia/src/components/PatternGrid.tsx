import React from 'react';
import { colors, fonts, animations } from '../theme';
import { usePattern } from '../hooks/usePattern';
import type { PatternTier } from '../engine/pattern-engine';

interface Props {
  /** Compact mode for inline scene display (smaller cards, no descriptions) */
  compact?: boolean;
  /** Pattern IDs that just changed — triggers brief animation */
  changedPatterns?: string[];
}

/**
 * Fog-of-war pattern grid. Four visual tiers:
 *
 * 1. hidden   — blank card, fully fogged
 * 2. glowing  — faint pulsing glow (pullCount >= 1, something is here)
 * 3. observed — icon silhouette visible, blurred name (observedCount >= 1)
 * 4. revealed — full card: name, hermit question, counts (namedCount >= 2)
 */
export default function PatternGrid({ compact = false, changedPatterns = [] }: Props) {
  const { gridData } = usePattern();

  const cardSize = compact ? 'minmax(70px, 1fr)' : 'minmax(140px, 1fr)';
  const gap = compact ? '0.5rem' : '0.75rem';

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${compact ? 6 : 'auto-fill'}, ${cardSize})`,
      gap,
      maxWidth: compact ? 500 : 540,
      width: '100%',
    }}>
      {gridData.map(p => {
        const justChanged = changedPatterns.includes(p.id);
        return (
          <PatternCardCell
            key={p.id}
            tier={p.tier}
            name={p.name}
            icon={p.icon}
            hermitQuestion={p.hermitQuestion}
            observedCount={p.observedCount}
            namedCount={p.namedCount}
            compact={compact}
            justChanged={justChanged}
          />
        );
      })}
    </div>
  );
}

interface CellProps {
  tier: PatternTier;
  name: string;
  icon: string;
  hermitQuestion: string;
  observedCount: number;
  namedCount: number;
  compact: boolean;
  justChanged: boolean;
}

function PatternCardCell({
  tier, name, icon, hermitQuestion,
  observedCount, namedCount, compact, justChanged,
}: CellProps) {
  const changeAnim = justChanged ? `${animations.pulseGlow} 1.5s ease-out` : undefined;

  // ── HIDDEN ──────────────────────────────────────────────
  if (tier === 'hidden') {
    return (
      <div style={{
        background: `${colors.deepPlum}66`,
        border: `1px solid ${colors.lavender}10`,
        borderRadius: compact ? 6 : 10,
        padding: compact ? '0.5rem 0.25rem' : '1rem 0.75rem',
        textAlign: 'center',
        opacity: 0.3,
      }}>
        <div style={{
          fontSize: compact ? '0.9rem' : '1.5rem',
          filter: 'blur(3px)',
          opacity: 0.15,
        }}>?</div>
        {!compact && (
          <div style={{
            fontFamily: fonts.heading,
            fontSize: '0.75rem',
            color: colors.lavender,
            opacity: 0.2,
            fontStyle: 'italic',
            marginTop: '0.25rem',
          }}>
            Unknown
          </div>
        )}
      </div>
    );
  }

  // ── GLOWING (pullCount >= 1) ────────────────────────────
  if (tier === 'glowing') {
    return (
      <div style={{
        background: `${colors.deepPlum}88`,
        border: `1px solid ${colors.mauve}20`,
        borderRadius: compact ? 6 : 10,
        padding: compact ? '0.5rem 0.25rem' : '1rem 0.75rem',
        textAlign: 'center',
        animation: changeAnim || `${animations.pulseGlow} 4s ease-in-out infinite`,
        boxShadow: `0 0 12px ${colors.mauve}22`,
      }}>
        <div style={{
          fontSize: compact ? '0.9rem' : '1.5rem',
          filter: 'blur(2px)',
          opacity: 0.3,
        }}>{icon}</div>
        {!compact && (
          <div style={{
            fontFamily: fonts.heading,
            fontSize: '0.75rem',
            color: colors.mauve,
            opacity: 0.35,
            fontStyle: 'italic',
            marginTop: '0.25rem',
          }}>
            Something stirs...
          </div>
        )}
      </div>
    );
  }

  // ── OBSERVED (observedCount >= 1) ───────────────────────
  if (tier === 'observed') {
    return (
      <div style={{
        background: `linear-gradient(160deg, ${colors.deepPlum}cc, ${colors.plum}88)`,
        border: `1px solid ${colors.lavender}25`,
        borderRadius: compact ? 6 : 10,
        padding: compact ? '0.5rem 0.25rem' : '1rem 0.75rem',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        animation: changeAnim,
      }}>
        <div style={{
          fontSize: compact ? '1rem' : '1.5rem',
          opacity: 0.55,
          filter: 'blur(0.5px)',
          marginBottom: compact ? 0 : '0.25rem',
        }}>{icon}</div>
        {!compact && (
          <>
            <div style={{
              fontFamily: fonts.heading,
              fontSize: '0.85rem',
              color: colors.lavender,
              opacity: 0.4,
              filter: 'blur(2px)',
              letterSpacing: '0.05em',
            }}>
              {name}
            </div>
            <div style={{
              fontFamily: fonts.body,
              fontSize: '0.65rem',
              color: colors.cream,
              opacity: 0.3,
              marginTop: '0.25rem',
              fontStyle: 'italic',
            }}>
              Name this to reveal it
            </div>
          </>
        )}
      </div>
    );
  }

  // ── REVEALED (namedCount >= 2, fully unlocked) ──────────
  return (
    <div style={{
      background: `linear-gradient(160deg, ${colors.deepPlum}, ${colors.plum})`,
      border: `1px solid ${colors.gold}44`,
      borderRadius: compact ? 6 : 10,
      padding: compact ? '0.5rem 0.25rem' : '1rem 0.75rem',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      animation: changeAnim || (justChanged ? `${animations.fadeSlideIn} 0.4s ease-out` : undefined),
      boxShadow: justChanged ? `0 0 20px ${colors.gold}44` : undefined,
    }}>
      <div style={{
        fontSize: compact ? '1rem' : '1.5rem',
        marginBottom: compact ? 0 : '0.4rem',
      }}>{icon}</div>
      {compact ? (
        <div style={{
          fontFamily: fonts.heading,
          fontSize: '0.55rem',
          fontWeight: 600,
          color: colors.gold,
          lineHeight: 1.2,
        }}>
          {name}
        </div>
      ) : (
        <>
          <div style={{
            fontFamily: fonts.heading,
            fontSize: '0.95rem',
            fontWeight: 600,
            color: colors.gold,
            marginBottom: '0.35rem',
          }}>
            {name}
          </div>
          <div style={{
            fontFamily: fonts.heading,
            fontSize: '0.75rem',
            fontStyle: 'italic',
            color: colors.cream,
            opacity: 0.7,
            lineHeight: 1.4,
            marginBottom: '0.4rem',
          }}>
            {hermitQuestion}
          </div>
          <div style={{
            fontFamily: fonts.body,
            fontSize: '0.65rem',
            color: colors.lavender,
            opacity: 0.45,
          }}>
            observed {observedCount} / named {namedCount}
          </div>
        </>
      )}
    </div>
  );
}
