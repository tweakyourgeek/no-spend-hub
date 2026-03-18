import React, { useState, useEffect } from 'react';
import { animations } from '../theme';

interface Props {
  children: React.ReactNode;
  screenKey: string;
}

/** Wraps a screen in a fade+slide transition when the key changes */
export default function ScreenTransition({ children, screenKey }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, [screenKey]);

  return (
    <div
      style={{
        animation: visible ? `${animations.fadeSlideIn} 0.5s ease-out forwards` : 'none',
        opacity: visible ? undefined : 0,
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
}
