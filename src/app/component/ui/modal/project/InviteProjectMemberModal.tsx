import ProjectInviteCard from '../../card/project/ProjectInviteCard'
import InviteProjectModalInput from '../../input/project/modal/InviteProjectModalInput'

import ProjectInviteList from './invite/ProjectInviteList'

export default function InviteProjectMemberModal() {
  return (
    <>
      <div className="mt-2 p-4 border-b-2 border-gray-300">
        <span className="font-bold">초대하기</span>
      </div>
      <div className="flex flex-row justify-between h-full">
        <div className="flex flex-col items-center w-3/5 border-r-2 border-gray-300">
          <InviteProjectModalInput />
          <ProjectInviteCard />
        </div>
        <div className="w-2/5">
          <ProjectInviteList />
        </div>
      </div>
    </>
  )
}
