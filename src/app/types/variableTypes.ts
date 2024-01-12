// import { Dispatch, SetStateAction } from 'react'

export type DecodeType = { uuid: string; iss: string; iat: number; exp: number }

export type boardListResponsetype = {
  content: string
  createdAt: string
  position: string
  id: number
  title: string
  updatedAt: string
  writerId: number
  name: string
  like: number
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

export type resType = {
  postings: [boardListResponsetype]
  total: number
  size: number
}

export type boardResType = {
  createdAt: string
  id: number
  name: string
  organizationId: number
  updatedAt: string
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
