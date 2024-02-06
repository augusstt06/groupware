import ProjectInviteMemberCard from '../../../card/project/ProjectInviteMemberCard'

import { type ProjectInviteListProps } from '@/app/types/ui/modalTypes'

export default function ProjectInviteList(props: ProjectInviteListProps) {
  const { inviteList } = props
  return (
    <div className="mt-2 p-3 ">
      <span className="font-bold text-sm lg:text-base">
        총 <span className="text-indigo-400">{inviteList.length}</span>명 선택
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        {inviteList.map((data) => (
          <ProjectInviteMemberCard key={data.userId} user={data} />
        ))}
      </div>
    </div>
  )
}
