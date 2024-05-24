import BoardCard from '@/_component/card/main/BoardCard'
import MainTab from '@/_component/tab/main/MainTab'
import { type MainHubProps } from '@/_types/ui/extra'

export default function MainHub(props: MainHubProps) {
  const { currentPostings } = props
  const isCurrentPostingExist = () => {
    return currentPostings.length !== 0
  }
  return (
    <div className="w-4/5 sort-vertical-flex max-w-7xl space-y-5">
      <MainTab />

      {isCurrentPostingExist() ? (
        <section className="w-full sort-vertical-flex rounded-xl shadow-lg p-2 truncate bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10 space-y-3">
          <h1 className="p-3">최근 게시물</h1>
          {currentPostings.map((data, index) => (
            <BoardCard key={index} content={data} />
          ))}
        </section>
      ) : (
        <section className="w-full sort-vertical-flex rounded-xl shadow-lg p-2 truncate bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10 space-y-3">
          <h1>최근 작성된 게시물이 없습니다.</h1>
        </section>
      )}
    </div>
  )
}
