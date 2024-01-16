import Link from 'next/link'

import { ROUTE_BOARD, ROUTE_MAIN, ROUTE_PROJECT } from '@/app/constant/route/route-constant'

export default function GnbCategoryMenu() {
  const menuList = [
    { title: '게시판', link: ROUTE_BOARD },
    { title: '프로젝트', link: ROUTE_PROJECT },
    { title: '팀', link: ROUTE_MAIN },
  ]
  return (
    <ul className="md:w-2/3 w-1/3 flex flex-col items-center mt-4 text-sm md:font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
      {menuList.map((data) => (
        <li
          key={data.title}
          className="w-full flex justify-center transition ease-in-out duration-300 hover:scale-110 hover:border-b-2 hover:border-indigo-400"
        >
          <Link href={data.link}>
            <button
              id={`${data.title}-dropdown-button`}
              className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 md:w-auto md:p-2 dark:text-white "
            >
              {data.title}
            </button>
          </Link>
        </li>
      ))}
    </ul>
  )
}
