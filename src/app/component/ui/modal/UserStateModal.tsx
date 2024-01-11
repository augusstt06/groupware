import { IoSettingsOutline } from 'react-icons/io5'

import LogoutBtn from '../button/login/LogoutBtn'

import { type LogoutBtnProps } from '@/app/types/ui/btnTypes'

export default function UserStateModal(props: LogoutBtnProps) {
  return (
    <div className="absolute right-4 flex flex-col items-center dark:bg-gray-700 bg-white border-2 border-gray-400 p-3 w-1/6 rounded-lg">
      <div className="flex flex-row items-center justify-start w-full">
        <div className="bg-gray-300 p-2 rounded-full">img</div>
        <div className="flex flex-col items-center ml-3">
          <span className="font-bold">권한</span>
          <span className="text-xs">소개글</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-start w-full font-bold mb-2 mt-2">
        <IoSettingsOutline className="w-5 h-5" />
        <span className="ml-3">마이페이지</span>
      </div>
      <div className="flex flex-row items-center justify-start w-full font-bold hover:text-red-500">
        <LogoutBtn
          isConfirmOpen={props.isConfirmOpen}
          setIsConfirmOpen={props.setIsConfirmOpen}
          confirmValue={props.confirmValue}
          setConfirmValue={props.setConfirmValue}
        />
        <span className="ml-3">로그아웃</span>
      </div>
    </div>
  )
}
