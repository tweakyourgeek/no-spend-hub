import React, { useState, useEffect } from 'react';
import { colors, fonts, animations } from '../theme';

interface Props {
  text: string;
  onComplete: () => void;
}

/** Italic scene-setting narration text with typewriter effect */
export default function NarrationBlock({ text, onComplete }: Props) {
  const [displayed, setDisplayed] = useState('');
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setComplete(false);
    let i = 0;
    const speed = 20;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setComplete(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  function skip() {
    if (!complete) {
      setDisplayed(text);
      setComplete(true);
    }
  }

  return (
    <div onClick={skip} style={{ cursor: complete ? 'default' : 'pointer', width: '100%' }}>
      <div style={{
        background: `${colors.deepPlum}88`,
        borderLeft: `3px solid ${colors.lavender}44`,
        borderRadius: '0 8px 8px 0',
        padding: '1.25rem 1.5rem',
        maxWidth: 540,
        width: '100%',
        margin: '0 auto 1.5rem',
        fontFamily: fonts.heading,
        fontStyle: 'italic',
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        lineHeight: 1.8,
        color: colors.lavender,
        opacity: 0.9,
        animation: `${animations.fadeIn} 0.5s ease-out`,
      }}>
        {displayed}
        {!complete && (
          <span style={{
            display: 'inline-block',
            width: 2,
            height: '1em',
            background: colors.lavender,
            marginLeft: 2,
            animation: `${animations.cursorBlink} 0.8s step-end infinite`,
          }} />
        )}
      </div>
      {!complete && (
        <p style={{
          fontFamily: fonts.body,
          fontSize: '0.75rem',
          opacity: 0.3,
          textAlign: 'center',
          color: colors.cream,
        }}>
          click to skip
        </p>
      )}
      {complete && (
        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          <button
            onClick={(e) => { e.stopPropagation(); onComplete(); }}
            style={{
              fontFamily: fonts.body,
              background: 'transparent',
              color: colors.cream,
              border: `1px solid ${colors.lavender}33`,
              borderRadius: 6,
              padding: '0.5rem 1.5rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
              opacity: 0.6,
              transition: 'opacity 0.2s',
              animation: `${animations.fadeIn} 0.3s ease-out`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; }}
          >
            continue
          </button>
        </div>
      )}
    </div>
  );
}
