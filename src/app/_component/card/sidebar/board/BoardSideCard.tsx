import { FaPlus } from 'react-icons/fa'

import Button from '../../../button/Button'
import NameCard from '../../main/NameCard'

import BoardMenuCard from './BoardMenuCard'

import { useAppDispatch } from '@/module/hooks/reduxHooks'
import { openBoardWriteModalReducer } from '@/store/reducers/board/openBoardWriteModalReducer'
import { type BoardSideCardProps } from '@/types/ui/card'

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
    <aside className="p-3 bg-white shadow-2xl dark:bg-opacity-10 bg-opacity-60 rounded-2xl">
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
