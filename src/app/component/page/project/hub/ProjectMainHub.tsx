import ProjectCard from '@/app/component/ui/card/project/ProjectCard'

export default function ProjectMainHub() {
  return (
    <div className="md:w-4/5 w-full flex flex-col items-center dark:bg-[#1a202c] dark:border-gray-700 border border-gray-200 rounded-lg shadow-lg p-2">
      <div className="w-full p-3">
        <span className="font-bold">전체</span>
      </div>
      <div className="grid grid-cols-4 gap-4 p-3 ">
        <ProjectCard />
      </div>
    </div>
  )
}
