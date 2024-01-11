import BoardCard from '@/app/component/ui/card/main/BoardCard'
import BoardTab from '@/app/component/ui/tab/BoardTab'
import { type BoardHubProps } from '@/app/types/ui/uiTypes'

export default function BoardHub(props: BoardHubProps) {
  return (
    <div className="md:w-4/5 w-full flex flex-col items-center">
      <BoardTab title={props.title} boardCategoryList={props.boardCategoryList} />
      {props.boardList !== undefined ? (
        <>
          {props.boardList.map((data) => (
            <BoardCard key={data.id} content={data} />
          ))}
        </>
      ) : (
        <span>게시글이 없습니다.</span>
      )}
    </div>
  )
}
