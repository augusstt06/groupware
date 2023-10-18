import "./globals.css";
import Header from "./component/Header";
import { Providers } from "./store/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </Providers>
  );
}
