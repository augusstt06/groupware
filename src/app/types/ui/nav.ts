import { type Dispatch, type ReactNode, type RefObject, type SetStateAction } from 'react'

export type ResponsiveNavProps = {
  isDropOpen: boolean
  setIsDropOpen: Dispatch<SetStateAction<boolean>>
  setIsUserStateOpen: Dispatch<SetStateAction<boolean>>
  dropRef: RefObject<HTMLDivElement>
  handleOpenDialog: () => void
  changeDialogConfirmFn: (fn: () => Promise<void>) => void
}
export type RenderNavProps = {
  children: ReactNode
  isRender: () => boolean
}

export type NavHamburgerMenuProps = {
  setIsUserStateOpen: Dispatch<SetStateAction<boolean>>
  handleOpenDialog: () => void
  changeDialogConfirmFn: (fn: () => Promise<void>) => void
}

export type NavNormalMenuProps = NavHamburgerMenuProps & {
  changeDialogConfirmFn: (fn: () => Promise<void>) => void
  handleOpenDialog: () => void
  clickUserStateMenu: () => void
  isUserStateOpen: boolean
  isDropOpen: boolean
  clickDropdownMenu: () => void
}
