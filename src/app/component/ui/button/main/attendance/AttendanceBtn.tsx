import { HttpStatusCode } from 'axios'

import { KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE } from '@/app/constant/constant'
import {
  ERR_COOKIE_NOT_FOUND,
  ERR_INTERNAL_SERVER,
  errDefault,
  errDuplicate,
  errNotFound,
} from '@/app/constant/errorMsg'
import { API_URL_ATTENDANCE } from '@/app/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { modulePatchFetch, modulePostFetch } from '@/app/module/utils/moduleFetch'
import { updateAttendanceStatusReducer } from '@/app/store/reducers/main/userInfoReducer'
import { type FailResponseType, type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type AttendanceBtnProps } from '@/app/types/ui/btnTypes'

export default function AttendanceBtn(props: AttendanceBtnProps) {
  const dispatch = useAppDispatch()
  const userInfoState = useAppSelector((state) => state.userInfo)
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = userInfoState[KEY_X_ORGANIZATION_CODE]
  const isAttendance = userInfoState.attendance.status === 'in'

  const fetchPostAttendance = async () => {
    try {
      if (orgCode === ERR_COOKIE_NOT_FOUND) {
        props.setErrMsg(errNotFound('소속된 조직'))
        return
      }
      if (isAttendance) {
        props.setErrMsg(errDuplicate('출근확인'))
        return
      }

      const fetchAttendanceProps: ModulePostFetchProps = {
        data: {
          organizationId: props.extraUserInfo.organizationId,
          userId: props.extraUserInfo.userId,
        },
        fetchUrl: API_URL_ATTENDANCE,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res = await modulePostFetch<string>(fetchAttendanceProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)

      const currentTime = Math.floor(new Date().getTime() / 1000)
      dispatch(
        updateAttendanceStatusReducer({
          status: 'in',
          time: currentTime,
        }),
      )
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
      if (orgCode === ERR_COOKIE_NOT_FOUND) {
        props.setErrMsg(errNotFound('소속된 조직'))
        return
      }
      if (!isAttendance) {
        props.setErrMsg(errDuplicate('퇴근 확인'))
        return
      }
      const fetchLeaveAttendanceProps: ModulePostFetchProps = {
        data: {
          organizationId: props.extraUserInfo.organizationId,
          userId: props.extraUserInfo.userId,
        },
        fetchUrl: API_URL_ATTENDANCE,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }

      const res = await modulePatchFetch<string>(fetchLeaveAttendanceProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      dispatch(
        updateAttendanceStatusReducer({
          status: 'out',
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
