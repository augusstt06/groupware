'use client'

import { useState } from 'react'

import { FaHeart, FaRegHeart } from 'react-icons/fa'

import WriteComment from './WriteComment'

import { API_SUCCESS_CODE, KEY_ACCESS_TOKEN, KEY_X_ORGANIZATION_CODE } from '@/_constant/constant'
import { API_URL_COMMENT, API_URL_COMMENT_LIKE } from '@/_constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/_module/hooks/reduxHooks'
import { moduleGetCookie } from '@/_module/utils/moduleCookie'
import { moduleDeleteFetch, modulePostFetch } from '@/_module/utils/moduleFetch'
import {
  addCommentLikeReducer,
  deleteCommentLikeReducer,
} from '@/_store/reducers/board/boardLikeReducer'
import {
  type ApiResponseType,
  type FailResponseType,
  type ModuleGetFetchProps,
  type ModulePostFetchProps,
} from '@/_types/module'
import { type CommentProps } from '@/_types/pageType'

export default function Recomment(props: CommentProps) {
  const dispatch = useAppDispatch()
  const likeState = useAppSelector((state) => state.boardLike.commentLikeList)
  const isCommentLike: boolean = likeState.includes(props.comments.id)
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const userInfo = useAppSelector((state) => state.userInfo.extraInfo)
  const [isWriteComment, setIsWriteComment] = useState(false)

  const clickWriteComment = () => {
    setIsWriteComment(!isWriteComment)
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
      const res = await moduleDeleteFetch<ApiResponseType>(fetchDeleteCommentProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
    } catch (err) {}
  }
  const clickDeleteComment = () => {
    void fetchDeleteComment()
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
      const res = await modulePostFetch<ApiResponseType>(fetchPostLikeProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      dispatch(addCommentLikeReducer(props.comments.id))
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
      const res = await moduleDeleteFetch<ApiResponseType>(fetchDeleteLikeProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      dispatch(deleteCommentLikeReducer(props.comments.id))
    } catch (err) {}
  }

  const clickPostCommentLike = () => {
    if (isCommentLike) void fetchDeleteLike()
    else void fetchCommentLike()
  }

  return (
    <>
      <div className="justify-around p-2 sort-row-flex">
        <div className="p-1 border-2 border-gray-500 rounded-full dark:border-gray-300">img</div>
        <div className="flex flex-col w-5/6 p-1 ">
          <div className="justify-between sort-row-flex">
            <span className="mb-2 text-sm font-bold">
              {props.comments.name} ({props.comments.position})
            </span>
            {userInfo.name === props.comments.name ? (
              <span
                className="text-xs text-gray-400 cursor-pointer hover:font-bold"
                onClick={clickDeleteComment}
              >
                삭제
              </span>
            ) : (
              <></>
            )}
          </div>
          <span className="mb-2 text-sm">
            {props.mention?.isMention !== undefined &&
            props.mention?.isMention !== null &&
            props.mention.isMention === true ? (
              <span className="mr-2 font-bold">@{props.mention.parentName}</span>
            ) : (
              <></>
            )}

            {props.comments.content}
          </span>
          <div className="justify-start text-xs text-gray-400 sort-row-flex">
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
      {isWriteComment ? (
        <WriteComment
          url={props.url}
          postingID={props.postingID}
          parentID={props.comments.id}
          refetch={props.refetch}
        />
      ) : (
        <></>
      )}
      {props.comments.childComments.length !== 0 ? (
        props.comments.childComments.map((data) => (
          <div className="" key={data.content}>
            <Recomment
              url={props.url}
              refetch={props.refetch}
              comments={data}
              postingID={props.postingID}
              mention={{ isMention: true, parentName: props.comments.name }}
            />
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  )
}
