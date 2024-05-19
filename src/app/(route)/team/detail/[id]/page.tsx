'use client'

import { useEffect, useRef, useState } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { TbUsersPlus } from 'react-icons/tb'

import InviteProjectMemberModal from '@/(route)/project/_childs/modal/InviteProjectMemberModal'
import Button from '@/_component/button/Button'
import TeamMemberCard from '@/_component/card/team/TeamMemberCard'
import ModalHub from '@/_component/modal/Modal'
import {
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  KEY_X_ORGANIZATION_CODE,
  MODAL_BTN_SAVE,
  MODAL_INVITE_MEMBER_IN_PROJECT,
} from '@/constant/constant'
import {
  API_URL_COLLEAGUES,
  API_URL_TEAMS,
  API_URL_TEAMS_INVITE,
} from '@/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleCheckUserState } from '@/module/utils/check/moduleCheckUserState'
import { moduleGetCookie } from '@/module/utils/moduleCookie'
import { moduleGetFetch, modulePostFetch } from '@/module/utils/moduleFetch'
import { teamInviteModalReducer } from '@/store/reducers/team/teamModalReducer'
import { type DialogBtnValueType, type SuccessResponseType } from '@/types/module'
import { type ColleagueType, type DialogTextType, type TeamResponseType } from '@/types/variable'

export default function TeamDetail() {
  // outer
  const router = useRouter()
  const orgId = useAppSelector((state) => state.userInfo.extraInfo.organizationId)
  const dispatch = useAppDispatch()
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])

  // componenet variables
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [memberList, setMemberList] = useState<ColleagueType[]>([])
  const [inviteList, setInviteList] = useState<ColleagueType[]>([])
  const [dialogText, setDialogText] = useState<DialogTextType>({
    main: '',
    sub: '',
  })

  const projectDialogBtnValue: DialogBtnValueType = {
    isCancel: false,
    cancleFunc: () => {},
    cancelText: '',
    confirmFunc: () => {
      dialogRef.current?.close()
    },
    confirmText: '확인',
  }
  const queryTeamId = useParams().id
  const teamData = () => {
    if (isLoading) return null
    return team?.result
  }
  const inviteBtnContent = (
    <>
      <TbUsersPlus className="mr-2" />
      <span>초대하기</span>
    </>
  )
  const isInviteModalOpen = useAppSelector((state) => state.teamModal.isTeamInviteModalOpen)
  const handleCloseInviteModal = () => {
    dispatch(teamInviteModalReducer(false))
  }

  // fetch fn
  const { data: team, isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const res = await moduleGetFetch<TeamResponseType>({
        params: {
          teamId: Number(queryTeamId),
        },
        fetchUrl: API_URL_TEAMS,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
      return res as SuccessResponseType<TeamResponseType>
    },
  })

  const { mutate: invite } = useMutation({
    mutationKey: ['invite'],
    mutationFn: async () => {
      const invitedList = inviteList.map((data) => data.userId)
      await modulePostFetch<string>({
        data: {
          members: invitedList,
          teamId: team?.result.id,
        },
        fetchUrl: API_URL_TEAMS_INVITE,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
    },
    onSuccess: () => {
      setDialogText({
        main: '초대에 성공했습니다.',
        sub: '',
      })
      handleCloseInviteModal()
    },
    onError: () => {
      setDialogText({
        main: '초대에 실패했습니다.',
        sub: '',
      })
    },
  })

  const fetchColleague = async () => {
    const res = await moduleGetFetch<ColleagueType[]>({
      params: {
        limit: 10,
        offset: 0,
        organizationId: orgId,
      },
      fetchUrl: API_URL_COLLEAGUES,
      header: {
        Authorization: `Bearer ${accessToken}`,
        [KEY_X_ORGANIZATION_CODE]: orgCode,
      },
    })
    const members = (res as SuccessResponseType<ColleagueType[]>).result.filter(
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      (data) => !data.team.some((teamData) => teamData.id === team?.result.id),
    )
    setMemberList(members)
  }

  const modalList = [
    {
      onClose: handleCloseInviteModal,
      isModalOpen: isInviteModalOpen,
      childComponent: (
        <InviteProjectMemberModal
          colleague={memberList}
          inviteList={inviteList}
          setInviteList={setInviteList}
        />
      ),
      name: MODAL_INVITE_MEMBER_IN_PROJECT,
      btnValue: MODAL_BTN_SAVE,
      confirmFunc: invite,
      dialog: dialogRef,
      dialogAlertText: dialogText,
      dialogBtnValue: projectDialogBtnValue,
    },
  ]

  useEffect(() => {
    moduleCheckUserState({ loginCompleteState, router, accessToken, setAccessToken })
  }, [accessToken])

  useEffect(() => {
    if (!isLoading) {
      void fetchColleague()
    }
  }, [isLoading])

  return (
    <section className="w-full sort-vertical-flex h-4/5">
      <div className="w-4/5 max-w-7xl flex flex-col items-left rounded-xl shadow-lg p-2 truncate bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10 mb-5">
        <div className="justify-between w-full p-3 sort-row-flex">
          <span className="font-bold">
            {teamData() !== null ? teamData()?.name : '데이터를 로딩중입니다.'}
          </span>
          <Button
            buttonContent={inviteBtnContent}
            className="w-1/7 smooth-transition rounded-lg shadow bg-indigo-400 dark:bg-indigo-400 hover:bg-indigo-600 hover:dark:bg-indigo-500 justify-center text-white dark:text-white focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center"
            onClick={() => {
              dispatch(teamInviteModalReducer(true))
            }}
          />
        </div>
      </div>
      <div className="w-4/5 max-w-7xl sort-vertical-flex rounded-xl shadow-lg p-2 bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10 truncate">
        <div className="w-full p-3">
          <span className="font-bold">팀 멤버</span>
        </div>
        {teamData()?.members.length !== 0 ? (
          <div className="grid grid-cols-2 p-3 xl:grid-cols-4 xl:gap-x-10 lg:grid-cols-3 lg:gap-x-10 gap-x-8 gap-y-6 ">
            {teamData()?.members.map((data, index) => (
              <TeamMemberCard key={index} memberInfo={data} />
            ))}
          </div>
        ) : (
          <div className="p-5 text-center">
            <p>There are no team members yet.</p>
            <p> Please proceed with the invitation.</p>
          </div>
        )}
      </div>
      <ModalHub modals={modalList} />
    </section>
  )
}
