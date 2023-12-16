'use client'
import BoardHubInput from '@/app/component/ui/input/board/BoardHubInput'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { type BoardHubType } from '@/app/types/pageTypes'

export default function BoardHub(props: BoardHubType) {
  const searchInput = useInput('')
  return (
    <div className="md:w-4/5 w-full flex flex-col items-center">
      <div className="w-full md:text-base text-sm p-2 md:font-bold text-center border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
        {props.params}
        <BoardHubInput searchInput={searchInput} />
      </div>
    </div>
  )
}
