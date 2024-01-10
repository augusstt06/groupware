import { type SetStateAction } from 'react'

import { type boardListResponsetype } from '../variableTypes'

// import { type boardListResponsetype } from '../variableTypes'

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
  menuList: Array<{
    createdAt: string
    id: number
    name: string
    organizationId: number
    updatedAt: string
  }>
}

export type TodoCardType = {
  // content: boardListResponsetype
}
export type BoardCardType = {
  content: boardListResponsetype
}
