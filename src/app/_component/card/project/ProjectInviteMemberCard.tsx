import { IoClose } from 'react-icons/io5'

import { type ProjectInviteMemberCardProps } from '@/types/ui/modal'

export default function ProjectInviteMemberCard(props: ProjectInviteMemberCardProps) {
  const { user } = props
  return (
    <div className="cursor-pointer truncate flex flex-row items-center bg-indigo-200 rounded-lg p-2 justify-between w-full transition duration-600 ease-in-out hover:scale-110">
      <span className="lg:text-sm text-xs ">{user.name}</span>
      <IoClose className="w-4 h-4" />
    </div>
  )
}
