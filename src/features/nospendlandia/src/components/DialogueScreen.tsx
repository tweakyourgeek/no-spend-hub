import React from 'react';
import { useGameDispatch } from '../contexts/GameStateContext';
import { colors, fonts } from '../theme';
import type { DialogueData } from '../types';

interface Props {
  data: DialogueData;
  onChoice?: (choiceId: string) => void;
}

export default function DialogueScreen({ data, onChoice }: Props) {
  const dispatch = useGameDispatch();

  function handleChoice(choice: typeof data.choices[number]) {
    if (choice.setsFlag) {
      dispatch({ type: 'SET_FLAG', key: choice.setsFlag, value: true });
    }
    if (choice.nextScreen) {
      dispatch({ type: 'NAVIGATE', screen: choice.nextScreen });
    }
    onChoice?.(choice.id);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(180deg, ${colors.plum} 0%, ${colors.plum}ee 60%, ${colors.mauve}33 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      color: colors.cream,
    }}>
      {/* Character portrait area */}
      <div style={{
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: data.portraitColor,
        border: `3px solid ${colors.lavender}66`,
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        fontFamily: fonts.heading,
        fontWeight: 700,
        color: colors.cream,
        boxShadow: `0 0 30px ${data.portraitColor}44`,
      }}>
        {data.characterName.charAt(0)}
      </div>

      {/* Character name */}
      <h3 style={{
        fontFamily: fonts.heading,
        fontSize: '1.5rem',
        fontWeight: 600,
        margin: '0 0 1.5rem',
        letterSpacing: '0.03em',
      }}>
        {data.characterName}
      </h3>

      {/* Dialogue text */}
      <div style={{
        background: `${colors.plum}cc`,
        border: `1px solid ${colors.mauve}44`,
        borderRadius: 12,
        padding: '1.5rem 2rem',
        maxWidth: 520,
        width: '100%',
        marginBottom: '2rem',
        lineHeight: 1.7,
        fontFamily: fonts.body,
        fontSize: '1rem',
      }}>
        {data.dialogueText}
      </div>

      {/* Choice buttons */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: 520,
        width: '100%',
      }}>
        {data.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => handleChoice(choice)}
            style={{
              fontFamily: fonts.body,
              background: `${colors.plum}`,
              color: colors.cream,
              border: `1px solid ${colors.sage}66`,
              borderRadius: 8,
              padding: '0.85rem 1.25rem',
              cursor: 'pointer',
              fontSize: '0.95rem',
              textAlign: 'left',
              transition: 'background 0.15s, border-color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${colors.sage}22`;
              e.currentTarget.style.borderColor = colors.sage;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.plum;
              e.currentTarget.style.borderColor = `${colors.sage}66`;
            }}
          >
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
}
