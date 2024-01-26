import ProjectDetailMain from './category/ProjectDetailMain'
import ProjectDetailSchedule from './category/ProjectDetailSchedule'
import ProjectDetailTask from './category/ProjectDetailTask'

import {
  PROJECT_DETAIL_CATEGORY_HOME,
  PROJECT_DETAIL_CATEGORY_SCHEDULE,
  PROJECT_DETAIL_CATEGORY_TASK,
} from '@/app/constant/constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { type ProjectDetailHubProps } from '@/app/types/ui/uiTypes'

export default function ProjectDetailHub(props: ProjectDetailHubProps) {
  const detailCategory = useAppSelector((state) => state.projectDetailCategory.detailCategory)
  const renderingCategory = () => {
    switch (detailCategory) {
      case PROJECT_DETAIL_CATEGORY_HOME:
        return (
          <ProjectDetailMain
            projectInfo={props.projectInfo}
            issueList={props.issueList}
            pinnedList={props.pinnedList}
          />
        )
      case PROJECT_DETAIL_CATEGORY_TASK:
        return <ProjectDetailTask />
      case PROJECT_DETAIL_CATEGORY_SCHEDULE:
        return <ProjectDetailSchedule />
      default:
        return (
          <ProjectDetailMain
            projectInfo={props.projectInfo}
            issueList={props.issueList}
            pinnedList={props.pinnedList}
          />
        )
    }
  }
  return <>{renderingCategory()}</>
}
