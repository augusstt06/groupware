'use client'

import { useEffect, useState } from 'react'

import ErrorAlert from '../../alert/ErrorAlert'
import AttendanceBtn from '../../button/main/attendance/AttendanceBtn'
import Progressbar from '../../progressbar/Progressbar'

import { KEY_ATTENDANCE } from '@/app/constant/constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { type UserCardProps } from '@/app/types/ui/cardTypes'

export default function HistoryCard(props: UserCardProps) {
  const [elapsed, setElapsed] = useState('0')
  // FIXME:
  const [convertTime, setConvertTime] = useState('0')
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

  const viewCurrentDate = () => {
    const currentDate = new Date()
    const month = new Intl.DateTimeFormat('ko-KR', { month: 'long' }).format(currentDate)
    const day = currentDate.getDate()
    const dayOfWeek = new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(currentDate)
    const result = `${month} ${day}일 ${dayOfWeek}`
    return result
  }

  const tailwindClassName = isAttendance ? 'text-blue-400 font-bold' : 'text-red-400 font-bold'

  useEffect(() => {
    setMount(true)
    const updateElapsed = () => {
      if (attendanceState.time !== null && attendanceState.time !== 0) {
        const now = new Date().getTime()
        const timeElapsed = Math.floor((now - attendanceState.time) / (1000 * 60))
        setElapsed(timeElapsed.toString())
        const numberTime = Number(elapsed)
        setConvertTime(Math.floor(numberTime / 15).toString())
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
    <div className="w-full h-2/3max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
      {mount ? (
        <>
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-4">
            <span className="text-lg text-gray-500 dark:text-white w-4/5 mb-1">
              {viewCurrentDate()}
            </span>
            <div className="flex flex-start justify-between w-4/5">
              <span className="text-medium text-gray-500 dark:text-gray-400">업무 상태</span>
              <span className={`${tailwindClassName}`}>
                {isAttendance ? '업무 중' : '업무 종료'}{' '}
              </span>
            </div>
            <div className="flex flex-start justify-between items-center w-4/5">
              <span className="text-medium text-gray-500 dark:text-gray-400">업무 시간</span>
              <Progressbar time={convertTime} />
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
            <div className="flex justify-end px-4 pt-4"></div>
            <span className="text-lg text-gray-500 dark:text-white w-4/5 mb-1">출퇴근</span>
            <div className="flex flex-start justify-between w-4/5">
              <span className="text-medium text-gray-500 dark:text-gray-400">정규 근무</span>
              <span className="text-white-400 font-bold">정규 근무시간</span>
            </div>
            <div className="flex flex-start justify-between w-4/5">
              <span className="text-medium text-gray-500 dark:text-gray-400">초과 근무</span>
              <span className="text-white-400 font-bold">초과 근무시간</span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
