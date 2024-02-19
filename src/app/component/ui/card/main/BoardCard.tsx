import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { FaRegComment, FaRegHeart } from 'react-icons/fa'

import { ROUTE_POSTING_DETAIL } from '@/app/constant/route/route-constant'
import { moduleConvertDate } from '@/app/module/utils/moduleTime'
import { type BoardCardType } from '@/app/types/ui/card'

const Viewbox = dynamic(async () => import('../../../ui/editor/TextViewer'), {
  ssr: false,
})
export default function BoardCard(props: BoardCardType) {
  const router = useRouter()
  const savedText = props.content.content

  const goPostingPage = () => {
    router.push(`${ROUTE_POSTING_DETAIL}/${props.content.id}`)
  }
  return (
    <div
      className="cursor-pointer w-full flex flex-row p-4 border border-gray-200 rounded-lg shadow dark:bg-[#1a202c] dark:border-gray-700 mb-5"
      onClick={goPostingPage}
    >
      <div className="flex justify-center items-center w-1/3 truncate rounded-lg">
        {/* <div className="inline-flex items-center mr-2 bg-gray-300 rounded-lg h-10 pr-4 pl-4"> */}
        <img src={props.content.thumbnail} className="rounded-lg" />
        {/* </div> */}
      </div>
      <div className="w-full p-2  truncate">
        <div className="inline-block text-sm md:text-medium">
          <span className="font-bold">{props.content.title}</span>
        </div>
        <Viewbox content={savedText} />

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
      <div className="w-1/3 flex flex-col justify-end p-2">
        <span className="text-sm mb-2">{props.content.name}</span>
        <span className="text-xs">
          {moduleConvertDate(props.content.updatedAt, '.', false).split(' ')[0]}
        </span>
      </div>
    </div>
  )
}
