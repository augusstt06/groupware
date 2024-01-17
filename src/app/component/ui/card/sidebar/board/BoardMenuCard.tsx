import Link from 'next/link'

import { ROUTE_BOARD } from '@/app/constant/route/route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { type BoardSideCardProps } from '@/app/types/ui/cardTypes'

export default function BoardMenuCard(props: BoardSideCardProps) {
  const extraUserInfo = useAppSelector((state) => state.userInfo.extraInfo)
  return (
    <>
      {props.myBoardList.length !== 0 ? (
        <div className="w-full mt-5 max-w-sm border border-gray-200 rounded-lg shadow dark:bg-[#1a202c] dark:border-gray-700">
          <div className="flex flex-col items-center pb-4 w-full justify-center mt-3 border-b-1">
            <span className="text-medium font-bold text-gray-600 dark:text-white w-4/5 mb-1">
              {extraUserInfo.organizationName}
            </span>
            {props.myBoardList.map((data) => (
              <span
                className="text-sm text-gray-500 dark:text-gray-400 w-4/5 mb-1 cursor-pointer hover:text-indigo-500 dark:hover:text-white"
                key={data.id}
              >
                <Link href={`${ROUTE_BOARD}/category?name=${data.name}`}>{data.name}</Link>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
