import { type BoardTabProps } from '@/app/types/ui/extra'

export default function BoardTab(props: BoardTabProps) {
  const entireBoardClassName =
    props.selectBoard === ''
      ? 'me-2 border-b-2 border-indigo-400 cursor-pointer'
      : 'me-2 transition ease-in-out duration-300 hover:scale-110 cursor-pointer'
  const otherBoardClassName = (name: string) => {
    const className =
      props.selectBoard === name
        ? 'me-2  border-b-2 border-indigo-400'
        : 'me-2 transition ease-in-out duration-300 hover:scale-110 '
    return className
  }
  const menuList = [{ title: '공지사항' }, { title: '자유게시판' }]
  return (
    <div className="w-full md:text-sm text-xs bg-[#f5f7fc] md:p-2 md:font-bold text-center rounded-xl shadow mb-5 bg-opacity-70 dark:bg-opacity-10">
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
              className="text-xs md:text-medium inline-block md:p-4 p-3 rounded-t-lg cursor-pointer"
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
