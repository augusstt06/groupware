import CreateBoardBtn from '../../../button/board/CreateBoardBtn'
import MenuCard from '../../MenuCard'

import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { type BoardSideCardProps } from '@/app/types/ui/cardTypes'

export default function BoardSideCard(props: BoardSideCardProps) {
  const userInfo = useAppSelector((state) => state.userInfo)

  return (
    <>
      <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow dark:bg-[#1a202c] dark:border-gray-700 mb-5">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-row items-center justify-start w-full mb-3 p-2">
          <div className="bg-gray-300 p-2 rounded-full">img</div>
          <div className="flex flex-col items-center ml-3 w-full">
            <span className="md:text-lg text-sm text-gray-500 dark:text-white w-4/5 mb-1">
              {userInfo.extraInfo.name}
            </span>
            <span className="text-sm text-gray-500 dark:text-white w-4/5 mb-1">
              {userInfo.extraInfo.organizationName}
            </span>
          </div>
        </div>
      </div>
      <CreateBoardBtn />

      <MenuCard myBoardList={props.myBoardList} />
    </>
  )
}
