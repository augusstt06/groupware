import { IoPeople } from 'react-icons/io5'

import { NavigationBtn } from '../button/BtnGroups'
import AttendanceBtn from '../button/attendance/AttendanceBtn'

export default function UserCard() {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <IoPeople className="w-20 h-20 rounded-full" />

        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">user name</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">user position</span>
        <div className="flex mt-4 md:mt-6">
          {/* FIXME: 두 버튼 css 통일 */}
          <AttendanceBtn />
          <NavigationBtn title="Setting" />
        </div>
      </div>
    </div>
  )
}
