import {
  PROJECT_ISSUE_SCHEDULE_TITLE,
  PROJECT_ISSUE_SCHEDULE_VALUE,
  PROJECT_ISSUE_TASK_TITLE,
  PROJECT_ISSUE_TASK_VALUE,
  PROJECT_ISSUE_TODO_TITLE,
  PROJECT_ISSUE_TODO_VALUE,
} from '@/_constant/constant'
import { type CreateProjectIssueModalTabProps } from '@/_types/ui/extra'

export default function CreateProjectIssueModalTab(props: CreateProjectIssueModalTabProps) {
  const tabList = [
    { title: PROJECT_ISSUE_TASK_TITLE, value: PROJECT_ISSUE_TASK_VALUE },
    { title: PROJECT_ISSUE_SCHEDULE_TITLE, value: PROJECT_ISSUE_SCHEDULE_VALUE },
    { title: PROJECT_ISSUE_TODO_TITLE, value: PROJECT_ISSUE_TODO_VALUE },
  ]
  const divClassName = (select: string, id: string) => {
    if (select === id || (select === '' && id === 'task'))
      return 'border-b-2 smooth-transition border-b-2 border-indigo-300 w-1/4 text-center p-2 md:text-base text-sm cursor-pointer'
    else
      return 'border-b-2 border-transparent smooth-transition hover:border-indigo-300 w-1/4 text-center p-2 md:text-base text-sm cursor-pointer'
  }
  return (
    <div className="justify-around p-2 sort-row-flex md:">
      {tabList.map((data) => (
        <div
          key={data.title}
          className={divClassName(props.selectCategory, data.value)}
          onClick={() => {
            props.changeSelectCategory(data.value)
          }}
        >
          {data.title}
        </div>
      ))}
    </div>
  )
}
