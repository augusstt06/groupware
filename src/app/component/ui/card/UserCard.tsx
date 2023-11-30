'use client'

import { useEffect, useState } from 'react'

import ErrorAlert from '../alert/ErrorAlert'
import AttendanceBtn from '../button/attendance/AttendanceBtn'

import { KEY_ATTENDANCE, KEY_LOGIN_TIME } from '@/app/constant/constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/cookie'
import { type UserCardProps } from '@/app/types/pageTypes'

export default function UserCard(props: UserCardProps) {
  const [elapsed, setElapsed] = useState('0')
  const attendanceState = useAppSelector((state) => state.userInfo[KEY_ATTENDANCE])
  const isAttendance = attendanceState.status === 'in'
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
  const timeString =
    moduleGetCookie(KEY_LOGIN_TIME) !== null
      ? moduleGetCookie(KEY_LOGIN_TIME)
      : 'Fail to load Login time'

  const tailwindClassName = isAttendance ? 'text-blue-400 font-bold' : 'text-red-400 font-bold'
  const tailwindAttendanceTimeClassName =
    elapsed !== '0' ? 'text-blue-400 font-bold' : 'text-red-400 font-bold'

  useEffect(() => {
    setMount(true)
    const updateElapsed = () => {
      if (attendanceState.time !== null && attendanceState.time !== 0) {
        const now = new Date().getTime()
        const timeElapsed = Math.floor((now - attendanceState.time) / (1000 * 60))
        setElapsed(timeElapsed.toString())
      }
    }
    updateElapsed()
    const intervalId = setInterval(updateElapsed, 1000 * 60)
    return () => {
      clearInterval(intervalId)
    }
  }, [attendanceState])

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {mount ? (
        <>
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-4">
            <div className="flex flex-row items-center justify-start w-4/5">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white mr-2">
                {extraUserInfo.position}
              </h5>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white mr-2">
                {extraUserInfo.name}
              </h5>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 w-4/5 mb-1">
              Login at {timeString}
            </span>
            <div className="flex flex-start justify-between w-4/5">
              <span className="text-medium text-gray-500 dark:text-gray-400">업무 상태</span>
              <span className={`${tailwindClassName}`}>
                {isAttendance ? '업무 중' : '업무 종료'}{' '}
              </span>
            </div>
            <div className="flex flex-start justify-between items-center w-4/5">
              <span className="text-medium text-gray-500 dark:text-gray-400">업무 시간</span>
              <span className={tailwindAttendanceTimeClassName}>{elapsed}분 </span>
            </div>
            <div className="flex flex-row justify-around mt-4 md:mt-6 w-4/5">
              <div className="w-full">
                <AttendanceBtn
                  extraUserInfo={extraUserInfo}
                  setErrMsg={setErrMsg}
                  reRender={props.reRender}
                  setRerender={props.setRerender}
                  elapsed={elapsed}
                  setElapsed={setElapsed}
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
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
