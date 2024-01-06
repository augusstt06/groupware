'use client'

import { useState } from 'react'

import { FaHeart, FaRegHeart } from 'react-icons/fa'

import Recomment from './Recomment'
import WriteComment from './WriteComment'

import { KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE } from '@/app/constant/constant'
import { API_URL_COMMENT, API_URL_COMMENT_LIKE } from '@/app/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleDeleteFetch, modulePostFetch } from '@/app/module/utils/moduleFetch'
import {
  addCommentLikeReducer,
  deleteCommentLikeReducer,
} from '@/app/store/reducers/board/boardLikeReducer'
import {
  type ApiRes,
  type FailResponseType,
  type FetchResponseType,
  type ModuleGetFetchProps,
  type ModulePostFetchProps,
} from '@/app/types/moduleTypes'
import { type CommentProps } from '@/app/types/pageTypes'

export default function Comment(props: CommentProps) {
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector((state) => state.userInfo.extraInfo)
  const likeState = useAppSelector((state) => state.boardLike.commentLikeList)
  const isCommentLike = likeState.includes(props.comments.id)
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const [isWriteComment, setIsWriteComment] = useState(false)

  const clickWriteComment = () => {
    setIsWriteComment(!isWriteComment)
  }
  const fetchPostLikeProps: ModulePostFetchProps = {
    data: {
      commentId: props.comments.id,
    },
    fetchUrl: API_URL_COMMENT_LIKE,
    header: {
      Authorization: `Bearer ${accessToken}`,
      [KEY_X_ORGANIZATION_CODE]: orgCode,
    },
  }
  const fetchCommentLike = async () => {
    try {
      const res = await modulePostFetch<FetchResponseType<ApiRes>>(fetchPostLikeProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      dispatch(addCommentLikeReducer(props.comments.id))
      props.doRerender()
    } catch (err) {}
  }
  const fetchDeleteLikeProps: ModuleGetFetchProps = {
    params: {
      commentId: props.comments.id,
    },
    fetchUrl: API_URL_COMMENT_LIKE,
    header: {
      Authorization: `Bearer ${accessToken}`,
      [KEY_X_ORGANIZATION_CODE]: orgCode,
    },
  }
  const fetchDeleteLike = async () => {
    try {
      const res = await moduleDeleteFetch<FetchResponseType<ApiRes>>(fetchDeleteLikeProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      dispatch(deleteCommentLikeReducer(props.comments.id))
      props.doRerender()
    } catch (err) {}
  }

  const clickPostCommentLike = () => {
    if (isCommentLike) void fetchDeleteLike()
    else void fetchCommentLike()
  }

  const fetchDeleteCommentProps: ModuleGetFetchProps = {
    params: {
      commentId: props.comments.id,
    },
    fetchUrl: API_URL_COMMENT,
    header: {
      Authorization: `Bearer ${accessToken}`,
      [KEY_X_ORGANIZATION_CODE]: orgCode,
    },
  }
  const fetchDeleteComment = async () => {
    try {
      const res = await moduleDeleteFetch<FetchResponseType<ApiRes>>(fetchDeleteCommentProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)
      props.doRerender()
    } catch (err) {}
  }
  const clickDeleteComment = () => {
    void fetchDeleteComment()
  }

  return (
    <div className="border-b-1 border-gray-300">
      <div className="flex flex-row items-center justify-around p-2">
        <div className="border-gray-500 dark:border-gray-300 border-2 rounded-full p-1">img</div>
        <div className="w-5/6 p-1 flex flex-col ">
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm font-bold mb-2">
              {props.comments.name} ({props.comments.position})
            </span>
            {userInfo.name === props.comments.name ? (
              <span
                className="text-xs text-gray-400 hover:font-bold cursor-pointer"
                onClick={clickDeleteComment}
              >
                삭제
              </span>
            ) : (
              <></>
            )}
          </div>
          <span className="text-sm mb-2">{props.comments.content}</span>
          <div className="text-xs text-gray-400 flex flex-row justify-start items-center">
            <span className="mr-4">2024.01.01</span>

            <span className="mr-1 cursor-pointer">
              {isCommentLike ? (
                <FaHeart className="text-red-400" onClick={clickPostCommentLike} />
              ) : (
                <FaRegHeart
                  className="text-red-400 hover:text-red-800"
                  onClick={clickPostCommentLike}
                />
              )}
            </span>
            <span className="mr-4">{props.comments.like}</span>
            <span className="cursor-pointer" onClick={clickWriteComment}>
              {isWriteComment ? '취소' : '답글쓰기'}
            </span>
          </div>
        </div>
      </div>
      <div className="pl-7 border-b-2 border-gray-300">
        {isWriteComment ? (
          <WriteComment
            postingID={props.postingID}
            parentID={props.comments.id}
            doRerender={props.doRerender}
          />
        ) : (
          <></>
        )}
        {props.comments.childComments.map((data) => (
          <div className="pl-7 " key={data.content}>
            <Recomment comments={data} postingID={props.postingID} doRerender={props.doRerender} />
          </div>
        ))}
      </div>
    </div>
  )
}
