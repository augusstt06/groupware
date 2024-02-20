import { LuCircle } from 'react-icons/lu'
// import { FaRegCheckCircle } from 'react-icons/fa'
// import { GiCancel } from 'react-icons/gi'

import TodoIndicator from '../../indicator/Indicator'

import { type TodoCardType } from '@/app/types/ui/cardTypes'

export default function TodoCard(props: TodoCardType) {
  return (
    <div className="w-full flex flex-row p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
      <div className="inline-flex items-center mr-2">
        {/* 상태에 따라 아이콘 변경 */}
        <LuCircle className="w-6 h-6 " />
        {/* <FaRegCheckCircle className="w-6 h-6 text-indigo-500" /> */}
        {/* <GiCancel className="w-6 h-6 text-red-500" /> */}
      </div>
      <div className="w-full p-2 ">
        <div className="inline-block text-sm md:text-medium">
          <p>@ddd 님이 ~~~~~~~~했습니다.</p>
          <TodoIndicator />
        </div>
        <div className="flex flex-row md:text-sm text-xs w-4/5 mt-2">
          <p className="font-bold mr-10">카테고리</p>
          <p className="text-gray-600">시간</p>
        </div>
      </div>
    </div>
  )
}
