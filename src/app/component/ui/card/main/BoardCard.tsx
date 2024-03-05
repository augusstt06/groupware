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
      className="cursor-pointer w-full flex flex-row p-4 border border-gray-200 dark:border-gray-700 mb-5 bg-[#f5f7fc] rounded-xl shadow mb-5 bg-opacity-70 dark:bg-opacity-10"
      onClick={goPostingPage}
    >
      <div className="flex justify-center items-center w-1/3 truncate rounded-lg">
        <img src={props.content.thumbnail} className="rounded-lg" />
      </div>
      <div className="w-full p-2  truncate flex flex-col justify-around">
        <div className="inline-block text-sm md:text-medium">
          <span className="font-bold lg:text-2xl">{props.content.title}</span>
        </div>

        <Viewbox content={savedText} />

        <div className="flex flex-row md:text-sm text-xs w-full mt-2 items-center justify-between">
          <div className="md:w-1/3 w-1/2 flex flex-row items-center justify-around">
            <div className="flex flex-row items-center">
              <FaRegHeart className="lg:w-8 lg:h-8 w-3 h-3 text-red-400 mr-1" />
              <span className="lg:text-xl text-sm text-gray-600">{props.content.like}</span>
            </div>
            <div className="flex flex-row items-center">
              <FaRegComment className="lg:w-8 lg:h-8 w-3 h-3 text-red-400 mr-1" />
              <span className="lg:text-xl text-sm text-gray-600">0</span>
            </div>
          </div>
          <div className="md:w-1/3 w-1/2 text-center flex sm:flex-row flex-col justify-around items-center">
            <span className="lg:text-xl text-sm ">{props.content.name}</span>
            <span className="lg:text-xl text-sm ">
              {moduleConvertDate(props.content.updatedAt, '.', false).split(' ')[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
