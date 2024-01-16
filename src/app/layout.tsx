'use client'
import './globals.css'

import { usePathname } from 'next/navigation'

import GlobalNavigationbar from './component/ui/Navigationbar/GlobalNavigationbar'
import Sidebar from './component/ui/sidebar/Sidebar'
import { ROUTE_BOARD, ROUTE_MAIN } from './constant/route/route-constant'
import { ReduxProvider } from './providers/reduxProvider'
import CustomThemeProvider from './providers/themeProvider'
import { type ReactProps } from './types/pageTypes'

export default function RootLayout({ children }: ReactProps) {
  const pathname = usePathname()
  const shouldSidebarVisible = () => {
    let extractedString: string
    const currentUrl = pathname.split('/')
    if (currentUrl.length >= 2) {
      extractedString = currentUrl.slice(0, 2).join('/')
      if (extractedString === ROUTE_MAIN || extractedString === ROUTE_BOARD) {
        return true
      }
      return false
    }
  }
  const bodyClassName = shouldSidebarVisible() === true ? 'pt-24 md:ml-60 ml-16' : ''
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="font-mono dark:bg-[#121212] bg-[#fbfbfd]">
        <ReduxProvider>
          <CustomThemeProvider>
            <GlobalNavigationbar />
            {shouldSidebarVisible() ?? false ? <Sidebar /> : <></>}
            <div className={bodyClassName}>{children}</div>
          </CustomThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
