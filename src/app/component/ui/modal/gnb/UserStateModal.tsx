import { useEffect, useRef } from 'react'

import { CiLogout } from 'react-icons/ci'
import { IoSettingsOutline } from 'react-icons/io5'

import Button from '../../button/Button'

import { API_SUCCESS_CODE, FALSE, KEY_ACCESS_TOKEN } from '@/app/constant/constant'
import { API_URL_LOGOUT } from '@/app/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleDeleteCookies, moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { resetUserInfoReducer } from '@/app/store/reducers/main/userInfoReducer'
import { updateLoginCompleteReducer } from '@/app/store/reducers/maintain/maintainReducer'
import { type FailResponseType, type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type UserStateModalProps } from '@/app/types/ui/btnTypes'

export default function UserStateModal(props: UserStateModalProps) {
  const dispatch = useAppDispatch()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const attendanceStatus = useAppSelector((state) => state.userInfo.attendance)
  const menuRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current !== null && !menuRef.current.contains(e.target as Node)) {
      props.setIsUserStateOpen(false)
    }
  }
  const fetchLogout = async () => {
    try {
      const fetchProps: ModulePostFetchProps = {
        data: {},
        fetchUrl: API_URL_LOGOUT,
        header: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const res = await modulePostFetch<string>(fetchProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      props.setConfirmValue(false)
      moduleDeleteCookies(KEY_ACCESS_TOKEN)
      dispatch(updateLoginCompleteReducer(FALSE))
      dispatch(resetUserInfoReducer())
      props.setIsUserStateOpen(false)
    } catch (err) {
      alert('로그아웃이 실패했습니다.')
    }
  }
  const handleClickLogout = () => {
    if (attendanceStatus.status === 'in') {
      props.setIsConfirmOpen(true)
    } else {
      void fetchLogout()
    }
  }
  const logoutBtnContent = <CiLogout className="md:w-5 md:h-5 w-4 h-4" />
  useEffect(() => {
    if (props.confirmValue) {
      void fetchLogout()
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [props.confirmValue])
  return (
    <div
      ref={menuRef}
      className="absolute right-4 flex flex-col items-center dark:bg-gray-700 bg-white border-2 border-gray-400 p-3 w-1/6 rounded-lg"
    >
      <div className="flex flex-row items-center justify-start w-full">
        <div className="bg-gray-300 p-2 rounded-full">img</div>
        <div className="flex flex-col items-center ml-3">
          <span className="font-bold">권한</span>
          <span className="text-xs">소개글</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-start w-full font-bold text-sm mb-2 mt-4">
        <IoSettingsOutline className="w-4 h-4" />
        <span className="ml-3">마이페이지</span>
      </div>
      {/* <div className="flex flex-row items-center justify-start w-full font-bold text-sm mb-2">
        <IoSettingsOutline className="w-4 h-4" />
        <span className="ml-3">관리자페이지</span>
      </div> */}
      <div className="flex flex-row items-center justify-start w-full font-bold hover:text-red-500 text-sm">
        <Button buttonContent={logoutBtnContent} className="" onClick={handleClickLogout} />
        <span className="ml-3">로그아웃</span>
      </div>
    </div>
  )
}
