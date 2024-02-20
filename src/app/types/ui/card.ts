import { type Dispatch, type SetStateAction } from 'react'

import {
  type BoardListResponseType,
  type ColleagueType,
  type MyBoardType,
  type ProjectResponseType,
  type ScheduleType,
  type TeamResponseType,
} from '../variable'

export type TaskCardProps = {
  title: string
  description: string
  link: string
}

export type HistoryCardProps = {
  title: string
  reRender: boolean
  setRerender: React.Dispatch<SetStateAction<boolean>>
}

export type BoardSideCardProps = {
  myBoardList: MyBoardType[]
}

export type BoardCardType = {
  content: BoardListResponseType
}

export type MainSidebarCardGroupProps = {
  title: string
  reRender: boolean
  setRerender: Dispatch<SetStateAction<boolean>>
  myBoardList: MyBoardType[]
}

// Project

export type ProjectCardProps = {
  projectInfo: ProjectResponseType
}

export type ProjectDetailTaskCardProps = {
  title: string
  time: string
  cardColor: string
}
export type ProjectDetailTodoCardProps = {
  todo: ScheduleType
}
export type ProjectInviteCardProps = {
  userInfo: ColleagueType
  inviteList: ColleagueType[]
}

export type TeamCardProps = {
  teamInfo: TeamResponseType
}
export type TeamMemberCardProps = {
  memberInfo: { email: string; id: number; name: string; position: string; uuid: string }
}
