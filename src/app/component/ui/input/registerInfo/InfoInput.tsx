import { useEffect } from 'react'

import { HttpStatusCode } from 'axios'

import { InputIconlabel } from '../../label/InputIconlabel'
import { InputLabel } from '../../label/Inputlabel'

import {
  REGISTER_EMAIL,
  REGISTER_NAME,
  REGISTER_PHONENUMBER,
  REGISTER_POSITION,
} from '@/app/constant/constant'
import { ERR_500, ERR_DEFAULT } from '@/app/constant/errorMsg'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import inputValidate from '@/app/module/utils/inputValidate'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import {
  emailReducer,
  nameReducer,
  phoneNumberReducer,
  positionReducer,
} from '@/app/store/reducers/signupInfoReducer'
import { type ModuleGetFetchProps } from '@/app/types/moduleTypes'
import { type InfoInputProps } from '@/app/types/ui/inputTypes'

export default function InfoInput(props: InfoInputProps) {
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
  const emailState = useAppSelector((state) => state.signupInfo.email)

  const getFetchEmailProps: ModuleGetFetchProps = {
    params: { [REGISTER_EMAIL.toLowerCase()]: useInput.value },
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
            props.setErrMsg('이메일이 중복됩니다. 다른 이메일을 사용해주세요.')
            break
          case HttpStatusCode.InternalServerError.toString():
            props.setErrMsg(ERR_500)
            break
          default:
            props.setErrMsg(ERR_DEFAULT('이메일 확인'))
        }
      }
    }
  }

  const handleChangeEmailInputCheckbox = async () => {
    const isValid = inputValidate(inputValidateProps)
    if (!isValid as boolean) {
      props.setErrMsg('이메일 형식이 잘못되었습니다. xxx@xxx.xxx 의 형태로 입력해주세요')
      return
    }
    if (inputState.isCheck) {
      dispatch(emailReducer({ isCheck: false, value: '' }))
      useInput.resetValue()
      return
    }
    void fetchEmailAvaiable()
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
    switch (props.title) {
      case REGISTER_EMAIL:
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
      <div className="flex relative mt-2 mb-6">
        <InputIconlabel icon={props.icon} />
        <input
          type="text"
          value={useInput.value}
          onChange={useInput.onChange}
          id={props.title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
        />

        {props.checkValid ? (
          <div className="absolute inset-y-0 right-4 flex items-center pl-3.5">
            <input
              type="checkbox"
              className="cursor-pointer w-5 h-5"
              checked={emailState.isCheck}
              onChange={(event) => {
                event.preventDefault()
                void handleChangeEmailInputCheckbox()
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
