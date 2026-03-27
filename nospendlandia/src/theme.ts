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
  night: '#1a1228',
  moonGlow: '#d4b8e0',
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
  cursorBlink: 'nsl-cursorBlink',
} as const;

/** Global base styles for the RPG */
export const baseCSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Open+Sans:wght@400;600&display=swap');

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overscroll-behavior-y: none;
}

/* Safe area for notched devices */
@supports (padding: env(safe-area-inset-top)) {
  body { padding-env: safe-area-inset; }
}

/* Larger touch targets on mobile */
@media (pointer: coarse) {
  button {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Prevent text selection on buttons but allow on content */
button { user-select: none; -webkit-user-select: none; }

/* Smooth focus rings */
button:focus-visible {
  outline: 2px solid ${colors.sage};
  outline-offset: 2px;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

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
@keyframes ${animations.cursorBlink} {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes nsl-starTwinkle {
  0%, 100% { opacity: inherit; }
  50% { opacity: 0.02; }
}
@keyframes nsl-phoneFlicker {
  0%, 100% { opacity: 0.8; }
  30% { opacity: 0.6; }
  50% { opacity: 0.9; }
  70% { opacity: 0.5; }
}
`;
