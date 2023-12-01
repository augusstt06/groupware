import React, { useState } from 'react'

import { addSeconds, format, parse } from 'date-fns'

import AttendanceHistoryBtn from '@/app/component/ui/button/main/attendance/AttendanceHistoryBtn'
import AttendanceInput from '@/app/component/ui/input/main/attendance/AttendanceInput'
import AttendanceHistoryTable from '@/app/component/ui/table/main/AttendanceHistoryTable'
import { KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE } from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/cookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import { type ApiRes, type ModuleGetFetchProps } from '@/app/types/moduleTypes'

export default function AttendanceHistory() {
  const [attendanceHistory, setAttendanceHistory] = useState<ApiRes[]>([])
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const userInfo = useAppSelector((state) => state.userInfo)

  const fromInput = useInput('')
  const toInput = useInput('')

  const convertTime = (input: string): string => {
    const date: Date = parse(input, 'yyyy/MM/dd/HH:mm', new Date())
    const dateWithSeconds: Date = addSeconds(date, 5)
    const outputString: string = format(dateWithSeconds, "yyyy-MM-dd'T'HH:mm:ss'Z'", {
      locale: undefined,
    })

    return outputString
  }

  const fetchAttendanceHistory = async () => {
    try {
      const fetchAttendanceHistoryProps: ModuleGetFetchProps = {
        params: {
          from: convertTime(fromInput.value),
          limit: '10',
          organizationId: userInfo.extraInfo.organizationId,
          to: convertTime(toInput.value),
          userId: userInfo.extraInfo.userId,
        },
        fetchUrl: process.env.NEXT_PUBLIC_ATTENDANCES_HISTORY_SOURCE,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: userInfo[KEY_X_ORGANIZATION_CODE],
        },
      }
      const res = await moduleGetFetch<ApiRes[]>(fetchAttendanceHistoryProps)
      const resArr = res.result
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
            <AttendanceInput title="from" input={fromInput} />
            <AttendanceInput title="to" input={toInput} />
            <AttendanceHistoryBtn onClick={handleClick} />
          </div>
          <div className="mt-5">
            <AttendanceHistoryTable history={attendanceHistory} />
          </div>
        </div>
      </div>
    </>
  )
}
