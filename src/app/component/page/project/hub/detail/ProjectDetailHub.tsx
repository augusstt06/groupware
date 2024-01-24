import ProjectDetailMain from './category/ProjectDetailMain'
import ProjectDetailTask from './category/ProjectDetailTask'

import { PROJECT_DETAIL_CATEGORY_HOME, PROJECT_DETAIL_CATEGORY_TASK } from '@/app/constant/constant'
import { type ProjectDetailHubProps } from '@/app/types/ui/uiTypes'

export default function ProjectDetailHub(props: ProjectDetailHubProps) {
  // FIXME:

  const renderingCategory = () => {
    switch (props.detailCategory) {
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
