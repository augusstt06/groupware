import { type ProjectDetailTableProps } from '@/app/types/ui/uiTypes'

export default function ProjectDetailTable(props: ProjectDetailTableProps) {
  return (
    <>
      <div className=" w-1/6 flex flex-row justify-around mb-2">
        <span className="font-bold">{props.title}</span>
        <span className="font-bold text-indigo-400">1</span>
      </div>
      <div>
        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-t-2 border-gray-400">
          <tbody>
            <ProjectDetailTableCard />
          </tbody>
        </table>
      </div>
    </>
  )
}

export function ProjectDetailTableCard() {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4 bg-gray-200 text-black">🐕‍🦺 업무</td>
      <td className="px-6 py-4">프로젝트 상세페이지 제작</td>
      <td className="px-6 py-4">김충연</td>
      <td className="px-6 py-4">2023/01/18</td>
    </tr>
  )
}
