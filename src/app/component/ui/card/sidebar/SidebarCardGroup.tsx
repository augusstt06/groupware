import HistoryCard from '../main/HistoryCard'
import NameCard from '../main/NameCard'
import VacationCard from '../main/VacationCard'

import BoardSideCard from './board/BoardSideCard'
import ProjectDetailSideCard from './project/detail/ProjectDetailSideCard'
import ProjectMainSideCard from './project/main/ProjectMainSideCard'

import {
  SIDEBAR_URL_PATH_MAIN,
  SIDEBAR_URL_PATH_PROJECT,
  SIDEBAR_URL_PATH_PROJECT_DETAIL,
} from '@/app/constant/constant'
import { type MainSidebarCardGroupProps } from '@/app/types/ui/cardTypes'

export default function SidebarCardGroup(props: MainSidebarCardGroupProps) {
  const renderSidebarContent = () => {
    switch (props.title) {
      case SIDEBAR_URL_PATH_MAIN:
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
      case SIDEBAR_URL_PATH_PROJECT:
        return <ProjectMainSideCard />

      case SIDEBAR_URL_PATH_PROJECT_DETAIL:
        return <ProjectDetailSideCard />
      default:
        return <BoardSideCard myBoardList={props.myBoardList} />
    }
  }

  return <>{renderSidebarContent()}</>
}
