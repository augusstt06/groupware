'use client'
import { useEffect, useState } from 'react'

import { jwtDecode } from 'jwt-decode'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import Hub from '../component/page/main/Hub'
import { NavigationBtn } from '../component/ui/button/BtnGroups'
import MenuCard from '../component/ui/card/MenuCard'
import UserCard from '../component/ui/card/UserCard'
import { KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE } from '../constant/constant'
import { getToken } from '../module/utils/cookie'
import { moduleGetFetch } from '../module/utils/moduleFetch'
import { type ModuleGetFetchProps } from '../types/moduleTypes'
import { type DecodeType } from '../types/variableTypes'

export default function Main() {
  // 로그인시 xorgcode 받아서 토큰에 넣기
  // 조직 정보 get 요청 보내서 usercard에 props로 넘기기
  // 여기서 orgcode를 가져오니까 attendancebtn에도 props
  // 받아와야할 정보 : 유저 이름, 조직, 팀, 직무(포지션)
  const [mount, setMount] = useState(false)

  const accessToken = getToken(KEY_ACCESS_TOKEN)
  const orgToken = getToken(KEY_X_ORGANIZATION_CODE)

  // Invalid token specified => next js에서 prerender하는 과정 살펴보기
  const decode: DecodeType =
    accessToken !== null ? jwtDecode(accessToken) : { uuid: '', iss: '', iat: 0, exp: 0 }

  const orgCode: string = orgToken ?? ''
  const [userInfo, setUserInfo] = useState({
    name: '',
    position: '',
    userId: 0,
  })

  const fetchGetOrgInfo = async () => {
    try {
      const getFetchOrgProps: ModuleGetFetchProps = {
        keyName: [KEY_X_ORGANIZATION_CODE],
        keyValue: [orgCode],
        fetchUrl: process.env.NEXT_PUBLIC_CREATE_ORGANIZATIONS_SOURCE,
        header: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      await moduleGetFetch(getFetchOrgProps)
    } catch (err) {}
  }

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
      setUserInfo({
        name: res.data.result.name,
        position: res.data.result.position,
        userId: res.data.result.id,
      })
    } catch (err) {}
  }
  useEffect(() => {
    setMount(true)
    if (accessToken === null) {
      redirect('/error/notfound/token')
    } else {
      void fetchGetUsers()
      void fetchGetOrgInfo()
    }
  }, [])

  return (
    <>
      {mount ? (
        <main className="grid gap-4 grid-cols-4 h-4/5  pt-10 ml-10 mr-10">
          <div className="col-span-1 w-5/6">
            <UserCard userInfo={userInfo} decode={decode} />
            <MenuCard />
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
