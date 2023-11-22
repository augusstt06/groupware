import './globals.css'
import Header from './component/ui/header/Header'
import { ReduxProvider } from './providers/reduxProvider'
import CustomThemeProvider from './providers/themeProvider'
import { type ReactProps } from './types/pageTypes'

export default function RootLayout({ children }: ReactProps) {
  return (
    <ReduxProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className="font-mono">
          <CustomThemeProvider>
            <Header />
            {children}
          </CustomThemeProvider>
        </body>
      </html>
    </ReduxProvider>
  )
}
