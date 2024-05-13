import { FaHeart, FaRegComment } from 'react-icons/fa'
import { IoIosArrowBack } from 'react-icons/io'
import { MdRemoveRedEye } from 'react-icons/md'

import { moduleConvertDate } from '@/module/utils/moduleTime'
import { type DetailResponseType } from '@/types/variable'

type PostingDetailHeaderProps = {
  moveBoardListPage: () => void
  commentCount: number
  content: DetailResponseType
  isAuthor: boolean
  clickDelete: () => void
}

export default function PostingDetailHeader(props: PostingDetailHeaderProps) {
  return (
    <div>
      <div
        className="flex flex-row mb-3 items-center cursor-pointer inline w-20 hover:font-bold"
        onClick={props.moveBoardListPage}
      >
        <IoIosArrowBack className="mr-2" />
        <span className="text-xs">목록보기</span>
      </div>

      <div className="flex flex-col border-b-2 border-gray-300 pb-2 truncate">
        <span className="text-xl font-bold mb-2">{props.content.title}</span>
        <span className="text-xs">
          {props.content.name}({props.content.position})
        </span>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row w-2/5 justify-start items-center text-gray-400">
            <span className="text-xs justify-around items-center mr-3">
              {moduleConvertDate(props.content?.createdAt, '.', false).split(' ')[0]}
            </span>
            {/* 조회수 */}
            <div className="flex flex-row text-xs justify-around items-center w-6 mr-2">
              <MdRemoveRedEye />
              <span>3</span>
            </div>
            {/* 좋아요 */}
            <div className="flex flex-row text-xs justify-around items-center w-6 mr-2">
              <FaHeart className="text-red-400" />
              <span>{props.content.like}</span>
            </div>
            {/* 댓글 수 */}
            <div className="flex flex-row text-xs justify-around items-center w-6">
              <FaRegComment />
              <span>{props.commentCount}</span>
            </div>
          </div>
          {/* FIXME: 본인 글에만 표시 */}
          {props.isAuthor ? (
            <div className="flex flex-row items-center justify-around w-1/3">
              <button className="w-2/5 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75">
                수정
              </button>
              <button
                className="w-2/5 md:text-sm text-xs text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white border-indigo-500 hover:bg-indigo-500 rounded-lg text-center items-center dark:hover:bg-white dark:hover:text-indigo-500 border-2 dark:hover:border-indigo-500/75"
                onClick={props.clickDelete}
              >
                삭제
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
