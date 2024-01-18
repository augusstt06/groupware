export function CreateProjectModalInput() {
  return (
    <div className="mt-2 mb-2">
      <span className="text-sm">프로젝트명</span>
      <input
        type="text"
        placeholder="프로젝트명을 입력해주세요."
        className="rounded rounded mt-2 bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
      />
    </div>
  )
}

export function CreateProjectModalColorSelect(props: { colorList: string[] }) {
  return (
    <div className="mb-2">
      <span className="text-sm">프로젝트 색상</span>
      <div className="flex flex-row items-center justify-around w-full ">
        {props.colorList.map((data) => (
          <div
            className={`${data} w-20 h-8 rounded-lg mt-2 transition ease-in-out duration-500 hover:scale-110`}
            key={data}
          ></div>
        ))}
      </div>
    </div>
  )
}
