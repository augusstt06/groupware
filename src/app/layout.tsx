import "./globals.css";
import Header from "./component/ui/header/Header";
import { ReduxProvider } from "./providers/reduxProvider";
import CustomThemeProvider from "./providers/themeProvider";
import { ReactProps } from "./types";

export default function RootLayout({ children }: ReactProps) {
  return (
    <ReduxProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className="font-mono">
          <CustomThemeProvider>
            <Header>{children}</Header>
          </CustomThemeProvider>
        </body>
      </html>
    </ReduxProvider>
  );
}
