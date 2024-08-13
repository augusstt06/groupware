'use client'

import Link from 'next/link'
import { FaN } from 'react-icons/fa6'

import { ROUTE_POSTING_DETAIL } from '@/constant/route/route-constant'
import { convertDate } from '@/module/utils/time'
import { type BoardItemProps } from '@/types/pageType'

export default function BoardItem(props: BoardItemProps) {
  const { boardListItem, isCurrent } = props
  return (
    <div className="flex flex-col p-3 mt-3 mb-3 text-left truncate bg-gray-200 rounded-lg dark:bg-[#505050]">
      <div className="sort-row-flex">
        <span className="p-1 mb-2 text-base md:text-base md:font-bold">
          <Link href={`${ROUTE_POSTING_DETAIL}/${boardListItem.id}`}>{boardListItem.title}</Link>
        </span>
        {isCurrent === true ? (
          <span className="p-1 mb-2 text-base text-white bg-indigo-400 rounded md:text-xs md:font-bold ">
            <FaN className="w-2 h-2" />
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="text-xs md:text-sm">
        <span className="p-1 mr-2">{boardListItem.position}</span>
        <span className="p-1 mr-2">{boardListItem.name}</span>
        <span className="p-1 mr-2">{convertDate(boardListItem.createdAt, '.', false)}</span>
      </div>
    </div>
  )
}
