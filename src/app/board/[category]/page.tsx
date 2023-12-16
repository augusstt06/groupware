import BoardHub from '@/app/component/page/main/hub/board/BoardHub'
import Sidebar from '@/app/component/ui/sidebar/Sidebar'
import { ANNOUNCE, BOARD } from '@/app/constant/constant'
import { type PageParam } from '@/app/types/pageTypes'

export default function BoardCategory({ params }: { params: PageParam }) {
  const category = params.category === ANNOUNCE ? '공지사항' : ''
  return (
    <main className="w-full grid gap-4 grid-cols-4 h-4/5 pt-10 md:ml-10 md:mr-10 ml-5 z-1">
      <Sidebar title={BOARD} />
      <div className="md:col-span-3 mr-10 col-span-4">
        <BoardHub params={category} />
      </div>
    </main>
  )
}
