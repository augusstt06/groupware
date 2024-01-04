'use client'

import { useState } from 'react'

import Recomment from './Recomment'
import WriteComment from './WriteComment'

export default function Comment() {
  const [isWriteComment, setIsWriteComment] = useState(false)
  const clickWriteComment = () => {
    setIsWriteComment(!isWriteComment)
  }
  return (
    <div className="border-b-1 border-gray-300">
      {/* FIXME: 추후에 static으로 써놓은 것들 api response로 변경 */}

      <div className="flex flex-row items-center justify-around p-2">
        <div className="border-gray-500 dark:border-gray-300 border-2 rounded-full p-1">img</div>
        <div className="w-5/6 p-1 flex flex-col ">
          <span className="text-sm font-bold mb-2">김충연(개발팀)</span>
          <span className="text-sm mb-2">쿠크 기여어</span>
          <div className="text-xs text-gray-400 flex flex-row justify-start items-center">
            <span className="mr-4">2024.01.01</span>
            <span className="cursor-pointer" onClick={clickWriteComment}>
              {isWriteComment ? '취소' : '답글쓰기'}
            </span>
          </div>
        </div>
      </div>
      <div className="pl-7">
        {/* id 값 변경해주기 */}
        {isWriteComment ? <WriteComment postingID={0} parentID={0} /> : <></>}
      </div>
      {/* FIXME: response에 댓글이 있는 걍우 아레 div로 감싼 html 표시 */}
      <div className="pl-7 border-b-2 border-gray-300">
        <Recomment />
      </div>
    </div>
  )
}
