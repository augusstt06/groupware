import { type Dispatch, type SetStateAction } from 'react'

import { type Editor } from '@toast-ui/react-editor'

import { type boardListResponsetype } from '../variableTypes'

export type InputIconLabelProps = {
  icon: React.ReactNode
}

export type ProgressbarProps = {
  allItems: number
  completedItems: number
}

export type SidebarProps = {
  title: string
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
  editorContent: string
  setEditorContent: Dispatch<SetStateAction<string>>
  editorRef: React.MutableRefObject<Editor | null>
  countImgFiles: () => number
}

export type BoardModalSaveListTabProps = {
  loadSaveData: (data: boardListResponsetype) => void
  saveList: boardListResponsetype[]
}
