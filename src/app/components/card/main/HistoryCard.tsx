'use client'

import { useEffect, useState } from 'react'

import ErrorAlert from '../../alert/ErrorAlert'
import Button from '../../button/Button'
import Progressbar from '../../progressbar/Progressbar'

import { API_SUCCESS_CODE, KEY_ATTENDANCE, KEY_X_ORGANIZATION_CODE } from '@/constant/constant'
import { ERR_COOKIE_NOT_FOUND, errDefault, errDuplicate, errNotFound } from '@/constant/errorMsg'
import { API_URL_ATTENDANCE } from '@/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { modulePatchFetch, modulePostFetch } from '@/module/utils/fetch'
import { createAccessTokenManager } from '@/module/utils/token'
import { updateAttendanceStatusReducer } from '@/store/reducers/main/userInfoReducer'
import { type FailResponseType, type ModulePostFetchProps } from '@/types/module'
import { type HistoryCardProps } from '@/types/ui/card'

export default function HistoryCard(props: HistoryCardProps) {
  const dispatch = useAppDispatch()
  const { getAccessToken } = createAccessTokenManager
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

  const fetchPostAttendance = async () => {
    try {
      const fetchProps: ModulePostFetchProps = {
        data: {
          organizationId: extraUserInfo.organizationId,
          userId: extraUserInfo.userId,
        },
        fetchUrl: API_URL_ATTENDANCE,
        header: {
          Authorization: `Bearer ${getAccessToken()}`,
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
          Authorization: `Bearer ${getAccessToken()}`,
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
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
    <div className="w-full max-w-sm mb-5">
      {mount ? (
        <>
          <div className="pb-4 sort-vertical-flex">
            <span className="w-full mb-1 text-xs text-gray-500 md:text-sm dark:text-white">
              {viewCurrentDate()}
            </span>
            <div className="flex justify-between w-full flex-start">
              <span className="text-xs text-gray-500 md:text-sm dark:text-gray-400">업무 상태</span>
              <span className={`${tailwindClassName}`}>
                {isAttendance ? '업무 중' : '업무 종료'}{' '}
              </span>
            </div>
            <div className="flex items-center justify-between w-full flex-start">
              <span className="text-xs text-gray-500 md:text-sm dark:text-gray-400">업무 시간</span>
              <Progressbar time={convertTime} />
            </div>
            <div className="flex flex-row justify-around w-4/5 mt-4 md:mt-6">
              <div className="justify-between w-full sort-row-flex">
                <Button
                  buttonContent="출근"
                  className="w-2/5 smooth-transition justify-center text-indigo-400 hover:text-white dark:text-white dark:bg-indigo-400 dark:border-white bg-white border-indigo-400 hover:bg-indigo-400 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
                  onClick={handleClickAttendance}
                />
                <Button
                  buttonContent="퇴근"
                  className="w-2/5 smooth-transition justify-center text-indigo-400 hover:text-white dark:text-white dark:bg-indigo-400 dark:border-white bg-white border-indigo-400 hover:bg-indigo-400 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
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
            <span className="w-full mb-1 text-sm text-gray-500 md:text-base dark:text-white">
              출퇴근
            </span>
            <div className="flex justify-between w-full flex-start">
              <span className="text-xs text-gray-500 md:text-sm dark:text-gray-400">정규 근무</span>
              <span className="text-xs font-bold md:text-sm text-white-400">근무시간</span>
            </div>
            <div className="flex justify-between w-full flex-start">
              <span className="text-xs text-sm text-gray-500 md:text-sm dark:text-gray-400">
                초과 근무
              </span>
              <span className="text-xs font-bold md:text-sm text-white-400">근무시간</span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
