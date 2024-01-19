import React, { useState } from 'react'

import AttendanceHistoryBtn from '@/app/component/ui/button/main/attendance/AttendanceHistoryBtn'
import MainInput from '@/app/component/ui/input/main/MainInput'
import { InputLabel } from '@/app/component/ui/label/Inputlabel'
import AttendanceHistoryTable from '@/app/component/ui/table/main/AttendanceHistoryTable'
import {
  API_SUCCESS_CODE,
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
} from '@/app/constant/constant'
import {
  API_URL_GET_ATTENDANCE_HISTORY,
  API_URL_VACATION,
} from '@/app/constant/route/api-route-constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import { moduleConvertTime } from '@/app/module/utils/moduleTime'
import {
  type ApiResponseType,
  type FailResponseType,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'

export default function AttendanceHistory() {
  const [attendanceHistory, setAttendanceHistory] = useState<ApiResponseType[]>([])
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const userInfo = useAppSelector((state) => state.userInfo)

  const fromInput = useInput('')
  const toInput = useInput('')

  const [select, setSelect] = useState('attendance')
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value)
  }
  const selectList = ['attendance', 'vacation']
  const fetchAttendanceHistory = async () => {
    try {
      if (select === '') return
      const fetchHistoryProps: ModuleGetFetchProps = {
        params: {
          from: moduleConvertTime(fromInput.value),
          limit: '10',
          organizationId: userInfo.extraInfo.organizationId,
          to: moduleConvertTime(toInput.value),
          userId: userInfo.extraInfo.userId,
        },
        fetchUrl: select === 'attendance' ? API_URL_GET_ATTENDANCE_HISTORY : API_URL_VACATION,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: userInfo[KEY_X_ORGANIZATION_CODE],
        },
      }
      const res = await moduleGetFetch<ApiResponseType[]>(fetchHistoryProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      const resArr = (res as SuccessResponseType<ApiResponseType[]>).result
      setAttendanceHistory(resArr)
    } catch (err) {}
  }
  const handleClick = () => {
    void fetchAttendanceHistory()
  }

  return (
    <>
      <h2 className="text-bold text-xl mb-5">Attendance History</h2>
      <div className="w-full grid gap-4 grid-cols-3 mb-6 ">
        <div className="col-span-2 p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-row justify-around items-center">
            <div>
              <InputLabel title="Category" />
              <select
                className="rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleSelectChange}
                value={select}
              >
                {selectList.map((data) => (
                  <option value={data} key={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
            <MainInput
              type="attendance"
              title="from"
              input={fromInput}
              placeholder='"2023/01/12/23:02"'
            />
            <MainInput
              type="attendance"
              title="to"
              input={toInput}
              placeholder='"2023/01/12/23:02"'
            />
            <AttendanceHistoryBtn onClick={handleClick} />
          </div>
          {attendanceHistory.length === 0 ? (
            <></>
          ) : (
            <div className="mt-5">
              <AttendanceHistoryTable history={attendanceHistory} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
