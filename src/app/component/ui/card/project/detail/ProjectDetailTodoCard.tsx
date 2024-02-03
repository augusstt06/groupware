import { FaCheck } from 'react-icons/fa'

import { moduleConvertDate } from '@/app/module/utils/moduleTime'
import { type ProjectDetailTodoCardPRops } from '@/app/types/ui/cardTypes'

export default function ProjectDetailTodoCard(props: ProjectDetailTodoCardPRops) {
  return (
    <div className="flex flex-row items-center justify-between mb-2 w-10/12 rounded-lg  shadow-lg">
      <div className="flex flex-row items-center justify-between lg:w-1/4 w-1/3 truncate">
        <div className="md:inline hidden w-4 h-9 bg-indigo-300 rounded-l-lg"></div>
        <div className="lg:inline hidden bg-gray-300 p-1 rounded-full">
          <FaCheck className="text-white w-3 h-3" />
        </div>
        <div className="md:w-3/5 w-full flex items-center justify-center ">
          <span className="text-xs md:text-base text-gray-600">{props.todo.title}</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between xl:w-1/3 w-2/3 truncate">
        <div className="flex flex-row items-center justify-around  lg:w-2/3 w-full">
          <span className="text-xs md:text-sm text-gray-500">{props.todo.issuer.name}</span>
          <span className="text-xs md:text-sm text-gray-500"> | </span>
          <span className="text-xs md:text-sm text-gray-500">
            {moduleConvertDate(props.todo.endAt, '.', false)}
          </span>
        </div>
        <div className="md:inline hidden rounded-full bg-indigo-400 p-1 md:p-2 text-white text-xs">
          할일
        </div>
      </div>
    </div>
  )
}
