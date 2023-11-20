import { useState } from 'react'

import { getCookie } from 'cookies-next'

import { modulePatchFetch, modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'

export default function AttendanceBtn() {
  // FIXME: userid값 가져오기 , response 값 확인
  const [isAttendance, setIsAttendance] = useState(false)
  const orgCode = getCookie('X-ORGANIZATION-CODE')
  const fetchProps: ModulePostFetchProps = {
    data: {
      // FIXME: 추후에 데이터(number)로 전환
      organizationId: 0,
      userId: 0,
    },
    fetchUrl: process.env.NEXT_PUBLIC_ATTENDANCE_SOURCE,
    header: {
      'X-ORGANIZATION-CODE': orgCode,
    },
  }
  const fetchPostAttendance = async () => {
    try {
      await modulePostFetch(fetchProps)
      setIsAttendance(true)
      alert('출근 확인이 완료되었습니다.')
    } catch (err) {
      alert('출근 확인에 실패했습니다.')
    }
  }
  const fetchLeaveWork = async () => {
    try {
      await modulePatchFetch(fetchProps)
      setIsAttendance(false)
      alert('퇴근 확인이 완료되었습니다.')
    } catch (err) {
      alert('퇴근 확인에 실패했습니다.')
    }
  }

  const handleClick = async () => {
    if (orgCode === undefined) {
      alert('소속된 조직이 없습니다.')
      return
    }
    switch (isAttendance) {
      case false:
        void fetchPostAttendance()
        break
      case true:
        void fetchLeaveWork()
        break
    }
  }

  return (
    <button
      className="text-indigo-500 hover:text-white border border-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:focus:ring-indigo-800"
      onClick={() => {
        void handleClick()
      }}
    >
      {isAttendance ? 'Leave Work' : 'Check Attendance'}
    </button>
  )
}
