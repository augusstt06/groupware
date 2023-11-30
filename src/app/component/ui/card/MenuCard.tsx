import { useAppSelector } from '@/app/module/hooks/reduxHooks'

export default function MenuCard() {
  const extraUserInfo = useAppSelector((state) => state.userInfo.extraInfo)
  const menuList = [
    { name: extraUserInfo.organizationName, menu1: '공지사항', menu2: '자유 게시판' },
    { name: '팀이름', menu1: '게시판 이름', menu2: '게시판 이름2' },
    { name: '프로젝트이름', menu1: '게시판 이름', menu2: '게시판 이름2' },
  ]
  return (
    <div className="w-full mt-5 max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {menuList.map((data) => (
        <div
          className="flex flex-col items-center pb-4 w-full justify-center mt-3 border-b-1"
          key={data.name}
        >
          <span className="text-medium font-bold text-gray-500 dark:text-white w-4/5 mb-1">
            {data.name}
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400 w-4/5 mb-1">
            <span className="text-medium hover:font-bold hover:text-indigo-400 text-gray-500 dark:text-white dark:hover:text-indigo-400 dark:hover:font-bold">
              {data.menu1}
            </span>
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 w-4/5 mb-1">
            <span className="text-medium hover:font-bold hover:text-indigo-400 text-gray-500 dark:text-white dark:hover:text-indigo-400 dark:hover:font-bold">
              {data.menu2}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}
