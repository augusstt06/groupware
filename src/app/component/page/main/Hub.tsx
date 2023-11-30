import HubCategory from './hubCategory/HubCategory'

export default function Hub() {
  const hubCategory = [
    {
      title: 'Attendance',
      issue: ['History'],
    },
    {
      title: 'Vacation',
      issue: [''],
    },
    {
      title: 'Current Issue',
      issue: ['Organization', 'Teams'],
    },
  ]
  return (
    <div>
      {hubCategory.map((data) => (
        <HubCategory key={data.title} title={data.title} issue={data.issue} />
      ))}
    </div>
  )
}
