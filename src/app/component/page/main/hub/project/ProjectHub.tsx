// import TaskCard from '@/app/component/ui/card/TaskCard'

export default function ProjectHub() {
  const hubCategory = [
    {
      title: 'My Project',
      issue: ['Organization', 'Teams'],
    },
  ]

  return (
    <div>
      {hubCategory.map((data) => (
        <div key={data.title}>
          <h2 className="text-bold text-xl mb-5">{data.title}</h2>
          <div className="w-full grid gap-4 grid-cols-3 mb-6">
            {/* {data.issue.map((data) => (
              <TaskCard key={data} title={data} description={''} link={''} />
            ))} */}
          </div>
        </div>
      ))}
    </div>
  )
}
