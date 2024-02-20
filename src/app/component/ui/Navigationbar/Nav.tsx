'use client'

import { useEffect, useRef, useState } from 'react'

import { Chakra_Petch } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import DarkmodeBtn from '../button/DarkmodeBtn'
import Dialog from '../modal/dialog/Dialog'

import NormalNav from './responsive/NormalNav'
import ResponsiveNav from './responsive/ResponsiveNav'

import { KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE, TRUE } from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { type DialogBtnValueType } from '@/app/types/module'
import { type RenderNavProps } from '@/app/types/ui/nav'
import { type DialogTextType } from '@/app/types/variable'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: '500',
})

export default function Nav() {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [logoutDialogBtnValue, setLogoutDialogBtnValue] = useState<DialogBtnValueType>({
    isCancel: false,
    cancleFunc: () => {
      dialogRef.current?.close()
    },
    cancelText: '',
    confirmFunc: () => {},
    confirmText: '확인',
  })
  const changeDialogConfirmFn = (fn: () => Promise<void>) => {
    setLogoutDialogBtnValue((prev) => ({
      ...prev,
      confirmFunc: () => {
        void fn()
      },
    }))
  }
  const [dialogText] = useState<DialogTextType>({
    main: '퇴근확인을 아직 하지 않았습니다.',
    sub: '로그아웃 하시겠습니까?',
  })
  const handleOpenDialog = () => {
    dialogRef.current?.showModal()
  }

  const pathname = usePathname()
  const isRender = !pathname.startsWith('/err') && !pathname.startsWith('/invite')

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

  const isNavRender = () => {
    return mount && loginCompleteState === TRUE && accessToken !== ERR_COOKIE_NOT_FOUND && isRender
  }

  useEffect(() => {
    setIsDropOpen(false)
    setIsUserStateOpen(false)
    setMount(true)
  }, [dropRef])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <RenderNav isRender={isNavRender}>
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
          <ResponsiveNav
            isDropOpen={isDropOpen}
            setIsDropOpen={setIsDropOpen}
            setIsUserStateOpen={setIsUserStateOpen}
            dropRef={dropRef}
            handleOpenDialog={handleOpenDialog}
            changeDialogConfirmFn={changeDialogConfirmFn}
          />
          <NormalNav
            handleOpenDialog={handleOpenDialog}
            changeDialogConfirmFn={changeDialogConfirmFn}
            clickUserStateMenu={clickUserStateMenu}
            isUserStateOpen={isUserStateOpen}
            setIsUserStateOpen={setIsUserStateOpen}
            isDropOpen={isDropOpen}
            clickDropdownMenu={clickDropdownMenu}
          />
        </div>
        <Dialog
          dialog={dialogRef}
          dialogAlertText={dialogText}
          dialogBtnValue={logoutDialogBtnValue}
        />
      </nav>
    </RenderNav>
  )
}

function RenderNav(props: RenderNavProps) {
  const { isRender, children } = props
  return (
    <>
      {isRender() ? (
        children
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
