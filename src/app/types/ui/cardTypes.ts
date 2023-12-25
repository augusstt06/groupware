import { type SetStateAction } from 'react'

export type TaskCardProps = {
  title: string
  description: string
  link: string
}

export type UserCardProps = {
  title: string
  reRender: boolean
  setRerender: React.Dispatch<SetStateAction<boolean>>
}
