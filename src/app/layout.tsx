'use client'
import './globals.css'

import Header from './component/ui/header/Header'
import { ReduxProvider } from './providers/reduxProvider'
import CustomThemeProvider from './providers/themeProvider'
import { type ReactProps } from './types/pageTypes'

export default function RootLayout({ children }: ReactProps) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="font-mono">
        <ReduxProvider>
          <CustomThemeProvider>
            <Header />
            {children}
          </CustomThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
