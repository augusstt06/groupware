import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md'

import { type ProjectInviteCardProps } from '@/app/types/ui/card'

export default function ProjectInviteCard(props: ProjectInviteCardProps) {
  const { userInfo, inviteList } = props
  const isUserInvite = () => {
    return inviteList.includes(userInfo)
  }

  const renderCheck = () => {
    if (isUserInvite()) {
      return (
        <MdOutlineCheckBox className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer hover:scale-110 transition duration-400 ease-in-out" />
      )
    }
    return (
      <MdCheckBoxOutlineBlank className="w-6 h-6 sm:w-8 sm:h- cursor-pointer hover:scale-110" />
    )
  }
  return (
    <div className="flex flex-row truncate items-center justify-start w-full sm:pl-5 mt-3 border-b-2 dark:border-gray-200 border-gray-200 p-2 dark:border-gray-700">
      <div className="sm:p-2">
        {/* <MdOutlineCheckBox className="w-6 h-6 sm:w-8 sm:h-8" /> */}
        {renderCheck()}
      </div>
      <div className="bg-gray-300 p-2 rounded-full sm:inline hidden">img</div>
      <div className="flex flex-col items-start lg:ml-3 w-full pl-3 lg:pl-0">
        <span className="sm:text-lg text-sm w-4/5 mb-1 text-left  ">{userInfo.name}</span>
        <div className="truncate lg:inline flex flex-col items-start ">
          <span className="2xl:text-sm text-xs lg:w-4/5 lg:mr-1">{userInfo.position}</span>
        </div>
      </div>
    </div>
  )
}
