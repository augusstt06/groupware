import BoardCard from './board/BoardCard'
import HistoryCard from './main/HistoryCard'
import NameCard from './main/NameCard'
import VacationCard from './main/VacationCard'

import { MAIN } from '@/app/constant/constant'
import { type UserCardProps } from '@/app/types/ui/cardTypes'

export default function MainCardGroup(props: UserCardProps) {
  return (
    <>
      {props.title === MAIN ? (
        <>
          <NameCard />
          <HistoryCard
            reRender={props.reRender}
            setRerender={props.setRerender}
            title={props.title}
          />
          <VacationCard />
        </>
      ) : (
        <>
          <BoardCard />
        </>
      )}
    </>
  )
}
