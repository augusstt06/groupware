import { type Dispatch, type SetStateAction } from 'react'

import { type BoardListResponsetype, type MyBoardType } from '../variableTypes'

export type TaskCardProps = {
  title: string
  description: string
  link: string
}

export type HistoryCardProps = {
  title: string
  reRender: boolean
  setRerender: React.Dispatch<SetStateAction<boolean>>
}
export type UserCardProps = {
  title: string
  reRender: boolean
  setRerender: React.Dispatch<SetStateAction<boolean>>
}

export type BoardSideCardProps = {
  myBoardList: MyBoardType[]
}

export type TodoCardType = {
  // content: boardListResponsetype
}
export type BoardCardType = {
  content: BoardListResponsetype
}

export type MainSidebarCardGroupProps = {
  title: string
  reRender: boolean
  setRerender: Dispatch<SetStateAction<boolean>>
  myBoardList: MyBoardType[]
}
