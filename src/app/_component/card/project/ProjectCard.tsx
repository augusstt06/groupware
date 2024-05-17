'use client'

import { useRef, useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { FaRegStar, FaStar } from 'react-icons/fa'

import Dialog from '../../modal/dialog/Dialog'

import {
  KEY_ACCESS_TOKEN,
  KEY_X_ORGANIZATION_CODE,
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
import { API_URL_PROJECT_STAR, API_URL_PROJECT_UNSTAR } from '@/constant/route/api-route-constant'
import { ROUTE_PROJECT_DETAIL } from '@/constant/route/route-constant'
import { useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/module/utils/moduleCookie'
import { moduleDeleteFetchWithBody, modulePostFetch } from '@/module/utils/moduleFetch'
import { type DialogBtnValueType } from '@/types/module'
import { type ProjectCardProps } from '@/types/ui/card'
import { type DialogTextType } from '@/types/variable'

export default function ProjectCard(props: ProjectCardProps) {
  const queryClient = useQueryClient()
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const handleDialogClose = () => {
    dialogRef.current?.close()
  }
  const [projectDialogBtnValue] = useState<DialogBtnValueType>({
    isCancel: false,
    cancleFunc: () => {},
    cancelText: '',
    confirmFunc: handleDialogClose,
    confirmText: '확인',
  })
  const [dialogText, setDialogText] = useState<DialogTextType>({
    main: '',
    sub: '',
  })
  // FIXME: response에 star 들어오면 별모양 바꾸기
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])

  const { mutate: star } = useMutation({
    mutationKey: ['star'],
    mutationFn: async () => {
      await modulePostFetch<string>({
        data: {
          projectId: props.projectInfo.id,
        },
        fetchUrl: API_URL_PROJECT_STAR,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['project-list'] })
    },
    onError: () => {
      setDialogText({
        main: '중요 프로젝트 전환에 실패했습니다.',
        sub: ' 다시 시도해 주세요.',
      })
      dialogRef.current?.showModal()
    },
  })
  const { mutate: unstar } = useMutation({
    mutationKey: ['unstar'],
    mutationFn: async () => {
      await moduleDeleteFetchWithBody<string>({
        data: {
          projectId: props.projectInfo.id,
        },
        fetchUrl: API_URL_PROJECT_UNSTAR,
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['project-list'] })
    },
    onError: () => {
      setDialogText({
        main: '일반 프로젝트 전환에 실패했습니다.',
        sub: ' 다시 시도해 주세요.',
      })
      dialogRef.current?.showModal()
    },
  })

  const handleClickStar = () => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (props.projectInfo.starred) unstar()
    else star()
  }
  const cardColor = (color: string) => {
    switch (color) {
      case PROJECT_CARD_RES_COLOR_RED:
        return PROJECT_CARD_REAL_COLOR_RED
      case PROJECT_CARD_RES_COLOR_BLUE:
        return PROJECT_CARD_REAL_COLOR_BLUE
      case PROJECT_CARD_RES_COLOR_GREEN:
        return PROJECT_CARD_REAL_COLOR_GREEN
      case PROJECT_CARD_RES_COLOR_PINK:
        return PROJECT_CARD_REAL_COLOR_PINK
      case PROJECT_CARD_RES_COLOR_PURPLE:
        return PROJECT_CARD_REAL_COLOR_PURPLE
      case PROJECT_CARD_RES_COLOR_YELLOW:
        return PROJECT_CARD_REAL_COLOR_YELLOW
      default:
        return PROJECT_CARD_REAL_COLOR_RED
    }
  }

  return (
    <div
      className="smooth-transition sort-row-flex dark:bg-gray-100 dark:text-black h-24 2xl:w-44 xl:w-48 md:w-48 w-32 border-gray-300 border-1 shadow-2xl hover:scale-110 hover:shadow-2xl bg-white"
      style={{ boxShadow: '5px 0px 10px rgba(0, 0, 0, 0.1)' }}
    >
      <div className={`${cardColor(props.projectInfo.color)} w-8 md:w-10 h-full`}></div>

      <div className="w-2/3 md:w-4/6 p-2 md:p-3 truncate">
        <Link
          href={`${ROUTE_PROJECT_DETAIL}/${props.projectInfo.id}`}
          className="flex flex-col items-left h-full justify-around"
        >
          <span className="text-sm font-bold truncate">{props.projectInfo.name}</span>
          <span className="text-xs text-gray-300 dark:text-gray-400">
            {props.projectInfo.membersCnt}명 참여중
          </span>
        </Link>
      </div>

      <div className="h-full p-2 cursor-pointer">
        {props.projectInfo.starred === true ? (
          <FaStar
            className="text-yellow-400 transition ease-in-out duration-500 hover:scale-150"
            onClick={handleClickStar}
          />
        ) : (
          <FaRegStar
            className="text-yellow-400 transition ease-in-out duration-500 hover:scale-150"
            onClick={handleClickStar}
          />
        )}
      </div>
      <Dialog
        dialog={dialogRef}
        dialogAlertText={dialogText}
        dialogBtnValue={projectDialogBtnValue}
      />
    </div>
  )
}
