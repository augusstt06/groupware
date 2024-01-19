import Link from 'next/link'

import ProjectCard from '@/app/component/ui/card/project/ProjectCard'
import { ROUTE_PROJECT_DETAIL } from '@/app/constant/route/route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { type ProjectMainHubProps } from '@/app/types/ui/uiTypes'

export default function ProjectMainHub(props: ProjectMainHubProps) {
  const projectCategory = useAppSelector((state) => state.projectMainCategory.selectProjectMenu)

  return (
    <div className=" md:w-5/6 w-full flex flex-col items-center dark:bg-[#1a202c] dark:border-gray-700 border border-gray-200 rounded-lg shadow-lg p-2 truncate">
      <div className="w-full p-3">
        <span className="font-bold">{projectCategory}</span>
      </div>

      <div className="grid xl:grid-cols-4 xl:gap-x-8 lg:grid-cols-3 lg:gap-x-10 grid-cols-2 gap-x-8 gap-y-6 p-3 ">
        {props.projectList.map((data) => (
          <Link key={data.id} href={`${ROUTE_PROJECT_DETAIL}/${data.id}`}>
            <ProjectCard projectInfo={data} />
          </Link>
        ))}
      </div>
    </div>
  )
}
