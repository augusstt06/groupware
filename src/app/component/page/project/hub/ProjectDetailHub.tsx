import InviteProjectMemberTable from '@/app/component/ui/table/project/InviteProjectMemberTable'
import ProjectDetailTable from '@/app/component/ui/table/project/ProjectDetailTable'

export default function ProjectDetailHub() {
  return (
    <div className="md:w-4/5 w-full flex flex-row items-left ">
      <div className="w-2/3 p-2 flex flex-row justify-between items-center dark:border-gray-700 border border-gray-200 rounded-lg mr-4 dark:bg-[#1a202c] dark:border-gray-700 border rounded-lg shadow-lg">
        <div className="flex flex-col mb-2">
          <div className="mt-2">
            <ProjectDetailTable title="고정" />
          </div>
          <div className="mt-10">
            <ProjectDetailTable title="전체" />
          </div>
        </div>
      </div>
      <div className="w-1/3 p-2 flex flex-col items-left dark:border-gray-700 border border-gray-200 rounded-lg dark:bg-[#1a202c] dark:border-gray-700 border border-gray-200 rounded-lg shadow-lg">
        <div className=" w-1/4 flex flex-row justify-around mb-2 mt-2">
          <span className="font-bold">멤버</span>
          <span className="font-bold text-indigo-400">1</span>
        </div>
        <div className="transition ease-in-out duration-300 border-t-2 border-b-2 dark:bg-indigo-400 hover:bg-indigo-300 hover:text-white hover:dark:bg-indigo-500 dark:border-gray-700 border border-gray-300 rounded-lg shadow-lg">
          <InviteProjectMemberTable />
        </div>
      </div>
    </div>
  )
}
