'use client'

import { ThemeProvider } from 'next-themes'

import { type ReactProps } from '../_types/pageType'

export default function CustomThemeProvider({ children }: ReactProps) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}
