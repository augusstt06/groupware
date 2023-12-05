import HistoryCard from './main/HistoryCard'
import NameCard from './main/NameCard'
import VacationCard from './main/VacationCard'

import { type UserCardProps } from '@/app/types/ui/cardTypes'

export default function MainCardGroup(props: UserCardProps) {
  return (
    <>
      <NameCard />
      <HistoryCard reRender={props.reRender} setRerender={props.setRerender} />
      <VacationCard />
    </>
  )
}
