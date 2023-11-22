'use client'

import { useEffect, useState } from 'react'

import { getCookie } from 'cookies-next'

// import UserAvatar from '../avatar/userAvatar'
import DarkmodeBtn from '../button/DarkmodeBtn'
import HamburgerBtn from '../button/HamburgerBtn'
import { HeaderLoginBtn } from '../button/SignupBtn'
import Logout from '../button/login/LogoutBtn'
import Logo from '../logo/Logo'
import Sidebar from '../sidebar/Sidebar'

import { type ReactProps } from '@/app/types/pageTypes'

export default function Header(props: ReactProps) {
  const [nav, setNav] = useState(false)
  const token = getCookie('access-token')
  const isToken = () => {
    return token !== undefined
  }

  const isLogin = isToken()

  const [mount, setMount] = useState(false)
  useEffect(() => {
    setMount(true)
  }, [setMount])
  return (
    <nav className="w-full">
      {mount ? (
        <>
          <div className="justify-between  px-4 mx-auto">
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center justify-between py-3 md:py-5">
                {isLogin ? <HamburgerBtn nav={nav} setNav={setNav} /> : <HeaderLoginBtn />}
              </div>

              <div
                className="flex justify-center items-center py-3 md:py-5 w-full"
                onClick={() => {
                  setNav(false)
                }}
              >
                <Logo />
              </div>
              <div className="w-2/6 p-2 flex items-center justify-around text-2xl text-indigo-500 font-bold py-3 md:py-5">
                {/* {isLogin ? <div className="mr-5">user avatar</div> : <div></div>} */}
                {isLogin ? <Logout /> : <></>}
                <DarkmodeBtn />
              </div>
            </div>
          </div>

          <main className="flex">
            <Sidebar nav={nav} />
            <div className="w-full flex flex-col h-screen overflow-y-hidden ">
              <slot
                onClick={() => {
                  setNav(false)
                }}
              >
                {props.children}
              </slot>
            </div>
          </main>
        </>
      ) : (
        <></>
      )}
    </nav>
  )
}
