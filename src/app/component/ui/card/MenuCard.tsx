import Link from 'next/link'

import { ROUTE_BOARD, ROUTE_BOARD_ANNOUNCE } from '@/app/constant/route/route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'

export default function MenuCard() {
  const extraUserInfo = useAppSelector((state) => state.userInfo.extraInfo)
  const menuList = [
    {
      name: extraUserInfo.organizationName,
      menu1: { name: '공지사항', link: ROUTE_BOARD_ANNOUNCE },
      menu2: { name: '자유 게시판', link: ROUTE_BOARD },
    },
    {
      name: '프로젝트이름',
      menu1: { name: '게시판 이름', link: ROUTE_BOARD },
      menu2: { name: '게시판 이름2', link: ROUTE_BOARD },
    },
  ]
  return (
    <div className="w-full mt-5 max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {menuList.map((data) => (
        <div
          className="flex flex-col items-center pb-4 w-full justify-center mt-3 border-b-1"
          key={data.name}
        >
          <span className="text-medium font-bold text-gray-600 dark:text-white w-4/5 mb-1">
            {data.name}
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400 w-4/5 mb-1 cursor-pointer hover:text-indigo-500 dark:hover:text-white">
            <Link href={data.menu1.link}>{data.menu1.name}</Link>
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400 w-4/5 mb-1 cursor-pointer hover:text-indigo-500 dark:hover:text-white">
            <Link href={data.menu2.link}>{data.menu2.name}</Link>
          </span>
        </div>
      ))}
    </div>
  )
}
