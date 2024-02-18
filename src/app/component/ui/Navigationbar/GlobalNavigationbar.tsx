'use client'

import { useEffect, useRef, useState } from 'react'

import { Chakra_Petch } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import DarkmodeBtn from '../button/DarkmodeBtn'
import Confirm from '../confirm/Confirm'

import GnbCategoryMenu from './menu/GnbCategoryMenu'
import GnbHamburgerMenu from './menu/GnbHamburgerMenu'
import GnbNormalMenu from './menu/GnbNormalMenu'

import { KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE, TRUE } from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: '500',
})

export default function GlobalNavigationbar() {
  const pathname = usePathname()
  const isRender = !pathname.startsWith('/err') && !pathname.startsWith('/invite')

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [confirmValue, setConfirmValue] = useState(false)
  const [isDropOpen, setIsDropOpen] = useState(false)
  const [isUserStateOpen, setIsUserStateOpen] = useState(false)
  const clickUserStateMenu = () => {
    if (isUserStateOpen) {
      setIsUserStateOpen(false)
    } else {
      setIsUserStateOpen(true)
    }
  }
  const clickDropdownMenu = () => {
    if (isDropOpen) {
      setIsDropOpen(false)
    } else {
      setIsDropOpen(true)
    }
  }

  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])

  const [mount, setMount] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (e: MouseEvent) => {
    if (dropRef.current !== null && !dropRef.current.contains(e.target as Node)) {
      setIsDropOpen(false)
    }
  }

  const isGnbRender = () => {
    if (mount && loginCompleteState === TRUE && accessToken !== ERR_COOKIE_NOT_FOUND && isRender)
      return true
    return false
  }
  useEffect(() => {
    setIsDropOpen(false)
    setIsUserStateOpen(false)
    setMount(true)
    setConfirmValue(false)
  }, [dropRef])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      {isGnbRender() ? (
        <nav className="fixed bg-transparent border-gray-200 z-999 w-full z-50">
          <div className={`flex items-center justify-between max-w-screen-xl mx-auto p-4`}>
            <Link
              href="/main"
              className="hover:scale-110 transition ease-in-out duration-500 flex items-center space-x-3 ml-10 md:text-2xl text-medium font-semibold dark:text-white"
              onClick={() => {
                setIsDropOpen(false)
              }}
            >
              <h1 className={chakra.className}>GroupWare</h1>
            </Link>
            {isConfirmOpen ? (
              <Confirm
                isConfirmOpen={isConfirmOpen}
                setIsConfirmOpen={setIsConfirmOpen}
                setConfirmValue={setConfirmValue}
              />
            ) : (
              <></>
            )}
            <div
              className={`${
                isDropOpen ? '' : 'hidden'
              }  backdrop-blur-lg md:flex md:flex-row justify-center md:w-4/5 md:static md:border-none border-b border-1 dark:border-indigo-300 z-50 absolute top-14 left-0 right-0 flex flex-col `}
            >
              <div
                className="flex md:flex-row flex-col justify-center items-center w-full"
                ref={dropRef}
              >
                <GnbCategoryMenu
                  handleClickDrop={() => {
                    setIsDropOpen(false)
                  }}
                />
                <GnbHamburgerMenu
                  isConfirmOpen={isConfirmOpen}
                  setIsConfirmOpen={setIsConfirmOpen}
                  confirmValue={confirmValue}
                  setConfirmValue={setConfirmValue}
                  setIsUserStateOpen={setIsUserStateOpen}
                />
              </div>
            </div>
            <GnbNormalMenu
              clickUserStateMenu={clickUserStateMenu}
              isUserStateOpen={isUserStateOpen}
              setIsUserStateOpen={setIsUserStateOpen}
              isConfirmOpen={isConfirmOpen}
              setIsConfirmOpen={setIsConfirmOpen}
              confirmValue={confirmValue}
              setConfirmValue={setConfirmValue}
              isDropOpen={isDropOpen}
              clickDropdownMenu={clickDropdownMenu}
            />
          </div>
        </nav>
      ) : (
        <div className="absolute right-10 top-10">
          <a className="transition ease-in-out duration-500 md:inline text-gray-800 dark:hover:text-yellow-400 hover:text-yellow-400 dark:text-white">
            <DarkmodeBtn />
          </a>
        </div>
      )}
    </>
  )
}
