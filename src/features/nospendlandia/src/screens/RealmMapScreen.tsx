import React from 'react';
import { useGameState, useGameDispatch } from '../contexts/GameStateContext';
import { colors, fonts, animations } from '../theme';
import { questLines } from '../data/questlines';
import { characters } from '../data/characters';
import { dialogues } from '../data/dialogues';
import { PATTERNS } from '../data/patterns';
import { QUESTS } from '../data/quests';
import { getScene } from '../data/scenes';
import type { QuestId } from '../types';

const pathData = [
  { label: 'Weekend Gate', color: colors.peach, quest: 'no_spend_weekend' as const, angle: -40 },
  { label: 'Seven-Day Door', color: colors.sage, quest: 'no_spend_week' as const, angle: 0 },
  { label: 'Lunar Arch', color: colors.mauve, quest: 'low_spend_month' as const, angle: 40 },
];

export default function RealmMapScreen() {
  const state = useGameState();
  const { currentQuest, encounterIndex, flags, revealedPatterns, completedScenes, patternData } = state;
  const dispatch = useGameDispatch();

  const questLine = currentQuest ? questLines[currentQuest] : null;
  const questDef = currentQuest ? QUESTS[currentQuest] : null;

  // Check if the quest has scene-based content (new system)
  const hasScenes = questDef && questDef.scenes.length > 0;

  // Find next scene (new system)
  function getNextScene() {
    if (!questDef) return null;
    for (const sceneId of questDef.scenes) {
      if (!completedScenes.includes(sceneId)) return sceneId;
    }
    return null; // all scenes complete
  }

  // Find next encounter (legacy system)
  function getNextEncounter(): { encounter: any; lockedReason: string | null } | null {
    if (!questLine) return null;
    for (let i = encounterIndex; i < questLine.encounters.length; i++) {
      const enc = questLine.encounters[i];
      if (enc.requiredFlags) {
        const unmet = Object.entries(enc.requiredFlags).filter(([k, v]) => flags[k] !== v);
        if (unmet.length > 0) {
          const names = unmet.map(([k]) => {
            const match = k.match(/^met_(.+)$/);
            return match ? match[1] : k;
          });
          return { encounter: enc, lockedReason: `Complete the encounter with ${names.join(', ')} first` };
        }
      }
      return { encounter: enc, lockedReason: null };
    }
    return null;
  }

  const nextScene = hasScenes ? getNextScene() : null;
  const nextResult = !hasScenes ? getNextEncounter() : null;
  const nextEnc = nextResult?.lockedReason ? null : nextResult?.encounter ?? null;
  const lockedReason = nextResult?.lockedReason ?? null;
  const nextCharId = nextEnc
    ? (dialogues[nextEnc.dialogueNodeId]?.characterId ?? 'fool')
    : null;
  const nextChar = nextCharId ? characters[nextCharId] : null;

  function beginEncounter() {
    // New scene system
    if (hasScenes && nextScene) {
      dispatch({ type: 'START_SCENE', sceneId: nextScene });
      return;
    }
    if (hasScenes && !nextScene) {
      // All scenes complete
      if (currentQuest) {
        dispatch({ type: 'COMPLETE_QUEST', questId: currentQuest });
        dispatch({ type: 'NAVIGATE', screen: 'ending' });
      }
      return;
    }

    // Legacy dialogue system
    if (!nextEnc) {
      if (currentQuest) {
        dispatch({ type: 'COMPLETE_QUEST', questId: currentQuest });
        dispatch({ type: 'NAVIGATE', screen: 'ending' });
      }
      return;
    }
    dispatch({ type: 'SET_DIALOGUE', dialogueId: nextEnc.dialogueNodeId });
  }

  // Count unlocked patterns (new system)
  const unlockedCount = Object.values(patternData).filter(p => p.unlocked).length;
  // Combine with legacy revealed patterns
  const totalPatterns = Math.max(unlockedCount, revealedPatterns.length);

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
        {currentQuest && questLine
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

        <ellipse cx="250" cy="290" rx="220" ry="8" fill={colors.plum} opacity="0.4" />
        <circle cx="250" cy="250" r="60" fill="url(#center-glow)">
          <animate attributeName="r" values="55;65;55" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="250" r="12" fill={colors.lavender} opacity="0.5" />
        <circle cx="250" cy="250" r="5" fill={colors.cream} />

        {pathData.map((p, i) => {
          const positions = [
            { x: 80, y: 80, cx: 165, cy: 165 },
            { x: 250, y: 40, cx: 250, cy: 145 },
            { x: 420, y: 80, cx: 335, cy: 165 },
          ];
          const pos = positions[i];
          const isActive = currentQuest === p.quest;

          return (
            <g key={p.quest}>
              <line
                x1="250" y1="250" x2={pos.x} y2={pos.y}
                stroke={p.color}
                strokeWidth={isActive ? 3 : 1.5}
                opacity={isActive ? 0.7 : 0.3}
                strokeDasharray={isActive ? 'none' : '4 4'}
              />
              <circle cx={pos.cx} cy={pos.cy} r="4" fill={p.color} opacity={isActive ? 0.5 : 0.2}>
                {isActive && <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />}
              </circle>
              <circle cx={pos.x} cy={pos.y} r={isActive ? 35 : 25} fill={`url(#grad-${p.quest})`}>
                {isActive && <animate attributeName="r" values="30;38;30" dur="3s" repeatCount="indefinite" />}
              </circle>
              <circle
                cx={pos.x} cy={pos.y} r={isActive ? 18 : 14}
                fill={p.color} opacity={isActive ? 0.7 : 0.3}
                stroke={isActive ? colors.cream : 'none'}
                strokeWidth={isActive ? 1.5 : 0}
              />
              <text
                x={pos.x} y={pos.y + (isActive ? 36 : 30)}
                textAnchor="middle" fill={colors.cream}
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

        {/* Progress dots — scene-based system */}
        {hasScenes && questDef && questDef.scenes.length > 0 && (
          <g>
            {questDef.scenes.map((sid, i) => {
              const total = questDef.scenes.length;
              const spacing = 16;
              const startX = 250 - ((total - 1) * spacing) / 2;
              const completed = completedScenes.includes(sid);
              const isCurrent = !completed && (i === 0 || completedScenes.includes(questDef.scenes[i - 1]));
              return (
                <circle
                  key={sid}
                  cx={startX + i * spacing} cy="310"
                  r={isCurrent ? 5 : 3.5}
                  fill={completed ? colors.sage : isCurrent ? colors.gold : colors.lavender}
                  opacity={completed || isCurrent ? 0.8 : 0.25}
                >
                  {isCurrent && <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />}
                </circle>
              );
            })}
          </g>
        )}
        {/* Progress dots — legacy encounter system */}
        {!hasScenes && questLine && questLine.encounters.length > 0 && (
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
                  cx={startX + i * spacing} cy="310"
                  r={current ? 5 : 3.5}
                  fill={completed ? colors.sage : current ? colors.gold : colors.lavender}
                  opacity={completed || current ? 0.8 : 0.25}
                >
                  {current && <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />}
                </circle>
              );
            })}
          </g>
        )}
      </svg>

      {/* Scene info (new system) */}
      {hasScenes && nextScene && (() => {
        const nextSceneData = getScene(nextScene);
        return (
          <p style={{
            fontFamily: fonts.heading,
            fontSize: '0.95rem',
            opacity: 0.6,
            marginBottom: '1rem',
            fontStyle: 'italic',
          }}>
            Next: {nextSceneData ? `Day ${nextSceneData.day} — ${nextSceneData.title}` : nextScene}
          </p>
        );
      })()}
      {hasScenes && !nextScene && currentQuest && (
        <p style={{
          fontFamily: fonts.heading,
          fontSize: '0.95rem',
          opacity: 0.8,
          marginBottom: '1rem',
          color: colors.gold,
        }}>
          All scenes complete. Your journey awaits its ending.
        </p>
      )}

      {/* Encounter info (legacy) */}
      {!hasScenes && nextEnc && nextChar && (
        <p style={{
          fontFamily: fonts.heading,
          fontSize: '0.95rem',
          opacity: 0.6,
          marginBottom: '1rem',
          fontStyle: 'italic',
        }}>
          Next: {nextChar.role} awaits...
        </p>
      )}
      {lockedReason && (
        <p style={{
          fontFamily: fonts.body,
          fontSize: '0.85rem',
          color: colors.peach,
          opacity: 0.7,
          marginBottom: '1rem',
          fontStyle: 'italic',
          textAlign: 'center',
          maxWidth: 400,
        }}>
          {lockedReason}
        </p>
      )}

      {/* Patterns indicator */}
      {totalPatterns > 0 && (
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: 'patterns' })}
          style={{
            marginBottom: '1.5rem',
            background: `${colors.deepPlum}cc`,
            border: `1px solid ${colors.gold}33`,
            borderRadius: 8,
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            color: colors.gold,
            fontFamily: fonts.heading,
            fontSize: '0.85rem',
            opacity: 0.7,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; }}
        >
          Patterns: {totalPatterns} discovered
        </button>
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
          disabled={!!lockedReason}
          style={{
            fontFamily: fonts.body,
            background: lockedReason
              ? `${colors.storm}66`
              : `linear-gradient(135deg, ${colors.sage}, ${colors.sage}cc)`,
            color: lockedReason ? colors.lavender : colors.plum,
            border: 'none',
            borderRadius: 8,
            padding: '0.85rem 2rem',
            cursor: lockedReason ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
            transition: 'all 0.2s ease',
            boxShadow: lockedReason ? 'none' : `0 4px 16px ${colors.sage}33`,
            opacity: lockedReason ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!lockedReason) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 6px 24px ${colors.sage}55`;
            }
          }}
          onMouseLeave={(e) => {
            if (!lockedReason) {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = `0 4px 16px ${colors.sage}33`;
            }
          }}
        >
          {lockedReason ? 'Locked' : (hasScenes ? (nextScene ? 'Begin Scene' : 'Complete Quest') : (nextEnc ? 'Begin Encounter' : 'Complete Quest'))}
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
