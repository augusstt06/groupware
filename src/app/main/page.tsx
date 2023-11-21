'use client'
import { useEffect, useState } from 'react'

import { jwtDecode } from 'jwt-decode'
import Link from 'next/link'

import Hub from '../component/page/main/Hub'
import { NavigationBtn } from '../component/ui/button/BtnGroups'
import UserCard from '../component/ui/card/UserCard'
import { InputLabel } from '../component/ui/label/Inputlabel'
import { getToken } from '../module/hooks/reactHooks/cookie'
import { moduleGetFetch } from '../module/utils/moduleFetch'
import { type ModuleGetFetchProps } from '../types/moduleTypes'

export default function Main() {
  // 로그인시 xorgcode 받아서 토큰에 넣기
  // 조직 정보 get 요청 보내서 usercard에 props로 넘기기
  // 여기서 orgcode를 가져오니까 attendancebtn에도 props

  const accessToken = getToken('access-token')
  const orgCode = getToken('X-ORGANIZATION-CODE')

  const decode: { uuid: string; iss: string; iat: number; exp: number } = jwtDecode(accessToken)
  const [userInfo, setUserInfo] = useState({
    name: '',
    position: '',
    userId: 0,
  })

  const fetchGetOrgInfo = async () => {
    try {
      const getFetchOrgProps: ModuleGetFetchProps = {
        keyName: ['X-ORGANIZATION-CODE'],
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
    void fetchGetUsers()
    void fetchGetOrgInfo()
  }, [])
  return (
    <>
      {accessToken !== 'undefined' ? (
        <main className="flex flex-col justify-start items-center h-4/5 pl-10 pr-10 pt-10">
          <div className="flex flex-row justify-around items-center w-5/6">
            <div className="w-3/5 ml-10">
              <UserCard userInfo={userInfo} decode={decode} />
            </div>
            <div className="h-full mr-10 w-3/4">
              <InputLabel title="Current Post" />
              <Hub />
            </div>
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
