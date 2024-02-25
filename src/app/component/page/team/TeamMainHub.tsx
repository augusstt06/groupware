import TeamCard from '../../ui/card/team/TeamCard'

import { type TeamMainHubProps } from '@/app/types/ui/extra'

export default function TeamMainHub(props: TeamMainHubProps) {
  const { teamList } = props

  return (
    <div className="w-4/5 max-w-7xl flex flex-col items-center rounded-xl shadow-lg p-2 truncate bg-[#f5f7fc] dark:bg-[#1a202c]  bg-opacity-70">
      <div className="w-full p-3">
        <span className="font-bold">전체 팀</span>
      </div>
      {teamList.length !== 0 ? (
        <div className="grid xl:grid-cols-4 xl:gap-x-10 lg:grid-cols-3 lg:gap-x-10 grid-cols-2 gap-x-8 gap-y-6 p-3 ">
          {teamList.map((data) => (
            <TeamCard key={data.id} teamInfo={data} />
          ))}
        </div>
      ) : (
        <section className="rounded-xl w-full h-40 flex items-center justify-center bg-white bg-opacity-70">
          There are no teams yet.
        </section>
      )}
    </div>
  )
}
