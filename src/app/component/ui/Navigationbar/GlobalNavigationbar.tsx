'use client'

import { useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsPeopleFill } from 'react-icons/bs'
import { FaPhoneAlt, FaSearch } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdClose } from 'react-icons/io'

import DarkmodeBtn from '../button/DarkmodeBtn'
import LogoutBtn from '../button/login/LogoutBtn'
import Confirm from '../confirm/Confirm'

// import AlertIndicator from '../indicator/AlertIndicator'

import { KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE, TRUE } from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import { ROUTE_BOARD, ROUTE_MAIN } from '@/app/constant/route/route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'

export default function GlobalNavigationbar() {
  const pathname = usePathname()
  const isRender = !pathname.startsWith('/err')

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [confirmValue, setConfirmValue] = useState(false)
  const [isDropOpen, setDropOpen] = useState(false)
  const clickDropdownMenu = () => {
    if (isDropOpen) {
      setDropOpen(false)
    } else {
      setDropOpen(true)
    }
  }
  const [open, setOpen] = useState({
    board: false,
    project: false,
  })
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
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

  const menuList = [
    { title: '게시판', list: [], open: open.board, link: ROUTE_BOARD },
    { title: '프로젝트', list: [], open: open.project, link: ROUTE_MAIN },
    { title: '팀', list: [], open: false, link: ROUTE_MAIN },
  ]

  const [mount, setMount] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (e: MouseEvent) => {
    if (dropRef.current != null && !dropRef.current.contains(e.target as Node))
      setOpen({ board: false, project: false })
  }
  useEffect(() => {
    setMount(true)
    setConfirmValue(false)
    document.addEventListener('click', handleClickOutside)
  }, [dropRef])
  useEffect(() => {
    setDropOpen(false)
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
                <ul className="md:w-2/3 w-1/3 flex flex-col items-center mt-4 text-sm md:font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                  {menuList.map((data) => (
                    <li
                      key={data.title}
                      className="w-full flex justify-center hover:bg-indigo-300 hover:rounded dark:hover:bg-indigo-300 dark:hover:rounded"
                    >
                      {data.list.length !== 0 ? (
                        <button
                          id={`${data.title}-dropdown-button`}
                          className="flex items-center justify-between py-2 px-3 font-medium text-gray-900 md:w-auto md:border-0 md:p-2  dark:text-white"
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
                            className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 md:w-auto md:p-2 dark:text-white "
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
                                    <p className="flex md:text-base text-sm items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-500 group">
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
                <div className="flex flex-row items-center">
                  <a className="md:hidden text-gray-800 dark:border-gray-900 hover:text-indigo-500 dark:hover:text-indigo-300 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
                    <FaSearch className="md:w-5 md:h-5 w-4 h-4" />
                  </a>
                  <a className="md:hidden text-gray-800 dark:border-gray-900 hover:text-indigo-500 dark:hover:text-indigo-300 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
                    <FaPhoneAlt className="md:w-5 md:h-5 w-4 h-4" />
                  </a>
                  <a className="md:hidden text-gray-800 dark:border-gray-900 hover:text-indigo-5  00 dark:hover:text-indigo-300 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
                    <button type="button">
                      <BsPeopleFill className="md:w-5 md:h-5 w-4 h-4" />
                    </button>
                  </a>
                  <a className="md:hidden text-gray-800 dark:border-gray-900 dark:hover:text-yellow-400 hover:text-yellow-400 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
                    <DarkmodeBtn />
                  </a>
                  <a className="md:hidden text-gray-800 dark:border-gray-900 hover:text-red-500 dark:hover:text-red-500 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
                    {accessToken !== ERR_COOKIE_NOT_FOUND ? (
                      <LogoutBtn
                        isConfirmOpen={isConfirmOpen}
                        setIsConfirmOpen={setIsConfirmOpen}
                        confirmValue={confirmValue}
                        setConfirmValue={setConfirmValue}
                      />
                    ) : (
                      <></>
                    )}
                  </a>
                </div>
              </div>
            </div>
            {/* <a className="inline text-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 focus:outline-none dark:focus:ring-gray-800">
              <AlertIndicator />
            </a> */}
            <div className="flex flex-row items-center">
              <a className="hidden md:inline text-gray-800 dark:border-gray-900 hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
                <FaSearch className="md:w-5 md:h-5 w-4 h-4" />
              </a>
              <a className="hidden md:inline text-gray-800 dark:border-gray-900 hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
                <FaPhoneAlt className="md:w-5 md:h-5 w-4 h-4" />
              </a>
              <a className="hidden md:inline text-gray-800 dark:border-gray-900 hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
                <button type="button">
                  <BsPeopleFill className="md:w-5 md:h-5 w-4 h-4" />
                </button>
              </a>
              <a className="hidden md:inline text-gray-800 dark:border-gray-900 dark:hover:text-yellow-400 hover:text-yellow-400 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
                <DarkmodeBtn />
              </a>
              {!isDropOpen ? (
                <GiHamburgerMenu
                  className="md:hidden rounded-lg focus:outline-none focus:shadow-outline mr-3 cursor-pointer"
                  onClick={clickDropdownMenu}
                />
              ) : (
                <IoMdClose
                  className="md:hidden rounded-lg focus:outline-none focus:shadow-outline mr-3 cursor-pointer"
                  onClick={clickDropdownMenu}
                />
              )}

              <a className="hidden md:inline text-gray-800 dark:border-gray-900 hover:text-red-500 dark:hover:text-red-500 dark:text-white border-solid border-white border-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5   focus:outline-none dark:focus:ring-gray-800">
                {accessToken !== ERR_COOKIE_NOT_FOUND ? (
                  <LogoutBtn
                    isConfirmOpen={isConfirmOpen}
                    setIsConfirmOpen={setIsConfirmOpen}
                    confirmValue={confirmValue}
                    setConfirmValue={setConfirmValue}
                  />
                ) : (
                  <></>
                )}
              </a>
            </div>
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
