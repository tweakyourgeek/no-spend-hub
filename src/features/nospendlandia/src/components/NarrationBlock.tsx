import React, { useState, useEffect } from 'react';
import { colors, fonts, animations } from '../theme';

interface Props {
  text: string;
  onComplete: () => void;
  /** First narration in a scene renders as an establishing shot */
  isEstablishing?: boolean;
}

/** Italic scene-setting narration text with typewriter effect.
 *  When isEstablishing is true, renders full-width with cinematic feel.
 */
export default function NarrationBlock({ text, onComplete, isEstablishing }: Props) {
  const [displayed, setDisplayed] = useState('');
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setComplete(false);
    let i = 0;
    const speed = isEstablishing ? 28 : 20; // Slower for establishing shots
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setComplete(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, isEstablishing]);

  function skip() {
    if (!complete) {
      setDisplayed(text);
      setComplete(true);
    }
  }

  if (isEstablishing) {
    return (
      <div onClick={skip} style={{
        cursor: complete ? 'default' : 'pointer',
        width: '100%',
        animation: `${animations.fadeIn} 1.2s ease-out`,
      }}>
        {/* Establishing shot — centered, larger, more breathing room */}
        <div style={{
          maxWidth: 520,
          width: '100%',
          margin: '2rem auto 2rem',
          textAlign: 'center',
          padding: '2rem 1.5rem',
        }}>
          <p style={{
            fontFamily: fonts.heading,
            fontStyle: 'italic',
            fontSize: 'clamp(1.05rem, 3vw, 1.2rem)',
            lineHeight: 2,
            color: colors.moonGlow,
            opacity: 0.75,
            letterSpacing: '0.01em',
          }}>
            {displayed}
            {!complete && (
              <span style={{
                display: 'inline-block',
                width: 2,
                height: '1em',
                background: colors.moonGlow,
                marginLeft: 2,
                opacity: 0.6,
                animation: `${animations.cursorBlink} 0.8s step-end infinite`,
              }} />
            )}
          </p>
        </div>

        {!complete && (
          <p style={{
            fontFamily: fonts.body,
            fontSize: '0.7rem',
            opacity: 0.2,
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
                border: `1px solid ${colors.lavender}22`,
                borderRadius: 6,
                padding: '0.5rem 1.5rem',
                cursor: 'pointer',
                fontSize: '0.85rem',
                opacity: 0.4,
                transition: 'opacity 0.2s',
                animation: `${animations.fadeIn} 0.5s ease-out`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.4'; }}
            >
              continue
            </button>
          </div>
        )}
      </div>
    );
  }

  // Standard narration — side-panel style
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
