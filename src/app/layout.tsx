import "./globals.css";
import Header from "./component/ui/header/Header";
import { ReduxProviders } from "./providers/ReduxProviders";
import ThemeProviders from "./providers/ThemeProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProviders>
      <html lang="en" suppressHydrationWarning={true}>
        <body className="font-mono">
          <ThemeProviders>
            <Header>{children}</Header>
          </ThemeProviders>
        </body>
      </html>
    </ReduxProviders>
  );
}
