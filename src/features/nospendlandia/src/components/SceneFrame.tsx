import React from 'react';
import { colors, fonts, animations } from '../theme';
import type { Scene } from '../types';

interface Props {
  scene: Scene;
  children: React.ReactNode;
}

/**
 * Scene wrapper with location, time, and atmospheric styling.
 * Moon scenes use night mode colors.
 */
export default function SceneFrame({ scene, children }: Props) {
  const isMoonScene = scene.characters.includes('moon');

  const bg = isMoonScene
    ? `linear-gradient(180deg, #0d0a15 0%, #1a1228 40%, #2a1f30 100%)`
    : `linear-gradient(180deg, ${colors.deepPlum} 0%, ${colors.plum} 40%, ${colors.mauve}22 100%)`;

  return (
    <div style={{
      minHeight: '100vh',
      background: bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      color: colors.cream,
      animation: `${animations.fadeIn} 0.6s ease-out`,
    }}>
      {/* Scene header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        animation: `${animations.fadeSlideIn} 0.5s ease-out`,
      }}>
        <p style={{
          fontFamily: fonts.body,
          fontSize: '0.75rem',
          opacity: 0.4,
          letterSpacing: '0.1em',
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
          color: isMoonScene ? '#d4b8e0' : colors.cream,
        }}>
          {scene.title}
        </h2>
        <p style={{
          fontFamily: fonts.heading,
          fontSize: '0.85rem',
          opacity: 0.5,
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
  );
}
