'use client'

import { useEffect, useState } from 'react'

import CreateBoardBtn from '../../../button/board/CreateBoardBtn'
import MenuCard from '../../MenuCard'

import { KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE } from '@/app/constant/constant'
import { API_URL_POSTINGS_PENDING } from '@/app/constant/route/api-route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import {
  type FailResponseType,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'
import { type BoardSideCardProps } from '@/app/types/ui/cardTypes'
import { type resType } from '@/app/types/variableTypes'

export default function BoardSideCard(props: BoardSideCardProps) {
  const userInfo = useAppSelector((state) => state.userInfo)
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const [savePostingCount, setSavePostingCount] = useState<number>(0)
  const fetchGetPostPending = async () => {
    try {
      const fetchProps: ModuleGetFetchProps = {
        params: {
          limit: 10,
          offset: 0,
          writerId: userInfo.extraInfo.userId,
        },
        fetchUrl: API_URL_POSTINGS_PENDING,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: userInfo[KEY_X_ORGANIZATION_CODE],
        },
      }
      const res = await moduleGetFetch<resType>(fetchProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      const postingList = (res as SuccessResponseType<resType>).result.postings
      setSavePostingCount(postingList.length)
    } catch (err) {
      setSavePostingCount(0)
    }
  }
  useEffect(() => {
    void fetchGetPostPending()
  }, [savePostingCount])
  return (
    <>
      <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow dark:bg-[#1a202c] dark:border-gray-700 mb-5">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center mb-3">
          <span className="md:text-lg text-sm text-gray-500 dark:text-white w-4/5 mb-1">
            {userInfo.extraInfo.name}
          </span>
          <div className="flex flex-start justify-between w-4/5 mb-1">
            <span className="md:text-base text-xs text-gray-500 dark:text-gray-400">
              내가 쓴 글
            </span>
            <span className="md:text-base text-xs text-white-400 font-bold">0</span>
          </div>

          <div className="flex flex-start justify-between w-4/5 mb-1">
            <span className="md:text-base text-xs text-gray-500 dark:text-gray-400">
              작성중인 글
            </span>
            <span className="md:text-base text-xs text-white-400 font-bold">
              {savePostingCount}
            </span>
          </div>
          <div className="flex flex-start justify-between w-4/5">
            <span className="md:text-base text-xs text-gray-500 dark:text-gray-400">휴지통</span>
            <span className="md:text-base text-xs text-white-400 font-bold">0</span>
          </div>
        </div>
        <CreateBoardBtn />
      </div>

      <MenuCard boardCategoryList={props.boardCategoryList} />
    </>
  )
}
