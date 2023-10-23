"use client";

import { ThemeProvider } from "next-themes";

interface Props {
  children: React.ReactNode;
}

export default function ThemeProviders({ children }: Props) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
