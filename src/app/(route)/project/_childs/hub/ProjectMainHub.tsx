import ProjectCard from '@/components/card/project/ProjectCard'
import { useAppSelector } from '@/module/hooks/reduxHooks'
import { type ProjectMainHubProps } from '@/types/ui/extra'

export default function ProjectMainHub(props: ProjectMainHubProps) {
  const { projectList } = props
  const projectCategory = useAppSelector((state) => state.projectMainCategory.selectProjectMenu)
  return (
    <div className="w-4/5 max-w-7xl sort-vertical-flex rounded-xl shadow-lg p-2 truncate bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10">
      <div className="w-full p-3">
        <span className="font-bold">{projectCategory}</span>
      </div>

      {projectList.length !== 0 ? (
        <div className="p-3 grid xl:grid-cols-4 xl:gap-x-10 lg:grid-cols-3 lg:gap-x-10 grid-cols-2 gap-x-8 gap-y-6 ">
          {projectList.map((data) => (
            <ProjectCard key={data.id} projectInfo={data} />
          ))}
        </div>
      ) : (
        <section className="flex items-center justify-center w-full h-40 rounded-xl">
          There are no projects yet.
        </section>
      )}
    </div>
  )
}
