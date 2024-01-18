import HistoryCard from '../main/HistoryCard'
import NameCard from '../main/NameCard'
import VacationCard from '../main/VacationCard'

import BoardSideCard from './board/BoardSideCard'
import ProjectDetailSideCard from './project/detail/ProjectDetailSideCard'
import ProjectMainSideCard from './project/main/ProjectMainSideCard'

import { MAIN, PROJECT, PROJECT_DETAIL } from '@/app/constant/constant'
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
        return <ProjectMainSideCard />

      case PROJECT_DETAIL:
        return <ProjectDetailSideCard />
      default:
        return <BoardSideCard myBoardList={props.myBoardList} />
    }
  }

  return <>{renderSidebarContent()}</>
}
