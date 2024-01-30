import { FaCheck } from 'react-icons/fa'

import { moduleConvertDate } from '@/app/module/utils/moduleTime'
import { type ProjectDetailTodoCardPRops } from '@/app/types/ui/cardTypes'

export default function ProjectDetailTodoCard(props: ProjectDetailTodoCardPRops) {
  return (
    <div className="grid grid-cols-4 gap-2  dark:border-gray-700 border border-gray-200 rounded-lg dark:bg-[#1a202c] shadow-lg h-12 mb-2 w-11/12">
      <div className="col-span-1 grid grid-cols-7 md:grid-cols-8">
        <div className="col-span-1 bg-indigo-400 rounded-l-lg"></div>
        <div className="col-span-6 md:col-span-7 grid grid-cols-4">
          <div className="md:grid hidden md:col-span-1 items-center flex justify-center">
            <div className="bg-gray-300 p-1 rounded-full">
              <FaCheck className="text-white w-3 h-3" />
            </div>
          </div>
          <div className="col-span-4 md:col-span-3 flex items-center justify-center">
            <span className="text-xs md:text-base text-gray-600">{props.todo.title}</span>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 md:col-span-1 md:inline hidden"></div>
      <div className="col-span-3 md:col-span-2 lg:col-span-1 grid grid-cols-3 truncate">
        <div className="col-span-2 flex items-center justify-around">
          <span className="text-xs md:text-sm text-gray-500">{props.todo.issuer.name}</span>
          <span className="text-xs md:text-sm text-gray-500"> | </span>
          <span className="text-xs md:text-sm text-gray-500">
            {moduleConvertDate(props.todo.endAt, '.', false)}
          </span>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <div className="rounded-full bg-indigo-400 p-1 md:p-2 text-white text-xs md:text-sm">
            할일
          </div>
        </div>
      </div>
    </div>
  )
}
