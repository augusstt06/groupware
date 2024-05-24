import { IoClose } from 'react-icons/io5'

import { type ProjectInviteMemberCardProps } from '@/_types/ui/modal'

export default function ProjectInviteMemberCard(props: ProjectInviteMemberCardProps) {
  const { user } = props
  return (
    <div className="justify-between w-full p-2 truncate transition ease-in-out bg-indigo-200 rounded-lg cursor-pointer sort-row-flex duration-600 hover:scale-110">
      <span className="text-xs lg:text-sm ">{user.name}</span>
      <IoClose className="w-4 h-4" />
    </div>
  )
}
