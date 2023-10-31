"use client";

import { ThemeProvider } from "next-themes";
import { ReactProps } from "../types";

export default function CustomThemeProvider({ children }: ReactProps) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
