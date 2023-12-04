import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE } from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleDeleteCookies, moduleGetCookie } from '@/app/module/utils/cookie'
import { modulePatchFetch, modulePostFetch } from '@/app/module/utils/moduleFetch'
import { resetReducer } from '@/app/store/reducers/login/loginInfoReducer'
import { resetOrgReducer } from '@/app/store/reducers/login/orgInfoReducer'
import { updateAttendanceStatusReducer } from '@/app/store/reducers/main/userInfoReducer'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type LogoutBtnProps } from '@/app/types/ui/btnTypes'

export default function LogoutBtn(props: LogoutBtnProps) {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const attendanceStatus = useAppSelector((state) => state.userInfo.attendance)
  const userInfo = useAppSelector((state) => state.userInfo)
  const orgCode = userInfo['X-ORGANIZATION-CODE']
  const isAttendance = userInfo.attendance.status === 'in'

  const fetchLogoutProps: ModulePostFetchProps = {
    data: {},
    fetchUrl: process.env.NEXT_PUBLIC_LOGOUT_SOURCE,
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const fetchLeaveWork = async () => {
    try {
      if (orgCode === ERR_COOKIE_NOT_FOUND) return
      if (!isAttendance) return

      const fetchAttendanceProps: ModulePostFetchProps = {
        data: {
          organizationId: userInfo.extraInfo.organizationId,
          userId: userInfo.extraInfo.userId,
        },
        fetchUrl: process.env.NEXT_PUBLIC_ATTENDANCES_SOURCE,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res = await modulePatchFetch(fetchAttendanceProps)
      if (!res.ok) {
        throw new Error(res.status.toString())
      }
      dispatch(
        updateAttendanceStatusReducer({
          status: 'out',
          time: 0,
        }),
      )
      dispatch(resetOrgReducer())
    } catch (err) {}
  }
  const fetchLogout = async () => {
    try {
      await modulePostFetch(fetchLogoutProps)
      dispatch(resetReducer())
      moduleDeleteCookies(KEY_ACCESS_TOKEN)
      router.push('/')
    } catch (err) {
      alert('로그아웃이 실패했습니다.')
    }
  }

  const handleClick = () => {
    if (attendanceStatus.status === 'in') {
      props.handleOpenConfirm()
      //  FIXME: 클릭값을 기다리지 않고 바로 로그아웃됨
      if (props.confirmValue) void fetchLeaveWork()
    }
    void fetchLogout()
  }
  useEffect(() => {}, [props.isConfirmOpen])
  return (
    <>
      <button
        type="button"
        className="text-gray-800 dark:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5  focus:outline-none dark:focus:ring-gray-800"
        onClick={handleClick}
      >
        Logout
      </button>
    </>
  )
}
