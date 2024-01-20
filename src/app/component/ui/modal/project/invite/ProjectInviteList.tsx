import ProjectInviteMemberCard from '../../../card/project/ProjectInviteMemberCard'

export default function ProjectInviteList() {
  return (
    <div className="mt-2 p-3 ">
      <span className="font-bold text-sm lg:text-base">
        총 <span className="text-indigo-400">4</span>명 선택
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <ProjectInviteMemberCard />
      </div>
    </div>
  )
}
