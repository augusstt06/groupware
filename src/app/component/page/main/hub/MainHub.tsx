import TodoCard from '@/app/component/ui/card/main/TodoCard'
import MainTab from '@/app/component/ui/tab/main/MainTab'
import { type MainHubProps } from '@/app/types/ui/extra'

export default function MainHub(props: MainHubProps) {
  // FIXME: response되는 게시글을  아래 TodoCard 이용하여 mapping
  return (
    <div className="w-4/5 max-w-7xl flex flex-col items-center space-y-5">
      <MainTab />

      <TodoCard />
    </div>
  )
}
