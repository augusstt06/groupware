"use client";

import { BsSunFill, BsMoon } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface Darkmode {}

export default function DarkmodeBtn({}: Darkmode) {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const changeThemeMode = (mode: string) => () => {
    setTheme(mode);
  };

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div>
      {currentTheme === "dark" ? (
        <BsSunFill onClick={changeThemeMode("light")} />
      ) : (
        <BsMoon onClick={changeThemeMode("dark")} />
      )}
    </div>
  );
}
