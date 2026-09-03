'use client';

import { useEffect, useState } from 'react';

type Theme = 'system' | 'light' | 'dark';

export default function ThemeControls() {
  const [theme, setTheme] = useState<Theme>('system');
  useEffect(() => {
    const saved = window.localStorage.getItem('zunaid-theme') as Theme | null;
    if (saved === 'system' || saved === 'light' || saved === 'dark') setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme === 'system' ? '' : theme;
    window.localStorage.setItem('zunaid-theme', theme);
  }, [theme]);
  return <div className="theme-controls" aria-label="Theme preference">
    {(['system', 'light', 'dark'] as Theme[]).map((option) => <button key={option} type="button" className={theme === option ? 'active' : ''} onClick={() => setTheme(option)} aria-label={option + ' theme'} aria-pressed={theme === option}>{option === 'system' ? '◐' : option === 'light' ? '☼' : '☾'} <span>{option}</span></button>)}
  </div>;
}
