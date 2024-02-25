import ProjectCard from '@/app/component/ui/card/project/ProjectCard'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { type ProjectMainHubProps } from '@/app/types/ui/extra'

export default function ProjectMainHub(props: ProjectMainHubProps) {
  const { projectList } = props
  const projectCategory = useAppSelector((state) => state.projectMainCategory.selectProjectMenu)
  return (
    <div className="w-4/5 max-w-7xl flex flex-col items-center rounded-xl shadow-lg p-2 truncate bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10">
      <div className="w-full p-3">
        <span className="font-bold">{projectCategory}</span>
      </div>

      {projectList.length !== 0 ? (
        <div className="grid xl:grid-cols-4 xl:gap-x-10 lg:grid-cols-3 lg:gap-x-10 grid-cols-2 gap-x-8 gap-y-6 p-3 ">
          {projectList.map((data) => (
            <ProjectCard key={data.id} projectInfo={data} />
          ))}
        </div>
      ) : (
        <section className="rounded-xl w-full h-40 flex items-center justify-center bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10">
          There are no projects yet.
        </section>
      )}
    </div>
  )
}
