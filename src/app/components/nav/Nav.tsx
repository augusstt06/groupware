'use client'

import { useEffect, useRef, useState } from 'react'

import { Chakra_Petch } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import DarkmodeBtn from '../button/DarkmodeBtn'
import Dialog from '../modal/dialog/Dialog'

import NormalNav from './responsive/NormalNav'
import ResponsiveNav from './responsive/ResponsiveNav'

import { KEY_LOGIN_COMPLETE, TRUE } from '@/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/constant/errorMsg'
import { useAppSelector } from '@/module/hooks/reduxHooks'
import { createAccessTokenManager } from '@/module/utils/token'
import { type DialogBtnValueType } from '@/types/module'
import { type RenderNavProps } from '@/types/ui/nav'
import { type DialogTextType } from '@/types/variable'
import '@/globals.css'

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

  const { getAccessToken } = createAccessTokenManager
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])

  const [mount, setMount] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (e: MouseEvent) => {
    if (dropRef.current !== null && !dropRef.current.contains(e.target as Node)) {
      setIsDropOpen(false)
    }
  }

  const isNavRender = () => {
    return (
      mount && loginCompleteState === TRUE && getAccessToken() !== ERR_COOKIE_NOT_FOUND && isRender
    )
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
      <nav className="fixed bg-gradient-to-r from-[#c9d6ff] to-[#e2e2e2] dark:from-[#24262f] dark:to-[#24262f] border-gray-200 w-full z-50">
        <div className={`flex items-center justify-between max-w-screen-xl mx-auto p-4`}>
          <Link
            href="/main"
            className="flex items-center ml-10 font-semibold space-x-3 hover:scale-110 smooth-transition md:text-2xl text-medium dark:text-white"
            onClick={() => {
              setIsDropOpen(false)
            }}
          >
            <h1 className={chakra.className}>Groupware</h1>
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
      {isRender() === true ? (
        children
      ) : (
        <div className="absolute right-10 top-10">
          <a className="text-gray-800 smooth-transition md:inline dark:hover:text-yellow-400 hover:text-yellow-400 dark:text-white">
            <DarkmodeBtn />
          </a>
        </div>
      )}
    </>
  )
}
