import DashBoardCard from '../../ui/card/DashBoardCard'
import TaskCard from '../../ui/card/TaskCard'

export default function Hub() {
  const category = ['Company', 'Teams', 'Projects']
  return (
    <>
      <h2 className="text-bold text-xl mb-5">My DashBoard</h2>
      <div className="w-full grid gap-4 grid-cols-3 mb-6">
        {category.map((data) => (
          <DashBoardCard title={data} key={data} />
        ))}
      </div>
      <h2 className="text-bold text-xl mb-5">Tasks for Today</h2>
      <TaskCard />
    </>
  )
}
