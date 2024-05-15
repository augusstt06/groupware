import { FaRegFolderOpen } from 'react-icons/fa6'

export default function DashBoardCard(props: { title: string }) {
  return (
    <div className=" col-span-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="mb-3">
        <FaRegFolderOpen className="w-20 h-20" />
      </div>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.title}</p>
    </div>
  )
}
