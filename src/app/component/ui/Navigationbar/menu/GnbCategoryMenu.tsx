import { Chakra_Petch } from 'next/font/google'
import Link from 'next/link'

import { ROUTE_BOARD, ROUTE_PROJECT, ROUTE_TEAM } from '@/app/constant/route/route-constant'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: '500',
})
export default function GnbCategoryMenu(props: { handleClickDrop: () => void }) {
  const { handleClickDrop } = props
  const menuList = [
    { title: 'Board', link: ROUTE_BOARD },
    { title: 'Project', link: ROUTE_PROJECT },
    { title: 'Team', link: ROUTE_TEAM },
  ]
  return (
    <ul className="md:w-2/3 w-1/3 flex flex-col items-center mt-4 text-sm md:font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
      {menuList.map((data) => (
        <li
          key={data.title}
          className="w-full flex justify-center transition ease-in-out duration-300 hover:scale-110 hover:border-b-2 border-b-2 border-transparent hover:border-indigo-400"
          onClick={handleClickDrop}
        >
          <Link href={data.link}>
            <button
              id={`${data.title}`}
              className={
                `flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 md:w-auto md:p-2 dark:text-white ` +
                chakra.className
              }
            >
              {data.title}
            </button>
          </Link>
        </li>
      ))}
    </ul>
  )
}
