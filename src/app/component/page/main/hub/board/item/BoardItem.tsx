'use client'

import Link from 'next/link'
import { FaN } from 'react-icons/fa6'

import { ROUTE_POSTING_DETAIL } from '@/app/constant/route/route-constant'
import { moduleConvertDate } from '@/app/module/utils/moduleTime'
import { type BoardItemProps } from '@/app/types/pageTypes'

export default function BoardItem(props: BoardItemProps) {
  return (
    <div className="flex flex-col text-left mt-3 mb-3 p-3 bg-gray-100 dark:bg-gray-700 rounded truncate">
      <div className="flex flex-row items-center">
        <span className="md:text-base md:font-bold text-base p-1 mb-2">
          <Link href={`${ROUTE_POSTING_DETAIL}/${props.boardListItem.id}`}>
            {props.boardListItem.title}
          </Link>
        </span>
        {props.isCurrent ? (
          <span className="bg-indigo-400 rounded text-white md:text-xs md:font-bold text-base p-1 mb-2 ">
            <FaN className="w-2 h-2" />
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="md:text-sm text-xs">
        <span className="p-1 mr-2">{props.boardListItem.position}</span>
        <span className="p-1 mr-2">{props.boardListItem.name}</span>
        <span className="p-1 mr-2">
          {moduleConvertDate(props.boardListItem.createdAt, '.', false)}
        </span>
      </div>
    </div>
  )
}
