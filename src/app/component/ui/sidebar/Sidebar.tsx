'use client'
import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go'

import MainSidebarCardGroup from '../card/sidebar/MainSidebarCardGroup'

import { BOARD, KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE, MAIN } from '@/app/constant/constant'
import { API_URL_GET_MY_BOARD } from '@/app/constant/route/api-route-constant'
import { ROUTE_BOARD, ROUTE_MAIN } from '@/app/constant/route/route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import {
  type FailResponseType,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'
import { type SidebarProps } from '@/app/types/ui/uiTypes'
import { type MyBoardType } from '@/app/types/variableTypes'

export default function Sidebar(props: SidebarProps) {
  const pathname = usePathname()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const userInfo = useAppSelector((state) => state.userInfo.extraInfo)
  const [myBoardList, setMyBoardList] = useState<MyBoardType[]>([])
  const [reRender, setRerender] = useState(false)
  const [isSideOpen, setIsSideOpen] = useState(false)
  const clickSideOpen = () => {
    if (isSideOpen) setIsSideOpen(false)
    else {
      setIsSideOpen(true)
    }
  }
  const setSidebarTitle = () => {
    let extractedString: string
    const currentUrl = pathname.split('/')
    if (currentUrl.length >= 2) {
      extractedString = currentUrl.slice(0, 2).join('/')
      switch (extractedString) {
        case ROUTE_MAIN:
          return MAIN
        case ROUTE_BOARD:
          return BOARD
        default:
          return MAIN
      }
    }
    return MAIN
  }
  const fetchGetMyBoardList = async () => {
    try {
      const fetchProps: ModuleGetFetchProps = {
        params: {
          organizationId: userInfo.organizationId,
        },
        fetchUrl: API_URL_GET_MY_BOARD,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res = await moduleGetFetch<MyBoardType[]>(fetchProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      const boardMenu = (res as SuccessResponseType<MyBoardType[]>).result
      setMyBoardList(boardMenu)
    } catch (err) {}
  }
  useEffect(() => {
    void fetchGetMyBoardList()
  }, [])
  return (
    <>
      <div className="md:hidden fixed top-16 ml-5 transition ease-in-out duration-600 hover:scale-125 z-2">
        {!isSideOpen ? (
          <GoSidebarCollapse className="w-6 h-6  hover:text-indigo-400" onClick={clickSideOpen} />
        ) : (
          <GoSidebarExpand className="w-6 h-6 hover:text-indigo-400 " onClick={clickSideOpen} />
        )}
      </div>

      <div
        className={`fixed md:block md:top-24 top-28 md:w-56 w-40 md:ml-10 ml-5 mr-14 ${
          isSideOpen ? 'md:bg-none bg-white dark:bg-[#121212] rounded-lg z-999' : 'hidden'
        }`}
      >
        <MainSidebarCardGroup
          title={setSidebarTitle()}
          reRender={reRender}
          setRerender={setRerender}
          myBoardList={myBoardList}
        />
      </div>
    </>
  )
}
