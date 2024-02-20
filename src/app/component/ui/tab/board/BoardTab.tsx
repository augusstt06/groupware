import { type BoardTabProps } from '@/app/types/ui/uiTypes'

export default function BoardTab(props: BoardTabProps) {
  const entireBoardClassName =
    props.selectBoard === ''
      ? 'me-2  border-b-2 border-indigo-400'
      : 'me-2 transition ease-in-out duration-300 hover:scale-110'
  const otherBoardClassName = (name: string) => {
    const className =
      props.selectBoard === name
        ? 'me-2  border-b-2 border-indigo-400'
        : 'me-2 transition ease-in-out duration-300 hover:scale-110 '
    return className
  }
  const menuList = [
    { title: '공지사항' },
    { title: '자유게시판' },
    { title: '팀' },
    { title: '프로젝트' },
  ]
  return (
    <div className="w-full md:text-sm text-xs border-2 border-[#7f8bb1] bg-[#f5f7fc] md:p-2 md:font-bold text-center border border-gray-200 rounded-lg shadow dark:bg-[#1a202c] dark:border-gray-700 mb-5">
      <div className="mt-2 mb-2">
        <span className="md:text-lg text-base">{props.title}</span>
      </div>
      <ul className="flex flex-row justify-around">
        <li className={entireBoardClassName}>
          <a
            className="text-xs md:text-medium inline-block md:p-4 p-3 rounded-t-lg"
            onClick={() => {
              props.changeBoard('')
            }}
          >
            전체
          </a>
        </li>
        {menuList.map((data) => (
          <li className={otherBoardClassName(data.title)} key={data.title}>
            <a
              className="text-xs md:text-medium inline-block md:p-4 p-3 rounded-t-lg"
              onClick={() => {
                props.changeBoard(data.title)
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
