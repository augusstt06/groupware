'use client'

import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { TbUsersPlus } from 'react-icons/tb'

import Button from '@/app/component/ui/button/Button'
import {
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  KEY_X_ORGANIZATION_CODE,
} from '@/app/constant/constant'
import { API_URL_TEAMS } from '@/app/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleCheckUserState } from '@/app/module/utils/check/moduleCheckUserState'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import { teamInviteModalReducer } from '@/app/store/reducers/team/teamModalReducer'
import { type SuccessResponseType } from '@/app/types/moduleTypes'
import { type TeamResponseType } from '@/app/types/variableTypes'

export default function TeamDetail() {
  // outer
  const router = useRouter()
  const dispatch = useAppDispatch()
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])

  // componenet variables
  const queryTeamId = useParams().id
  const teamData = () => {
    if (isLoading) return null
    return team?.result
  }
  const inviteBtnContent = (
    <>
      <TbUsersPlus className="mr-2" />
      <span>초대하기</span>
    </>
  )

  // fetch fn
  const { data: team, isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const res = await moduleGetFetch<TeamResponseType>({
        params: {
          teamId: Number(queryTeamId),
        },
        fetchUrl: API_URL_TEAMS,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
      return res as SuccessResponseType<TeamResponseType>
    },
  })

  useEffect(() => {
    moduleCheckUserState({ loginCompleteState, router, accessToken, setAccessToken })
  }, [accessToken])
  return (
    <main className="w-10/12 max-w-7xl 2xl:w-2/3 h-4/5 flex flex-col items-center ">
      <div className="md:5/6 w-full flex flex-col items-left dark:bg-[#1a202c] dark:border-gray-700 border border-gray-200 rounded-lg shadow-lg p-2 mb-5">
        <div className="w-full p-3 flex flex-row justify-between items-center">
          <span className="font-bold">
            {teamData() !== null ? teamData()?.name : '데이터를 로딩중입니다.'}
          </span>
          <Button
            buttonContent={inviteBtnContent}
            className="w-1/7 text-center justify-center transition ease-in-out duration-300 rounded-lg shadow bg-indigo-400 dark:bg-indigo-400 hover:bg-indigo-600 hover:dark:bg-indigo-500 justify-center text-white dark:text-white focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center"
            onClick={() => {
              dispatch(teamInviteModalReducer(true))
            }}
          />
        </div>
      </div>
    </main>
  )
}
