import React, { useState } from 'react';
import { useGameState, useGameDispatch } from '../contexts/GameStateContext';
import { colors, fonts, animations } from '../theme';

export default function JournalScreen() {
  const { journalEntries, previousScreen } = useGameState();
  const dispatch = useGameDispatch();
  const [newEntry, setNewEntry] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  function addEntry() {
    const text = newEntry.trim();
    if (!text) return;
    const dated = `[${new Date().toLocaleDateString()}] ${text}`;
    dispatch({ type: 'ADD_JOURNAL', entry: dated });
    setNewEntry('');
  }

  function goBack() {
    const target = previousScreen && previousScreen !== 'journal' ? previousScreen : 'ending';
    dispatch({ type: 'NAVIGATE', screen: target });
  }

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
        marginBottom: '0.5rem',
        marginTop: '1rem',
        color: colors.gold,
      }}>
        The Star's Journal
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
        Each day, write one sentence about how you felt when you didn't spend.
      </p>

      {/* New entry form */}
      <div style={{
        maxWidth: 500,
        width: '100%',
        marginBottom: '2rem',
        display: 'flex',
        gap: '0.75rem',
      }}>
        <input
          type="text"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addEntry()}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          placeholder="How did it feel today?"
          style={{
            flex: 1,
            fontFamily: fonts.body,
            fontSize: '0.95rem',
            background: `${colors.deepPlum}`,
            border: `1px solid ${inputFocused ? colors.gold : `${colors.gold}44`}`,
            borderRadius: 8,
            padding: '0.75rem 1rem',
            color: colors.cream,
            outline: 'none',
            boxShadow: inputFocused ? `0 0 12px ${colors.gold}33` : 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
        />
        <button
          onClick={addEntry}
          style={{
            fontFamily: fonts.body,
            background: colors.gold,
            color: colors.deepPlum,
            border: 'none',
            borderRadius: 8,
            padding: '0.75rem 1.25rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          Add
        </button>
      </div>

      {/* Entries */}
      <div style={{
        maxWidth: 500,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}>
        {journalEntries.length === 0 && (
          <p style={{
            fontFamily: fonts.body,
            fontSize: '0.85rem',
            opacity: 0.4,
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
            Your journal is empty. Begin writing your story.
          </p>
        )}
        {[...journalEntries].reverse().map((entry, i) => (
          <div key={i} style={{
            background: `${colors.deepPlum}cc`,
            border: `1px solid ${colors.gold}22`,
            borderRadius: 8,
            padding: '0.75rem 1rem',
            fontFamily: fonts.body,
            fontSize: '0.9rem',
            lineHeight: 1.5,
            opacity: 0.8,
            animation: i === 0 ? `${animations.fadeSlideIn} 0.3s ease-out` : undefined,
          }}>
            {entry}
          </div>
        ))}
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
