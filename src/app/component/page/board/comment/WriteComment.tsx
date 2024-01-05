'use client'
import { type ChangeEvent, useState } from 'react'

import { useRouter } from 'next/navigation'
import { IoCameraOutline } from 'react-icons/io5'

import { KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE } from '@/app/constant/constant'
import { API_URL_COMMENT } from '@/app/constant/route/api-route-constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import {
  type ApiRes,
  type FailResponseType,
  type FetchResponseType,
  type ModulePostFetchProps,
} from '@/app/types/moduleTypes'
import { type WriteCommentProps } from '@/app/types/pageTypes'

export default function WriteComment(props: WriteCommentProps) {
  const router = useRouter()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const commentInput = useInput('')
  const [inputCount, setInputCount] = useState<number>()

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value
    commentInput.onChange(e)
    setInputCount(inputText.length)
  }

  const fetchPostCommentProps: ModulePostFetchProps =
    props.parentID !== null
      ? {
          data: {
            content: commentInput.value,
            parentId: props.parentID,
            postingId: props.postingID,
          },
          fetchUrl: API_URL_COMMENT,
          header: {
            Authorization: `Bearer ${accessToken}`,
            [KEY_X_ORGANIZATION_CODE]: orgCode,
          },
        }
      : {
          data: {
            content: commentInput.value,
            postingId: props.postingID,
          },
          fetchUrl: API_URL_COMMENT,
          header: {
            Authorization: `Bearer ${accessToken}`,
            [KEY_X_ORGANIZATION_CODE]: orgCode,
          },
        }

  const fetchPostComment = async () => {
    try {
      const res = await modulePostFetch<FetchResponseType<ApiRes>>(fetchPostCommentProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      commentInput.resetValue()
      setInputCount(0)
      props.doRerender()
      router.refresh()
    } catch (err) {}
  }

  const handleClick = () => {
    if (commentInput.value === '') {
      alert('내용을 입력해주세요')
      return
    }
    void fetchPostComment()
  }

  return (
    <div className=" pt-2 pb-2">
      <div className="border-2 border-gray-300 rounded-lg flex flex-col p-2">
        <div className="flex flex-row justify-between">
          <span className="text-sm font-bold pl-3 mb-2">작성자 이름</span>
          <span className="text-sm text-gray-300">{inputCount} / 1000</span>
        </div>
        <input
          placeholder="댓글을 남겨보세요"
          className="outline-none bg-white dark:bg-gray-700 p-3 text-sm"
          value={commentInput.value}
          maxLength={1000}
          onChange={handleInput}
        />
        <div className="flex flex-row justify-between w-full items-center pl-3">
          {/* FIXME: 클릭시 파일 첨부 */}
          <IoCameraOutline className="w-5 h-5" />
          <button
            className="w-1/5 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75"
            onClick={handleClick}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}
