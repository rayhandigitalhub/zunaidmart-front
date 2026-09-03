'use client';

import { useEffect } from 'react';

export default function CursorFX() {
  useEffect(() => {
    const root = document.documentElement;
    const move = (event: PointerEvent) => {
      root.style.setProperty('--cursor-x', event.clientX + 'px');
      root.style.setProperty('--cursor-y', event.clientY + 'px');
    };
    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      root.classList.toggle('cursor-hover', Boolean(target?.closest('a,button,input,select,textarea')));
    };
    const out = (event: PointerEvent) => {
      if (!(event.relatedTarget as HTMLElement | null)?.closest?.('a,button,input,select,textarea')) root.classList.remove('cursor-hover');
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerout', out, { passive: true });
    root.classList.add('cursor-enabled');
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerover', over); window.removeEventListener('pointerout', out); root.classList.remove('cursor-enabled', 'cursor-hover'); };
  }, []);
  return <><div className="cursor-glow" aria-hidden="true" /><div className="cursor-ring" aria-hidden="true" /><div className="cursor-dot" aria-hidden="true" /></>;
}
