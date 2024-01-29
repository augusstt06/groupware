import SidebarUserProfileCard from '../../SidebarUserProfileCard'

import ProjectDetailScheduleMenu from './ProjectDetailScheduleMenu'
import ProjectDetailTaskMenu from './ProjectDetailTaskMenu'
import ProjectDetailTodoMenu from './ProjectDetailTodoMenu'

import CreateProjectIssueBtn from '@/app/component/ui/button/project/detail/CreateProjectIssueBtn'
import {
  PROJECT_DETAIL_CATEGORY_HOME,
  PROJECT_DETAIL_CATEGORY_SCHEDULE,
  PROJECT_DETAIL_CATEGORY_TASK,
  PROJECT_DETAIL_CATEGORY_TODO,
} from '@/app/constant/constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'

export default function ProjectDetailSideCard() {
  const detailCategory = useAppSelector((state) => state.projectDetailCategory.detailCategory)
  const renderMenucard = () => {
    switch (detailCategory) {
      case PROJECT_DETAIL_CATEGORY_HOME:
        return <></>
      case PROJECT_DETAIL_CATEGORY_TASK:
        return <ProjectDetailTaskMenu />
      case PROJECT_DETAIL_CATEGORY_SCHEDULE:
        return <ProjectDetailScheduleMenu />
      case PROJECT_DETAIL_CATEGORY_TODO:
        return <ProjectDetailTodoMenu />
    }
  }
  return (
    <>
      <SidebarUserProfileCard />
      <CreateProjectIssueBtn />
      {renderMenucard()}
    </>
  )
}
