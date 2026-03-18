/** Nospendlandia design tokens */
export const colors = {
  plum: '#493751',
  mauve: '#B375A0',
  sage: '#A6C9BB',
  peach: '#E8B4A0',
  lavender: '#E0DAE7',
  cream: '#F8F1F2',
  deepPlum: '#2a1f30',
  gold: '#d4a857',
  storm: '#5a6b7a',
  ember: '#8b4557',
  starBlue: '#6b7fa3',
} as const;

export const fonts = {
  heading: "'Cormorant Garamond', Georgia, serif",
  body: "'Open Sans', system-ui, sans-serif",
} as const;

/** CSS keyframe animation names — inject via main.tsx */
export const animations = {
  fadeIn: 'nsl-fadeIn',
  slideUp: 'nsl-slideUp',
  fadeSlideIn: 'nsl-fadeSlideIn',
  glow: 'nsl-glow',
  float: 'nsl-float',
  shimmer: 'nsl-shimmer',
  pulseGlow: 'nsl-pulseGlow',
  typewriter: 'nsl-typewriter',
} as const;

/** Keyframes CSS to inject */
export const keyframesCSS = `
@keyframes ${animations.fadeIn} {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes ${animations.slideUp} {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes ${animations.fadeSlideIn} {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes ${animations.glow} {
  0%, 100% { filter: drop-shadow(0 0 8px currentColor); }
  50% { filter: drop-shadow(0 0 20px currentColor); }
}
@keyframes ${animations.float} {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@keyframes ${animations.shimmer} {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes ${animations.pulseGlow} {
  0%, 100% { box-shadow: 0 0 20px rgba(179, 117, 160, 0.3); }
  50% { box-shadow: 0 0 40px rgba(179, 117, 160, 0.6); }
}
@keyframes ${animations.typewriter} {
  from { max-height: 0; }
  to { max-height: 500px; }
}
`;
