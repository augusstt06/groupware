import {
  PROJECT_ISSUE_SCHEDULE_TITLE,
  PROJECT_ISSUE_SCHEDULE_VALUE,
  PROJECT_ISSUE_TASK_TITLE,
  PROJECT_ISSUE_TASK_VALUE,
  PROJECT_ISSUE_TODO_TITLE,
  PROJECT_ISSUE_TODO_VALUE,
} from '@/constant/constant'
import { moduleConvertDate } from '@/module/utils/moduleTime'
import { type ProjectDetailTableProps } from '@/types/ui/extra'

export default function ProjectDetailTable(props: ProjectDetailTableProps) {
  const convertCategory = () => {
    switch (props.issue.category) {
      case PROJECT_ISSUE_TASK_VALUE.toUpperCase():
        return PROJECT_ISSUE_TASK_TITLE
      case PROJECT_ISSUE_SCHEDULE_VALUE.toUpperCase():
        return PROJECT_ISSUE_SCHEDULE_TITLE
      case PROJECT_ISSUE_TODO_VALUE.toUpperCase():
        return PROJECT_ISSUE_TODO_TITLE
    }
  }
  const sliceTime = () => {
    const time = moduleConvertDate(props.issue.updatedAt, '.', false)
    const [datePart] = time.split(' ')

    return datePart
  }

  return (
    <div>
      <div className="justify-between overflow-x-auto text-black border-2 border-gray-300 rounded-lg sort-row-flex dark:border-gray-500 dark:text-gray-200">
        <div className="sort-row-flex justify-center w-1/5 h-12 text-center text-black dark:text-white bg-gray-300 dark:bg-[#505050] ">
          <span className="text-sm font-bold">{convertCategory()}</span>
        </div>
        <div className="flex flex-col justify-between w-4/5 h-12 overflow-y-auto lg:flex-row">
          <div className="justify-center w-full pl-2 pr-2 sort-row-flex">
            <span className="text-sm">{props.issue.title}</span>
          </div>
          <div className="justify-around w-full sort-row-flex">
            <span className="text-xs">{props.issue.issuer.name}</span>
            <span className="text-xs">{sliceTime()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
