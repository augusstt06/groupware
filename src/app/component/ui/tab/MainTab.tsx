export default function MainTab() {
  const tabList = ['전체', '팀', '프로젝트', '근무/휴가', '전자결재']
  return (
    <div className="w-full text-sm p-4 font-bold text-center border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
      <ul className="flex flex-row justify-around -mb-px">
        {tabList.map((data) => (
          <li className="me-2" key={data}>
            <a className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
              {data}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
