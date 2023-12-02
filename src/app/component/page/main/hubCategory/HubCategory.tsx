import TaskCard from '@/app/component/ui/card/TaskCard'
import { type HubCategoryProps } from '@/app/types/pageTypes'

export default function HubCategory(props: HubCategoryProps) {
  return (
    <>
      <h2 className="text-bold text-xl mb-5">{props.title}</h2>
      <div className="w-full grid gap-4 grid-cols-3 mb-6">
        {props.issue.map((data) => (
          <TaskCard key={data} title={data} />
        ))}
      </div>
    </>
  )
}
