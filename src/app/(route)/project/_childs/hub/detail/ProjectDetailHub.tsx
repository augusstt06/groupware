import ProjectDetailMain from './category/ProjectDetailMain'
import ProjectDetailSchedule from './category/ProjectDetailSchedule'
import ProjectDetailTask from './category/ProjectDetailTask'
import ProjectDetailTodo from './category/ProjectDetailTodo'

import {
  PROJECT_DETAIL_CATEGORY_HOME,
  PROJECT_DETAIL_CATEGORY_SCHEDULE,
  PROJECT_DETAIL_CATEGORY_TASK,
  PROJECT_DETAIL_CATEGORY_TODO,
} from '@/constant/constant'
import { useAppSelector } from '@/module/hooks/reduxHooks'
import { type ProjectDetailHubProps } from '@/types/ui/extra'

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
      case PROJECT_DETAIL_CATEGORY_TODO:
        return <ProjectDetailTodo />
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
