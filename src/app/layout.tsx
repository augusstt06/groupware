import "./globals.css";
import Header from "./component/Header";
import { ReduxProviders } from "./store/reduxProviders";
import ThemeProviders from "./features/ThemeProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProviders>
      <html lang="en">
        <body className="font-mono">
          <ThemeProviders>
            <Header>{children}</Header>
          </ThemeProviders>
        </body>
      </html>
    </ReduxProviders>
  );
}
