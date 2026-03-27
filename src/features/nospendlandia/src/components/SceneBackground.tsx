import React from 'react';

/**
 * Full-bleed CSS-illustrated scene backgrounds.
 * Each artKey maps to a unique atmosphere. These are placeholder
 * CSS illustrations — will be replaced with real art later.
 */

interface Props {
  artKey: string;
  children: React.ReactNode;
}

const backgrounds: Record<string, React.CSSProperties> = {
  // Moon's apartment — dark room, warm window light, city outside
  moon_apartment: {
    background: `
      radial-gradient(ellipse at 72% 35%, rgba(212,184,224,0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 25% 80%, rgba(179,117,160,0.06) 0%, transparent 40%),
      linear-gradient(180deg, #0d0a15 0%, #151020 30%, #1a1228 60%, #0d0a15 100%)
    `,
  },
};

/** Stars scattered across the scene */
function Starfield() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    left: `${(Math.sin(i * 7.3 + 2) * 0.5 + 0.5) * 100}%`,
    top: `${(Math.cos(i * 5.1 + 1) * 0.5 + 0.5) * 30}%`,
    size: i % 3 === 0 ? 1.5 : 1,
    opacity: 0.1 + (i % 4) * 0.08,
    delay: `${(i % 5) * 0.7}s`,
  }));

  return (
    <>
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: '#d4b8e0',
            opacity: s.opacity,
            animation: `nsl-starTwinkle 3s ease-in-out ${s.delay} infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

/** City skyline silhouette at the bottom of the viewport */
function CitySkyline() {
  return (
    <svg
      viewBox="0 0 1200 200"
      preserveAspectRatio="xMidYMax slice"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '25vh',
        opacity: 0.15,
        pointerEvents: 'none',
      }}
    >
      {/* Buildings silhouette */}
      <rect x="50" y="80" width="40" height="120" fill="#1a1228" />
      <rect x="95" y="50" width="55" height="150" fill="#151020" />
      <rect x="155" y="100" width="30" height="100" fill="#1a1228" />
      <rect x="190" y="30" width="45" height="170" fill="#0d0a15" />
      <rect x="240" y="70" width="60" height="130" fill="#151020" />
      <rect x="305" y="90" width="35" height="110" fill="#1a1228" />
      <rect x="345" y="40" width="50" height="160" fill="#0d0a15" />
      <rect x="400" y="60" width="40" height="140" fill="#151020" />
      <rect x="445" y="85" width="55" height="115" fill="#1a1228" />
      <rect x="505" y="45" width="35" height="155" fill="#0d0a15" />
      <rect x="545" y="75" width="45" height="125" fill="#151020" />
      <rect x="595" y="95" width="30" height="105" fill="#1a1228" />
      <rect x="630" y="35" width="50" height="165" fill="#0d0a15" />
      <rect x="685" y="55" width="40" height="145" fill="#151020" />
      <rect x="730" y="80" width="55" height="120" fill="#1a1228" />
      <rect x="790" y="50" width="45" height="150" fill="#0d0a15" />
      <rect x="840" y="90" width="35" height="110" fill="#151020" />
      <rect x="880" y="65" width="50" height="135" fill="#1a1228" />
      <rect x="935" y="40" width="40" height="160" fill="#0d0a15" />
      <rect x="980" y="85" width="55" height="115" fill="#151020" />
      <rect x="1040" y="55" width="45" height="145" fill="#1a1228" />
      <rect x="1090" y="75" width="60" height="125" fill="#0d0a15" />
      {/* Lit windows — warm yellow dots scattered on buildings */}
      {[
        [110, 70], [115, 90], [125, 110],
        [205, 50], [210, 80], [220, 100],
        [260, 90], [270, 120], [275, 140],
        [360, 60], [365, 90], [370, 130],
        [460, 105], [470, 130],
        [520, 65], [525, 100],
        [650, 55], [655, 85], [660, 115],
        [700, 80], [705, 110],
        [750, 100], [760, 130], [770, 150],
        [810, 70], [815, 100],
        [900, 85], [905, 115], [910, 140],
        [955, 60], [960, 90],
        [1000, 105], [1010, 130],
        [1060, 75], [1065, 105],
        [1110, 95], [1120, 125],
      ].map(([x, y], i) => (
        <rect
          key={`w${i}`}
          x={x} y={y}
          width="4" height="5"
          fill="#d4a857"
          opacity={0.3 + (i % 3) * 0.15}
          rx="0.5"
        />
      ))}
    </svg>
  );
}

/** Warm window glow — the apartment's window casting light */
function WindowGlow() {
  return (
    <div style={{
      position: 'absolute',
      top: '8%',
      right: '8%',
      width: 'clamp(80px, 15vw, 160px)',
      height: 'clamp(100px, 20vw, 200px)',
      border: '2px solid rgba(212, 168, 87, 0.15)',
      borderRadius: 4,
      background: `
        radial-gradient(ellipse at center, rgba(212, 168, 87, 0.06) 0%, transparent 70%)
      `,
      boxShadow: `
        0 0 60px rgba(212, 168, 87, 0.08),
        inset 0 0 30px rgba(212, 168, 87, 0.04)
      `,
      pointerEvents: 'none',
      opacity: 0.7,
    }}>
      {/* Window dividers */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        width: 1,
        height: '100%',
        background: 'rgba(212, 168, 87, 0.12)',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '100%',
        height: 1,
        background: 'rgba(212, 168, 87, 0.12)',
      }} />
    </div>
  );
}

/** Phone screen glow — cool blue light on the left side */
function PhoneGlow() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '30%',
      left: '12%',
      width: 'clamp(30px, 5vw, 50px)',
      height: 'clamp(50px, 8vw, 80px)',
      borderRadius: 6,
      background: 'radial-gradient(ellipse at center, rgba(140, 160, 220, 0.12) 0%, transparent 70%)',
      boxShadow: '0 0 40px rgba(140, 160, 220, 0.08)',
      pointerEvents: 'none',
      animation: 'nsl-phoneFlicker 4s ease-in-out infinite',
    }} />
  );
}

export default function SceneBackground({ artKey, children }: Props) {
  const bgStyle = backgrounds[artKey] || backgrounds.moon_apartment;

  return (
    <div style={{
      position: 'relative',
      minHeight: '100dvh',
      overflow: 'hidden',
      ...bgStyle,
    }}>
      {/* Atmospheric elements */}
      {artKey === 'moon_apartment' && (
        <>
          <Starfield />
          <CitySkyline />
          <WindowGlow />
          <PhoneGlow />
        </>
      )}

      {/* Content layer */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100dvh',
      }}>
        {children}
      </div>
    </div>
  );
}
