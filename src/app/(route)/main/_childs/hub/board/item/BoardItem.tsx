'use client'

import Link from 'next/link'
import { FaN } from 'react-icons/fa6'

import { ROUTE_POSTING_DETAIL } from '@/constant/route/route-constant'
import { moduleConvertDate } from '@/module/utils/moduleTime'
import { type BoardItemProps } from '@/types/pageType'

export default function BoardItem(props: BoardItemProps) {
  return (
    <div className="flex flex-col p-3 mt-3 mb-3 text-left truncate bg-gray-200 rounded-lg dark:bg-gray-600">
      <div className="sort-row-flex">
        <span className="p-1 mb-2 text-base md:text-base md:font-bold">
          <Link href={`${ROUTE_POSTING_DETAIL}/${props.boardListItem.id}`}>
            {props.boardListItem.title}
          </Link>
        </span>
        {props.isCurrent === true ? (
          <span className="p-1 mb-2 text-base text-white bg-indigo-400 rounded md:text-xs md:font-bold ">
            <FaN className="w-2 h-2" />
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="text-xs md:text-sm">
        <span className="p-1 mr-2">{props.boardListItem.position}</span>
        <span className="p-1 mr-2">{props.boardListItem.name}</span>
        <span className="p-1 mr-2">
          {moduleConvertDate(props.boardListItem.createdAt, '.', false)}
        </span>
      </div>
    </div>
  )
}
