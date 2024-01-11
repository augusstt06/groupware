'use client'

import { useEffect, useRef, useState } from 'react'

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

export default function GlobalNavigationbar() {
  const pathname = usePathname()
  const isRender = !pathname.startsWith('/err')

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

  useEffect(() => {
    setIsDropOpen(false)
    setIsUserStateOpen(false)
    setMount(true)
    setConfirmValue(false)
  }, [dropRef])
  useEffect(() => {
    setIsDropOpen(false)
  }, [])

  return (
    <>
      {mount && loginCompleteState === TRUE && accessToken !== ERR_COOKIE_NOT_FOUND && isRender ? (
        <nav className="relative bg-white border-gray-200 dark:bg-gray-900 z-999">
          <div className="flex items-center justify-between max-w-screen-xl mx-auto p-4">
            <Link href="/main" className="flex items-center space-x-3 rtl:space-x-reverse ml-3">
              <span className="self-center md:text-2xl text-medium font-semibold whitespace-nowrap dark:text-white">
                Logo
              </span>
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
              } md:flex md:flex-row justify-center md:w-4/5 md:static bg-white md:border-none dark:bg-gray-900 border-b border-1 dark:border-indigo-300 z-999 absolute top-14 left-0 right-0 flex flex-col`}
            >
              <div
                id="mega-menu-icons"
                className="flex md:flex-row flex-col justify-center items-center w-full "
                ref={dropRef}
              >
                <GnbCategoryMenu />
                <GnbHamburgerMenu
                  isConfirmOpen={isConfirmOpen}
                  setIsConfirmOpen={setIsConfirmOpen}
                  confirmValue={confirmValue}
                  setConfirmValue={setConfirmValue}
                />
              </div>
            </div>
            <GnbNormalMenu
              clickUserStateMenu={clickUserStateMenu}
              isUserStateOpen={isUserStateOpen}
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
          <a className="md:inline text-gray-800 dark:hover:text-yellow-400 hover:text-yellow-400 dark:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  focus:outline-none dark:focus:ring-gray-800">
            <DarkmodeBtn />
          </a>
        </div>
      )}
    </>
  )
}
