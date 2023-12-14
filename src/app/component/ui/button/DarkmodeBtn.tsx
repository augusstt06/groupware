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
    <button>
      {currentTheme === 'dark' ? (
        <BsSunFill onClick={changeThemeMode('light')} className="md:w-5 md:h-5 w-4 h-4" />
      ) : (
        <BsMoonFill onClick={changeThemeMode('dark')} className="md:w-5 md:h-5 w-4 h-4" />
      )}
    </button>
  )
}
