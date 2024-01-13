import { FaPlus } from 'react-icons/fa'

import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { openBoardWriteModalReducer } from '@/app/store/reducers/board/openBoardWriteModalReducer'

export default function CreateBoardBtn() {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(openBoardWriteModalReducer())
  }
  return (
    <div className="w-full max-w-sm border border-gray-200 transition ease-in-out duration-300 rounded-lg shadow bg-indigo-400 dark:bg-indigo-300 hover:bg-indigo-600 hover:dark:bg-indigo-500 dark:border-gray-700 mb-5 text-center justify-center">
      <button
        className=" w-4/5 justify-center text-white dark:text-white focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center"
        onClick={handleClick}
      >
        <FaPlus className="mr-2" />
        <span> 글쓰기</span>
      </button>
    </div>
  )
}
