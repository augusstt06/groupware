import Link from 'next/link'

import { ROUTE_BOARD, ROUTE_BOARD_ANNOUNCE } from '@/app/constant/route/route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { type BoardSideCardProps } from '@/app/types/ui/cardTypes'

export default function MenuCard(props: BoardSideCardProps) {
  const extraUserInfo = useAppSelector((state) => state.userInfo.extraInfo)

  // FIXME: TypeError: Cannot read properties of undefined (reading 'menuList')

  const setUrlLinkHref = (category: string) => {
    switch (category) {
      case '공지사항':
        return ROUTE_BOARD_ANNOUNCE
      default:
        return ROUTE_BOARD
    }
  }

  return (
    <>
      {props.boardCategoryList !== undefined ? (
        <div className="w-full mt-5 max-w-sm border border-gray-200 rounded-lg shadow dark:bg-[#1a202c] dark:border-gray-700">
          {props.boardCategoryList.menuList.map((data) => (
            <div
              className="flex flex-col items-center pb-4 w-full justify-center mt-3 border-b-1"
              key={data.name}
            >
              <span className="text-medium font-bold text-gray-600 dark:text-white w-4/5 mb-1">
                {extraUserInfo.organizationName}
              </span>

              <span className="text-sm text-gray-500 dark:text-gray-400 w-4/5 mb-1 cursor-pointer hover:text-indigo-500 dark:hover:text-white">
                <Link href={setUrlLinkHref(data.name)}>{data.name}</Link>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
