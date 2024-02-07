'use client'

// 1. accessToken확인
// 2.

import { useRef, useState } from 'react'

import { useMutation } from '@tanstack/react-query'
// import { usePathname, useSearchParams } from 'next/navigation'
import { AiOutlineMail } from 'react-icons/ai'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { RiLockPasswordFill } from 'react-icons/ri'

import Button from '../../component/ui/button/Button'
import ModalHub from '../../component/ui/modal/Modal'
import InviteLoginModal from '../../component/ui/modal/invite/InviteLoginModal'
import { KEY_ACCESS_TOKEN, REGISTER_EMAIL, REGISTER_PWD, TRUE } from '../../constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '../../constant/errorMsg'
import { API_URL_LOGIN } from '../../constant/route/api-route-constant'
import useInput from '../../module/hooks/reactHooks/useInput'
import { useAppDispatch } from '../../module/hooks/reduxHooks'
import { moduleGetCookie, moduleSetCookies } from '../../module/utils/moduleCookie'
import { modulePostFetch } from '../../module/utils/moduleFetch'
import { updateLoginCompleteReducer } from '../../store/reducers/maintain/maintainReducer'
import {
  type DialogBtnValueType,
  type LoginResponseType,
  type SuccessResponseType,
} from '../../types/moduleTypes'
import { type DialogTextType } from '../../types/variableTypes'

export default function Invite() {
  // const pathname = usePathname()
  // const param = useSearchParams().get('token')
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
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const isLogin = () => {
    if (accessToken === ERR_COOKIE_NOT_FOUND) return false
    return true
  }

  const handleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen)
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
    onSuccess: (data) => {
      const accessToken = data.result.accessToken
      moduleSetCookies({ [KEY_ACCESS_TOKEN]: accessToken })
      dispatch(updateLoginCompleteReducer(TRUE))
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
      {isLogin() ? <AccessInvite /> : <InviteLogin handleLoginModal={handleLoginModal} />}
      {renderModal()}
    </div>
  )
}

export function AccessInvite() {
  return (
    <div className="grid h-screen px-4 place-content-center">
      <h1 className="tracking-widest text-gray-600 dark:text-gray-400 font-bold uppercase">
        초대에 응하기 전에 로그인이 필요합니다.
      </h1>
    </div>
  )
}
export function InviteLogin(props: { handleLoginModal: () => void }) {
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
