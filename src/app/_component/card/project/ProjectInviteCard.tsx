import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md'

import { type ProjectInviteCardProps } from '@/types/ui/card'

export default function ProjectInviteCard(props: ProjectInviteCardProps) {
  const { userInfo, inviteList } = props
  const isUserInvite = (): boolean => {
    return inviteList.includes(userInfo)
  }

  const renderCheck = () => {
    if (isUserInvite()) {
      return (
        <MdOutlineCheckBox className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 hover:scale-110 transition duration-400 ease-in-out" />
      )
    }
    return (
      <MdCheckBoxOutlineBlank className="w-6 h-6 cursor-pointer sm:w-8 sm:h- hover:scale-110" />
    )
  }
  return (
    <div className="flex flex-row items-center justify-start w-full p-2 mt-3 truncate border-b-2 border-gray-200 sm:pl-5 dark:border-gray-200 dark:border-gray-700">
      <div className="sm:p-2">
        {/* <MdOutlineCheckBox className="w-6 h-6 sm:w-8 sm:h-8" /> */}
        {renderCheck()}
      </div>
      <div className="hidden p-2 bg-gray-300 rounded-full sm:inline">img</div>
      <div className="flex flex-col items-start w-full pl-3 lg:ml-3 lg:pl-0">
        <span className="w-4/5 mb-1 text-sm text-left sm:text-lg ">{userInfo.name}</span>
        <div className="flex flex-col items-start truncate lg:inline ">
          <span className="text-xs 2xl:text-sm lg:w-4/5 lg:mr-1">{userInfo.position}</span>
        </div>
      </div>
    </div>
  )
}
