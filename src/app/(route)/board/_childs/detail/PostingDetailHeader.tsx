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
  const { moveBoardListPage, commentCount, content, isAuthor, clickDelete } = props
  return (
    <div>
      <div className="sort-row-flex justify-between mb-3">
        <section
          className="smooth-transition  sort-row-flex cursor-pointer w-24 hover:bg-gray-300 border-2 border-gray-400 rounded-lg p-2 space-x-2"
          onClick={moveBoardListPage}
        >
          <IoIosArrowBack />
          <span className="text-xs">목록보기</span>
        </section>
        {isAuthor ? (
          <div className="sort-row-flex justify-between w-40">
            <button className="smooth-transition  w-16 md:text-sm text-xs bg-indigo-400 text-white dark:border-white border-indigo-400 hover:bg-indigo-600 rounded-lg text-center items-center border-2 p-2">
              수정
            </button>
            <button
              className="smooth-transition w-16 md:text-sm text-xs bg-red-400 text-white  dark:border-white border-red-400 hover:bg-red-600 rounded-lg text-center items-center border-2 p-2"
              onClick={clickDelete}
            >
              삭제
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-col border-b-2 border-gray-300 truncate pt-5 pb-5 space-y-3">
        <span className="text-xl font-bold">{content.title}</span>
        <span className="text-sm">
          {content.name}({content.position})
        </span>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row w-2/5 justify-start items-center text-gray-400">
            <span className="text-xs justify-around items-center mr-3">
              {moduleConvertDate(content?.createdAt, '.', false).split(' ')[0]}
            </span>
            {/* 조회수 */}
            <div className="flex flex-row text-xs justify-around items-center w-6 mr-2">
              <MdRemoveRedEye />
              <span>3</span>
            </div>
            {/* 좋아요 */}
            <div className="flex flex-row text-xs justify-around items-center w-6 mr-2">
              <FaHeart className="text-red-400" />
              <span>{content.like}</span>
            </div>
            {/* 댓글 수 */}
            <div className="flex flex-row text-xs justify-around items-center w-6">
              <FaRegComment />
              <span>{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
