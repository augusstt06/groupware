import { type Dispatch, type MutableRefObject, type SetStateAction } from 'react'

import { type CalendarValue } from './pageTypes'

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
  starred: boolean
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

export type IssueResponseType<T> = {
  data: T[]
  page: number
  size: number
  total: number
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
      email: string
      id: number
      uuid: string
    },
  ]
  category: string
  comments: [
    {
      childComments: string[]
      content: string
      createdAt: string
      id: number
      like: number
      name: string
      position: string
      updatedAt: string
      writerId: number
    },
  ]
  createdAt: string
  description: string
  endAt: string
  files: [string]
  id: number
  issuer: {
    email: string
    id: number
    name: string
    uuid: string
  }
  processState: string
  projectId: number
  startAt: string
  title: string
  updatedAt: string
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
  openCalendar: () => void
  calendarDateValue: CalendarValue
  onDateChange: (date: CalendarValue) => void
  hoursList: string[]
  handleSelectTime: (type: 'start' | 'end', unit: 'hour' | 'minute', value: string) => void
  viewCheckAllDay: boolean
  handleAllday: () => void
  timeState: { hour: string; minute: string }
  isCheckAllday: boolean
  dialog: MutableRefObject<HTMLDialogElement | null>
}

export type TaskListType = {
  title: string
  openModal: () => void
  dateValue: CalendarValue
  onDateChange: (date: CalendarValue) => void
  dialog: MutableRefObject<HTMLDialogElement | null>
}

export type KanbanBoardColumnType = {
  columnTitle: string
  columnCardNumber: number
  columnColor: string
  cardList: ColumnType[]
  setCardList: Dispatch<SetStateAction<ColumnType[]>>
}

export type ColumnType = {
  assignee: [
    {
      email: string
      id: number
      name: string
      uuid: string
    },
  ]
  category: string
  comments: [
    {
      childComments: string[]
      content: string
      createdAt: string
      id: number
      like: number
      name: string
      position: string
      updatedAt: string
      writerId: number
    },
  ]
  createdAt: string
  description: string
  endAt: string
  files: [
    {
      name: string
      url: string
    },
  ]
  id: number
  issuer: {
    email: string
    id: number
    name: string
    uuid: string
  }
  issuerId: number
  processState: string
  projectId: number
  startAt: string
  title: string
  updatedAt: string
}
export type ColumnListType = {
  columnTitle: string
  columnCardNumber: number
  columnColor: string
  cardList: ColumnType[]
  setCardList: Dispatch<SetStateAction<ColumnType[]>>
}

export type SchduleType = {
  category: string
  createdAt: string
  description: string
  endAt: string
  id: number
  issuer: { id: number; name: string; uuid: string; email: string }
  issuerId: number
  projectId: number
  startAt: string
  title: string
  updatedAt: string
}

export type FullCalendarEventType = {
  title: string
  start: string
  end: string
  backgroundColor: string
}
