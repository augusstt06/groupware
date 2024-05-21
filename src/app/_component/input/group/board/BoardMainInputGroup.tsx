import { IoMdCloseCircle } from 'react-icons/io'
import { IoSearchSharp } from 'react-icons/io5'

import InputWithLabel from '../../InputWithLabel'

import BoardWriteModal from '@/(route)/board/_childs/modal/BoardWriteModal'
import Button from '@/_component/button/Button'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { openBoardWriteModalReducer } from '@/store/reducers/board/openBoardWriteModalReducer'
import { type BoardMainInputGroupProps } from '@/types/ui/input'

export default function BoardMainInputGroup(props: BoardMainInputGroupProps) {
  const dispatch = useAppDispatch()
  const isModalOpen: boolean = useAppSelector((state) => state.openBoardWriteModal.isOpen)
  const handleClickWrite = () => {
    dispatch(openBoardWriteModalReducer())
  }
  const resetInputValue = () => {
    props.searchInput.resetValue()
  }
  return (
    <div className="flex flex-row justify-around">
      {isModalOpen ? <BoardWriteModal currentBoard={null} /> : <></>}
      <div className="flex w-4/6 mt-3 mb-3 mr-2">
        <InputWithLabel
          title=""
          className=""
          isHeadLabel={true}
          headLabelContent={<IoSearchSharp className="w-4 h-4" />}
          placeholder="제목, 내용, 작성자 입력"
          useInput={props.searchInput}
          type="text"
          isTailLabel={true}
          tailLabelContent={
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
          className="items-center w-1/2 mt-3 mb-3 mr-2 text-xs text-center text-indigo-500 border-2 border-indigo-500 rounded-lg transition duration-500 ease-in-out md:text-sm hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white hover:bg-indigo-500 dark:hover:bg-white dark:hover:text-indigo-500 dark:hover:border-indigo-500/75"
          onClick={props.clickSearchPostings}
        />
        <Button
          buttonContent="글쓰기"
          className="items-center w-1/2 mt-3 mb-3 text-xs text-center text-indigo-500 border-2 border-indigo-500 rounded-lg transition duration-500 ease-in-out md:text-sm hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white hover:bg-indigo-500 dark:hover:bg-white dark:hover:text-indigo-500 dark:hover:border-indigo-500/75"
          onClick={handleClickWrite}
        />
      </div>
    </div>
  )
}
