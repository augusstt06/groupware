'use client'

import { useState } from 'react'

import DarkmodeBtn from '../button/DarkmodeBtn'
import HamburgerBtn from '../button/HamburgerBtn'
import { HeaderLoginBtn } from '../button/LoginBtn'
import Logo from '../logo/Logo'
import Sidebar from '../sidebar/Sidebar'

import { type ReactProps } from '@/app/types'

export default function Header(props: ReactProps) {
  const [nav, setNav] = useState(false)

  const login = true

  return (
    <nav className="w-full">
      <div className="justify-between px-4 mx-auto">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center justify-between py-3 md:py-5">
            {login ? <HamburgerBtn nav={nav} setNav={setNav} /> : <HeaderLoginBtn />}
          </div>

          <div
            className="flex justify-center py-3 md:py-5 w-full"
            onClick={() => {
              setNav(false)
            }}
          >
            <Logo />
          </div>
          <div className="p-2 flex items-center justify-center text-2xl text-indigo-500 font-bold py-3 md:py-5">
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
    </nav>
  )
}
