import CreateBoardBtn from '../../../button/board/CreateBoardBtn'
import SidebarUserProfileCard from '../SidebarUserProfileCard'

import BoardMenuCard from './BoardMenuCard'

import { type BoardSideCardProps } from '@/app/types/ui/cardTypes'

export default function BoardSideCard(props: BoardSideCardProps) {
  return (
    <>
      <SidebarUserProfileCard />
      <CreateBoardBtn />

      <BoardMenuCard myBoardList={props.myBoardList} />
    </>
  )
}
