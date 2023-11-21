import { IoPeople } from 'react-icons/io5'

import { NavigationBtn } from '../button/BtnGroups'
import AttendanceBtn from '../button/attendance/AttendanceBtn'

import convertTime from '@/app/module/utils/convertTime'

export default function UserCard(props: {
  userInfo: { name: string; position: string; id: number }
  decode: { uuid: string; iss: string; iat: number; exp: number }
}) {
  const timeStamp = convertTime(props.decode.iat)
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <IoPeople className="w-20 h-20 rounded-full" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {props.userInfo.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{props.userInfo.position}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Login at : {timeStamp}</span>
        <div className="flex flex-row justify-around mt-4 md:mt-6 w-2/4">
          <div className="px-10">
            <AttendanceBtn userId={props.userInfo.id} />
          </div>
          <div className="px-10">
            <NavigationBtn title="Setting" />
          </div>
        </div>
      </div>
    </div>
  )
}
