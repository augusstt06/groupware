import { type BoardTabProps } from '@/types/ui/extra'

export default function BoardTab(props: BoardTabProps) {
  const { changeBoard, selectBoard, title } = props
  const entireBoardClassName =
    selectBoard === ''
      ? 'me-2 border-b-2 border-indigo-400 cursor-pointer'
      : 'me-2 transition ease-in-out duration-300 hover:scale-110 cursor-pointer'
  const otherBoardClassName = (name: string) => {
    const className =
      selectBoard === name
        ? 'me-2  border-b-2 border-indigo-400'
        : 'me-2 transition ease-in-out duration-300 hover:scale-110 '
    return className
  }
  const menuList = [{ title: '공지사항' }, { title: '자유게시판' }]
  return (
    <div className="w-full md:text-sm text-xs bg-[#f5f7fc] md:p-2 md:font-bold text-center rounded-xl shadow mb-5 bg-opacity-70 dark:bg-opacity-10">
      <div className="mt-2 mb-2">
        <span className="text-base md:text-lg">{title}</span>
      </div>
      <ul className="flex flex-row justify-around">
        <li className={entireBoardClassName}>
          <a
            className="inline-block p-3 text-xs rounded-t-lg md:text-medium md:p-4"
            onClick={() => {
              changeBoard('')
            }}
          >
            전체
          </a>
        </li>
        {menuList.map((data) => (
          <li className={otherBoardClassName(data.title)} key={data.title}>
            <a
              className="inline-block p-3 text-xs rounded-t-lg cursor-pointer md:text-medium md:p-4"
              onClick={() => {
                changeBoard(data.title)
              }}
            >
              {data.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
