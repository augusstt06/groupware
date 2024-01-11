import { useEffect } from 'react'

import { CiLogout } from 'react-icons/ci'

import { FALSE, KEY_ACCESS_TOKEN } from '@/app/constant/constant'
import { API_URL_LOGOUT } from '@/app/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleDeleteCookies, moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { updateLoginCompleteReducer } from '@/app/store/reducers/maintain/maintainReducer'
import { type FailResponseType, type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type LogoutBtnProps } from '@/app/types/ui/btnTypes'

export default function LogoutBtn(props: LogoutBtnProps) {
  const dispatch = useAppDispatch()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const attendanceStatus = useAppSelector((state) => state.userInfo.attendance)

  const fetchLogoutProps: ModulePostFetchProps = {
    data: {},
    fetchUrl: API_URL_LOGOUT,
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const fetchLogout = async () => {
    try {
      const res = await modulePostFetch<string>(fetchLogoutProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      props.setConfirmValue(false)
      moduleDeleteCookies(KEY_ACCESS_TOKEN)
      dispatch(updateLoginCompleteReducer(FALSE))
      props.setIsUserStateOpen(false)
    } catch (err) {
      alert('로그아웃이 실패했습니다.')
    }
  }

  const handleClick = () => {
    if (attendanceStatus.status === 'in') {
      props.setIsConfirmOpen(true)
    } else {
      void fetchLogout()
    }
  }
  useEffect(() => {
    if (props.confirmValue) {
      void fetchLogout()
    }
  }, [props.confirmValue])
  return (
    <>
      <button type="button" onClick={handleClick}>
        <CiLogout className="md:w-5 md:h-5 w-4 h-4" />
      </button>
    </>
  )
}
