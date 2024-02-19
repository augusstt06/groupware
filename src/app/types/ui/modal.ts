import { type Dispatch, type ReactEventHandler, type SetStateAction } from 'react'

import { type UseInputProps } from '../module'
import { type BoardListResponseType, type ColleagueType, type MyBoardType } from '../variable'

export type BoardWriteModalprops = {
  currentBoard: MyBoardType | null
}
export type CreateProjectModalColorSelectProps = {
  colorList: Array<{
    name: string
    value: string
  }>
  handleSelectColor: (colorName: string) => void
  selectColor: string
}

export type CreateProjectModalProps = {
  projectName: UseInputProps
  colorList: Array<{
    name: string
    value: string
  }>
  handleSelectColor: (colorName: string) => void
  selectColor: string
}
export type CreateTeamModalProps = {
  teamName: UseInputProps
  colorList: Array<{
    name: string
    value: string
  }>
  handleSelectColor: (colorName: string) => void
  selectColor: string
}

export type ModalBtnProps = {
  onClose: ReactEventHandler
  btnValue: string
  confirmFunc: () => void
}

export type UserStateModalProps = {
  changeDialogConfirmFn: (fn: () => Promise<void>) => void
  handleOpenDialog: () => void
  setIsUserStateOpen: Dispatch<SetStateAction<boolean>>
}

export type BoardWriteModalBtnTabProps = {
  handleClickOpenSaveList: () => void
  handleClickPostPending: () => void
  handleClickClose: () => void
  handleClickPosting: () => void
  saveList: BoardListResponseType[]
}
export type InviteProjectMemberModalProps = {
  inviteList: ColleagueType[]
  colleague: ColleagueType[]
  setInviteList: Dispatch<SetStateAction<ColleagueType[]>>
}
export type ProjectInviteListProps = {
  inviteList: ColleagueType[]
}
export type ProjectInviteMemberCardProps = {
  user: ColleagueType
}
export type InviteLoginModalProps = {
  inputList: Array<{
    headLabelContent: JSX.Element
    title: string
    placeholder: string
    useInput: UseInputProps
    type: string
    isTailLabel: boolean
    tailLabelContent: JSX.Element
  }>
}

export type SchedulePlaceProps = {
  schedulePlace: string
  setSelectedPlace: Dispatch<SetStateAction<SearchType | null>>
}
export type SearchType = {
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  distance: string
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
}
export type KakaoMapProps = {
  searchData: SearchType[]
  setSelectedPlace?: Dispatch<SetStateAction<SearchType | null>>
}
