'use client'
import { useEffect, useState } from 'react'

import { redirect } from 'next/navigation'

import Hub from '../component/page/main/Hub'
import MenuCard from '../component/ui/card/MenuCard'
import UserCard from '../component/ui/card/UserCard'
import { KEY_ACCESS_TOKEN, KEY_UUID, KEY_X_ORGANIZATION_CODE } from '../constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '../constant/errorMsg'
import { useAppDispatch, useAppSelector } from '../module/hooks/reduxHooks'
import { moduleDecodeToken, moduleDeleteCookies, moduleGetCookie } from '../module/utils/cookie'
import { moduleGetFetch } from '../module/utils/moduleFetch'
import {
  updateAttendanceStatusReducer,
  updateExtraUserInfoReducer,
  updateUserInfoReducer,
} from '../store/reducers/main/userInfoReducer'
import {
  type ApiRes,
  type CustomDecodeTokenType,
  type ModuleGetFetchProps,
} from '../types/moduleTypes'

export default function Main() {
  const dispatch = useAppDispatch()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const decodeToken = moduleDecodeToken(accessToken)
  const attendanceTime = useAppSelector((state) => state.userInfo.attendance.time)
  const uuid =
    decodeToken !== ERR_COOKIE_NOT_FOUND
      ? (decodeToken as CustomDecodeTokenType).uuid
      : ERR_COOKIE_NOT_FOUND

  const [reRender, setRerender] = useState(false)
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
      const res = await moduleGetFetch<ApiRes>(getFetchUserProps)
      const extraUserInfoReducerProps = {
        name: res.result.name,
        position: res.result.position,
        userId: res.result.userId,
        organizationId: res.result.organizationId,
        organizationName: res.result.organizationName,
      }
      const userReducerProps = {
        [KEY_X_ORGANIZATION_CODE]: res.result.organizationCode as string,
        [KEY_UUID]: res.result[KEY_UUID] as string,
      }
      const attendanceReducerProps = {
        status: res.result.attendanceStatus as string,
        time: attendanceTime,
      }
      dispatch(updateExtraUserInfoReducer(extraUserInfoReducerProps))
      dispatch(updateUserInfoReducer(userReducerProps))
      dispatch(updateAttendanceStatusReducer(attendanceReducerProps))
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
  }, [])

  return (
    <>
      <main className="grid gap-4 grid-cols-5 h-4/5  pt-10 ml-10 mr-10">
        <div className="col-span-1 w-5/6">
          <UserCard reRender={reRender} setRerender={setRerender} />
          <MenuCard />
        </div>
        <div className="col-span-4 mr-10">
          <Hub />
        </div>
      </main>
    </>
  )
}
