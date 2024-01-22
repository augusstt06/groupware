import { type Dispatch, type SetStateAction } from 'react'

import { type Editor } from '@toast-ui/react-editor'

import {
  type BoardListResponseType,
  type MyBoardType,
  type ProjectIssueType,
  type ProjectResponseType,
} from '../variableTypes'

export type InputIconLabelProps = {
  icon: React.ReactNode
}

export type ProgressbarProps = {
  allItems: number
  completedItems: number
}

export type SelectboxProps = {
  compoenetType: string
  title: string
  apiKey: string
  selectList: Array<{ name: string; value: string }>
}

export type ToggleProps = {
  title: string
  value: string
  componentType: string
}

export type ToggleGroupProps = {
  compoenetType: string
  toggleData: Array<{ title: string; value: string }>
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
export type MainTabProps = {
  title: string
  myBoardList: MyBoardType[]
}
export type BoardTabProps = {
  title: string
  changeBoard: (name: string) => void
  selectBoard: string
}

export type GnbHamburgerMenuProps = {
  isConfirmOpen: boolean
  setIsConfirmOpen: Dispatch<SetStateAction<boolean>>
  confirmValue: boolean
  setConfirmValue: Dispatch<SetStateAction<boolean>>
  setIsUserStateOpen: Dispatch<SetStateAction<boolean>>
}

export type GnbNormalMenuProps = GnbHamburgerMenuProps & {
  clickUserStateMenu: () => void
  isUserStateOpen: boolean
  isDropOpen: boolean
  clickDropdownMenu: () => void
}

export type ProjectDetailTableProps = {
  title: string
  list: ProjectIssueType[] | null
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

export type ProjectDetailTabProps = {
  projectInfo: ProjectResponseType | null
}
export type ProjectDetailHubProps = {
  projectInfo: ProjectResponseType | null
  issueList: ProjectIssueType[] | null
  pinnedList: ProjectIssueType[] | null
}
