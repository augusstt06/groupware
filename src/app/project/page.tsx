'use client'

import ProjectMainHub from '../component/page/project/hub/ProjectMainHub'
import CreateProjectModal from '../component/ui/modal/project/CreateProjectModal'
import { useAppSelector } from '../module/hooks/reduxHooks'

export default function Project() {
  const isCreateProjectModalOpen = useAppSelector(
    (state) => state.projectModal.isCreateProjectModalOpen,
  )

  return (
    <main className="md:w-[65rem] w-[35rem] h-4/5 flex flex-col items-center">
      <ProjectMainHub />
      {isCreateProjectModalOpen ? <CreateProjectModal /> : <></>}
    </main>
  )
}
