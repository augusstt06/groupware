'use client'

import Link from 'next/link'

import { ROUTE_POSTING_DETAIL } from '@/app/constant/route/route-constant'
import { moduleConvertDate } from '@/app/module/utils/moduleTime'
import { type BoardItemProps } from '@/app/types/pageTypes'

export default function BoardItem(props: BoardItemProps) {
  // const spanList = ['팀', '작성자', '날짜']
  // const [isWrite, setIsWrite] = useState(false)

  return (
    <div className="flex flex-col text-left mt-3 mb-3 p-3 bg-gray-100 dark:bg-gray-700 rounded">
      <span className="md:text-base md:font-bold text-base p-1 mb-2">
        <Link href={`${ROUTE_POSTING_DETAIL}/${props.boardListItem.id}`}>
          {props.boardListItem.title}
        </Link>
      </span>
      <div className="md:text-sm text-xs">
        <span className="p-1 mr-2">{props.boardListItem.position}</span>
        <span className="p-1 mr-2">{props.boardListItem.name}</span>
        <span className="p-1 mr-2">{moduleConvertDate(props.boardListItem.createdAt)}</span>
      </div>
    </div>
  )
}
