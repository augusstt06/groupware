import { type SetStateAction } from 'react'

export type HamburgerProps = {
  nav: boolean
  setNav: React.Dispatch<SetStateAction<boolean>>
}

export type BtnProps = {
  title: string
}

export type RegisterBtnProps = {
  handleStep: () => void
}

export type RegisterBtnElementProps = RegisterBtnProps & {
  title: string
  tailwindClass: string
}

export type OrgChooseBtnProps = {
  organization: string
  setOrganization: React.Dispatch<SetStateAction<string>>
}
