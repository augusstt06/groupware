import { setCookie } from 'cookies-next'

import { KEY_ACCESS_TOKEN, KEY_ATTENDANCE_TIME } from '@/app/constant/constant'
import { deleteTokens, getToken } from '@/app/module/utils/cookie'
import { modulePatchFetch, modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type AttendanceBtnProps } from '@/app/types/ui/btnTypes'

export default function AttendanceBtn(props: AttendanceBtnProps) {
  const accessToken = getToken(KEY_ACCESS_TOKEN)
  const orgCode = getToken('X-ORGANIZATION-CODE')

  const fetchPostAttendance = async () => {
    try {
      if (orgCode === undefined) {
        props.setErrMsg('소속된 조직을 확인할수 없습니다.')
        return
      }
      if (props.userInfo.attendanceStatus === 'in') {
        props.setErrMsg('이미 출근확인을 완료했습니다.')
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
          'X-ORGANIZATION-CODE': orgCode,
        },
      }

      await modulePostFetch(fetchAttendanceProps)
      const currentime = new Date().getTime()
      setCookie(KEY_ATTENDANCE_TIME, currentime)
      props.setRerender(!props.reRender)
    } catch (err) {
      props.setErrMsg('출근 확인에 실패했습니다.')
    }
  }
  const fetchLeaveWork = async () => {
    try {
      if (orgCode === undefined) {
        props.setErrMsg('소속된 조직을 확인할수 없습니다.')
        return
      }
      if (props.userInfo.attendanceStatus !== 'in') {
        props.setErrMsg('이미 퇴근확인을 완료했습니다.')
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
          'X-ORGANIZATION-CODE': orgCode,
        },
      }

      await modulePatchFetch(fetchAttendanceProps)
      deleteTokens(KEY_ATTENDANCE_TIME)
      props.setElapsed('0')
      props.setRerender(!props.reRender)
    } catch (err) {
      props.setErrMsg('퇴근 확인에 실패했습니다.')
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
