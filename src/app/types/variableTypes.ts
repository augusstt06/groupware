// import { Dispatch, SetStateAction } from 'react'

import { type Dispatch, type SetStateAction } from 'react'

import { type CalendarValue } from './pageTypes'
import { type ProjectDetailCardType } from './ui/cardTypes'

export type DecodeType = { uuid: string; iss: string; iat: number; exp: number }

export type BoardListResponseType = {
  boardId: number
  content: string
  createdAt: string
  position: string
  id: number
  title: string
  updatedAt: string
  writerId: number
  name: string
  like: number
  thumbnail: string
}

export type DetailResponseType = {
  comments: CommentType[]
  content: string
  createdAt: string
  id: number
  name: string
  position: string
  title: string
  updatedAt: string
  writerId: number
  like: number
}

export type CommentType = {
  childComments: CommentType[]
  content: string
  createdAt: string
  id: number
  like: number
  name: string
  position: string
  updatedAt: string
  writerId: number
}

export type BoardResponseType = {
  data: [BoardListResponseType]
  total: number
  size: number
}

export type AlertStateType = {
  headDescription: string
  additianoalDescription: string
  option: {
    positive: string
    negative: string
  }
  onClick: (() => Promise<void>) | (() => void)
  isPromise: boolean
}

export type MyBoardType = {
  id: string
  groupUUID: string
  name: string
  createdAt: string
  updatedAt: string
}

export type SelectListType = {
  name: string
  id: string
}

export type ProjectListResponseType = {
  data: ProjectResponseType[]
  page: number
  size: number
  total: number
}

export type ProjectResponseType = {
  color: string
  createdAt: string
  membersCnt: number
  id: number
  issues: []
  name: string
  ownerId: number
  teamId: number
  updatedAt: string
  members: Array<{
    id: number
    uuid: string
    email: string
  }>
}

export type FetchPostProjectResponseType = {
  color: string
  name: string
  teamId: number
}

export type ProjectAlertStateType = {
  mainDescription: string
  subDescription: string
  isCreateModalClose: boolean
}

export type ProjectIssueResponseType = {
  data: ProjectIssueType[]
  page: number
  size: number
  total: number
}
export type ProjectIssueType = {
  assignee: [
    {
      email: 'string'
      id: 0
      uuid: 'string'
    },
  ]
  category: 'string'
  comments: [
    {
      childComments: ['string']
      content: 'string'
      createdAt: 'string'
      id: 0
      like: 0
      name: 'string'
      position: 'string'
      updatedAt: 'string'
      writerId: 0
    },
  ]
  createdAt: 'string'
  description: 'string'
  endAt: 'string'
  files: ['string']
  id: 0
  issuer: {
    email: string
    id: number
    name: string
    uuid: string
  }
  processState: 'string'
  projectId: 0
  startAt: 'string'
  title: 'string'
  updatedAt: 'string'
}

export type ProjectCreateIssueResponseType = {
  category: string
  description: string
  endAt: string
  processState: string
  projectId: number
  startAt: string
  title: string
}
export type DialogTextType = {
  main: string
  sub: string
}

export type ScheduleListType = {
  title: string
  timeCategory: 'start' | 'end'
  isCalendarOpen: boolean
  openCalendar: () => void
  calendarDateValue: CalendarValue
  onDateChange: (date: CalendarValue) => void
  hoursList: string[]
  handleSelectTime: (type: 'start' | 'end', unit: 'hour' | 'minute', value: string) => void
  viewCheckAllDay: boolean
  handleAllday: () => void
  timeState: { hour: string; minute: string }
  isCheckAllday: boolean
}

export type KanbanBoardColumnType = {
  columnTitle: string
  columnCardNumber: number
  columnColor: string
  cardList: ProjectDetailCardType[]
  setCardList: Dispatch<SetStateAction<ProjectDetailCardType[]>>
}
