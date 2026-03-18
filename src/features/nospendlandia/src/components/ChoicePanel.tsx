import React from 'react';
import { colors, fonts, animations } from '../theme';
import type { Choice, GameState, PatternId } from '../types';
import { isChoiceAvailable } from '../engine/choice-resolver';

interface Props {
  choices: Choice[];
  state: GameState;
  onChoice: (choice: Choice) => void;
}

/** Three-choice panel with pattern lock logic */
export default function ChoicePanel({ choices, state, onChoice }: Props) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      maxWidth: 520,
      width: '100%',
      animation: `${animations.slideUp} 0.4s ease-out`,
    }}>
      {choices.map((choice, i) => {
        const available = isChoiceAvailable(choice, state);
        const isLocked = !available && !!choice.patternRequired;

        return (
          <button
            key={choice.id}
            onClick={() => available && onChoice(choice)}
            disabled={!available}
            style={{
              fontFamily: fonts.body,
              background: isLocked ? `${colors.deepPlum}88` : colors.deepPlum,
              color: isLocked ? `${colors.cream}44` : colors.cream,
              border: `1px solid ${isLocked ? `${colors.lavender}22` : `${colors.sage}44`}`,
              borderRadius: 8,
              padding: '0.85rem 1.25rem',
              cursor: available ? 'pointer' : 'not-allowed',
              fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              animation: `${animations.fadeSlideIn} 0.3s ease-out ${i * 0.08}s both`,
              position: 'relative',
              opacity: isLocked ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (available) {
                e.currentTarget.style.background = `${colors.sage}22`;
                e.currentTarget.style.borderColor = colors.sage;
                e.currentTarget.style.transform = 'translateX(4px)';
              }
            }}
            onMouseLeave={(e) => {
              if (available) {
                e.currentTarget.style.background = colors.deepPlum;
                e.currentTarget.style.borderColor = `${colors.sage}44`;
                e.currentTarget.style.transform = '';
              }
            }}
          >
            {choice.label}
            {isLocked && (
              <span style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '0.7rem',
                color: colors.lavender,
                opacity: 0.5,
                fontStyle: 'italic',
              }}>
                pattern locked
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
