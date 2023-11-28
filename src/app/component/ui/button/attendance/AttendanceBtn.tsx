import { HttpStatusCode } from 'axios'
import { setCookie } from 'cookies-next'

import {
  KEY_ACCESS_TOKEN,
  KEY_ATTENDANCE_TIME,
  KEY_X_ORGANIZATION_CODE,
} from '@/app/constant/constant'
import {
  ERR_500,
  ERR_COOKIE_NOT_FOUND,
  ERR_DEFAULT,
  ERR_DUPLICATE,
  ERR_NOT_FOUND,
} from '@/app/constant/errorMsg'
import { moduleDeleteCookies, moduleGetCookie } from '@/app/module/utils/cookie'
import { modulePatchFetch, modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type AttendanceBtnProps } from '@/app/types/ui/btnTypes'

export default function AttendanceBtn(props: AttendanceBtnProps) {
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = moduleGetCookie(KEY_X_ORGANIZATION_CODE)

  const fetchPostAttendance = async () => {
    try {
      if (orgCode === ERR_COOKIE_NOT_FOUND) {
        props.setErrMsg(ERR_NOT_FOUND('소속된 조직'))
        return
      }
      if (props.userInfo.attendanceStatus === 'in') {
        props.setErrMsg(ERR_DUPLICATE('출근확인'))
        return
      }

      const fetchAttendanceProps: ModulePostFetchProps = {
        data: {
          organizationId: props.userInfo.organizationId,
          userId: props.userInfo.userId,
        },
        fetchUrl: process.env.NEXT_PUBLIC_ATTENDANCES_SOURCE,
        header: {
          Authorization: `Bearer ${accessToken}`,
          KEY_X_ORGANIZATION_CODE: orgCode,
        },
      }

      const res = await modulePostFetch(fetchAttendanceProps)
      if (!res.ok) {
        throw new Error(res.status.toString())
      }
      const currentime = new Date().getTime()
      setCookie(KEY_ATTENDANCE_TIME, currentime)
      props.setRerender(!props.reRender)
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case HttpStatusCode.InternalServerError.toString():
            props.setErrMsg(ERR_500)
            break
          default:
            props.setErrMsg(ERR_DEFAULT('출근 확인'))
            break
        }
      }
    }
  }
  const fetchLeaveWork = async () => {
    try {
      if (orgCode === ERR_COOKIE_NOT_FOUND) {
        props.setErrMsg(ERR_NOT_FOUND('소속된 조직'))
        return
      }
      if (props.userInfo.attendanceStatus !== 'in') {
        props.setErrMsg(ERR_DUPLICATE('퇴근 확인'))
        return
      }
      const fetchAttendanceProps: ModulePostFetchProps = {
        data: {
          organizationId: props.userInfo.organizationId,
          userId: props.userInfo.userId,
        },
        fetchUrl: process.env.NEXT_PUBLIC_ATTENDANCES_SOURCE,
        header: {
          Authorization: `Bearer ${accessToken}`,
          KEY_X_ORGANIZATION_CODE: orgCode,
        },
      }

      const res = await modulePatchFetch(fetchAttendanceProps)
      if (!res.ok) {
        throw new Error(res.status.toString())
      }
      moduleDeleteCookies(KEY_ATTENDANCE_TIME)
      props.setElapsed('0')
      props.setRerender(!props.reRender)
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case HttpStatusCode.InternalServerError.toString():
            props.setErrMsg(ERR_500)
            break
          default:
            props.setErrMsg(ERR_DEFAULT('퇴근 확인'))
            break
        }
      }
    }
  }

  return (
    <div className="flex flex-row justify-between items-center w-full">
      <button
        className="w-2/5 justify-center text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white bg-white border-indigo-500 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
        onClick={() => {
          void fetchPostAttendance()
        }}
      >
        출근
      </button>
      <button
        className="w-2/5 justify-center text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white bg-white border-indigo-500 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
        onClick={() => {
          void fetchLeaveWork()
        }}
      >
        퇴근
      </button>
    </div>
  )
}
