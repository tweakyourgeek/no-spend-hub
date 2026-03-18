import React from 'react';
import { useGameState, useGameDispatch } from '../contexts/GameStateContext';
import { colors, fonts, animations } from '../theme';
import { getScene } from '../data/scenes';

/**
 * JournalView — Hermit's questions log.
 *
 * Shows all Hermit questions in chronological order, labeled by scene and day.
 * Has a "copy all" button. Stub for Skool community post (future).
 */
export default function JournalView() {
  const { hermitJournal, journalEntries, previousScreen } = useGameState();
  const dispatch = useGameDispatch();

  // Combine hermit entries with legacy journal entries
  const hasHermitEntries = hermitJournal.length > 0;
  const hasLegacyEntries = journalEntries.length > 0;

  function copyAll() {
    const lines = hermitJournal.map(entry => {
      const scene = getScene(entry.sceneId);
      const sceneLabel = scene ? `${scene.title} (Day ${entry.questDay})` : entry.sceneId;
      return `[${sceneLabel}] ${entry.question}`;
    });
    if (hasLegacyEntries) {
      lines.push('', '--- Personal Entries ---', ...journalEntries);
    }
    navigator.clipboard.writeText(lines.join('\n')).catch(() => {
      // clipboard API not available
    });
  }

  /** Stub: post to Skool community thread (future integration) */
  function postToSkool() {
    // TODO: integrate with Skool API when authenticated app is built
    console.log('[Nospendlandia] Skool post stub called');
  }

  function goBack() {
    const target = previousScreen && previousScreen !== 'journal' ? previousScreen : 'ending';
    dispatch({ type: 'NAVIGATE', screen: target });
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: `linear-gradient(180deg, ${colors.deepPlum} 0%, ${colors.plum} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 'max(env(safe-area-inset-top, 0px), 1.5rem) clamp(1rem, 4vw, 2rem) max(env(safe-area-inset-bottom, 0px), 1.5rem)',
      color: colors.cream,
      animation: `${animations.fadeIn} 0.5s ease-out`,
      overflowX: 'hidden',
    }}>
      <h2 style={{
        fontFamily: fonts.heading,
        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
        fontWeight: 700,
        marginBottom: '0.5rem',
        marginTop: '1rem',
        color: colors.gold,
      }}>
        The Hermit's Journal
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
        Questions from the journey. No answers required — just sit with them.
      </p>

      {/* Copy all button */}
      {(hasHermitEntries || hasLegacyEntries) && (
        <button
          onClick={copyAll}
          style={{
            fontFamily: fonts.body,
            background: colors.gold,
            color: colors.deepPlum,
            border: 'none',
            borderRadius: 6,
            padding: '0.5rem 1.5rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
          }}
        >
          Copy All
        </button>
      )}

      {/* Hermit entries */}
      <div style={{
        maxWidth: 500,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}>
        {!hasHermitEntries && !hasLegacyEntries && (
          <p style={{
            fontFamily: fonts.body,
            fontSize: '0.85rem',
            opacity: 0.4,
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
            Your journal is empty. Questions will appear as you play.
          </p>
        )}

        {hermitJournal.map((entry, i) => {
          const scene = getScene(entry.sceneId);
          const sceneLabel = scene ? scene.title : entry.sceneId;
          const pathColor = entry.path === 'pull' ? colors.peach
            : entry.path === 'pattern' || entry.path === 'mastery' ? colors.gold
            : colors.sage;

          return (
            <div key={i} style={{
              background: `${colors.deepPlum}cc`,
              border: `1px solid ${colors.gold}22`,
              borderRadius: 8,
              padding: '1rem 1.25rem',
              animation: `${animations.fadeSlideIn} 0.3s ease-out`,
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                fontSize: '0.75rem',
                fontFamily: fonts.body,
                opacity: 0.5,
              }}>
                <span>{sceneLabel} — Day {entry.questDay}</span>
                <span style={{ color: pathColor, opacity: 0.8 }}>
                  {entry.path}
                </span>
              </div>
              <p style={{
                fontFamily: fonts.heading,
                fontSize: '1rem',
                fontStyle: 'italic',
                lineHeight: 1.6,
                color: colors.cream,
                opacity: 0.9,
              }}>
                {entry.question}
              </p>
            </div>
          );
        })}

        {/* Legacy entries */}
        {hasLegacyEntries && (
          <>
            {hasHermitEntries && (
              <div style={{
                height: 1,
                background: colors.lavender,
                opacity: 0.15,
                margin: '0.5rem 0',
              }} />
            )}
            {[...journalEntries].reverse().map((entry, i) => (
              <div key={`legacy-${i}`} style={{
                background: `${colors.deepPlum}cc`,
                border: `1px solid ${colors.gold}22`,
                borderRadius: 8,
                padding: '0.75rem 1rem',
                fontFamily: fonts.body,
                fontSize: '0.9rem',
                lineHeight: 1.5,
                opacity: 0.8,
              }}>
                {entry}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Back button */}
      <button
        onClick={goBack}
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
        Back
      </button>
    </div>
  );
}
