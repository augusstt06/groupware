export default function CreateProjectTaskIssue() {
  const progressStatusList = [
    { title: '요청', color: 'hover:bg-[rgb(248,216,73)]' },
    { title: '진행', color: 'hover:bg-[rgb(98,214,124)]' },
    { title: '완료', color: 'hover:bg-[rgb(72,162,248)]' },
    { title: '보류', color: 'hover:bg-[rgb(221,109,96)]' },
  ]
  const managerList = ['김충연', '김민규', '남아현', '오준석']
  return (
    <>
      <div className="mt-2 p-2 mb-2">
        <span className="font-bold">업무 생성하기</span>
      </div>
      <div>
        <div className="flex flex-row items-center p-2">
          <div className="w-1/6">
            <span>제목</span>
          </div>
          <input
            placeholder="제목을 입력해주세요"
            className="rounded rounded mt-2 bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
          />
        </div>
        {/*  */}
        <div className="flex flex-row items-center p-2">
          <div className="w-1/6">
            <span>진행상태</span>
          </div>
          <div className="flex flex-row justify-around w-full">
            {progressStatusList.map((data) => (
              <div
                key={data.title}
                className={`bg-gray-200 hover:text-white ${data.color} transition ease-in-out duration-300 w-1/5 p-2 rounded-full text-center`}
              >
                {data.title}
              </div>
            ))}
          </div>
        </div>
        {/*  */}
        <div className="flex flex-row items-center p-2">
          <div className="w-1/6">
            <span>담당자</span>
          </div>
          <select className="border-2 border-gray-300 p-2 rounded-lg text-sm">
            {managerList.map((data) => (
              <option key={data}>{data}</option>
            ))}
          </select>
        </div>
        {/*  */}
        <div className="flex flex-row items-center p-2">
          <div className="w-1/6">
            <span>시작일</span>
          </div>
        </div>
      </div>
    </>
  )
}
