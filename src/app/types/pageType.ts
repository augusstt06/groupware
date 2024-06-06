import { type ChangeEvent, type Dispatch, type SetStateAction } from 'react'

import { type QueryObserverResult, type RefetchOptions } from '@tanstack/react-query'

import {
  type BoardListResponseType,
  type ColumnType,
  type CommentType,
  type IssueDatailType,
  type ScheduleListType,
} from './variable'

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
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult>
  url: string
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
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult>
  postingID: number
  parentID: number | null
  url: string
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
  openModal: () => void
  dateValue: CalendarValue
  onDateChange: (date: CalendarValue) => void
}

export type IssueCalendarWithTimeProps = {
  scheduleData: ScheduleListType
}
export type IssueTimeProps = {
  timeCategory: string
  defaultStartTime: { hour: string; minute: string }
  defaultEndTime: { hour: string; minute: string }
  isCheckAllday: boolean
  hoursList: string[]
  minutesList: string[]
  timeState: { hour: string; minute: string }
  unit: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  viewCheckAllDay: boolean
}

export type IssueDescriptionProps = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export type ProjectDetailTaskColumnProps = {
  columnTitle: string
  columnCardNumber: number
  columnColor: string
  cardList: ColumnType[]
}

export type ProjectIssueDetailProps = {
  issue: IssueDatailType | null
}

export type AccessInviteProps = {
  join: () => void
}
export type InviteLoginProps = { handleLoginModal: () => void }
