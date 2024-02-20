import type React from 'react'
import { type Dispatch, type SetStateAction } from 'react'

import { type UseInputProps } from '../moduleTypes'
import { type MyBoardType, type SelectListType } from '../variableTypes'

// basic
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isLabel: boolean
  labelHtmlfor?: string
  labelContent?: React.ReactNode
  labelClassName?: string
}
export type InputGroupProps = {
  title: string
  isHeadLabel: boolean
  placeholder: string
  useInput: UseInputProps
  type: string
  isTailLabel: boolean
  tailLabelContent?: React.ReactNode
  headLabelContent?: React.ReactNode
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  className: string
}
export type FloatingInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  title: string
  inputViewType: string
  isViewActive: boolean
  handleViewType?: () => void
}

// group
export type BoardMainInputGroupProps = {
  searchInput: UseInputProps
  clickSearchPostings: () => void
}

export type BoardModalInputGruopProps = {
  currentBoard: MyBoardType | null
  titleInput: UseInputProps
  select: string
  setSelect: Dispatch<SetStateAction<string>>
  thumbNailUrl: string | null
  setThumbNailUrl: Dispatch<SetStateAction<string>>
  selectList: SelectListType[]
}

export type BoardCategoryInputProps = {
  currentBoard: MyBoardType | null
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  select: string
  selectList: SelectListType[]
}
