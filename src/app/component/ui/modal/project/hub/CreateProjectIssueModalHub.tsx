import CreateProjectTaskIssue from './category/CreateProjectTaskIssue'

import { type CreateProjectIssueModalHubProps } from '@/app/types/ui/uiTypes'

export default function CreateProjectIssueModalHub(props: CreateProjectIssueModalHubProps) {
  const selectComponent = () => {
    switch (props.selectCategory) {
      case 'task':
        return <CreateProjectTaskIssue />
      case 'calendar':
        return 'Calendar'
      case 'todo':
        return 'Todd'
      default:
        return <CreateProjectTaskIssue />
    }
  }
  return <div className="flex flex-col items-left">{selectComponent()}</div>
}
