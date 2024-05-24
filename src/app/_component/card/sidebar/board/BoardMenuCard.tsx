import Link from 'next/link'

import { ROUTE_BOARD } from '@/_constant/route/route-constant'
import { useAppSelector } from '@/_module/hooks/reduxHooks'
import { type BoardSideCardProps } from '@/_types/ui/card'

export default function BoardMenuCard(props: BoardSideCardProps) {
  const extraUserInfo = useAppSelector((state) => state.userInfo.extraInfo)
  return (
    <>
      {props.myBoardList.length !== 0 ? (
        <div className="w-full max-w-sm mt-5 rounded-lg">
          <div className="justify-center w-full pb-4 mt-3 sort-vertical-flex border-b-1">
            <span className="w-4/5 mb-1 font-bold text-gray-600 text-medium dark:text-white">
              {extraUserInfo.organizationName}
            </span>
            {props.myBoardList.map((data) => (
              <span
                className="w-4/5 mb-1 text-sm text-gray-500 cursor-pointer dark:text-gray-400 hover:text-indigo-500 dark:hover:text-white"
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
