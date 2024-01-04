'use client'

import { useState } from 'react'

import WriteComment from './WriteComment'

import { type CommentProps } from '@/app/types/pageTypes'

export default function Recomment(props: CommentProps) {
  const [isWriteComment, setIsWriteComment] = useState(false)
  const clickWriteComment = () => {
    setIsWriteComment(!isWriteComment)
  }
  return (
    <>
      <div className="flex flex-row items-center justify-around p-2">
        <div className="border-gray-500 dark:border-gray-300 border-2 rounded-full p-1">img</div>
        <div className="w-5/6 p-1 flex flex-col ">
          <span className="text-sm font-bold mb-2">
            {props.comments.name}({props.comments.position})
          </span>
          <span className="text-sm mb-2">{props.comments.content}</span>
          <div className="text-xs text-gray-400 flex flex-row justify-start items-center">
            <span className="mr-4">2024.01.01</span>
            <span className="cursor-pointer" onClick={clickWriteComment}>
              {isWriteComment ? '취소' : '답글쓰기'}
            </span>
          </div>
        </div>
      </div>
      {/* FIXME: 추후 props 수정하기 */}
      {isWriteComment ? (
        <WriteComment postingID={props.postingID} parentID={props.comments.id} />
      ) : (
        <></>
      )}
      {props.comments.childComments.length !== 0 ? (
        props.comments.childComments.map((data) => (
          <div className="pl-7 " key={data.id}>
            <Recomment comments={data} postingID={props.postingID} />
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  )
}
