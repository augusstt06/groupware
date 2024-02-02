import type React from 'react'
import { type Dispatch, type SetStateAction } from 'react'

import { type UseInputProps } from '../moduleTypes'
import { type MyBoardType, type SelectListType } from '../variableTypes'

// board
export type BoardHubInputProps = {
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
