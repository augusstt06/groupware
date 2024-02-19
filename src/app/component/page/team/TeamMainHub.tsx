import TeamCard from '../../ui/card/team/TeamCard'

import { type TeamMainHubProps } from '@/app/types/ui/extra'

export default function TeamMainHub(props: TeamMainHubProps) {
  const { teamList } = props

  return (
    <div className="w-full max-w-7xl flex flex-col items-center border-2 border-[#7f8bb1] bg-[#f5f7fc] dark:bg-[#1a202c] dark:border-gray-700 border border-gray-200 rounded-lg shadow-lg p-2 truncate">
      <div className="w-full p-3">
        <span className="font-bold">전체 팀</span>
      </div>
      <div className="grid xl:grid-cols-4 xl:gap-x-10 lg:grid-cols-3 lg:gap-x-10 grid-cols-2 gap-x-8 gap-y-6 p-3 ">
        {teamList.map((data) => (
          <TeamCard key={data.id} teamInfo={data} />
        ))}
      </div>
    </div>
  )
}
