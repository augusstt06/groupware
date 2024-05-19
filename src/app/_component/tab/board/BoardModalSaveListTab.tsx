import { HiOutlinePencilAlt } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'

import { useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleConvertDate } from '@/module/utils/moduleTime'
import { type BoardModalSaveListTabProps } from '@/types/ui/extra'

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
    <div className="absolute w-1/2 overflow-y-scroll bg-white border-2 border-gray-300 h-5/6 top-24 left-1/2 dark:bg-gray-700">
      <div className="p-3">
        <span className="font-bold">임시저장</span>
      </div>
      {props.saveList.map((data) => (
        <div
          className="flex flex-row p-3 mt-3 mb-3 text-left border-b border-gray-300 cursor-pointer"
          key={data.id}
        >
          <div
            className="flex items-center justify-center pl-4 pr-4 mr-2 bg-gray-300 rounded-lg"
            onClick={() => {
              props.loadSaveData(data)
            }}
          >
            <HiOutlinePencilAlt className="w-5 h-5 text-white" />
          </div>
          <div
            className="w-5/6"
            onClick={() => {
              props.loadSaveData(data)
            }}
          >
            <div className="flex flex-row items-center">
              <span className="p-1 mb-2 text-base md:text-base md:font-bold">
                {findCategory(data.boardId).name}
              </span>
              <span className="p-1 mb-2 text-base md:text-base">{data.title}</span>
              <span className="p-1 mb-2 text-base">{extractFirstTag(data.content)}</span>
            </div>
            <div className="text-xs md:text-sm">
              <span className="p-1 mr-2">{moduleConvertDate(data.createdAt, '.', false)}</span>
            </div>
          </div>
          {/* FIXME: 삭제 api 연결하기 */}
          <div
            className="flex items-center rounded-lg"
            onClick={() => {
              props.handleClickDeletePending(data.id)
            }}
          >
            <IoClose className="w-5 h-5 text-white bg-gray-300 rounded-lg cursor-pointer hover:text-black " />
          </div>
        </div>
      ))}
    </div>
  )
}
