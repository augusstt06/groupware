import BoardCard from '@/app/component/ui/card/main/BoardCard'
import MainTab from '@/app/component/ui/tab/main/MainTab'
import { type MainHubProps } from '@/app/types/ui/extra'

export default function MainHub(props: MainHubProps) {
  const { currentPostings } = props
  const isCurrentPostingExist = () => {
    return currentPostings.length !== 0
  }
  return (
    <div className="w-4/5 max-w-7xl flex flex-col items-center space-y-5">
      <MainTab />

      {isCurrentPostingExist() ? (
        <section className="w-full flex flex-col items-center rounded-xl shadow-lg p-2 truncate bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10 space-y-3">
          <h1 className="p-3">최근 게시물</h1>
          {currentPostings.map((data, index) => (
            <BoardCard key={index} content={data} />
          ))}
        </section>
      ) : (
        <section className="w-full flex flex-col items-center rounded-xl shadow-lg p-2 truncate bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10 space-y-3">
          <h1>최근 작성된 게시물이 없습니다.</h1>
        </section>
      )}
    </div>
  )
}
