import ProjectIssueSchedule from './category/schedule/ProjectIssueSchedule'
import ProjectIssueTask from './category/task/ProjectIssueTask'
import ProjectIssueTodo from './category/todo/ProjectIssueTodo'

import {
  PROJECT_ISSUE_SCHEDULE_VALUE,
  PROJECT_ISSUE_TASK_VALUE,
  PROJECT_ISSUE_TODO_VALUE,
} from '@/_constant/constant'
import { type CreateProjectIssueModalHubProps } from '@/_types/ui/extra'

export default function CreateProjectIssueModalHub(props: CreateProjectIssueModalHubProps) {
  const selectComponent = () => {
    switch (props.selectCategory) {
      case PROJECT_ISSUE_TASK_VALUE:
        return <ProjectIssueTask />
      case PROJECT_ISSUE_SCHEDULE_VALUE:
        return <ProjectIssueSchedule />
      case PROJECT_ISSUE_TODO_VALUE:
        return <ProjectIssueTodo />
      default:
        return <ProjectIssueTask />
    }
  }
  return <div className="flex flex-col items-left">{selectComponent()}</div>
}
