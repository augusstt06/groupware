import BoardCard from '@/app/component/ui/card/main/BoardCard'
import BoardTab from '@/app/component/ui/tab/board/BoardTab'
import { type BoardHubProps } from '@/app/types/ui/extra'

export default function BoardHub(props: BoardHubProps) {
  return (
    <div className="md:w-4/5 w-full flex flex-col items-center">
      <BoardTab
        title={props.title}
        selectBoard={props.selectBoard}
        changeBoard={props.changeBoard}
      />
      {props.boardList.length !== 0 ? (
        <>
          {props.boardList.map((data) => (
            <BoardCard key={data.id} content={data} />
          ))}
        </>
      ) : (
        <section className="rounded-xl w-full h-40 flex items-center justify-center bg-white bg-opacity-70 bg-opacity-10">
          There are no posts yet.
        </section>
      )}
    </div>
  )
}
