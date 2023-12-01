import React from 'react'

import { addSeconds, format, parse } from 'date-fns'

import { InputLabel } from '@/app/component/ui/label/Inputlabel'
import { KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE } from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/cookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import { type ApiRes, type ModuleGetFetchProps } from '@/app/types/moduleTypes'

export default function AttendanceHistory() {
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
      await moduleGetFetch<ApiRes>(fetchAttendanceHistoryProps)
      //   FIXME: 요청헤더, params는 제대로 전송되는데 400 : record not found 에러 발생
    } catch (err) {}
  }
  return (
    <>
      <h2 className="text-bold text-xl mb-5">Attendance History</h2>
      <div className="w-full grid gap-4 grid-cols-3 mb-6 ">
        <div className="col-span-2 p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-row justify-around items-center">
            <div>
              <InputLabel title="From" />
              <input
                type="text"
                className="rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={fromInput.value}
                onChange={fromInput.onChange}
                id="from"
                placeholder="2023/01/12/23:02"
              />
            </div>
            <div className="">
              <InputLabel title="To" />
              <input
                type="text"
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={toInput.value}
                onChange={toInput.onChange}
                id="to"
                placeholder="2023/01/12/23:03"
              />
            </div>
            <div className="border border-indigo-700 border-2 p-1 mt-7 rounded-lg text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white bg-white border-indigo-500 hover:bg-indigo-500 dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 ">
              <button
                type="button"
                onClick={() => {
                  void fetchAttendanceHistory()
                }}
              >
                Submit
              </button>
            </div>
          </div>
          <h3 className="mb-3 font-medium text-gray-700 dark:text-gray-200">History</h3>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">My issue list</p>
        </div>
      </div>
    </>
  )
}
