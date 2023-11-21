import { useEffect, useState } from 'react'

import { getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'
import { IoPeople } from 'react-icons/io5'

import { NavigationBtn } from '../button/BtnGroups'
import AttendanceBtn from '../button/attendance/AttendanceBtn'

import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import { type ModuleGetFetchProps } from '@/app/types/moduleTypes'

export default function UserCard() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    position: '',
  })
  const accessToken =
    getCookie('access-token') !== undefined ? (getCookie('access-token') as string) : 'undefined'
  const decode: { uuid: string; iss: string; iat: number; exp: number } = jwtDecode(accessToken)
  const getFetchUserProps: ModuleGetFetchProps = {
    keyName: ['uuid'],
    keyValue: [decode.uuid],
    fetchUrl: process.env.NEXT_PUBLIC_USERS_SOURCE,
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const fetchGetUsers = async () => {
    try {
      const res = await moduleGetFetch(getFetchUserProps)
      setUserInfo({ name: res.data.result.name, position: res.data.result.position })
    } catch (err) {}
  }
  useEffect(() => {
    void fetchGetUsers()
  }, [])
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <IoPeople className="w-20 h-20 rounded-full" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userInfo.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{userInfo.position}</span>
        <div className="flex flex-row justify-around mt-4 md:mt-6 w-2/4">
          <div className="px-10">
            <AttendanceBtn />
          </div>
          <div className="px-10">
            <NavigationBtn title="Setting" />
          </div>
        </div>
      </div>
    </div>
  )
}
