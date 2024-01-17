'use client'
import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import SidebarCardGroup from '../card/sidebar/SidebarCardGroup'

import {
  BOARD,
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
  MAIN,
  PROJECT,
  PROJECT_DETAIL,
} from '@/app/constant/constant'
import { API_URL_GET_MY_BOARD } from '@/app/constant/route/api-route-constant'
import { ROUTE_BOARD, ROUTE_MAIN, ROUTE_PROJECT } from '@/app/constant/route/route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import {
  type FailResponseType,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'
import { type MyBoardType } from '@/app/types/variableTypes'

export default function Sidebar() {
  const pathname = usePathname()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const userInfo = useAppSelector((state) => state.userInfo.extraInfo)
  const [myBoardList, setMyBoardList] = useState<MyBoardType[]>([])
  const [reRender, setRerender] = useState(false)
  const [isSideOpen, setIsSideOpen] = useState(false)

  const setSidebarTitle = () => {
    let extractedString: string
    const currentUrl = pathname.split('/')
    // url의 depth가 2개이상일 경우 첫번째 string만 확인하기 위함ex) /board/detail/..., /board/announce => board
    if (currentUrl.length >= 2) {
      extractedString = currentUrl.slice(0, 2).join('/')
      switch (extractedString) {
        case ROUTE_MAIN:
          return MAIN
        case ROUTE_BOARD:
          return BOARD
        case ROUTE_PROJECT:
          if (currentUrl.slice(2, 3).join('/') === 'detail') return PROJECT_DETAIL
          return PROJECT
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
      <div className="md:hidden fixed top-16 ml-5 z-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            onClick={() => {
              setIsSideOpen(!isSideOpen)
            }}
          />
          <div className="w-11 h-6 bg-gray-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-400"></div>
        </label>
      </div>

      <div
        className={`fixed md:block md:top-24 top-28 md:w-56 w-40 md:ml-10 ml-5 mr-14 ${
          isSideOpen ? 'md:bg-none bg-white dark:bg-[#121212] rounded-lg z-999' : 'hidden'
        }`}
      >
        <SidebarCardGroup
          title={setSidebarTitle()}
          reRender={reRender}
          setRerender={setRerender}
          myBoardList={myBoardList}
        />
      </div>
    </>
  )
}
