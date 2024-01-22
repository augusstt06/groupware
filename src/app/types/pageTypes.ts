import { type ChangeEvent, type Dispatch, type SetStateAction } from 'react'

import { type BoardListResponseType, type CommentType } from './variableTypes'

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
  boardList: BoardListResponseType[]
}
export type BoardItemProps = {
  boardListItem: BoardListResponseType
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
export type IssueInputProps = {
  title: string
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export type IssueProgressProps = {
  progressStatusList: Array<{
    title: string
    color: string
    hoverColor: string
    value: string
  }>
  handleProgress: (status: string) => void
  progress: string
}

export type IssueSelecProps = {
  title: string
  selectList: string[]
}

export type ValuePiece = Date | null
export type CalendarValue = ValuePiece | [ValuePiece, ValuePiece]
export type IssueCalendarProps = {
  title: string
  state: boolean
  openModal: () => void
  dateValue: CalendarValue
  onDateChange: (date: CalendarValue) => void
}

export type IssueCalendarWithTimeProps = IssueCalendarProps & {
  hours: string[]
  handleSelectHour: (e: ChangeEvent<HTMLSelectElement>) => void
  handleSelectMinute: (e: ChangeEvent<HTMLSelectElement>) => void
}
export type IssueTimeProps = {
  hours: string[]
  unit: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export type IssueDescriptionProps = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
