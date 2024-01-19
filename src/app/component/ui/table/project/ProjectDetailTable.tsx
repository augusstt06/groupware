import { type ProjectDetailTableProps } from '@/app/types/ui/uiTypes'

export default function ProjectDetailTable(props: ProjectDetailTableProps) {
  return (
    <>
      <div className=" w-2/6 md:w-1/6 flex flex-row justify-around mb-2">
        <span className="font-bold">{props.title}</span>
        <span className="font-bold text-indigo-400">1</span>
      </div>
      <div className=" border-t-2 border-b-2 border-gray-400 ">
        <ProjectDetailTableCard />
      </div>
    </>
  )
}

export function ProjectDetailTableCard() {
  return (
    <div className="flex flex-row items-center justify-between border-b-2 border-gray-200 overflow-x-auto">
      <div className="bg-gray-300 flex justify-center text-black w-1/5 h-12 text-center items-center">
        <span className="text-sm">업무</span>
      </div>
      <div className="w-4/5 flex justify-between flex-col lg:flex-row h-12 overflow-y-auto">
        <div className="w-full flex items-center justify-center pl-2 pr-2">
          <span className="text-sm">상세페이지 설계</span>
        </div>
        <div className="w-full flex items-center justify-around">
          <span className="text-xs">김충연</span>
          <span className="text-xs">2023/01/18</span>
        </div>
      </div>
    </div>
  )
}
