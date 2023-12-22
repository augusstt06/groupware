import TodoCard from '@/app/component/ui/card/main/TodoCard'
import MainTab from '@/app/component/ui/tab/MainTab'

export default function MainHub(props: { title: string }) {
  // FIXME: response되는 게시글을  아래 TodoCard 이용하여 mapping
  return (
    <div className="md:w-4/5 w-full flex flex-col items-center">
      <MainTab title={props.title} />
      <TodoCard />
    </div>
  )
}
