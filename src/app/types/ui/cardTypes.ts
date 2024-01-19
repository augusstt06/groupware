import { type Dispatch, type SetStateAction } from 'react'

import {
  type BoardListResponseType,
  type MyBoardType,
  type ProjectResponseType,
} from '../variableTypes'

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
  content: BoardListResponseType
}

export type MainSidebarCardGroupProps = {
  title: string
  reRender: boolean
  setRerender: Dispatch<SetStateAction<boolean>>
  myBoardList: MyBoardType[]
}

// Project

export type ProjectCardProps = {
  projectInfo: ProjectResponseType
}
