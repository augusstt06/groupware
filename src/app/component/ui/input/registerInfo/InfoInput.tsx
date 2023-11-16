import { useEffect } from 'react'

import axios from 'axios'

import { InputIconlabel } from '../../label/InputIconlabel'
import { InputLabel } from '../../label/Inputlabel'

import {
  REGISTER_EMAIL,
  REGISTER_NAME,
  REGISTER_PHONENUMBER,
  REGISTER_POSITION,
} from '@/app/constant/constant'
import { useInput } from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import inputValidate from '@/app/module/utils/inputValidate'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import {
  emailReducer,
  nameReducer,
  phoneNumberReducer,
  positionReducer,
} from '@/app/store/reducers/loginInfoReducer'
import { type ModuleGetFetchProps } from '@/app/types/moduleTypes'
import { type InfoInputProps } from '@/app/types/ui/inputTypes'

export default function InfoInput(props: InfoInputProps) {
  const dispatch = useAppDispatch()
  const inputData = useInput('', props.title)
  const inputState = useAppSelector((state) => {
    switch (props.title) {
      case REGISTER_NAME:
        return state.loginInfo.name
      case REGISTER_PHONENUMBER:
        return state.loginInfo.phoneNumber
      case REGISTER_POSITION:
        return state.loginInfo.position
      default:
        return state.loginInfo.email
    }
  })

  const getFetchEmailProps: ModuleGetFetchProps = {
    keyName: REGISTER_EMAIL.toLowerCase(),
    keyValue: inputData.value,
    fetchUrl: process.env.NEXT_PUBLIC_EMAIL_REQ_SOURCE,
  }

  const inputValidateProps = {
    inputData: inputData.value,
    dataType: props.title === REGISTER_EMAIL ? 'email' : 'phoneNumber',
  }

  const fetchEmailAvaiable = async (): Promise<void> => {
    try {
      await moduleGetFetch(getFetchEmailProps)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.status) {
          case 400:
            alert('입력값이 잘못되었습니다.')
            break
          case 500:
            alert('통신오류가 발생했습니다.')
            break
        }
      }
      alert('이메일 확인에 실패했습니다.')
    }
  }

  const handleChangeEmailInputCheckbox = () => {
    const isValid = inputValidate(inputValidateProps)
    if (!isValid as boolean) {
      alert('이메일 형식이 잘못되었습니다.')
      return
    }
    if (inputState.isCheck) {
      dispatch(emailReducer({ isCheck: false, value: '' }))
      inputData.value = ''
      return
    }
    void fetchEmailAvaiable()
    dispatch(emailReducer({ isCheck: true, value: inputData.value }))
    alert('이메일 확인이 완료되었습니다.')
  }

  useEffect(() => {
    const isInput = inputData.value !== ''
    const reducerProps = {
      isCheck: isInput,
      value: inputData.value,
    }
    switch (props.title) {
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
        dispatch(emailReducer(reducerProps))
    }
  }, [inputData.value, dispatch])

  return (
    <>
      <InputLabel title={props.title} />
      <div className="flex relative mt-2 mb-6">
        <InputIconlabel icon={props.icon} />
        <input
          type="text"
          {...inputData}
          id={props.title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
        />

        {props.checkValid ? (
          <div className="absolute inset-y-0 right-4 flex items-center pl-3.5">
            <input
              type="checkbox"
              className="cursor-pointer w-5 h-5"
              checked={inputState?.isCheck}
              onChange={(event) => {
                event.preventDefault()
                handleChangeEmailInputCheckbox()
              }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
