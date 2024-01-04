import { type Dispatch, type SetStateAction } from 'react'

import { type boardListResponsetype } from './variableTypes'

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

export type BoardItemProps = {
  boardListItem: boardListResponsetype
}

export type PaginationProps = {
  size: number
  pageNumber: number
  setPageNumber: Dispatch<SetStateAction<number>>
}

export type CommentObjType = {
  childComments: CommentObjType[]
  content: string
  id: number
  name: string
  position: string
  writerId: number
}
export type CommentProps = {
  postingID: number
  comments: {
    childComments: CommentObjType[]
    content: string
    id: number
    name: string
    position: string
    writerId: number
  }
}
