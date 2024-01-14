import { HiOutlinePencilAlt } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'

import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleConvertDate } from '@/app/module/utils/moduleTime'
import { type BoardModalSaveListTabProps } from '@/app/types/ui/uiTypes'

export default function BoardModalSaveListTab(props: BoardModalSaveListTabProps) {
  const categoryState = useAppSelector((state) => state.boardCategory.myBoard)
  const extractFirstTag = (data: string): string | null => {
    const match = data.match(/<([^>]+)>(.*?)<\/\1>/)
    return match != null ? match[2] : null
  }

  const findCategory = (postingBoardId: number) => {
    const currentCategory = categoryState.filter((data) => Number(data.id) === postingBoardId)
    return currentCategory[0]
  }

  return (
    <div className="absolute w-1/2 h-5/6 top-24 left-1/2 bg-white dark:bg-gray-700 border-2 border-gray-300 overflow-y-scroll">
      <div className="p-3">
        <span className="font-bold">임시저장</span>
      </div>
      {props.saveList.map((data) => (
        <div
          className="flex flex-row text-left mt-3 mb-3 p-3 border-b border-gray-300 cursor-pointer"
          onClick={() => {
            props.loadSaveData(data)
          }}
          key={data.id}
        >
          <div className="bg-gray-300 flex items-center pl-4 pr-4 rounded-lg justify-center mr-2">
            <HiOutlinePencilAlt className="w-5 h-5 text-white" />
          </div>
          <div className="w-5/6">
            <div className="flex flex-row items-center">
              <span className="md:text-base md:font-bold text-base p-1 mb-2">
                {findCategory(data.boardId).name}
              </span>
              <span className="md:text-base text-base p-1 mb-2">{data.title}</span>
              <span className="text-base p-1 mb-2">{extractFirstTag(data.content)}</span>
            </div>
            <div className="md:text-sm text-xs">
              <span className="p-1 mr-2">{moduleConvertDate(data.createdAt)}</span>
            </div>
          </div>
          {/* FIXME: 삭제 api 연결하기 */}
          <div className="flex items-center rounded-lg">
            <IoClose className="bg-gray-300 w-5 h-5 rounded-lg text-white hover:text-black cursor-pointer " />
          </div>
        </div>
      ))}
    </div>
  )
}
