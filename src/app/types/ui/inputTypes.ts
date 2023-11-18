import type React from 'react'
import { type SetStateAction } from 'react'

export type InfoInputProps = {
  title: string
  placeholder: string
  checkValid: boolean
  icon: React.ReactNode
  useInput: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    resetValue: () => void
  }
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

export type OrgInputProps = {
  componentType: string
  title: string
  placeholder: string
  icon: React.ReactNode
  useInput: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
}
