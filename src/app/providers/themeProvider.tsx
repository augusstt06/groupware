'use client'

import { ThemeProvider } from 'next-themes'

import { type ReactProps } from '../types/pageTypes'

export default function CustomThemeProvider({ children }: ReactProps) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}
