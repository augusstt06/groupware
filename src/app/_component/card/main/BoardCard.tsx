// import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { FaRegComment, FaRegHeart } from 'react-icons/fa'

import { ROUTE_POSTING_DETAIL } from '@/constant/route/route-constant'
import { moduleConvertDate } from '@/module/utils/moduleTime'
import { type BoardCardType } from '@/types/ui/card'

// const Viewbox = dynamic(async () => import('../../editor/TextViewer'), {
//   ssr: false,
// })
export default function BoardCard(props: BoardCardType) {
  const { content } = props
  const router = useRouter()
  // const savedText = props.content.content

  const goPostingPage = () => {
    router.push(`${ROUTE_POSTING_DETAIL}/${content.id}`)
  }
  return (
    <div
      className="smooth-transition hover:scale-105 sort-vertical-flex justify-center w-5/6 h-full truncate rounded-lg p-5 space-y-2 border-2 border-gray-300 bg-[#afbcdf] bg-opacity-20 dark:bg-opacity-10 cursor-pointer"
      onClick={goPostingPage}
    >
      <img src={content.thumbnail} className="rounded-lg h-4/5" />
      <div className="sort-row-flex w-full justify-center space-x-5">
        <span className="font-medium lg:text-xl">{content.title}</span>
      </div>
      <div className="sort-row-flex w-full justify-center space-x-5">
        <div className="flex flex-row items-center">
          <FaRegHeart className="w-4 h-4 text-red-400 mr-1" />
          <span className="text-sm text-red-400">{content.like}</span>
        </div>
        <div className="flex flex-row items-center">
          <FaRegComment className="w-4 h-4 mr-1" />
          <span className="text-sm ">0</span>
        </div>
        <span className="text-sm ">
          {moduleConvertDate(content.updatedAt, '.', false).split(' ')[0]}
        </span>
      </div>
    </div>
  )
}
