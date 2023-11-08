'use client'

import { useEffect, useState } from 'react'

import { useTheme } from 'next-themes'
import { BsMoon, BsSunFill } from 'react-icons/bs'

export default function DarkmodeBtn () {
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
    <div>
      {currentTheme === 'dark'
        ? (
        <BsSunFill onClick={changeThemeMode('light')} />
          )
        : (
        <BsMoon onClick={changeThemeMode('dark')} />
          )}
    </div>
  )
}
