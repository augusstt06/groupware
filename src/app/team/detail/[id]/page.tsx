'use client'

import { useEffect, useRef, useState } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { TbUsersPlus } from 'react-icons/tb'

import Button from '@/app/component/ui/button/Button'
import TeamMemberCard from '@/app/component/ui/card/team/TeamMemberCard'
import ModalHub from '@/app/component/ui/modal/Modal'
import InviteProjectMemberModal from '@/app/component/ui/modal/project/InviteProjectMemberModal'
import {
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  KEY_X_ORGANIZATION_CODE,
  MODAL_BTN_SAVE,
  MODAL_INVITE_MEMBER_IN_PROJECT,
} from '@/app/constant/constant'
import {
  API_URL_COLLEAGUES,
  API_URL_TEAMS,
  API_URL_TEAMS_INVITE,
} from '@/app/constant/route/api-route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleCheckUserState } from '@/app/module/utils/check/moduleCheckUserState'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { moduleGetFetch, modulePostFetch } from '@/app/module/utils/moduleFetch'
import { teamInviteModalReducer } from '@/app/store/reducers/team/teamModalReducer'
import { type DialogBtnValueType, type SuccessResponseType } from '@/app/types/moduleTypes'
import {
  type ColleagueType,
  type DialogTextType,
  type TeamResponseType,
} from '@/app/types/variableTypes'

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
    <main className="w-10/12 max-w-7xl 2xl:w-2/3 h-4/5 flex flex-col items-center ">
      <div className="md:5/6 w-full flex flex-col items-left dark:bg-[#1a202c] dark:border-gray-700 border border-gray-200 rounded-lg shadow-lg p-2 mb-5">
        <div className="w-full p-3 flex flex-row justify-between items-center">
          <span className="font-bold">
            {teamData() !== null ? teamData()?.name : '데이터를 로딩중입니다.'}
          </span>
          <Button
            buttonContent={inviteBtnContent}
            className="w-1/7 text-center justify-center transition ease-in-out duration-300 rounded-lg shadow bg-indigo-400 dark:bg-indigo-400 hover:bg-indigo-600 hover:dark:bg-indigo-500 justify-center text-white dark:text-white focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center"
            onClick={() => {
              dispatch(teamInviteModalReducer(true))
            }}
          />
        </div>
      </div>
      <div className="w-full max-w-7xl flex flex-col items-center dark:bg-[#1a202c] dark:border-gray-700 border border-gray-200 rounded-lg shadow-lg p-2 truncate">
        <div className="w-full p-3">
          <span className="font-bold">팀 멤버</span>
        </div>
        {teamData()?.members.length !== 0 ? (
          <div className="grid xl:grid-cols-4 xl:gap-x-10 lg:grid-cols-3 lg:gap-x-10 grid-cols-2 gap-x-8 gap-y-6 p-3 ">
            {teamData()?.members.map((data, index) => (
              <TeamMemberCard key={index} memberInfo={data} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>아직 팀 멤버가 없습니다.</p>
            <p>초대를 진행해주세요.</p>
          </div>
        )}
      </div>
      <ModalHub modals={modalList} />
    </main>
  )
}
