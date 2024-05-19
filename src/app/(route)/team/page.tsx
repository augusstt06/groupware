'use client'
import { useRef, useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import TeamMainHub from './_childs/TeamMainHub'
import CreateTeamModal from './_childs/modal/CreateTeamModal'

import ModalHub from '@/_component/modal/Modal'
import {
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
  MODAL_BTN_CREATE,
  MODAL_CREATE_TEAM,
  PROJECT_CARD_REAL_COLOR_BLUE,
  PROJECT_CARD_REAL_COLOR_GREEN,
  PROJECT_CARD_REAL_COLOR_PINK,
  PROJECT_CARD_REAL_COLOR_PURPLE,
  PROJECT_CARD_REAL_COLOR_RED,
  PROJECT_CARD_REAL_COLOR_YELLOW,
  PROJECT_CARD_RES_COLOR_BLUE,
  PROJECT_CARD_RES_COLOR_GREEN,
  PROJECT_CARD_RES_COLOR_PINK,
  PROJECT_CARD_RES_COLOR_PURPLE,
  PROJECT_CARD_RES_COLOR_RED,
  PROJECT_CARD_RES_COLOR_YELLOW,
} from '@/constant/constant'
import { API_URL_TEAMS, API_URL_TEAMS_LIST } from '@/constant/route/api-route-constant'
import useInput from '@/module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/module/utils/moduleCookie'
import { moduleGetFetch, modulePostFetch } from '@/module/utils/moduleFetch'
import { createTeamModalReducer } from '@/store/reducers/team/teamModalReducer'
import { type SuccessResponseType } from '@/types/module'
import { type DialogTextType, type GetTeamListType, type TeamResponseType } from '@/types/variable'

export default function Team() {
  // outer variables
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const dispatch = useAppDispatch()
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const orgId = useAppSelector((state) => state.userInfo.extraInfo.organizationId)
  const createTeamModalState = useAppSelector((state) => state.teamModal.isCreateTeamModalOpen)

  // component variables
  const queryClient = useQueryClient()
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [dialogText, setDialogText] = useState<DialogTextType>({
    main: '',
    sub: '',
  })
  const teamDialogBtnValue = {
    isCancel: false,
    cancleFunc: () => {},
    cancelText: '',
    confirmFunc: () => {
      dialogRef.current?.close()
    },
    confirmText: '확인',
  }
  const teamTitle = useInput('')
  const [teamsColor, setTeamsColor] = useState<string>('')

  const colorList = [
    { name: PROJECT_CARD_RES_COLOR_RED, value: PROJECT_CARD_REAL_COLOR_RED },
    { name: PROJECT_CARD_RES_COLOR_YELLOW, value: PROJECT_CARD_REAL_COLOR_YELLOW },
    { name: PROJECT_CARD_RES_COLOR_GREEN, value: PROJECT_CARD_REAL_COLOR_GREEN },
    { name: PROJECT_CARD_RES_COLOR_BLUE, value: PROJECT_CARD_REAL_COLOR_BLUE },
    { name: PROJECT_CARD_RES_COLOR_PURPLE, value: PROJECT_CARD_REAL_COLOR_PURPLE },
    { name: PROJECT_CARD_RES_COLOR_PINK, value: PROJECT_CARD_REAL_COLOR_PINK },
  ]

  const handleCloseCreateTeamModal = () => {
    teamTitle.resetValue()
    setTeamsColor('')
    dispatch(createTeamModalReducer(false))
  }
  const handleClickCreateTeam = () => {
    if (teamTitle.value === '') {
      setDialogText({
        main: '팀 이름을 입력해 주세요.',
        sub: '',
      })
      dialogRef.current?.showModal()
      return
    }
    if (teamsColor === '') {
      setDialogText({
        main: '색상을 선택해 주세요.',
        sub: '',
      })
      dialogRef.current?.showModal()
      return
    }
    createTeam({ teamColor: teamsColor, teamTitle: teamTitle.value })
    handleCloseCreateTeamModal()
    teamTitle.resetValue()
    setTeamsColor('')
  }

  const renderTeamHub = () => {
    if (isLoading) return <span>데이터를 로딩중입니다.</span>
    return <TeamMainHub teamList={teamList as TeamResponseType[]} />
  }
  const modalList = [
    {
      onClose: handleCloseCreateTeamModal,
      isModalOpen: createTeamModalState,
      childComponent: (
        <CreateTeamModal
          teamName={teamTitle}
          colorList={colorList}
          handleSelectColor={(colorName: string) => {
            setTeamsColor(colorName)
          }}
          selectColor={teamsColor}
        />
      ),
      name: MODAL_CREATE_TEAM,
      btnValue: MODAL_BTN_CREATE,
      confirmFunc: handleClickCreateTeam,
      dialog: dialogRef,
      dialogAlertText: dialogText,
      dialogBtnValue: teamDialogBtnValue,
    },
  ]

  // fetch fn
  const { data: teamList, isLoading } = useQuery({
    queryKey: ['team-list'],
    queryFn: async () => {
      const res = await moduleGetFetch<GetTeamListType>({
        params: {
          limit: 10,
          offset: 0,
          organizationId: orgId,
        },
        fetchUrl: API_URL_TEAMS_LIST,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
      return (res as SuccessResponseType<GetTeamListType>).result.data
    },
  })

  const { mutate: createTeam } = useMutation({
    mutationKey: ['create-team'],
    mutationFn: async ({ teamColor, teamTitle }: { teamColor: string; teamTitle: string }) => {
      await modulePostFetch<string>({
        data: {
          color: teamColor,
          name: teamTitle,
          organizationId: orgId,
        },
        fetchUrl: API_URL_TEAMS,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['team-list'] })
      setDialogText({
        main: '팀이 성공적으로 생성되었습니다.',
        sub: '생성된 팀에서 멤버 초대를 진행해주세요.',
      })
      dialogRef.current?.showModal()
    },
  })

  return (
    <section className="w-full sort-vertical-flex h-4/5">
      {renderTeamHub()}
      <ModalHub modals={modalList} />
    </section>
  )
}
