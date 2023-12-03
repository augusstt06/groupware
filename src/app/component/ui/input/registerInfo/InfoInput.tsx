import { useEffect, useState } from 'react'

import { HttpStatusCode } from 'axios'

import ErrorAlert from '../../alert/ErrorAlert'
import { InputIconlabel } from '../../label/InputIconlabel'
import { InputLabel } from '../../label/Inputlabel'

import {
  REGISTER_EMAIL,
  REGISTER_NAME,
  REGISTER_PHONENUMBER,
  REGISTER_POSITION,
} from '@/app/constant/constant'
import { ERR_INTERNAL_SERVER, errDefault } from '@/app/constant/errorMsg'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import inputValidate from '@/app/module/utils/inputValidate'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import {
  emailReducer,
  nameReducer,
  phoneNumberReducer,
  positionReducer,
} from '@/app/store/reducers/login/signupInfoReducer'
import { type ModuleGetFetchProps } from '@/app/types/moduleTypes'
import { type InfoInputProps } from '@/app/types/ui/inputTypes'

export default function InfoInput(props: InfoInputProps) {
  const [isEmailValid, setIsEmailValid] = useState({
    isValid: false,
    description: '이메일 형식이 올바르지 않습니다.',
  })
  const handleClickError = () => {
    setIsEmailValid({
      isValid: !isEmailValid.isValid,
      description: '이메일 형식이 올바르지 않습니다.',
    })
  }
  const setErrorMsg = (errDescription: string) => {
    setIsEmailValid({
      isValid: false,
      description: errDescription,
    })
  }
  const dispatch = useAppDispatch()
  const useInput = props.useInput
  const inputState = useAppSelector((state) => {
    switch (props.title) {
      case REGISTER_NAME:
        return state.signupInfo.name
      case REGISTER_PHONENUMBER:
        return state.signupInfo.phoneNumber
      case REGISTER_POSITION:
        return state.signupInfo.position
      default:
        return state.signupInfo.email
    }
  })
  const getFetchEmailProps: ModuleGetFetchProps = {
    params: { email: useInput.value },
    fetchUrl: process.env.NEXT_PUBLIC_EMAIL_REQ_SOURCE,
  }

  const inputValidateProps = {
    inputData: useInput.value,
    dataType: props.title === REGISTER_EMAIL ? 'email' : 'phoneNumber',
  }

  const fetchEmailAvaiable = async (): Promise<void> => {
    try {
      await moduleGetFetch(getFetchEmailProps)
      dispatch(emailReducer({ isCheck: true, value: useInput.value }))
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case HttpStatusCode.BadRequest.toString():
            setErrorMsg('이미 사용중인 이메일 주소입니다.')
            break
          case HttpStatusCode.InternalServerError.toString():
            setErrorMsg(ERR_INTERNAL_SERVER)
            break
          default:
            setErrorMsg(errDefault('이메일 확인'))
        }
      }
    }
  }

  useEffect(() => {
    const isInput = useInput.value !== ''
    const reducerProps = {
      isCheck: isInput,
      value: useInput.value,
    }
    const emailprops = {
      isCheck: inputState.isCheck,
      value: useInput.value,
    }
    const handleInputFocusOut = () => {
      if (props.title === REGISTER_EMAIL && isEmailValid.isValid && useInput.value.length !== 0) {
        void fetchEmailAvaiable()
      }
    }
    document.getElementById(props.title)?.addEventListener('focusout', handleInputFocusOut)
    const isValid = inputValidate(inputValidateProps)
    switch (props.title) {
      case REGISTER_EMAIL:
        if (isValid as boolean) {
          setIsEmailValid({
            isValid: true,
            description: isEmailValid.description,
          })
        } else {
          setIsEmailValid({
            isValid: false,
            description: isEmailValid.description,
          })
        }
        dispatch(emailReducer(emailprops))
        break
      case REGISTER_NAME:
        dispatch(nameReducer(reducerProps))
        break
      case REGISTER_PHONENUMBER:
        dispatch(phoneNumberReducer(reducerProps))
        break
      case REGISTER_POSITION:
        dispatch(positionReducer(reducerProps))
        break
      default:
        break
    }
  }, [useInput.value])

  return (
    <>
      <InputLabel title={props.title} />
      <div className="flex relative mt-2 mb-2">
        <InputIconlabel icon={props.icon} />
        <input
          type="text"
          value={useInput.value}
          onChange={useInput.onChange}
          id={props.title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
        />
      </div>
      {props.title === REGISTER_EMAIL && useInput.value.length !== 0 && !isEmailValid.isValid ? (
        <div className="mb-6">
          <ErrorAlert description={isEmailValid.description} handleClickError={handleClickError} />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
