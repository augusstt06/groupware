'use client'
import { useEffect, useState } from 'react'

import axios, { HttpStatusCode } from 'axios'
import { redirect } from 'next/navigation'

import Hub from '../component/page/main/Hub'
import MenuCard from '../component/ui/card/MenuCard'
import UserCard from '../component/ui/card/UserCard'
import { KEY_ACCESS_TOKEN, KEY_UUID, KEY_X_ORGANIZATION_CODE } from '../constant/constant'
import { deleteToken, getToken } from '../module/utils/cookie'
import { moduleGetFetch } from '../module/utils/moduleFetch'
import { type ModuleGetFetchProps } from '../types/moduleTypes'

export default function Main() {
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
    keyName: [KEY_UUID],
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
      // FIXME: 에러 핸들링 하기 => 어떤 방식으로? 유저정보를 가져오는데 실패하면 무엇을 어떻게 알려줘야하나. => 유저정보를 가져오는데 실패했다 => 로그인과정에서 문제가 발생했다 => 재로그인
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case HttpStatusCode.BadRequest:
            deleteToken(KEY_ACCESS_TOKEN)
            deleteToken(KEY_UUID)
            deleteToken(KEY_X_ORGANIZATION_CODE)
            redirect('/error/notfound')
            break
          case HttpStatusCode.InternalServerError:
            break
        }
      } else {
        // 일반 에러
      }
    }
  }
  useEffect(() => {
    // 여기서 이미 토큰이 없으면 리디렉션을 하기 때문에 따로 로그인하라고 알려주는 부분이 필요없음
    if (accessToken === null) {
      redirect('/error/notfound/token')
    } else {
      void fetchGetUsers()
    }
  }, [])

  return (
    <>
      <main className="grid gap-4 grid-cols-4 h-4/5  pt-10 ml-10 mr-10">
        <div className="col-span-1 w-5/6">
          <UserCard userInfo={userInfo} />
          <MenuCard userInfo={userInfo} />
        </div>
        <div className="col-span-3 mr-10">
          <Hub />
        </div>
      </main>
    </>
  )
}
