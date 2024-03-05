import { moduleConvertDate } from '@/app/module/utils/moduleTime'
import { type ProjectDetailTodoCardProps } from '@/app/types/ui/card'

export default function ProjectDetailTodoCard(props: ProjectDetailTodoCardProps) {
  const { title, issuer, endAt } = props.todo

  return (
    <div className="p-3 rounded-xl shadow-xl border-2 bg-[#f5f7fc] dark:text-gray-500 ">
      <h1 className="font-bold">{title}</h1>
      <div className="text-sm flex flex-row items-center justify-between">
        <div>{issuer.name}</div>
        <div>{moduleConvertDate(endAt, '.', false)}</div>
        <div className="bg-green-200 w-4 h-4 rounded-full"></div>
      </div>
    </div>
  )
}
