import { IoClose } from 'react-icons/io5'

import { type ProjectInviteMemberCardProps } from '@/types/ui/modal'

export default function ProjectInviteMemberCard(props: ProjectInviteMemberCardProps) {
  const { user } = props
  return (
    <div className="flex flex-row items-center justify-between w-full p-2 truncate bg-indigo-200 rounded-lg cursor-pointer transition duration-600 ease-in-out hover:scale-110">
      <span className="text-xs lg:text-sm ">{user.name}</span>
      <IoClose className="w-4 h-4" />
    </div>
  )
}
