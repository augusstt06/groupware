import { useState } from 'react'

import AttendanceBtn from '../button/attendance/AttendanceBtn'

import convertTime from '@/app/module/utils/convertTime'
import { type UserCardProps } from '@/app/types/pageTypes'

export default function UserCard(props: UserCardProps) {
  // FIXME: 출퇴근 상태값은 서버에서 받아와서 유지하기
  const [isAttendance, setIsAttendance] = useState(false)
  const timeStamp = convertTime(props.decode.iat)
  const tailwindClassName = isAttendance ? 'text-blue-400 font-bold' : 'text-red-400 font-bold'
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-4">
        <div className="flex flex-row items-center justify-start w-4/5">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white mr-2">
            {props.userInfo.position}
          </h5>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white mr-2">
            {props.userInfo.name}
          </h5>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 w-4/5 mb-1">
          Login at : {timeStamp}
        </span>
        <div className="flex flex-start justify-between w-4/5">
          <span className="text-medium text-gray-500 dark:text-gray-400">업무 상태</span>
          <span className={`${tailwindClassName}`}>{isAttendance ? '업무중' : '퇴근'} </span>
        </div>
        <div className="flex flex-start justify-between items-center w-4/5">
          <span className="text-medium text-gray-500 dark:text-gray-400">업무 시간</span>
          <div className="w-2/3 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-indigo-400 h-2.5 rounded-full w-4/5"></div>
          </div>
        </div>
        <div className="flex flex-row justify-around mt-4 md:mt-6 w-4/5">
          <div className="w-full">
            <AttendanceBtn
              userId={props.userInfo.userId}
              isAttendance={isAttendance}
              setIsAttendance={setIsAttendance}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
