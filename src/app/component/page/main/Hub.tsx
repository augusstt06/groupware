import HubCategory from './hubCategory/HubCategory'
import AttendanceHistory from './hubCategory/attendanceHistory/AttendanceHistory'

export default function Hub() {
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
      {}
      {hubCategory.map((data) => (
        <HubCategory key={data.title} title={data.title} issue={data.issue} />
      ))}
    </div>
  )
}
