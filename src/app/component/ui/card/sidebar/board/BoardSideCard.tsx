import { FaPlus } from 'react-icons/fa'

import Button from '../../../button/Button'
import NameCard from '../../main/NameCard'

import BoardMenuCard from './BoardMenuCard'

import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { openBoardWriteModalReducer } from '@/app/store/reducers/board/openBoardWriteModalReducer'
import { type BoardSideCardProps } from '@/app/types/ui/cardTypes'

export default function BoardSideCard(props: BoardSideCardProps) {
  const dispatch = useAppDispatch()
  const handleClickWritePost = () => {
    dispatch(openBoardWriteModalReducer())
  }
  const buttonContent = (
    <>
      <FaPlus className="mr-2" />
      <span> 글쓰기</span>
    </>
  )
  return (
    <aside className="bg-[#fff] dark:bg-[#545c74] dark:bg-opacity-100 bg-opacity-70 p-3 rounded-lg">
      <NameCard />
      <Button
        buttonContent={buttonContent}
        className="w-full transition ease-in-out duration-300 rounded-lg shadow bg-indigo-400 dark:bg-indigo-400 hover:bg-indigo-600 hover:dark:bg-indigo-500 justify-center text-white dark:text-white focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center"
        onClick={handleClickWritePost}
      />
      <BoardMenuCard myBoardList={props.myBoardList} />
    </aside>
  )
}
