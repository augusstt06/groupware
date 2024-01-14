import BoardSideCard from '../board/side/BoardSideCard'
import HistoryCard from '../main/HistoryCard'
import NameCard from '../main/NameCard'
import VacationCard from '../main/VacationCard'

import { MAIN } from '@/app/constant/constant'
import { type MainSidebarCardGroupProps } from '@/app/types/ui/cardTypes'

export default function MainSidebarCardGroup(props: MainSidebarCardGroupProps) {
  return (
    <>
      {props.title === MAIN ? (
        <>
          <NameCard />
          <HistoryCard
            reRender={props.reRender}
            setRerender={props.setRerender}
            title={props.title}
          />
          <VacationCard />
        </>
      ) : (
        <>
          <BoardSideCard myBoardList={props.myBoardList} />
        </>
      )}
    </>
  )
}
