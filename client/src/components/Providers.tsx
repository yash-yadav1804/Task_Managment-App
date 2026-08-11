'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { ReactNode } from 'react';

import { CustomThemeProvider } from '../contexts/ThemeContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        {children}
      </CustomThemeProvider>
    </QueryClientProvider>
  );
}
