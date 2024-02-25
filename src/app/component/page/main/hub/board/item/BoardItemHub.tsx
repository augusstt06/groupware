import BoardItem from './BoardItem'

import { type BoardItemHubProps } from '@/app/types/pageType'

export default function BoardItemHub(props: BoardItemHubProps) {
  const isListEmpty = () => {
    if (props.boardList.length !== 0) return true
    return false
  }
  const isCurrentPost = (targetDate: string): boolean => {
    const targetDateTime = new Date(targetDate).getTime()
    const currentTime = new Date().getTime()
    const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000

    return currentTime - targetDateTime <= threeDaysInMilliseconds
  }
  return (
    <>
      {isListEmpty() ? (
        props.boardList.map((data) => (
          <BoardItem key={data.id} boardListItem={data} isCurrent={isCurrentPost(data.createdAt)} />
        ))
      ) : (
        <div className="p-10 text-center">게시글이 없습니다.</div>
      )}
    </>
  )
}
