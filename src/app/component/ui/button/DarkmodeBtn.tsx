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
    <button className="relative inline-flex items-center text-gray-900 dark:text-white hover:text-yellow-400 dark:hover:text-yellow-400 dark:hover:border-yellow-400 border-2 border-white dark:border-gray-900 hover:border-yellow-400 px-5 py-2.5 text-sm font-medium text-center rounded-lg  focus:ring-4 focus:outline-none focus:ring-yellow-400  dark:focus:ring-yellow-400">
      {currentTheme === 'dark' ? (
        <BsSunFill onClick={changeThemeMode('light')} className="w-5 h-5" />
      ) : (
        <BsMoonFill onClick={changeThemeMode('dark')} className="w-5 h-5" />
      )}
    </button>
  )
}
