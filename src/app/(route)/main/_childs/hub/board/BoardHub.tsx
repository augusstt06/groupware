import BoardCard from '@/_component/card/main/BoardCard'
import BoardTab from '@/_component/tab/board/BoardTab'
import { type BoardHubProps } from '@/types/ui/extra'

export default function BoardHub(props: BoardHubProps) {
  const { title, selectBoard, changeBoard, boardList } = props
  return (
    <div className="md:w-4/5 w-full flex flex-col items-center pl-5 pr-5">
      <BoardTab title={title} selectBoard={selectBoard} changeBoard={changeBoard} />
      {boardList.length !== 0 ? (
        <section className="grid grid-cols-2 xl:grid-cols-3 place-items-center h-full border-2 border-gray-300 p-5 bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10 rounded-lg">
          {props.boardList.map((data) => (
            <BoardCard key={data.id} content={data} />
          ))}
        </section>
      ) : (
        <div className="rounded-xl w-full h-40 flex items-center justify-center bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-30">
          There are no posts yet.
        </div>
      )}
    </div>
  )
}
