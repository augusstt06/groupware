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
        <MdOutlineCheckBox className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 hover:scale-110 smooth-transition" />
      )
    }
    return (
      <MdCheckBoxOutlineBlank className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 hover:scale-110" />
    )
  }
  return (
    <div
      className={`smooth-transition justify-start p-2 mt-3 truncate border-2 border-indigo-400 rounded-lg cursor-pointer w-60 sort-row-flex sm:pl-5 ${
        isUserInvite() ? 'bg-gray-500 dark:bg-gray-7s00' : ''
      }`}
    >
      <div className="sm:p-2">{renderCheck()}</div>
      <div
        className={`hidden p-2 bg-gray-300 rounded-full sm:inline ${
          isUserInvite() ? 'bg-gray-600' : ''
        }`}
      >
        img
      </div>
      <div className="flex flex-col items-start w-full pl-3 lg:ml-3 lg:pl-0">
        <span className="mb-1 text-sm text-left sm:text-lg ">{userInfo.name}</span>
        <div className="flex flex-col items-start truncate lg:inline ">
          <span className="text-xs 2xl:text-sm lg:w-4/5 lg:mr-1">{userInfo.position}</span>
        </div>
      </div>
    </div>
  )
}
