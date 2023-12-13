import MainCheckBox from '../../checkbox/MainCheckBox'
import TodoIndicator from '../../indicator/TodoIndicator'

export default function TodoCard() {
  return (
    <div className="w-full flex flex-row p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
      <MainCheckBox />
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
