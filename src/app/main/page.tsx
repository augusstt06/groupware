'use client'
import { useEffect, useState } from 'react'

import axios, { HttpStatusCode } from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import Hub from '../component/page/main/Hub'
import { NavigationBtn } from '../component/ui/button/BtnGroups'
import MenuCard from '../component/ui/card/MenuCard'
import UserCard from '../component/ui/card/UserCard'
import { KEY_ACCESS_TOKEN, KEY_UUID } from '../constant/constant'
import { getToken } from '../module/utils/cookie'
import { moduleGetFetch } from '../module/utils/moduleFetch'
import { type ModuleGetFetchProps } from '../types/moduleTypes'

export default function Main() {
  const [mount, setMount] = useState(false)

  const accessToken = getToken(KEY_ACCESS_TOKEN)

  // Invalid token specified => next js에서 prerender하는 과정 살펴보기
  const uuid: string = getToken(KEY_UUID) !== null ? (getToken(KEY_UUID) as string) : ''

  const [userInfo, setUserInfo] = useState({
    name: '',
    position: '',
    userId: 0,
    organizationName: '',
    attendanceStatus: '',
  })

  const getFetchUserProps: ModuleGetFetchProps = {
    keyName: ['uuid'],
    keyValue: [uuid],
    fetchUrl: process.env.NEXT_PUBLIC_USERS_SOURCE,
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const fetchGetUsers = async () => {
    try {
      const res = await moduleGetFetch(getFetchUserProps)
      setUserInfo({
        name: res.data.result.name,
        position: res.data.result.position,
        userId: res.data.result.id,
        organizationName: res.data.result.organizationName,
        attendanceStatus: res.data.result.attendanceStatus,
      })
    } catch (err) {
      // FIXME: 에러 핸들링 하기
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case HttpStatusCode.BadRequest:
            // 400 잘못된 요청
            break
          case HttpStatusCode.InternalServerError:
            // 500 서버 에러
            break
        }
      } else {
        // 일반 에러
      }
    }
  }
  useEffect(() => {
    setMount(true)
    if (accessToken === null) {
      redirect('/error/notfound/token')
    } else {
      void fetchGetUsers()
    }
  }, [])

  return (
    <>
      {mount ? (
        <main className="grid gap-4 grid-cols-4 h-4/5  pt-10 ml-10 mr-10">
          <div className="col-span-1 w-5/6">
            <UserCard userInfo={userInfo} />
            <MenuCard userInfo={userInfo} />
          </div>
          <div className="col-span-3 mr-10">
            <Hub />
          </div>
        </main>
      ) : (
        <main className="flex flex-col justify-center items-center h-2/5 pl-10 pr-10 pt-10">
          <div className="mb-8">Please login</div>
          <Link href="/">
            <NavigationBtn title="Go to Login or Sign Up" />
          </Link>
        </main>
      )}
    </>
  )
}
