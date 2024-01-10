import BoardCard from '@/app/component/ui/card/main/BoardCard'
import MainTab from '@/app/component/ui/tab/MainTab'
import { type BoardHubProps } from '@/app/types/ui/uiTypes'

export default function BoardHub(props: BoardHubProps) {
  // FIXME: response되는 게시글을  아래 TodoCard 이용하여 mapping

  //   console.log(props, '이걸로 매핑')
  return (
    <div className="md:w-4/5 w-full flex flex-col items-center">
      <MainTab title={props.title} />
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
