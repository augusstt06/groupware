'use client'

import { useRef, useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { AiOutlineMail } from 'react-icons/ai'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { RiLockPasswordFill } from 'react-icons/ri'

import {
  INVITE_PROJECT,
  INVITE_TEAM,
  KEY_ACCESS_TOKEN,
  KEY_UUID,
  KEY_X_ORGANIZATION_CODE,
  REGISTER_EMAIL,
  REGISTER_PWD,
  TRUE,
} from '../../../constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '../../../constant/errorMsg'
import {
  API_URL_GET_USERS,
  API_URL_LOGIN,
  API_URL_PROJECT_JOIN,
  API_URL_TEAMS_JOIN,
} from '../../../constant/route/api-route-constant'
import useInput from '../../../module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '../../../module/hooks/reduxHooks'
import {
  moduleDecodeToken,
  moduleGetCookie,
  moduleSetCookies,
} from '../../../module/utils/moduleCookie'
import {
  moduleGetFetch,
  modulePostFetch,
  modulePostFetchWithQuery,
} from '../../../module/utils/moduleFetch'
import { updateLoginCompleteReducer } from '../../../store/reducers/maintain/maintainReducer'
import {
  type ApiResponseType,
  type CustomDecodeTokenType,
  type DialogBtnValueType,
  type LoginResponseType,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '../../../types/module'
import { type DialogTextType } from '../../../types/variable'

import Button from '@/_component/button/Button'
import ModalHub from '@/_component/modal/Modal'
import InviteLoginModal from '@/_component/modal/invite/InviteLoginModal'
import { ROUTE_PROJECT, ROUTE_TEAM } from '@/constant/route/route-constant'
import {
  updateAttendanceStatusReducer,
  updateExtraUserInfoReducer,
  updateUserInfoReducer,
} from '@/store/reducers/main/userInfoReducer'
import { type AccessInviteProps, type InviteLoginProps } from '@/types/pageType'

export default function Invite() {
  const router = useRouter()
  const category = useParams().category

  const orgCode = useAppSelector((state) => state.userInfo[KEY_X_ORGANIZATION_CODE])
  const attendanceTime = useAppSelector((state) => state.userInfo.attendance.time)
  const joinToken = useSearchParams().get('token') as string
  const dispatch = useAppDispatch()
  const emailInput = useInput('')
  const pwdInput = useInput('')
  const [isPwdView, setIsPwdView] = useState(false)
  const loginDialogRef = useRef<HTMLDialogElement | null>(null)
  const handleDialogClose = () => {
    loginDialogRef.current?.close()
  }
  const [dialogText, setDialogText] = useState<DialogTextType>({
    main: '',
    sub: '',
  })
  const [loginDialogBtnValue] = useState<DialogBtnValueType>({
    isCancel: false,
    cancleFunc: () => {},
    cancelText: '',
    confirmFunc: handleDialogClose,
    confirmText: '확인',
  })
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [accessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const isLogin = () => {
    if (accessToken === ERR_COOKIE_NOT_FOUND) return false
    return true
  }

  const handleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen)
  }
  const decideFetchUrl = () => {
    if (category === INVITE_TEAM) return API_URL_TEAMS_JOIN
    return API_URL_PROJECT_JOIN
  }
  const decideRedirectUrl = () => {
    if (category === INVITE_TEAM) return ROUTE_TEAM
    return ROUTE_PROJECT
  }

  const { mutate: join } = useMutation({
    mutationKey: ['join'],
    mutationFn: async () => {
      await modulePostFetchWithQuery<string>({
        data: {
          token: joinToken,
        },
        fetchUrl: decideFetchUrl(),
        header: {
          Authorization: `Bearer ${accessToken}`,
          [KEY_X_ORGANIZATION_CODE]: orgCode,
        },
      })
    },
    onSuccess: () => {
      router.push(decideRedirectUrl())
    },
    onError: () => {
      alert('실패')
      setDialogText({
        main: '조직 가입 승인에 실패했습니다.',
        sub: '다시 시도해 주세요.',
      })
      loginDialogRef.current?.showModal()
    },
  })

  const handleClickJoin = () => {
    join()
  }

  const { mutate: login } = useMutation({
    mutationKey: ['invite-login'],
    mutationFn: async () => {
      const res = await modulePostFetch<LoginResponseType>({
        data: {
          email: emailInput.value,
          password: pwdInput.value,
        },
        fetchUrl: API_URL_LOGIN,
      })
      return res as SuccessResponseType<LoginResponseType>
    },
    onSuccess: async (data) => {
      const accessToken = data.result.accessToken
      const decodeToken = moduleDecodeToken(accessToken)
      const uuid =
        decodeToken !== ERR_COOKIE_NOT_FOUND
          ? (decodeToken as CustomDecodeTokenType).uuid
          : ERR_COOKIE_NOT_FOUND
      moduleSetCookies({ [KEY_ACCESS_TOKEN]: accessToken })
      dispatch(updateLoginCompleteReducer(TRUE))
      const getUserInfo = async () => {
        const getFetchUserProps: ModuleGetFetchProps = {
          params: {
            [KEY_UUID]: uuid,
          },
          fetchUrl: API_URL_GET_USERS,
          header: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
        const res = await moduleGetFetch<ApiResponseType>(getFetchUserProps)
        return res as SuccessResponseType<ApiResponseType>
      }

      const userInfo = await getUserInfo()
      const extraInfoProps = {
        name: userInfo.result.name,
        email: userInfo.result.email,
        position: userInfo.result.position,
        userId: userInfo.result.userId,
        organizationId: userInfo.result.organizationId,
        organizationName: userInfo.result.organizationName,
      }
      const attendanceProps = {
        status: userInfo.result.attendanceStatus as string,
        time: attendanceTime,
      }
      dispatch(updateExtraUserInfoReducer(extraInfoProps))
      dispatch(updateAttendanceStatusReducer(attendanceProps))
      dispatch(
        updateUserInfoReducer({
          [KEY_X_ORGANIZATION_CODE]: userInfo.result.organizationCode as string,
          [KEY_UUID]: userInfo.result[KEY_UUID] as string,
        }),
      )
      handleLoginModal()
    },
    onError: () => {
      setDialogText({
        main: '로그인에 실패했습니다.',
        sub: '다시 시도해 주세요.',
      })
      loginDialogRef.current?.showModal()
    },
  })

  const handleClickLogin = () => {
    login()
  }
  const isPwdViewComponent = () => {
    const handleClick = () => {
      setIsPwdView(!isPwdView)
    }
    if (isPwdView) {
      return (
        <Button
          buttonContent={
            <IoMdEyeOff className="w-4 h-4 text-black hover:text-white dark:text-white" />
          }
          className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-gray-50 rounded-e-lg border dark:border-gray-600 hover:bg-indigo-200  dark:bg-gray-700 dark:hover:bg-indigo-400 ease-in-out transition duration-400"
          onClick={handleClick}
        />
      )
    }
    return (
      <Button
        buttonContent={<IoMdEye className="w-4 h-4 text-black dark:text-white" />}
        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-gray-50 rounded-e-lg border dark:border-gray-600 hover:bg-indigo-200  dark:bg-gray-700 dark:hover:bg-indigo-400 ease-in-out transition duration-400"
        onClick={handleClick}
      />
    )
  }

  const pwdViewType = () => {
    if (isPwdView) return 'text'
    return 'password'
  }
  const inputList = [
    {
      headLabelContent: <AiOutlineMail />,
      title: REGISTER_EMAIL,
      placeholder: 'abc12@sample.com',
      useInput: emailInput,
      type: 'text',
      isTailLabel: false,
      tailLabelContent: <></>,
    },
    {
      headLabelContent: <RiLockPasswordFill />,
      title: REGISTER_PWD,
      placeholder: 'At least 8 characters',
      useInput: pwdInput,
      type: pwdViewType(),
      isTailLabel: true,
      tailLabelContent: isPwdViewComponent(),
    },
  ]

  const modalList = [
    {
      onClose: handleLoginModal,
      isModalOpen: isLoginModalOpen,
      childComponent: <InviteLoginModal inputList={inputList} />,
      name: 'invite-login',
      btnValue: '로그인',
      confirmFunc: handleClickLogin,
      dialog: loginDialogRef,
      dialogAlertText: dialogText,
      dialogBtnValue: loginDialogBtnValue,
    },
  ]
  const renderModal = () => {
    if (isLoginModalOpen) return <ModalHub modals={modalList} />
    return <></>
  }

  return (
    <div>
      {isLogin() ? (
        <AccessInvite join={handleClickJoin} />
      ) : (
        <InviteLogin handleLoginModal={handleLoginModal} />
      )}
      {renderModal()}
    </div>
  )
}

function AccessInvite(props: AccessInviteProps) {
  const { join } = props
  const category = useParams().category
  const inviteCategory = () => {
    switch (category) {
      case INVITE_PROJECT:
        return '프로젝트'
      case INVITE_TEAM:
        return '팀'
    }
  }

  return (
    <div className="grid h-screen px-4 place-content-center">
      <h1 className="tracking-widest text-gray-600 dark:text-gray-400 font-bold uppercase">
        {inviteCategory()}에 초대받았습니다.
      </h1>
      <div className="flex flex-row items-center  justify-around">
        <Button
          buttonContent="가입"
          className="mt-5 font-bold bg-indigo-400 hover:bg-indigo-700 text-white hover:text-white focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition ease-in-out duration-500"
          onClick={join}
        />
        <Button
          buttonContent="거절"
          className="mt-5 font-bold bg-red-400 hover:bg-red-500 text-white hover:text-white focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition ease-in-out duration-500"
          onClick={() => {}}
        />
      </div>
    </div>
  )
}
function InviteLogin(props: InviteLoginProps) {
  const { handleLoginModal } = props
  return (
    <div className="grid h-screen px-4 place-content-center">
      <h1 className="tracking-widest text-gray-600 dark:text-gray-400 font-bold uppercase">
        초대에 응하기 전에 로그인이 필요합니다.
      </h1>
      <Button
        buttonContent="로그인"
        className="mt-5 font-bold bg-gray-500 hover:bg-gray-700 text-white hover:text-white focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition ease-in-out duration-500"
        onClick={handleLoginModal}
      />
    </div>
  )
}
