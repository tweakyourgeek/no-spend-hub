import React from 'react';
import { useGameState, useGameDispatch } from '../contexts/GameStateContext';
import { colors, fonts, animations } from '../theme';
import { questLines } from '../data/questlines';
import { characters } from '../data/characters';
import { dialogues } from '../data/dialogues';
import { chasingPatterns } from '../data/patterns';

const pathData = [
  { label: 'Weekend Gate', color: colors.peach, quest: 'no-spend-weekend' as const, angle: -40 },
  { label: 'Seven-Day Door', color: colors.sage, quest: 'no-spend-week' as const, angle: 0 },
  { label: 'Lunar Arch', color: colors.mauve, quest: 'low-spend-month' as const, angle: 40 },
];

export default function RealmMapScreen() {
  const state = useGameState();
  const { activeQuest, encounterIndex, flags, revealedPatterns } = state;
  const dispatch = useGameDispatch();

  const questLine = activeQuest ? questLines[activeQuest] : null;

  // Find next available encounter
  function getNextEncounter() {
    if (!questLine) return null;
    for (let i = encounterIndex; i < questLine.encounters.length; i++) {
      const enc = questLine.encounters[i];
      if (enc.requiredFlags) {
        const met = Object.entries(enc.requiredFlags).every(([k, v]) => flags[k] === v);
        if (!met) continue;
      }
      return enc;
    }
    return null;
  }

  const nextEnc = getNextEncounter();
  const nextCharId = nextEnc
    ? (dialogues[nextEnc.dialogueNodeId]?.characterId ?? 'the-fool')
    : null;
  const nextChar = nextCharId ? characters[nextCharId] : null;

  function beginEncounter() {
    if (!nextEnc) {
      // Quest complete
      if (activeQuest) {
        dispatch({ type: 'COMPLETE_QUEST', quest: activeQuest });
        dispatch({ type: 'NAVIGATE', screen: 'ending' });
      }
      return;
    }
    dispatch({ type: 'SET_DIALOGUE', dialogueId: nextEnc.dialogueNodeId });
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `radial-gradient(ellipse at 50% 20%, ${colors.deepPlum} 0%, ${colors.plum} 50%, ${colors.deepPlum} 100%)`,
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
        marginBottom: '0.25rem',
        marginTop: '1rem',
      }}>
        The Crossroads
      </h2>

      <p style={{
        fontFamily: fonts.body,
        fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
        opacity: 0.7,
        marginBottom: '2rem',
        textAlign: 'center',
      }}>
        {activeQuest && questLine
          ? `${questLine.title} — ${questLine.description}`
          : 'Three paths diverge beneath a starlit sky.'}
      </p>

      {/* Crossroads SVG */}
      <svg
        viewBox="0 0 500 350"
        style={{
          width: '100%',
          maxWidth: 550,
          marginBottom: '1.5rem',
        }}
      >
        <defs>
          {pathData.map((p) => (
            <radialGradient key={`grad-${p.quest}`} id={`grad-${p.quest}`}>
              <stop offset="0%" stopColor={p.color} stopOpacity="0.6" />
              <stop offset="100%" stopColor={p.color} stopOpacity="0" />
            </radialGradient>
          ))}
          <radialGradient id="center-glow">
            <stop offset="0%" stopColor={colors.lavender} stopOpacity="0.4" />
            <stop offset="100%" stopColor={colors.lavender} stopOpacity="0" />
          </radialGradient>
          <filter id="starGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Starfield background */}
        {Array.from({ length: 30 }, (_, i) => (
          <circle
            key={`star-${i}`}
            cx={50 + Math.sin(i * 7.3) * 200 + 200}
            cy={20 + Math.cos(i * 5.1) * 140 + 30}
            r={0.5 + (i % 3) * 0.5}
            fill={colors.cream}
            opacity={0.2 + (i % 4) * 0.1}
            filter="url(#starGlow)"
          >
            <animate
              attributeName="opacity"
              values={`${0.1 + (i % 3) * 0.1};${0.4 + (i % 3) * 0.15};${0.1 + (i % 3) * 0.1}`}
              dur={`${2 + (i % 4)}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Ground line */}
        <ellipse cx="250" cy="290" rx="220" ry="8" fill={colors.plum} opacity="0.4" />

        {/* Center glow */}
        <circle cx="250" cy="250" r="60" fill="url(#center-glow)">
          <animate attributeName="r" values="55;65;55" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Center stone */}
        <circle cx="250" cy="250" r="12" fill={colors.lavender} opacity="0.5" />
        <circle cx="250" cy="250" r="5" fill={colors.cream} />

        {/* Paths and destinations */}
        {pathData.map((p, i) => {
          const positions = [
            { x: 80, y: 80, cx: 165, cy: 165 },
            { x: 250, y: 40, cx: 250, cy: 145 },
            { x: 420, y: 80, cx: 335, cy: 165 },
          ];
          const pos = positions[i];
          const isActive = activeQuest === p.quest;

          return (
            <g key={p.quest}>
              {/* Path line */}
              <line
                x1="250" y1="250"
                x2={pos.x} y2={pos.y}
                stroke={p.color}
                strokeWidth={isActive ? 3 : 1.5}
                opacity={isActive ? 0.7 : 0.3}
                strokeDasharray={isActive ? 'none' : '4 4'}
              />

              {/* Midpoint glow */}
              <circle
                cx={pos.cx} cy={pos.cy}
                r="4"
                fill={p.color}
                opacity={isActive ? 0.5 : 0.2}
              >
                {isActive && (
                  <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                )}
              </circle>

              {/* Destination glow */}
              <circle
                cx={pos.x} cy={pos.y}
                r={isActive ? 35 : 25}
                fill={`url(#grad-${p.quest})`}
              >
                {isActive && (
                  <animate attributeName="r" values="30;38;30" dur="3s" repeatCount="indefinite" />
                )}
              </circle>

              {/* Destination marker */}
              <circle
                cx={pos.x} cy={pos.y}
                r={isActive ? 18 : 14}
                fill={p.color}
                opacity={isActive ? 0.7 : 0.3}
                stroke={isActive ? colors.cream : 'none'}
                strokeWidth={isActive ? 1.5 : 0}
              />

              {/* Label */}
              <text
                x={pos.x}
                y={pos.y + (isActive ? 36 : 30)}
                textAnchor="middle"
                fill={colors.cream}
                fontFamily={fonts.heading}
                fontSize={isActive ? 12 : 10}
                fontWeight={isActive ? 700 : 400}
                opacity={isActive ? 0.9 : 0.5}
              >
                {p.label}
              </text>
            </g>
          );
        })}

        {/* Encounter progress dots */}
        {questLine && (
          <g>
            {questLine.encounters.map((enc, i) => {
              const total = questLine.encounters.length;
              const spacing = 16;
              const startX = 250 - ((total - 1) * spacing) / 2;
              const completed = i < encounterIndex;
              const current = i === encounterIndex;
              return (
                <circle
                  key={enc.id}
                  cx={startX + i * spacing}
                  cy="310"
                  r={current ? 5 : 3.5}
                  fill={completed ? colors.sage : current ? colors.gold : colors.lavender}
                  opacity={completed || current ? 0.8 : 0.25}
                >
                  {current && (
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
                  )}
                </circle>
              );
            })}
          </g>
        )}
      </svg>

      {/* Encounter info */}
      {nextEnc && nextChar && (
        <p style={{
          fontFamily: fonts.heading,
          fontSize: '0.95rem',
          opacity: 0.6,
          marginBottom: '1rem',
          fontStyle: 'italic',
        }}>
          Next: {nextChar.title} awaits...
        </p>
      )}

      {/* Revealed patterns */}
      {revealedPatterns.length > 0 && (
        <div style={{
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          width: '100%',
          maxWidth: 400,
        }}>
          <p style={{
            fontFamily: fonts.heading,
            fontSize: '0.85rem',
            color: colors.gold,
            opacity: 0.7,
          }}>
            Patterns Revealed: {revealedPatterns.length}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {revealedPatterns.map((pid) => {
              const pat = chasingPatterns[pid];
              if (!pat) return null;
              return (
                <span key={pid} title={pat.name} style={{
                  fontSize: '1.2rem',
                  background: `${colors.deepPlum}cc`,
                  border: `1px solid ${colors.gold}33`,
                  borderRadius: 8,
                  padding: '0.25rem 0.5rem',
                  cursor: 'default',
                }}>
                  {pat.icon}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        <button
          onClick={beginEncounter}
          style={{
            fontFamily: fonts.body,
            background: `linear-gradient(135deg, ${colors.sage}, ${colors.sage}cc)`,
            color: colors.plum,
            border: 'none',
            borderRadius: 8,
            padding: '0.85rem 2rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
            transition: 'all 0.2s ease',
            boxShadow: `0 4px 16px ${colors.sage}33`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 6px 24px ${colors.sage}55`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = `0 4px 16px ${colors.sage}33`;
          }}
        >
          {nextEnc ? 'Begin Encounter' : 'Complete Quest'}
        </button>
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: 'entry' })}
          style={{
            fontFamily: fonts.body,
            background: 'transparent',
            color: colors.lavender,
            border: `1px solid ${colors.lavender}33`,
            borderRadius: 8,
            padding: '0.85rem 1.5rem',
            cursor: 'pointer',
            fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${colors.lavender}88`; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${colors.lavender}33`; }}
        >
          Back to Doors
        </button>
      </div>
    </div>
  );
}
