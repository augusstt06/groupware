import { type CommentObjType } from './pageTypes'

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
}

export type DetailResponseType = {
  comments: CommentObjType[]
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
