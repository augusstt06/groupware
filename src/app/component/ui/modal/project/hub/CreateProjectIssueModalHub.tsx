import CreateProjectTaskIssue from './category/CreateProjectTaskIssue'

export default function CreateProjectIssueModalHub() {
  return (
    <div className="flex flex-col items-left">
      {/* 업무 */}
      <CreateProjectTaskIssue />
    </div>
  )
}
