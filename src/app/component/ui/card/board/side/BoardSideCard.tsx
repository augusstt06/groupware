import CreateBoardBtn from '../../../button/board/CreateBoardBtn'
import MenuCard from '../../MenuCard'

import { useAppSelector } from '@/app/module/hooks/reduxHooks'

export default function BoardSideCard() {
  const userInfo = useAppSelector((state) => state.userInfo)
  return (
    <>
      <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow dark:bg-[#1a202c] dark:border-gray-700 mb-5">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center mb-3">
          <span className="md:text-lg text-sm text-gray-500 dark:text-white w-4/5 mb-1">
            {userInfo.extraInfo.name}
          </span>
          <div className="flex flex-start justify-between w-4/5 mb-1">
            <span className="md:text-base text-xs text-gray-500 dark:text-gray-400">
              내가 쓴 글
            </span>
            <span className="md:text-base text-xs text-white-400 font-bold">0</span>
          </div>

          <div className="flex flex-start justify-between w-4/5 mb-1">
            <span className="md:text-base text-xs text-gray-500 dark:text-gray-400">
              작성중인 글
            </span>
            <span className="md:text-base text-xs text-white-400 font-bold">0</span>
          </div>
          <div className="flex flex-start justify-between w-4/5">
            <span className="md:text-base text-xs text-gray-500 dark:text-gray-400">휴지통</span>
            <span className="md:text-base text-xs text-white-400 font-bold">0</span>
          </div>
        </div>
        <CreateBoardBtn />
      </div>

      <MenuCard />
    </>
  )
}
