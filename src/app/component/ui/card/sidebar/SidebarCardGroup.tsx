import HistoryCard from '../main/HistoryCard'
import NameCard from '../main/NameCard'
import VacationCard from '../main/VacationCard'

import BoardSideCard from './board/BoardSideCard'
import ProjectSideCard from './project/ProjectSideCard'

import { MAIN, PROJECT } from '@/app/constant/constant'
import { type MainSidebarCardGroupProps } from '@/app/types/ui/cardTypes'

export default function SidebarCardGroup(props: MainSidebarCardGroupProps) {
  const renderSidebarContent = () => {
    switch (props.title) {
      case MAIN:
        return (
          <>
            <NameCard />
            <HistoryCard
              reRender={props.reRender}
              setRerender={props.setRerender}
              title={props.title}
            />
            <VacationCard />
          </>
        )
      case PROJECT:
        return <ProjectSideCard />

        break
      default:
        return <BoardSideCard myBoardList={props.myBoardList} />
    }
  }

  return <>{renderSidebarContent()}</>
}
