'use client'
import { type ChangeEvent, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IoCameraOutline } from 'react-icons/io5'

import { API_SUCCESS_CODE, KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE } from '@/constant/constant'
import { API_URL_COMMENT_POSTING, API_URL_UPLOAD_IMG } from '@/constant/route/api-route-constant'
import useInput from '@/module/hooks/reactHooks/useInput'
import { useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/module/utils/moduleCookie'
import { modulePostFetch, modulePostFileFetch } from '@/module/utils/moduleFetch'
import {
  type ApiResponseType,
  type FailResponseType,
  type ModulePostFetchProps,
  type ModulePostFileFetchProps,
  type SuccessResponseType,
} from '@/types/module'
import { type WriteCommentProps } from '@/types/pageType'

export default function WriteComment(props: WriteCommentProps) {
  const router = useRouter()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const userName = useAppSelector((state) => state.userInfo.extraInfo.name)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const commentInput = useInput('')
  const [inputCount, setInputCount] = useState<number>()
  const [img, setImg] = useState('')

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value
    commentInput.onChange(e)
    setInputCount(inputText.length)
  }

  const uploadImg = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      const formData = new FormData()
      formData.append('commentImg', file as File)
      const fetchImgProps: ModulePostFileFetchProps = {
        file: formData,
        fetchUrl: API_URL_UPLOAD_IMG,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      }
      const res = await modulePostFileFetch<string>(fetchImgProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      const imgUrl = (res as SuccessResponseType<string>).result
      setImg(imgUrl)
    } catch (err) {}
  }

  const fetchPostCommentProps: ModulePostFetchProps =
    props.parentID !== null
      ? {
          data: {
            content: commentInput.value,
            parentId: props.parentID,
            postingId: props.postingID,
          },
          fetchUrl: props.url,
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
          fetchUrl: API_URL_COMMENT_POSTING,
          header: {
            Authorization: `Bearer ${accessToken}`,
            [KEY_X_ORGANIZATION_CODE]: orgCode,
          },
        }

  const fetchPostComment = async () => {
    try {
      const res = await modulePostFetch<ApiResponseType>(fetchPostCommentProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      commentInput.resetValue()
      setInputCount(0)
      await props.refetch()
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

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    void uploadImg(e)
  }

  return (
    <div className="pt-2 pb-2">
      <div className="border-2 border-gray-300 rounded-lg flex flex-col p-2">
        <div className="flex flex-row justify-between">
          <span className="text-sm font-bold pl-3 mb-2">{userName}</span>
          <span className="text-sm text-gray-300">{inputCount} / 1000</span>
        </div>
        <input
          placeholder="댓글을 남겨보세요"
          className="outline-none bg-transparent p-3 text-sm"
          value={commentInput.value}
          maxLength={1000}
          onChange={handleInput}
        />
        <div className="flex flex-row justify-between w-full items-center pl-3">
          <div className="flex flex-col justify-around mr-2">
            {/* <IoCameraOutline className="w-5 h-5"> */}
            <div className="mb-2">
              <label htmlFor="imgInput">
                <IoCameraOutline className="w-10 h-5 cursor-pointer" />
                <input
                  type="file"
                  id="imgInput"
                  name="commentImg"
                  className="hidden"
                  accept="image/*"
                  onChange={inputChange}
                />
              </label>
            </div>
            {img !== '' ? (
              <div>
                <Image
                  src={img}
                  alt="img"
                  width={100}
                  height={200}
                  layout="responsive"
                  className="rounded-lg"
                />
              </div>
            ) : (
              <></>
            )}

            {/* </IoCameraOutline> */}
          </div>
          <button
            className="w-20 smooth-transition md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75"
            onClick={handleClick}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}
