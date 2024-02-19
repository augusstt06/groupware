import ProjectCard from '@/app/component/ui/card/project/ProjectCard'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { type ProjectMainHubProps } from '@/app/types/ui/uiTypes'

export default function ProjectMainHub(props: ProjectMainHubProps) {
  const projectCategory = useAppSelector((state) => state.projectMainCategory.selectProjectMenu)
  return (
    <div className="w-full max-w-7xl flex flex-col items-center border-2 border-[#7f8bb1] bg-[#f5f7fc] dark:bg-[#1a202c] dark:border-gray-700 border border-gray-200 rounded-lg shadow-lg p-2 truncate">
      <div className="w-full p-3">
        <span className="font-bold">{projectCategory}</span>
      </div>

      <div className="grid xl:grid-cols-4 xl:gap-x-10 lg:grid-cols-3 lg:gap-x-10 grid-cols-2 gap-x-8 gap-y-6 p-3 ">
        {props.projectList.map((data) => (
          <ProjectCard key={data.id} projectInfo={data} />
        ))}
      </div>
    </div>
  )
}
