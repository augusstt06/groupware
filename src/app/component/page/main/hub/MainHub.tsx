import TodoCard from '@/app/component/ui/card/main/TodoCard'
import MainTab from '@/app/component/ui/tab/MainTab'
import { type MainHubProps } from '@/app/types/ui/uiTypes'

export default function MainHub(props: MainHubProps) {
  // FIXME: response되는 게시글을  아래 TodoCard 이용하여 mapping
  return (
    <div className="md:w-4/5 w-full flex flex-col items-center">
      <MainTab />

      <TodoCard />
    </div>
  )
}
