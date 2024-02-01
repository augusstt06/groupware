import { IoMdCloseCircle } from 'react-icons/io'
import { IoSearchSharp } from 'react-icons/io5'

import Button from '../../button/Button'
import BoardWriteModal from '../../modal/board/BoardWriteModal'
import InputGroup from '../InputGroup'

import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { openBoardWriteModalReducer } from '@/app/store/reducers/board/openBoardWriteModalReducer'
import { type BoardHubInputProps } from '@/app/types/ui/inputTypes'

export default function BoardHubInput(props: BoardHubInputProps) {
  const dispatch = useAppDispatch()
  const isModalOpen = useAppSelector((state) => state.openBoardWriteModal.isOpen)
  const handleClickWrite = () => {
    dispatch(openBoardWriteModalReducer())
  }
  const resetInputValue = () => {
    props.searchInput.resetValue()
  }
  return (
    <div className="flex flex-row justify-around">
      {isModalOpen ? <BoardWriteModal currentBoard={null} /> : <></>}
      <div className="flex mt-3 mb-3 mr-2 w-4/6">
        <InputGroup
          title=""
          isLabel={true}
          labelContent={<IoSearchSharp className="w-4 h-4" />}
          placeholder="제목, 내용, 작성자 입력"
          useInput={props.searchInput}
          type="text"
          isView={true}
          viewContent={
            <Button
              buttonContent={<IoMdCloseCircle />}
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-gray-900 bg-gray-200 rounded-e-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 ease-in-out transition duration-400"
              onClick={resetInputValue}
            />
          }
        />
      </div>
      <div className="flex flex-row justify-around w-2/6 p-2">
        <Button
          buttonContent="검색"
          className="mr-2 mt-3 mb-3 w-1/2 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75 ease-in-out transition duration-500"
          onClick={props.clickSearchPostings}
        />
        <Button
          buttonContent="글쓰기"
          className="mt-3 mb-3 w-1/2 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75 ease-in-out transition duration-500"
          onClick={handleClickWrite}
        />
      </div>
    </div>
  )
}
