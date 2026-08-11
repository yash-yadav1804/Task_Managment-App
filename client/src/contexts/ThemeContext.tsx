'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type AccentColor = 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'pink';

interface ThemeContextType {
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ACCENT_COLORS: Record<AccentColor, string> = {
  blue: '#3b82f6',
  purple: '#8b5cf6',
  green: '#10b981',
  orange: '#f97316',
  red: '#ef4444',
  pink: '#ec4899'
};

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [accentColor, setAccentColorState] = useState<AccentColor>('blue');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('accent-color') as AccentColor;
    if (stored && ACCENT_COLORS[stored]) {
      setAccentColorState(stored);
    }
  }, []);

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem('accent-color', color);
  };

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.style.setProperty('--accent', ACCENT_COLORS[accentColor]);
    root.style.setProperty('--ring', ACCENT_COLORS[accentColor]);
  }, [accentColor, mounted]);

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeContext.Provider value={{ accentColor, setAccentColor }}>
        {children}
      </ThemeContext.Provider>
    </NextThemesProvider>
  );
}

export function useAccentTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAccentTheme must be used within a CustomThemeProvider');
  }
  return context;
}
