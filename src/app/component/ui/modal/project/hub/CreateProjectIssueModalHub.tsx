import ProjectIssueCalendar from './category/calendar/ProjectIssueCalendar'
import ProjectTaskIssue from './category/task/ProjectTaskIssue'
import ProjectIssueTodo from './category/todo/ProjectIssueTodo'

import {
  PROJECT_ISSUE_CALENDAR,
  PROJECT_ISSUE_TASK,
  PROJECT_ISSUE_TODO,
} from '@/app/constant/constant'
import { type CreateProjectIssueModalHubProps } from '@/app/types/ui/uiTypes'

export default function CreateProjectIssueModalHub(props: CreateProjectIssueModalHubProps) {
  const selectComponent = () => {
    switch (props.selectCategory) {
      case PROJECT_ISSUE_TASK:
        return <ProjectTaskIssue />
      case PROJECT_ISSUE_CALENDAR:
        return <ProjectIssueCalendar />
      case PROJECT_ISSUE_TODO:
        return <ProjectIssueTodo />
      default:
        return <ProjectTaskIssue />
    }
  }
  return <div className="flex flex-col items-left">{selectComponent()}</div>
}
