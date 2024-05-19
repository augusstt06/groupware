import ProjectInviteMemberCard from '../../../card/project/ProjectInviteMemberCard'

import { type ProjectInviteListProps } from '@/types/ui/modal'

export default function ProjectInviteList(props: ProjectInviteListProps) {
  const { inviteList } = props
  return (
    <div className="p-3 mt-2 ">
      <span className="text-sm font-bold lg:text-base">
        총 <span className="text-indigo-400">{inviteList.length}</span>명 선택
      </span>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {inviteList.map((data) => (
          <ProjectInviteMemberCard key={data.userId} user={data} />
        ))}
      </div>
    </div>
  )
}
