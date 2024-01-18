import { type CreateProjectIssueModalTabProps } from '@/app/types/ui/uiTypes'

export default function CreateProjectIssueModalTab(props: CreateProjectIssueModalTabProps) {
  const tabList = [
    { title: '📑 업무', id: 'task' },
    { title: '🗓️ 일정', id: 'calendar' },
    { title: '✅ 할일', id: 'todo' },
  ]
  const divClassName = (select: string, id: string) => {
    if (select === id || (select === '' && id === 'task'))
      return 'border-b-2 transition ease-in-out duration-300 border-b-2 border-indigo-300 w-1/4 text-center p-2'
    else
      return 'border-b-2 border-transparent transition ease-in-out duration-300 hover:border-indigo-300 w-1/4 text-center p-2'
  }
  return (
    <div className="flex flex-row justify-around items-center p-2 ">
      {tabList.map((data) => (
        <div
          key={data.title}
          className={divClassName(props.selectCategory, data.id)}
          onClick={() => {
            props.changeSelectCategory(data.id)
          }}
        >
          {data.title}
        </div>
      ))}
    </div>
  )
}
