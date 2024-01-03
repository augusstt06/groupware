'use client'

import { type BoardItemProps } from '@/app/types/pageTypes'

export default function BoardItem(props: BoardItemProps) {
  // const spanList = ['팀', '작성자', '날짜']
  // const [isWrite, setIsWrite] = useState(false)
  const convertDate = (date: string) => {
    const dateObj = new Date(date)
    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')
    const hours = String(dateObj.getHours()).padStart(2, '0')
    const minutes = String(dateObj.getMinutes()).padStart(2, '0')

    return `${year}/${month}/${day} ${hours}:${minutes}`
  }

  return (
    <div className="flex flex-col text-left mt-3 mb-3 p-3 bg-gray-100 dark:bg-gray-700 rounded">
      <span className="md:text-base md:font-bold text-base p-1 mb-2">
        {props.boardListItem.title}
      </span>
      <div className="md:text-sm text-xs">
        <span className="p-1 mr-2">{props.boardListItem.position}</span>
        <span className="p-1 mr-2">{props.boardListItem.name}</span>
        <span className="p-1 mr-2">{convertDate(props.boardListItem.createdAt)}</span>
      </div>
    </div>
  )
}
