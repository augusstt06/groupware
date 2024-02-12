import Link from 'next/link'

import { ROUTE_PROJECT_DETAIL } from '@/app/constant/route/route-constant'
import { type TeamCardProps } from '@/app/types/ui/cardTypes'

export default function TeamCard(props: TeamCardProps) {
  // component variables
  const { teamInfo } = props

  return (
    <div
      className="flex flex-row items-center dark:bg-gray-100 dark:text-black h-24 2xl:w-44 xl:w-48 md:w-48 w-32 border-gray-300 border-1 shadow-2xl transition duration-400 ease-in-out hover:scale-110 hover:shadow-2xl bg-white"
      style={{ boxShadow: '5px 0px 10px rgba(0, 0, 0, 0.1)' }}
    >
      {/* <div className={`${cardColor(teamInfo.color)} w-8 md:w-10 h-full`}></div> */}

      <div className="w-2/3 md:w-4/6 p-2 md:p-3 truncate">
        <Link
          href={`${ROUTE_PROJECT_DETAIL}/${teamInfo.id}`}
          className="flex flex-col items-left h-full justify-around"
        >
          <span className="text-sm font-bold truncate">{teamInfo.name}</span>
          {/* <span className="text-xs text-gray-300 dark:text-gray-400">
            {teamInfo.membersCnt}명 참여중
          </span> */}
        </Link>
      </div>
    </div>
  )
}
