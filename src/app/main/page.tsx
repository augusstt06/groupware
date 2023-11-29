'use client'
import { useEffect, useState } from 'react'

import { redirect } from 'next/navigation'

import Hub from '../component/page/main/Hub'
import MenuCard from '../component/ui/card/MenuCard'
import UserCard from '../component/ui/card/UserCard'
import { KEY_ACCESS_TOKEN, KEY_UUID } from '../constant/constant'
import { ERR_COOKIE_NOT_FOUND, ERR_TOKEN_NOT_FOUND } from '../constant/errorMsg'
import { moduleDecodeToken, moduleDeleteCookies, moduleGetCookie } from '../module/utils/cookie'
import { moduleGetFetch } from '../module/utils/moduleFetch'
import { type CustomDecodeTokenType, type ModuleGetFetchProps } from '../types/moduleTypes'

export default function Main() {
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const decodeToken = moduleDecodeToken(accessToken)
  const uuid =
    decodeToken !== ERR_TOKEN_NOT_FOUND
      ? (decodeToken as CustomDecodeTokenType).uuid
      : ERR_TOKEN_NOT_FOUND

  const [reRender, setRerender] = useState(false)
  const [userInfo, setUserInfo] = useState<Record<string, string | number>>({
    name: '',
    position: '',
    userId: 0,
    organizationId: 0,
    organizationName: '',
  })

  const getFetchUserProps: ModuleGetFetchProps = {
    params: {
      [KEY_UUID]: uuid,
    },
    fetchUrl: process.env.NEXT_PUBLIC_USERS_SOURCE,
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const fetchGetUsers = async () => {
    try {
      const res = await moduleGetFetch(getFetchUserProps)

      setUserInfo({
        name: res.result.name,
        position: res.result.position,
        userId: res.result.userId,
        organizationId: res.result.organizationId,
        organizationName: res.result.organizationName,
      })
    } catch (err) {
      if (err instanceof Error) {
        moduleDeleteCookies(KEY_ACCESS_TOKEN)
        redirect('/error/notfound')
      }
    }
  }
  useEffect(() => {
    if (accessToken === ERR_COOKIE_NOT_FOUND) {
      redirect('/error/notfound/token')
    } else {
      void fetchGetUsers()
    }
  }, [reRender])

  return (
    <>
      <main className="grid gap-4 grid-cols-4 h-4/5  pt-10 ml-10 mr-10">
        <div className="col-span-1 w-5/6">
          <UserCard userInfo={userInfo} reRender={reRender} setRerender={setRerender} />
          <MenuCard userInfo={userInfo} />
        </div>
        <div className="col-span-3 mr-10">
          <Hub />
        </div>
      </main>
    </>
  )
}
