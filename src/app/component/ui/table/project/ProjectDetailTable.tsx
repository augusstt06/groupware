import {
  PROJECT_ISSUE_SCHEDULE_TITLE,
  PROJECT_ISSUE_SCHEDULE_VALUE,
  PROJECT_ISSUE_TASK_TITLE,
  PROJECT_ISSUE_TASK_VALUE,
  PROJECT_ISSUE_TODO_TITLE,
  PROJECT_ISSUE_TODO_VALUE,
} from '@/app/constant/constant'
import { moduleConvertDate } from '@/app/module/utils/moduleTime'
import { type ProjectDetailTableProps } from '@/app/types/ui/uiTypes'

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
    const time = moduleConvertDate(props.issue.updatedAt)
    const [datePart] = time.split(' ')

    return datePart
  }

  return (
    <>
      <div className="  ">
        <div className="flex flex-row items-center justify-between border-b-2 border-gray-300 overflow-x-auto dark:bg-[#576072ae] dark:text-gray-200 text-black">
          <div className="bg-gray-200 flex justify-center text-black w-1/5 h-12 text-center items-center  ">
            <span className="text-sm font-bold">{convertCategory()}</span>
          </div>
          <div className="w-4/5 flex justify-between flex-col lg:flex-row h-12 overflow-y-auto">
            <div className="w-full flex items-center justify-center pl-2 pr-2">
              <span className="text-sm">{props.issue.title}</span>
            </div>
            <div className="w-full flex items-center justify-around">
              {/* FIXME: 이건 이름으로 바꾸기 */}
              <span className="text-xs">{props.issue.issuerId}</span>
              <span className="text-xs">{sliceTime()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
