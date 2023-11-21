import { useState } from 'react'

import { IoPeople } from 'react-icons/io5'
import { MdWork, MdWorkOff } from 'react-icons/md'

import { NavigationBtn } from '../button/BtnGroups'
import AttendanceBtn from '../button/attendance/AttendanceBtn'

import convertTime from '@/app/module/utils/convertTime'
import { type UserCardProps } from '@/app/types/pageTypes'

export default function UserCard(props: UserCardProps) {
  // FIXME: 출퇴근 상태값은 서버에서 받아와서 유지하기
  const [isAttendance, setIsAttendance] = useState(false)
  const timeStamp = convertTime(props.decode.iat)
  const additionalInfo = ['조직이름', '팀이름', props.userInfo.position]
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <IoPeople className="w-20 h-20 rounded-full" />
        <div className="flex flex-row items-center justify-center w-3/5">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white mr-2">
            {props.userInfo.name}
          </h5>
          {isAttendance ? <MdWork /> : <MdWorkOff />}
        </div>
        {additionalInfo.map((data) => (
          <span className="text-sm text-gray-500 dark:text-gray-400" key={data}>
            {data}
          </span>
        ))}
        <span className="text-sm text-gray-500 dark:text-gray-400">Login at : {timeStamp}</span>
        <div className="flex flex-row justify-around mt-4 md:mt-6 w-2/4">
          <div className="px-10">
            <AttendanceBtn
              userId={props.userInfo.userId}
              isAttendance={isAttendance}
              setIsAttendance={setIsAttendance}
            />
          </div>
          <div className="px-10">
            <NavigationBtn title="Setting" />
          </div>
        </div>
      </div>
    </div>
  )
}
