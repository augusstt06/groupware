import { useState } from 'react'

import { getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

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
  const decode: { uuid: string; iss: string; iat: number; exp: number } = jwtDecode(accessToken)

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
    colleagues: []
    createdAt: string
    description: string
    grades: []
    id: number
    name: string
    organizationType: string
    ownerId: number
    teams: []
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

  const fetchPostAttendance = async () => {
    try {
      const orgId = await getOrgId()
      const fetchAttendanceProps: ModulePostFetchProps = {
        data: {
          organizationId: orgId,
          userId: decode.uuid,
        },
        fetchUrl: process.env.NEXT_PUBLIC_ATTENDANCES_SOURCE,
        header: {
          Authorization: `Bearer ${accessToken}`,
          'X-ORGANIZATION-CODE': orgCode,
        },
      }
      // FIXME: json: cannot unmarshal string into Go struct field AttendanceRequest.userId of type uint
      await modulePostFetch(fetchAttendanceProps)
      setIsAttendance(true)
      alert('출근 확인이 완료되었습니다.')
    } catch (err) {
      alert('출근 확인에 실패했습니다.')
    }
  }
  const fetchLeaveWork = async () => {
    try {
      const orgId = await getOrgId()
      const fetchAttendanceProps: ModulePostFetchProps = {
        data: {
          organizationId: orgId,
          userId: decode.uuid,
        },
        fetchUrl: process.env.NEXT_PUBLIC_ATTENDANCES_SOURCE,
        header: {
          Authorization: `Bearer ${accessToken}`,
          'X-ORGANIZATION-CODE': orgCode,
        },
      }
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
      className="text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white bg-white border-indigo-500 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
      onClick={() => {
        void handleClick()
      }}
    >
      {isAttendance ? 'Leave' : 'Attendance'}
    </button>
  )
}
