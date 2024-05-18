import { useEffect, useRef } from 'react'

import { FiLogOut } from 'react-icons/fi'
import { IoSettingsOutline } from 'react-icons/io5'

import Button from '../../button/Button'

import { API_SUCCESS_CODE, FALSE, KEY_ACCESS_TOKEN } from '@/constant/constant'
import { API_URL_LOGOUT } from '@/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleDeleteCookies, moduleGetCookie } from '@/module/utils/moduleCookie'
import { modulePostFetch } from '@/module/utils/moduleFetch'
import { resetUserInfoReducer } from '@/store/reducers/main/userInfoReducer'
import { updateLoginCompleteReducer } from '@/store/reducers/maintain/maintainReducer'
import { openSettingModalReducer } from '@/store/reducers/setting/settingModalReducer'
import { type FailResponseType, type ModulePostFetchProps } from '@/types/module'
import { type UserStateModalProps } from '@/types/ui/modal'

export default function UserStateModal(props: UserStateModalProps) {
  const { changeDialogConfirmFn, handleOpenDialog, setIsUserStateOpen } = props
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
      moduleDeleteCookies(KEY_ACCESS_TOKEN)
      dispatch(updateLoginCompleteReducer(FALSE))
      dispatch(resetUserInfoReducer())
      setIsUserStateOpen(false)
    } catch (err) {
      alert('로그아웃이 실패했습니다.')
    }
  }
  const handleClickLogout = () => {
    if (attendanceStatus.status === 'in') {
      changeDialogConfirmFn(fetchLogout)
      handleOpenDialog()
    } else {
      void fetchLogout()
    }
  }
  const logoutBtnContent = <FiLogOut className="md:w-5 md:h-5 w-4 h-4" />
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div
      ref={menuRef}
      className="absolute right-4 sort-vertical-flex bg-white dark:bg-opacity-10 backdrop-blur-lg bg-opacity-60 p-3 rounded-2xl shadow-2xl w-40 z-50"
    >
      <div className="sort-row-flex justify-start w-full">
        <div className="bg-gray-300 p-2 rounded-full">img</div>
        <div className="sort-vertical-flex ml-3">
          <span className="font-bold">권한</span>
          <span className="text-xs">소개글</span>
        </div>
      </div>
      <div className="sort-row-flex justify-start w-full font-bold text-sm mb-2 mt-4">
        <IoSettingsOutline className="w-4 h-4" />
        <span
          className="ml-3"
          onClick={() => {
            openSettingModalReducer()
          }}
        >
          My Page
        </span>
      </div>
      <div className="sort-row-flex justify-start w-full font-bold hover:text-red-500 text-sm">
        <Button buttonContent={logoutBtnContent} className="" onClick={handleClickLogout} />
        <span className="ml-3">Logout</span>
      </div>
    </div>
  )
}
