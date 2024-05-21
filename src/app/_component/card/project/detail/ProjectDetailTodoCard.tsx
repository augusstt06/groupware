import { moduleConvertDate } from '@/module/utils/moduleTime'
import { type ProjectDetailTodoCardProps } from '@/types/ui/card'

export default function ProjectDetailTodoCard(props: ProjectDetailTodoCardProps) {
  const { title, issuer, endAt } = props.todo

  return (
    <div className="p-3 rounded-xl shadow-xl border-2 bg-[#f5f7fc] dark:text-gray-500 ">
      <h1 className="font-bold">{title}</h1>
      <div className="flex flex-row items-center justify-between text-sm">
        <div>{issuer.name}</div>
        <div>{moduleConvertDate(endAt, '.', false)}</div>
        <div className="w-4 h-4 bg-green-200 rounded-full"></div>
      </div>
    </div>
  )
}
