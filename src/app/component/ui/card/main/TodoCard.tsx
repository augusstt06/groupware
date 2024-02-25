import { LuCircle } from 'react-icons/lu'

import TodoIndicator from '../../indicator/Indicator'

export default function TodoCard() {
  return (
    <div className="w-full flex flex-row p-4 rounded-xl shadow-lg p-2 truncate bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10">
      <div className="inline-flex items-center mr-2">
        <LuCircle className="w-6 h-6 " />
      </div>
      <div className="w-full p-2 ">
        <div className="inline-block text-sm md:text-medium">
          <p>1st Issue</p>
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
