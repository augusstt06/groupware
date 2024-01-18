import ProjectIssueCalendar from './category/calendar/ProjectIssueCalendar'
import ProjectTaskIssue from './category/task/ProjectTaskIssue'

import { type CreateProjectIssueModalHubProps } from '@/app/types/ui/uiTypes'

export default function CreateProjectIssueModalHub(props: CreateProjectIssueModalHubProps) {
  const selectComponent = () => {
    switch (props.selectCategory) {
      case 'task':
        return <ProjectTaskIssue />
      case 'calendar':
        return <ProjectIssueCalendar />
      case 'todo':
        return 'Todd'
      default:
        return <ProjectTaskIssue />
    }
  }
  return <div className="flex flex-col items-left">{selectComponent()}</div>
}
