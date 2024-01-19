// import { Dispatch, SetStateAction } from 'react'

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
  id: number
  issues: []
  name: string
  ownerId: number
  teamId: number
  updatedAt: string
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
