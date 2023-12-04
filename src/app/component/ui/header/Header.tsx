'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import DarkmodeBtn from '../button/DarkmodeBtn'
import LogoutBtn from '../button/login/LogoutBtn'
import Confirm from '../confirm/Confirm'
import AlertIndicator from '../indicator/alertIndicator'

import { KEY_ACCESS_TOKEN } from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import { moduleGetCookie } from '@/app/module/utils/cookie'

export default function Header() {
  const pathname = usePathname()
  const isRender = !pathname.startsWith('/err')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [confirmValue, setConfirmValue] = useState(false)
  const [open, setOpen] = useState({
    board: false,
    project: false,
  })
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const handleOpen = (title: string) => {
    switch (title) {
      case 'Project':
        setOpen({
          board: open.board,
          project: !open.project,
        })
        break
      case 'Board':
        setOpen({
          board: !open.board,
          project: open.project,
        })
    }
  }

  const handleOpenConfirm = () => {
    setIsConfirmOpen(true)
  }

  const menuList = [
    { title: 'Board', list: ['board 1', 'board 2'], open: open.board, link: '/main' },
    { title: 'Project', list: [], open: open.project, link: '/project' },
    { title: 'Team', list: [], open: false, link: '/main' },
  ]

  const [mount, setMount] = useState(false)
  useEffect(() => {
    setMount(true)
  }, [setMount, accessToken])

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      {mount && accessToken !== ERR_COOKIE_NOT_FOUND && isRender ? (
        <>
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
            <Link href="/main" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
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
            <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
              <a className="text-gray-800 dark:text-white border-solid border-white border-2 hover:border-indigo-500 dark:border-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:border-indigo-400 focus:outline-none dark:focus:ring-gray-800">
                {accessToken !== ERR_COOKIE_NOT_FOUND ? (
                  <LogoutBtn
                    handleOpenConfirm={handleOpenConfirm}
                    isConfirmOpen={isConfirmOpen}
                    confirmValue={confirmValue}
                  />
                ) : (
                  <></>
                )}
              </a>
              <a className="text-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 focus:outline-none dark:focus:ring-gray-800">
                <AlertIndicator />
              </a>
              <a className="text-gray-800  dark:border-gray-900 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
                <DarkmodeBtn />
              </a>
            </div>
            <div
              id="mega-menu-icons"
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            >
              <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                {menuList.map((data) => (
                  <li key={data.title}>
                    {data.list.length !== 0 ? (
                      <button
                        id={`${data.title}-dropdown-button`}
                        className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0 dark:text-white md:dark:hover:text-indigo-400 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                        onClick={() => {
                          handleOpen(data.title)
                        }}
                      >
                        {data.title}
                      </button>
                    ) : (
                      <Link href={data.link}>
                        <button
                          id={`${data.title}-dropdown-button`}
                          className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0 dark:text-white md:dark:hover:text-indigo-400 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                          onClick={() => {
                            handleOpen(data.title)
                          }}
                        >
                          {data.title}
                        </button>
                      </Link>
                    )}

                    <div
                      id={`${data.title}-dropdown`}
                      className={`absolute z-11 grid ${
                        data.open ? '' : 'hidden'
                      } w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700`}
                    >
                      {data.list.length !== 0 ? (
                        <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                          <ul
                            className="space-y-4"
                            aria-labelledby="mega-menu-icons-dropdown-button"
                          >
                            <Link href={data.link}>
                              {data.list.map((data) => (
                                <li key={data}>
                                  <p className="flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-500 group">
                                    {data}
                                  </p>
                                </li>
                              ))}
                            </Link>
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </nav>
  )
}
