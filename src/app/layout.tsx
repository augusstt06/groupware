'use client'

import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Fredoka } from 'next/font/google'
import { usePathname } from 'next/navigation'

import Nav from './components/nav/Nav'
import Sidebar from './components/sidebar/Sidebar'
import { ROUTE_BOARD, ROUTE_MAIN, ROUTE_PROJECT, ROUTE_TEAM } from './constant/route/route-constant'
import { ReduxProvider } from './providers/reduxProvider'
import CustomThemeProvider from './providers/themeProvider'
import { type ReactProps } from './types/pageType'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: '300',
})
export default function RootLayout({ children }: ReactProps) {
  const queryClient = new QueryClient()
  const pathname = usePathname()
  const shouldSidebarVisible = () => {
    let extractedString: string

    const currentUrl = pathname.split('/')
    if (currentUrl.length >= 2) {
      extractedString = currentUrl.slice(0, 2).join('/')
      if (
        extractedString === ROUTE_MAIN ||
        extractedString === ROUTE_BOARD ||
        extractedString === ROUTE_PROJECT ||
        extractedString === ROUTE_TEAM
      ) {
        return true
      }
      return false
    }
  }

  const bodyClassName =
    shouldSidebarVisible() === true ? 'pt-36 md:ml-60 2xl:ml-30 p-2 flex justify-center' : ''

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="font-mono bg-gradient-to-r from-[#c9d6ff] to-[#e2e2e2] dark:from-[#24262f] dark:to-[#24262f]">
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          <ReduxProvider>
            <CustomThemeProvider>
              <Nav />
              {shouldSidebarVisible() ?? false ? <Sidebar /> : <></>}
              <div className={bodyClassName + fredoka.className}>{children}</div>
              <div id="modal"></div>
            </CustomThemeProvider>
          </ReduxProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
