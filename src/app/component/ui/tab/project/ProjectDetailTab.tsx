import InviteMemberBtn from '@/app/component/ui/button/project/detail/InviteMemberBtn'

export default function ProjectDetailTab() {
  const issueCategoryList = [
    { title: '홈' },
    { title: '업무' },
    { title: '일정' },
    { title: '할일' },
  ]
  return (
    <div className="md:w-4/5 w-full flex flex-col items-left dark:bg-[#1a202c] dark:border-gray-700 border border-gray-200 rounded-lg shadow-lg p-2 mb-5">
      <div className="w-full p-3 flex flex-row justify-between items-center">
        <span className="font-bold">프로젝트 이름</span>
        <InviteMemberBtn />
      </div>
      <div className="flex flex-row w-1/3 justify-around p-1">
        {issueCategoryList.map((data) => (
          <div
            key={data.title}
            className="w-1/3 mr-2 text-center transition ease-in-out duration-300 hover:scale-110 hover:border-b-2 hover:border-indigo-400 p-2 border-transparent border-b-2"
          >
            <span>{data.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
