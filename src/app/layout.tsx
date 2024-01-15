'use client'
import './globals.css'

import GlobalNavigationbar from './component/ui/Navigationbar/GlobalNavigationbar'
import Sidebar from './component/ui/sidebar/Sidebar'
import { ReduxProvider } from './providers/reduxProvider'
import CustomThemeProvider from './providers/themeProvider'
import { type ReactProps } from './types/pageTypes'

export default function RootLayout({ children }: ReactProps) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="font-mono dark:bg-[#121212] bg-[#fbfbfd]">
        <ReduxProvider>
          <CustomThemeProvider>
            <GlobalNavigationbar />
            <Sidebar myBoardList={[]} />
            <div className="pt-24 md:ml-60 ml-16">{children}</div>
          </CustomThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
