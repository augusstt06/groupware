import { useRouter } from 'next/navigation'
import { FaRegComment, FaRegHeart } from 'react-icons/fa'

import { ROUTE_POSTING_DETAIL } from '@/app/constant/route/route-constant'
import { type BoardCardType } from '@/app/types/ui/cardTypes'

export default function BoardCard(props: BoardCardType) {
  const router = useRouter()
  const savedText = props.content.content

  const goPostingPage = () => {
    router.push(`${ROUTE_POSTING_DETAIL}/${props.content.id}`)
  }

  return (
    <div className="w-full flex flex-row p-4 border border-gray-200 rounded-lg shadow dark:bg-[#1a202c] dark:border-gray-700 mb-5">
      <div className="flex justify-center items-center">
        <div className="inline-flex items-center mr-2 bg-gray-300 rounded-lg h-10 pr-4 pl-4">
          img
        </div>
      </div>
      <div className="w-full p-2 cursor-pointer truncate" onClick={goPostingPage}>
        <div className="inline-block text-sm md:text-medium">
          <span className="font-bold">{props.content.title}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: savedText }} />
        <div className="flex flex-row md:text-sm text-xs w-1/6 mt-2 items-center justify-around">
          <div className="flex flex-row items-center">
            <FaRegHeart className="w-3 h-3 text-red-400 mr-1" />
            <span className="text-gray-600">{props.content.like}</span>
          </div>
          <div className="flex flex-row items-center">
            <FaRegComment className="w-3 h-3 text-gray-400 mr-1" />
            {/* FIXME: 댓글수를 따로 response 받아야함 */}
            <span className="text-gray-600">0</span>
          </div>
        </div>
      </div>
    </div>
  )
}
