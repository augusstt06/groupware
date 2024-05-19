import HistoryCard from '../main/HistoryCard'
import NameCard from '../main/NameCard'
import VacationCard from '../main/VacationCard'

import BoardSideCard from './board/BoardSideCard'
import ProjectDetailSideCard from './project/detail/ProjectDetailSideCard'
import ProjectMainSideCard from './project/main/ProjectMainSideCard'
import TeamMainSideCard from './team/TeamMainSideCard'

import {
  SIDEBAR_URL_PATH_MAIN,
  SIDEBAR_URL_PATH_PROJECT,
  SIDEBAR_URL_PATH_PROJECT_DETAIL,
  SIDEBAR_URL_PATH_TEAM,
} from '@/constant/constant'
import { type MainSidebarCardGroupProps } from '@/types/ui/card'

export default function SidebarCardGroup(props: MainSidebarCardGroupProps) {
  const isMyboardListEmpty = () => {
    if (props.myBoardList.length === 0) return true
    return false
  }
  const renderSidebarContent = () => {
    if (isMyboardListEmpty()) {
      return <NameCard />
    }
    switch (props.title) {
      case SIDEBAR_URL_PATH_MAIN:
        return (
          <aside className="p-3 bg-white shadow-2xl dark:bg-opacity-10 bg-opacity-60 rounded-2xl">
            <NameCard />
            <HistoryCard
              reRender={props.reRender}
              setRerender={props.setRerender}
              title={props.title}
            />
            <VacationCard />
          </aside>
        )
      case SIDEBAR_URL_PATH_PROJECT:
        return <ProjectMainSideCard />

      case SIDEBAR_URL_PATH_PROJECT_DETAIL:
        return <ProjectDetailSideCard />
      case SIDEBAR_URL_PATH_TEAM:
        return <TeamMainSideCard />
      default:
        return <BoardSideCard myBoardList={props.myBoardList} />
    }
  }

  return <>{renderSidebarContent()}</>
}
