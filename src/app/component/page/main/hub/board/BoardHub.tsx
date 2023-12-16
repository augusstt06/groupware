'use client'
import BoardHubInput from '@/app/component/ui/input/board/BoardHubInput'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { type BoardHubType } from '@/app/types/pageTypes'

export default function BoardHub(props: BoardHubType) {
  const searchInput = useInput('')
  const spanList = ['팀', '작성자', '날짜']
  return (
    <div className="md:w-4/5 w-full flex flex-col items-center">
      <div className="w-full p-2 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
        <div className="p-2 font-bold md:text-lg text-base">
          <span>{props.params}</span>
        </div>
        <BoardHubInput searchInput={searchInput} />
        <div className="flex flex-col text-left mt-3 mb-3 p-3 bg-gray-100 dark:bg-gray-700 rounded">
          <span className="md:text-base md:font-bold text-base p-1 mb-2">게시글 제목</span>
          <div className="md:text-sm text-xs">
            {spanList.map((data) => (
              <span key={data} className="p-1 mr-2">
                {data}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
