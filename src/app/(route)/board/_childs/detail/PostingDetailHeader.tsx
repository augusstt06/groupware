import { FaHeart, FaRegComment } from 'react-icons/fa'
import { IoIosArrowBack } from 'react-icons/io'
import { MdRemoveRedEye } from 'react-icons/md'

import { moduleConvertDate } from '@/_module/utils/moduleTime'
import { type DetailResponseType } from '@/_types/variable'

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
      <div className="justify-between mb-3 sort-row-flex">
        <section
          className="w-24 p-2 border-2 border-gray-400 rounded-lg cursor-pointer smooth-transition  sort-row-flex hover:bg-gray-300 space-x-2"
          onClick={moveBoardListPage}
        >
          <IoIosArrowBack />
          <span className="text-xs">목록보기</span>
        </section>
        {isAuthor ? (
          <div className="justify-between w-40 sort-row-flex">
            <button className="items-center w-16 p-2 text-xs text-center text-white bg-indigo-400 border-2 border-indigo-400 rounded-lg smooth-transition md:text-sm dark:border-white hover:bg-indigo-600">
              수정
            </button>
            <button
              className="items-center w-16 p-2 text-xs text-center text-white bg-red-400 border-2 border-red-400 rounded-lg smooth-transition md:text-sm  dark:border-white hover:bg-red-600"
              onClick={clickDelete}
            >
              삭제
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <section className="flex flex-col pt-5 pb-3 truncate border-b-2 border-gray-300 space-y-3">
        <span className="text-xl font-bold">{content.title}</span>
        <div className="justify-between sort-row-flex">
          <span className="text-sm">
            {content.name}({content.position})
          </span>
          <div className="flex flex-row justify-between">
            <div className="justify-start w-2/5 text-gray-400 sort-row-flex ">
              <span className="items-center justify-around mr-3 text-xs">
                {moduleConvertDate(content?.createdAt, '.', false).split(' ')[0]}
              </span>
              {/* 조회수 */}
              <div className="justify-around w-6 mr-2 text-xs sort-row-flex">
                <MdRemoveRedEye />
                <span>3</span>
              </div>
              {/* 좋아요 */}
              <div className="justify-around w-6 mr-2 text-xs sort-row-flex">
                <FaHeart className="text-red-400" />
                <span>{content.like}</span>
              </div>
              {/* 댓글 수 */}
              <div className="justify-around w-6 text-xs sort-row-flex">
                <FaRegComment />
                <span>{commentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
