export default function CreateProjectIssueModalTab() {
  const tabList = [{ title: '📑 업무' }, { title: '🗓️ 일정' }, { title: '✅ 할일' }]
  return (
    <div className="flex flex-row justify-around items-center p-2 ">
      {tabList.map((data) => (
        <div
          key={data.title}
          className="border-b-2 border-transparent transition ease-in-out duration-300 hover:border-indigo-300 w-1/4 text-center p-2"
        >
          {data.title}
        </div>
      ))}
    </div>
  )
}
