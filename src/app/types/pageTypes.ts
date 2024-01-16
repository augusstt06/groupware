import { type Dispatch, type SetStateAction } from 'react'

import { type BoardListResponsetype, type CommentType } from './variableTypes'

export type ReactProps = {
  children: React.ReactNode
}

export type RegisterInfoTypeProps = {
  isPwdView: boolean
  setIsPwdView: React.Dispatch<SetStateAction<boolean>>
  isPwdConfirmView: boolean
  setIsPwdConfirmView: React.Dispatch<SetStateAction<boolean>>
  setErrMsg: (errDescription: string) => void
}

export type RegisterOrgProps = {
  organization: string
  setOrganization: React.Dispatch<SetStateAction<string>>
  setErrMsg: (errDescription: string) => void
}

export type HubCategoryProps = {
  title: string
  issue: string[]
}

export type PageParam = {
  category: string
}

export type BoardItemHubProps = {
  boardList: BoardListResponsetype[]
}
export type BoardItemProps = {
  boardListItem: BoardListResponsetype
  isCurrent: boolean
}

export type PaginationProps = {
  size: number
  pageNumber: number
  setPageNumber: Dispatch<SetStateAction<number>>
}

export type CommentProps = {
  doRerender: () => void
  postingID: number
  comments: {
    childComments: CommentType[]
    content: string
    id: number
    name: string
    position: string
    writerId: number
    like: number
  }
  mention?: {
    isMention: boolean
    parentName: string
  }
}

export type WriteCommentProps = {
  doRerender: () => void
  postingID: number
  parentID: number | null
}
