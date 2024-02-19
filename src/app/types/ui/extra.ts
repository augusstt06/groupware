// FIXME: 컴포넌트 리팩토링 끝나면 여기 파일에 atomic componet 타입넣기

import { type Dispatch, type SetStateAction } from 'react'

import { type Editor } from '@toast-ui/react-editor'

import {
  type BoardListResponseType,
  type ColleagueType,
  type MyBoardType,
  type ProjectIssueType,
  type ProjectResponseType,
  type TeamResponseType,
} from '../variable'

export type LabelProps = {
  title: string
}
export type LabelIconProps = {
  icon: React.ReactNode
}

export type BoardWriteModalCheckBoxProps = {
  isAnnounce: string
  handleClick: () => void
}

export type EditorProps = {
  saveContent: string
  editorContent: string
  setEditorContent: Dispatch<SetStateAction<string>>
  editorRef: React.MutableRefObject<Editor | null>
  countImgFiles: () => number
}

export type BoardModalSaveListTabProps = {
  loadSaveData: (data: BoardListResponseType) => void
  saveList: BoardListResponseType[]
  handleClickDeletePending: (id: number) => void
}
export type MainHubProps = {
  title: string
}
export type BoardHubProps = {
  changeBoard: (name: string) => void
  title: string
  boardList: BoardListResponseType[]
  selectBoard: string
  myBoardList: MyBoardType[]
}

export type BoardTabProps = {
  title: string
  changeBoard: (name: string) => void
  selectBoard: string
}

export type ProjectDetailTableProps = {
  title: string
  issue: ProjectIssueType
}

export type CreateProjectIssueModalTabProps = {
  selectCategory: string
  changeSelectCategory: (id: string) => void
}

export type CreateProjectIssueModalHubProps = {
  selectCategory: string
}

export type ProjectMainHubProps = {
  projectList: ProjectResponseType[]
}
export type TeamMainHubProps = {
  teamList: TeamResponseType[]
}

export type ProjectDetailTabProps = {
  colleague: ColleagueType[]
  projectInfo: ProjectResponseType | null
}
export type ProjectDetailHubProps = {
  projectInfo: ProjectResponseType | null
  issueList: ProjectIssueType[] | null
  pinnedList: ProjectIssueType[] | null
}

export type ProjectDetailMainProps = {
  projectInfo: ProjectResponseType | null
  issueList: ProjectIssueType[] | null
  pinnedList: ProjectIssueType[] | null
}
export type InviteProjectMemberTableProps = {
  memberInfo: {
    name: string
    id: number
    uuid: string
    email: string
  }
}
