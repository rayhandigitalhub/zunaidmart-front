'use client';

import { useEffect } from 'react';

export default function CursorFX() {
  useEffect(() => {
    const root = document.documentElement;
    const move = (event: PointerEvent) => {
      root.style.setProperty('--cursor-x', event.clientX + 'px');
      root.style.setProperty('--cursor-y', event.clientY + 'px');
    };
    window.addEventListener('pointermove', move, { passive: true });
    root.classList.add('cursor-enabled');
    return () => { window.removeEventListener('pointermove', move); root.classList.remove('cursor-enabled'); };
  }, []);
  return <div className="cursor-glow" aria-hidden="true" />;
}
