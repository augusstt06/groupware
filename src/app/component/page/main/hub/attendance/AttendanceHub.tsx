import AttendanceHistory from './attendanceHistory/AttendanceHistory'

import TaskCard from '@/app/component/ui/card/TaskCard'

export default function AttendanceHub() {
  const hubCategory = [
    {
      title: 'Current Issue',
      issue: ['Organization', 'Teams'],
    },
  ]
  return (
    <div>
      <div>
        <AttendanceHistory />
      </div>

      {hubCategory.map((data) => (
        <div key={data.title}>
          <h2 className="text-bold text-xl mb-5">{data.title}</h2>
          <div className="w-full grid gap-4 grid-cols-3 mb-6">
            {data.issue.map((data) => (
              <TaskCard key={data} title={data} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
