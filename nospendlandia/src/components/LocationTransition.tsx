import React, { useState, useEffect } from 'react';
import { colors, fonts, animations } from '../theme';

interface Props {
  location: string;
  timeLabel: string;
  onComplete: () => void;
}

/**
 * Animated transition shown when the Fool moves to a new location.
 * Fades in the location name with a traveling feel, then fades out.
 */
export default function LocationTransition({ location, timeLabel, onComplete }: Props) {
  const [phase, setPhase] = useState<'entering' | 'holding' | 'exiting'>('entering');

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase('holding'), 600);
    const holdTimer = setTimeout(() => setPhase('exiting'), 2200);
    const exitTimer = setTimeout(() => onComplete(), 3000);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: colors.night,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: phase === 'exiting' ? 0 : 1,
      transition: phase === 'exiting' ? 'opacity 0.8s ease-out' : 'none',
    }}>
      {/* Traveling dots animation */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: '2rem',
        opacity: phase === 'entering' ? 0 : 0.4,
        transition: 'opacity 0.5s ease',
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: colors.moonGlow,
            animation: `${animations.float} 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>

      {/* Location name */}
      <h2 style={{
        fontFamily: fonts.heading,
        fontSize: 'clamp(1.4rem, 4vw, 2rem)',
        fontWeight: 300,
        color: colors.moonGlow,
        letterSpacing: '0.05em',
        opacity: phase === 'entering' ? 0 : 1,
        transform: phase === 'entering' ? 'translateY(12px)' : 'translateY(0)',
        transition: 'all 0.6s ease-out',
        textAlign: 'center',
        margin: 0,
      }}>
        {location}
      </h2>

      {/* Time */}
      <p style={{
        fontFamily: fonts.heading,
        fontSize: '0.9rem',
        fontStyle: 'italic',
        color: colors.lavender,
        opacity: phase === 'entering' ? 0 : 0.4,
        transform: phase === 'entering' ? 'translateY(8px)' : 'translateY(0)',
        transition: 'all 0.6s ease-out 0.15s',
        marginTop: '0.5rem',
      }}>
        {timeLabel}
      </p>

      {/* Horizontal rule that expands */}
      <div style={{
        width: phase === 'entering' ? 0 : 'clamp(60px, 15vw, 120px)',
        height: 1,
        background: `linear-gradient(90deg, transparent, ${colors.mauve}44, transparent)`,
        marginTop: '1.5rem',
        transition: 'width 0.8s ease-out 0.3s',
      }} />
    </div>
  );
}
