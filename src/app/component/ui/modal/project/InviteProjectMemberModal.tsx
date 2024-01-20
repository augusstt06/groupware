import InviteProjectBtn from '../../button/project/modal/InviteProjectBtn'
import ProjectInviteCard from '../../card/project/ProjectInviteCard'
import InviteProjectModalInput from '../../input/project/modal/InviteProjectModalInput'

import ProjectInviteList from './invite/ProjectInviteList'

export default function InviteProjectMemberModal() {
  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-blur-xs"
    >
      <div className="relative rounded-lg shadow dark:bg-gray-700 border-solid border-2 border-indigo-300 bg-white w-5/6 md:w-1/2 xl:w-2/5 2xl:w-3/12">
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
        <div className="border-t-2 border-gray-300">
          <InviteProjectBtn />
        </div>
      </div>
    </div>
  )
}
