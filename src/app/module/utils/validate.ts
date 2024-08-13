import { moduleDeleteCookies } from './cookie'
import { createAccessTokenManager } from './token'

import { KEY_LOGIN_COMPLETE, TRUE } from '@/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/constant/errorMsg'
import {
  ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN,
  ROUTE_ERR_NOT_FOUND_ORG_TOKEN,
} from '@/constant/route/route-constant'
import {
  type InputValidateProps,
  type ModuleCheckContentIsEmptyProps,
  type ModuleCheckUserStateProps,
} from '@/types/module'

export const inputValidate = (props: InputValidateProps) => {
  const { inputData, dataType } = props
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
  const phoneNumeRegex = /^\d{3}-\d{4}-\d{4}$/

  switch (dataType) {
    case 'email':
      return inputData != null && emailRegex.test(inputData)
    case 'pwd':
      return inputData != null && pwdRegex.test(inputData)
    case 'phoneNumber':
      return inputData != null && phoneNumeRegex.test(inputData)
    default:
      return false
  }
}
export const validateContentIsEmpty = (props: ModuleCheckContentIsEmptyProps) => {
  const {
    successText,
    dialog,
    setBtnValue,
    setDialogAlertState,
    boardId,
    editorContents,
    inputValue,
    fetchFunction,
  } = props
  const parser = new DOMParser()
  const doc = parser.parseFromString(editorContents, 'text/html')
  const isImageInclude = doc.body.querySelector('img') !== null
  const textContent = Array.from(doc.body.childNodes)
    .map((node) => node.textContent != null || '')
    .join('')
  const isContentEmpty = textContent.trim() === '' && !isImageInclude
  if (inputValue === '') {
    setDialogAlertState({
      main: '제목은 최소 1자 이상 작성 후 임시저장이 가능합니다.',
      sub: '',
    })
    setBtnValue({
      isCancel: false,
      cancleFunc: () => {},
      cancelText: '',
      confirmFunc: () => dialog.current?.close(),
      confirmText: '확인',
    })
    dialog.current?.showModal()
    return
  } else if (isContentEmpty) {
    setDialogAlertState({
      main: '게시글 내용은 최소 1자 이상 작성 후 임시저장이 가능합니다.',
      sub: '',
    })
    setBtnValue({
      isCancel: false,
      cancleFunc: () => {},
      cancelText: '',
      confirmFunc: () => dialog.current?.close(),
      confirmText: '확인',
    })
    dialog.current?.showModal()
    return
  } else if (boardId === 0 || Number.isNaN(boardId)) {
    setDialogAlertState({
      main: '게시판 카테고리를 선택해주세요.',
      sub: '',
    })
    setBtnValue({
      isCancel: false,
      cancleFunc: () => {},
      cancelText: '',
      confirmFunc: () => dialog.current?.close(),
      confirmText: '확인',
    })
    dialog.current?.showModal()
    return
  }
  setDialogAlertState({
    main: successText,
    sub: '',
  })
  setBtnValue({
    isCancel: false,
    cancleFunc: () => {},
    cancelText: '',
    confirmFunc: () => {
      void fetchFunction()
      dialog.current?.close()
    },
    confirmText: '확인',
  })
  dialog.current?.showModal()
}

export const validateUserState = ({ loginCompleteState, router }: ModuleCheckUserStateProps) => {
  const accessTokenManager = createAccessTokenManager
  const { getAccessToken } = accessTokenManager

  if (getAccessToken() === ERR_COOKIE_NOT_FOUND) {
    router.push(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN)
    return
  }
  if (loginCompleteState !== TRUE) {
    router.push(ROUTE_ERR_NOT_FOUND_ORG_TOKEN)
    return
  }

  let isStop = false
  const checkInterval = () => {
    if (isStop) return

    // FIXME: 이 부분 모듈로 뺴거나 다른곳에서 실시하기
    if (getAccessToken() === ERR_COOKIE_NOT_FOUND) {
      moduleDeleteCookies(KEY_LOGIN_COMPLETE)
      router.push(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN)
      isStop = true
    }
  }
  setInterval(checkInterval, 500)
}
