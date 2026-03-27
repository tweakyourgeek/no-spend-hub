import React from 'react';
import { colors, fonts, animations } from '../theme';
import SceneBackground from './SceneBackground';
import type { Scene } from '../types';

interface Props {
  scene: Scene;
  children: React.ReactNode;
}

/**
 * Scene wrapper — visual novel frame.
 * Full-bleed illustrated background with scene header overlay.
 */
export default function SceneFrame({ scene, children }: Props) {
  const isMoonScene = scene.characters.includes('moon');

  const titleColor = isMoonScene ? colors.moonGlow : colors.cream;

  return (
    <SceneBackground artKey={scene.artKey}>
      <div style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'max(env(safe-area-inset-top, 0px), 1.5rem) clamp(1rem, 4vw, 2rem) max(env(safe-area-inset-bottom, 0px), 1.5rem)',
        color: colors.cream,
        animation: `${animations.fadeIn} 0.6s ease-out`,
        overflowX: 'hidden',
      }}>
        {/* Scene header — location and time pinned at top */}
        <div style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          animation: `${animations.fadeSlideIn} 0.5s ease-out`,
        }}>
          <p style={{
            fontFamily: fonts.body,
            fontSize: '0.7rem',
            opacity: 0.35,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '0.25rem',
          }}>
            {scene.location}
          </p>
          <h2 style={{
            fontFamily: fonts.heading,
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            margin: '0 0 0.25rem',
            color: titleColor,
          }}>
            {scene.title}
          </h2>
          <p style={{
            fontFamily: fonts.heading,
            fontSize: '0.85rem',
            opacity: 0.4,
            fontStyle: 'italic',
          }}>
            {scene.timeLabel}
          </p>
        </div>

        {/* Scene content — beats render here */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 600,
          flex: 1,
        }}>
          {children}
        </div>
      </div>
    </SceneBackground>
  );
}
