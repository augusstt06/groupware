import { HttpStatusCode } from 'axios'

import { KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE } from '@/app/constant/constant'
import {
  ERR_INTERNAL_SERVER,
  ERR_TOKEN_NOT_FOUND,
  errDefault,
  errDuplicate,
  errNotFound,
} from '@/app/constant/errorMsg'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleDecodeToken, moduleGetCookie } from '@/app/module/utils/cookie'
import { modulePatchFetch, modulePostFetch } from '@/app/module/utils/moduleFetch'
import { checkAttendanceReducer } from '@/app/store/reducers/attendanceReducer'
import { type CustomDecodeTokenType, type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type AttendanceBtnProps } from '@/app/types/ui/btnTypes'

export default function AttendanceBtn(props: AttendanceBtnProps) {
  const dispatch = useAppDispatch()
  const attendanceStatus = useAppSelector((state) => state.attendance)
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const decodeToken = moduleDecodeToken(accessToken)
  const orgCode =
    decodeToken !== ERR_TOKEN_NOT_FOUND
      ? (decodeToken as CustomDecodeTokenType)[KEY_X_ORGANIZATION_CODE]
      : ERR_TOKEN_NOT_FOUND


  const fetchPostAttendance = async () => {
    try {
      if (orgCode === ERR_TOKEN_NOT_FOUND) {
        props.setErrMsg(errNotFound('소속된 조직'))
        return
      }
      if (attendanceStatus.status) {
        props.setErrMsg(errDuplicate('출근확인'))
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
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      await modulePostFetch(fetchAttendanceProps)
      const currentime = new Date().getTime()
      dispatch(
        checkAttendanceReducer({
          status: true,
          time: currentime,
        }),
      )
      props.setRerender(!props.reRender)
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case HttpStatusCode.InternalServerError.toString():
            props.setErrMsg(ERR_INTERNAL_SERVER)
            break
          default:
            props.setErrMsg(errDefault('출근 확인'))
            break
        }
      }
    }
  }
  const fetchLeaveWork = async () => {
    try {
      if (orgCode === ERR_TOKEN_NOT_FOUND) {
        props.setErrMsg(errNotFound('소속된 조직'))
        return
      }
      if (!attendanceStatus.status) {
        props.setErrMsg(errDuplicate('퇴근 확인'))
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
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }

      const res = await modulePatchFetch(fetchAttendanceProps)
      if (!res.ok) {
        throw new Error(res.status.toString())
      }
      dispatch(
        checkAttendanceReducer({
          status: false,
          time: 0,
        }),
      )
      props.setElapsed('0')
      props.setRerender(!props.reRender)
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case HttpStatusCode.InternalServerError.toString():
            props.setErrMsg(ERR_INTERNAL_SERVER)
            break
          default:
            props.setErrMsg(errDefault('퇴근 확인'))
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
