import { type Dispatch, type SetStateAction } from 'react'

import { type boardListResponsetype, type boardResType } from '../variableTypes'

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
  boardCategoryList:
    | {
        boardName: string
        menuList: boardResType[]
      }
    | undefined
}

export type TodoCardType = {
  // content: boardListResponsetype
}
export type BoardCardType = {
  content: boardListResponsetype
}

export type MainSidebarCardGroupProps = {
  title: string
  reRender: boolean
  setRerender: Dispatch<SetStateAction<boolean>>
  boardCategoryList:
    | {
        boardName: string
        menuList: boardResType[]
      }
    | undefined
}
