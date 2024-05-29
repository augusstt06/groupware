import { IoClose } from 'react-icons/io5'

import { type ProjectInviteMemberCardProps } from '@/types/ui/modal'

export default function ProjectInviteMemberCard(props: ProjectInviteMemberCardProps) {
  const { user, handleInviteUser } = props
  return (
    <div className="justify-between w-full p-2 text-white truncate bg-indigo-400 rounded-lg cursor-pointer sort-row-flex smooth-transition hover:scale-110">
      <span className="text-xs lg:text-sm ">{user.name}</span>
      <IoClose
        className="w-4 h-4"
        onClick={() => {
          handleInviteUser(user)
        }}
      />
    </div>
  )
}
