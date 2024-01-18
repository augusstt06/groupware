import ProjectDetailHub from '@/app/component/page/main/hub/project/ProjectDetailHub'
import ProjectDetailTab from '@/app/component/ui/tab/project/ProjectDetailTab'

export default function ProjectDetail() {
  return (
    <main className="md:w-[65rem] w-[35rem] h-4/5 flex flex-col items-center ">
      <ProjectDetailTab />

      <ProjectDetailHub />
    </main>
  )
}
