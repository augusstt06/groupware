'use client'

import ProjectDetailHub from '@/app/component/page/project/hub/ProjectDetailHub'
import CreateProjectIssueModal from '@/app/component/ui/modal/project/CreateProjectIssueModal'
import ProjectDetailTab from '@/app/component/ui/tab/project/ProjectDetailTab'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'

export default function ProjectDetail() {
  const isCreateProjectIssueModalOpen = useAppSelector(
    (state) => state.projectModal.isCreateProjectIssueModalOpen,
  )
  return (
    <main className="md:w-[65rem] w-[35rem] h-4/5 flex flex-col items-center ">
      <ProjectDetailTab />
      <ProjectDetailHub />
      {isCreateProjectIssueModalOpen ? <CreateProjectIssueModal /> : <></>}
    </main>
  )
}
