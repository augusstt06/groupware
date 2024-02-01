import type React from 'react'
import { type Dispatch, type SetStateAction } from 'react'

import { type UseInputProps } from '../moduleTypes'
import { type MyBoardType, type SelectListType } from '../variableTypes'

export type InfoInputProps = {
  title: string
  placeholder: string
  checkValid: boolean
  icon: React.ReactNode
  setErrMsg: (errDescription: string) => void
  useInput: UseInputProps
}

export type PwdInputProps = {
  title: string
  placeholder: string
  icon: React.ReactNode
  isInputValueView: boolean
  setIsInputValueView: React.Dispatch<SetStateAction<boolean>>
  useInput: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    resetValue: () => void
  }
}

export type PwdConfirmInputProps = {
  title: string
  placeholder: string
  icon: React.ReactNode
  isPwdConfirmView: boolean
  setIsPwdConfirmView: React.Dispatch<SetStateAction<boolean>>
  useInput: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    resetValue: () => void
  }
}

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
