import CreateProjectBtn from '../../../../button/project/CreateProjectBtn'
import SidebarUserProfileCard from '../../SidebarUserProfileCard'

import ProjectMenuCard from './ProjectMenuCard'

export default function ProjectMainSideCard() {
  return (
    <>
      <SidebarUserProfileCard />
      <CreateProjectBtn />

      <ProjectMenuCard />
    </>
  )
}
