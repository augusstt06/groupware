'use client'

import { useEffect, useState } from 'react'

import { useTheme } from 'next-themes'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'

export default function DarkmodeBtn() {
  const [mounted, setMounted] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  const changeThemeMode = (mode: string) => () => {
    setTheme(mode)
  }

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <>
      {currentTheme === 'dark' ? (
        <BsSunFill onClick={changeThemeMode('light')} className="w-4 h-4 cursor-pointer" />
      ) : (
        <BsMoonFill onClick={changeThemeMode('dark')} className="w-4 h-4 cursor-pointer" />
      )}
    </>
  )
}
