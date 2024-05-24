import { MdOutlineEmail } from 'react-icons/md'
import { TbUsersGroup } from 'react-icons/tb'

import { type TeamMemberCardProps } from '@/_types/ui/card'

export default function TeamMemberCard(props: TeamMemberCardProps) {
  const { email, name, position } = props.memberInfo
  return (
    <div className="flex flex-col items-center justify-around h-20 p-2 text-gray-600 bg-indigo-200 rounded-lg shadow-lg cursor-pointer w-70 hover:scale-110 transition ease-in-out duration-500">
      <div className="flex items-center justify-around w-full">
        <span className="text-lg font-bold ">{name}</span>
        <div className="flex flex-col items-left ">
          <div className="flex items-center justify-around ">
            <TbUsersGroup />
            <span className="text-xs">{position}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-around ">
        <MdOutlineEmail />
        <span className="text-xs">{email}</span>
      </div>
    </div>
  )
}
