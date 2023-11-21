import { useState } from 'react'

import { getCookie } from 'cookies-next'

import { moduleGetFetch, modulePatchFetch, modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type ModuleGetFetchProps, type ModulePostFetchProps } from '@/app/types/moduleTypes'

export default function AttendanceBtn() {
  const [isAttendance, setIsAttendance] = useState(false)

  const accessToken =
    getCookie('access-token') !== undefined ? (getCookie('access-token') as string) : 'undefined'
  const orgCode =
    getCookie('X-ORGANIZATION-CODE') !== undefined
      ? (getCookie('X-ORGANIZATION-CODE') as string)
      : 'undefined'

  const fetchOrgListProps: ModuleGetFetchProps = {
    keyName: ['limit', 'offset'],
    keyValue: ['10', '0'],
    fetchUrl: process.env.NEXT_PUBLIC_GET_ORG_LIST_SOURCE,
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  type ResponseArr = {
    code: string
    colleagues: [] // 예시에 맞게 수정
    createdAt: string
    description: string
    grades: [] // 예시에 맞게 수정
    id: number
    name: string
    organizationType: string
    ownerId: number
    teams: [] // 예시에 맞게 수정
    updatedAt: string
  }
  const findOrgId = (arr: ResponseArr[], orgCode: string) => {
    const foundArr = arr.find((data) => data.code === orgCode)
    return foundArr?.id ?? undefined
  }
  const getOrgId = async () => {
    try {
      const res = await moduleGetFetch(fetchOrgListProps)
      const id = findOrgId(res.data.result, orgCode)
      return id
    } catch (err) {}
  }

  const fetchAttendanceProps: ModulePostFetchProps = {
    data: {
      organizationId: getOrgId(),
      userId: 0,
    },
    fetchUrl: process.env.NEXT_PUBLIC_ATTENDANCE_SOURCE,
    header: {
      'X-ORGANIZATION-CODE': orgCode,
    },
  }
  const fetchPostAttendance = async () => {
    // FIXME: uuid값, orgid값
    try {
      await modulePostFetch(fetchAttendanceProps)
      setIsAttendance(true)
      alert('출근 확인이 완료되었습니다.')
    } catch (err) {
      alert('출근 확인에 실패했습니다.')
    }
  }
  const fetchLeaveWork = async () => {
    try {
      await modulePatchFetch(fetchAttendanceProps)
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
        // void getOrgId()
      }}
    >
      {isAttendance ? 'Leave Work' : 'Check Attendance'}
    </button>
  )
}
