'use client'

import { useEffect, useState } from 'react'

import ErrorAlert from '../alert/ErrorAlert'
import AttendanceBtn from '../button/attendance/AttendanceBtn'

import { KEY_ATTENDANCE_TIME, KEY_LOGIN_TIME } from '@/app/constant/constant'
import { getToken } from '@/app/module/utils/cookie'
import { type UserCardProps } from '@/app/types/pageTypes'

export default function UserCard(props: UserCardProps) {
  const [elapsed, setElapsed] = useState('0')
  const attendanceTime = getToken(KEY_ATTENDANCE_TIME)
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
  // FIXME:
  const timeString =
    getToken(KEY_LOGIN_TIME) !== null
      ? (getToken(KEY_LOGIN_TIME) as string)
      : 'Fail to load Login time'
  const convertTime = (time: string) => {
    const dateStringWithoutGMT = time.slice(0, -4)
    const timePart = dateStringWithoutGMT.slice(0, -3)

    return timePart
  }

  const tailwindClassName =
    props.userInfo.attendanceStatus === 'in' ? 'text-blue-400 font-bold' : 'text-red-400 font-bold'
  const tailwindAttendanceTimeClassName =
    elapsed !== '0' ? 'text-blue-400 font-bold' : 'text-red-400 font-bold'

  useEffect(() => {
    setMount(true)
    const updateElapsed = () => {
      if (attendanceTime !== null && attendanceTime !== '0') {
        const now = new Date().getTime()
        const timeElapsed = Math.floor((now - parseInt(attendanceTime)) / (1000 * 60))
        setElapsed(timeElapsed.toString())
      }
    }
    updateElapsed()
    const intervalId = setInterval(updateElapsed, 1000 * 60)
    return () => {
      clearInterval(intervalId)
    }
  }, [attendanceTime])

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {mount ? (
        <>
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-4">
            <div className="flex flex-row items-center justify-start w-4/5">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white mr-2">
                {props.userInfo.position}
              </h5>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white mr-2">
                {props.userInfo.name}
              </h5>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 w-4/5 mb-1">
              {convertTime(timeString)}
            </span>
            <div className="flex flex-start justify-between w-4/5">
              <span className="text-medium text-gray-500 dark:text-gray-400">업무 상태</span>
              <span className={`${tailwindClassName}`}>
                {props.userInfo.attendanceStatus === 'in' ? '업무 중' : '업무 종료'}{' '}
              </span>
            </div>
            <div className="flex flex-start justify-between items-center w-4/5">
              <span className="text-medium text-gray-500 dark:text-gray-400">업무 시간</span>
              <span className={tailwindAttendanceTimeClassName}>{elapsed}분 </span>
            </div>
            <div className="flex flex-row justify-around mt-4 md:mt-6 w-4/5">
              <div className="w-full">
                <AttendanceBtn
                  userInfo={props.userInfo}
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
