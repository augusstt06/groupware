'use client'

import { useEffect, useState } from 'react'

import ErrorAlert from '../../alert/ErrorAlert'
import Button from '../../button/Button'
import Progressbar from '../../progressbar/Progressbar'

import {
  API_SUCCESS_CODE,
  KEY_ACCESS_TOKEN,
  KEY_ATTENDANCE,
  KEY_X_ORGANIZATION_CODE,
} from '@/app/constant/constant'
import {
  ERR_COOKIE_NOT_FOUND,
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
import { type HistoryCardProps } from '@/app/types/ui/cardTypes'

export default function HistoryCard(props: HistoryCardProps) {
  const dispatch = useAppDispatch()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const [elapsed, setElapsed] = useState('0')
  const [convertTime, setConvertTime] = useState('0')
  const attendanceState = useAppSelector((state) => state.userInfo[KEY_ATTENDANCE])
  const isAttendance = attendanceState.status === 'in'
  const userInfoState = useAppSelector((state) => state.userInfo)
  const orgCode = userInfoState[KEY_X_ORGANIZATION_CODE]
  const extraUserInfo = useAppSelector((state) => state.userInfo.extraInfo)
  const [mount, setMount] = useState(false)

  const [errorState, setErrorState] = useState({
    isError: false,
    description: '',
  })
  const setErrMsg = (errDescripton: string) => {
    setErrorState({
      isError: true,
      description: errDescripton,
    })
  }

  const handleClickError = () => {
    setErrorState({
      isError: !errorState.isError,
      description: errorState.description,
    })
  }

  const viewCurrentDate = () => {
    const currentDate = new Date()
    const month = new Intl.DateTimeFormat('ko-KR', { month: 'long' }).format(currentDate)
    const day = currentDate.getDate()
    const dayOfWeek = new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(currentDate)
    const result = `${month} ${day}일 ${dayOfWeek}`
    return result
  }

  // FIXME: 이거 dialog로 변경하기 에러
  const fetchPostAttendance = async () => {
    try {
      const fetchProps: ModulePostFetchProps = {
        data: {
          organizationId: extraUserInfo.organizationId,
          userId: extraUserInfo.userId,
        },
        fetchUrl: API_URL_ATTENDANCE,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res = await modulePostFetch<string>(fetchProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)

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
          default:
            setErrMsg(errDefault('출근 확인'))
            break
        }
      }
    }
  }

  const fetchLeaveWork = async () => {
    try {
      const fetchLeaveAttendanceProps: ModulePostFetchProps = {
        data: {
          organizationId: extraUserInfo.organizationId,
          userId: extraUserInfo.userId,
        },
        fetchUrl: API_URL_ATTENDANCE,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }

      const res = await modulePatchFetch<string>(fetchLeaveAttendanceProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      dispatch(
        updateAttendanceStatusReducer({
          status: 'out',
          time: 0,
        }),
      )
      setElapsed('0')
      props.setRerender(!props.reRender)
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          default:
            setErrMsg(errDefault('퇴근 확인'))
            break
        }
      }
    }
  }

  const handleClickAttendance = () => {
    if (orgCode === ERR_COOKIE_NOT_FOUND) {
      setErrMsg(errNotFound('소속된 조직'))
      return
    }
    if (isAttendance) {
      setErrMsg(errDuplicate('출근확인'))
      return
    }

    void fetchPostAttendance()
  }
  const handleClickLeave = () => {
    if (orgCode === ERR_COOKIE_NOT_FOUND) {
      setErrMsg(errNotFound('소속된 조직'))
      return
    }
    if (!isAttendance) {
      setErrMsg(errDuplicate('퇴근 확인'))
      return
    }
    void fetchLeaveWork()
  }
  const tailwindClassName = isAttendance
    ? 'text-blue-400 font-bold text-xs md:text-sm'
    : 'text-red-400 font-bold text-xs md:text-sm '

  const getElapsedTime = (attendanceTime: number) => {
    const now = Math.floor(new Date().getTime() / 1000)
    const elapsedTime = now - attendanceTime
    return elapsedTime / 60
  }
  useEffect(() => {
    setMount(true)
    const updateElapsed = () => {
      if (attendanceState.time !== null && attendanceState.time !== 0) {
        const elapsedTime = getElapsedTime(attendanceState.time)
        setElapsed(elapsedTime.toString())
        setConvertTime(Math.floor(elapsedTime / 45).toString())
      }
    }
    updateElapsed()

    const intervalId = setInterval(updateElapsed, 1000 * 60)

    if (!isAttendance) setConvertTime('0')
    return () => {
      clearInterval(intervalId)
    }
  }, [attendanceState, elapsed])

  return (
    <div className="w-full max-w-sm border-2 border-[#7f8bb1] bg-[#f5f7fc] rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 mb-5">
      {mount ? (
        <>
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-4">
            <span className="md:text-sm text-xs text-gray-500 dark:text-white w-4/5 mb-1">
              {viewCurrentDate()}
            </span>
            <div className="flex flex-start justify-between w-4/5">
              <span className="md:text-sm text-xs text-gray-500 dark:text-gray-400">업무 상태</span>
              <span className={`${tailwindClassName}`}>
                {isAttendance ? '업무 중' : '업무 종료'}{' '}
              </span>
            </div>
            <div className="flex flex-start justify-between items-center w-4/5">
              <span className="md:text-sm text-xs text-gray-500 dark:text-gray-400">업무 시간</span>
              <Progressbar time={convertTime} />
            </div>
            <div className="flex flex-row justify-around mt-4 md:mt-6 w-4/5">
              <div className="flex flex-row justify-between items-center w-full">
                <Button
                  buttonContent="출근"
                  className="w-2/5 transition duration-500 ease-in-out justify-center text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white bg-white border-indigo-500 hover:bg-indigo-400 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
                  onClick={handleClickAttendance}
                />
                <Button
                  buttonContent="퇴근"
                  className="w-2/5 transition duration-500 ease-in-out justify-center text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white bg-white border-indigo-500 hover:bg-indigo-400 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
                  onClick={handleClickLeave}
                />
              </div>
            </div>
            {errorState.isError ? (
              <ErrorAlert
                description={errorState.description}
                handleClickError={handleClickError}
              />
            ) : (
              <></>
            )}
            <div className="flex justify-end px-4 pt-4"></div>
            <span className="md:text-base text-sm text-gray-500 dark:text-white w-4/5 mb-1">
              출퇴근
            </span>
            <div className="flex flex-start justify-between w-4/5">
              <span className="md:text-sm text-xs text-gray-500 dark:text-gray-400">정규 근무</span>
              <span className="md:text-sm text-xs text-white-400 font-bold">근무시간</span>
            </div>
            <div className="flex flex-start justify-between w-4/5">
              <span className="md:text-sm text-xs  text-sm text-gray-500 dark:text-gray-400">
                초과 근무
              </span>
              <span className="md:text-sm text-xs text-white-400 font-bold">근무시간</span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
