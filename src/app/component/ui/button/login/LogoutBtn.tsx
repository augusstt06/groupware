import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { FaPowerOff } from 'react-icons/fa'

import { KEY_ACCESS_TOKEN, KEY_LOGIN, KEY_ORGANIZATION } from '@/app/constant/constant'
import { ROUTE_LOGIN } from '@/app/constant/route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleDeleteCookies, moduleGetCookie } from '@/app/module/utils/cookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { resetReducer } from '@/app/store/reducers/login/loginInfoReducer'
import {
  type FailResponseType,
  type FetchResponseType,
  type ModulePostFetchProps,
} from '@/app/types/moduleTypes'
import { type LogoutBtnProps } from '@/app/types/ui/btnTypes'

export default function LogoutBtn(props: LogoutBtnProps) {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const attendanceStatus = useAppSelector((state) => state.userInfo.attendance)

  const fetchLogoutProps: ModulePostFetchProps = {
    data: {},
    fetchUrl: process.env.NEXT_PUBLIC_LOGOUT_SOURCE,
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const fetchLogout = async () => {
    try {
      const res = await modulePostFetch<FetchResponseType<string>>(fetchLogoutProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      dispatch(resetReducer())
      moduleDeleteCookies(KEY_ACCESS_TOKEN, KEY_LOGIN, KEY_ORGANIZATION)
      props.setConfirmValue(false)
      router.push(ROUTE_LOGIN)
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
        <FaPowerOff className="md:w-5 md:h-5 w-4 h-4" />
      </button>
    </>
  )
}
