import { MdOutlineEmail } from 'react-icons/md'
import { TbUsersGroup } from 'react-icons/tb'

import { type TeamMemberCardProps } from '@/app/types/ui/card'

export default function TeamMemberCard(props: TeamMemberCardProps) {
  const { email, name, position } = props.memberInfo
  return (
    <div className="bg-indigo-200 cursor-pointer p-2 rounded-lg flex flex-col items-center justify-around w-70 h-20 shadow-lg hover:scale-110 transition ease-in-out duration-500 text-gray-600">
      <div className="flex items-center justify-around w-full">
        <span className="font-bold text-lg ">{name}</span>
        <div className="flex flex-col items-left ">
          <div className="flex items-center  justify-around">
            <TbUsersGroup />
            <span className="text-xs">{position}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center  justify-around ">
        <MdOutlineEmail />
        <span className="text-xs">{email}</span>
      </div>
    </div>
  )
}
