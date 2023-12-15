import { useEffect, useState } from 'react'

import ErrorAlert from '../../alert/ErrorAlert'
import { InputIconlabel } from '../../label/InputIconlabel'
import { InputLabel } from '../../label/Inputlabel'

import {
  REGISTER_EMAIL,
  REGISTER_NAME,
  REGISTER_PHONENUMBER,
  REGISTER_POSITION,
} from '@/app/constant/constant'
import {
  ERR_MESSAGE_CHECK_MAIL,
  ERR_MESSAGE_USER_EXIST,
  errDefault,
  errExist,
} from '@/app/constant/errorMsg'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import inputValidate from '@/app/module/utils/moduleInputValidate'
import {
  emailReducer,
  nameReducer,
  phoneNumberReducer,
  positionReducer,
} from '@/app/store/reducers/login/signupInfoReducer'
import {
  type FailResponseType,
  type FetchResponseType,
  type ModuleGetFetchProps,
} from '@/app/types/moduleTypes'
import { type InfoInputProps } from '@/app/types/ui/inputTypes'

export default function InfoInput(props: InfoInputProps) {
  const [errState, setErrorState] = useState({
    isError: false,
    description: '',
  })
  const handleClickError = () => {
    setErrorState({
      isError: !errState.isError,
      description: '이메일 형식이 올바르지 않습니다.',
    })
  }
  const setErrorMsg = (err: boolean, errDescription: string) => {
    setErrorState({
      isError: err,
      description: errDescription,
    })
  }

  const dispatch = useAppDispatch()

  const useInput = props.useInput

  const fetchEmailAvaiable = async (getFetchEmailProps: ModuleGetFetchProps): Promise<void> => {
    try {
      const res = await moduleGetFetch<FetchResponseType<string>>(getFetchEmailProps)
      if (res.status !== 200) {
        dispatch(emailReducer({ isCheck: false, value: useInput.value }))
        throw new Error((res as FailResponseType).message)
      }

      dispatch(emailReducer({ isCheck: true, value: useInput.value }))
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case ERR_MESSAGE_USER_EXIST:
            setErrorMsg(true, errExist('이메일 주소'))
            break
          case ERR_MESSAGE_CHECK_MAIL:
            setErrorMsg(true, '이메일 형식이 올바르지 않습니다.')
            break
          default:
            setErrorMsg(true, errDefault('이메일 확인'))
        }
      }
    }
  }

  useEffect(() => {
    const isInput = useInput.value !== ''
    let reducerProps

    let isValidate
    let emailInputValidateProps
    let phoneNumberInputValidate
    switch (props.title) {
      case REGISTER_NAME:
        reducerProps = {
          isCheck: isInput,
          value: useInput.value,
        }
        dispatch(nameReducer(reducerProps))
        break
      case REGISTER_PHONENUMBER:
        phoneNumberInputValidate = {
          inputData: useInput.value,
          dataType: 'phoneNumber',
        }
        isValidate = inputValidate(phoneNumberInputValidate)
        if (!isValidate) {
          setErrorMsg(true, '전화번호 형식이 잘못되었습니다.')
          dispatch(
            phoneNumberReducer({
              isCheck: false,
              value: useInput.value,
            }),
          )
        } else {
          setErrorMsg(false, '')
          dispatch(
            phoneNumberReducer({
              isCheck: true,
              value: useInput.value,
            }),
          )
        }
        break
      case REGISTER_POSITION:
        reducerProps = {
          isCheck: isInput,
          value: useInput.value,
        }
        dispatch(positionReducer(reducerProps))

        break
      default:
        break
    }

    const checkEmail = () => {
      emailInputValidateProps = {
        inputData: useInput.value,
        dataType: 'email',
      }
      isValidate = inputValidate(emailInputValidateProps)
      if (!isValidate) {
        reducerProps = {
          isCheck: false,
          valus: useInput.value,
        }
      } else {
        setErrorMsg(false, '')

        reducerProps = {
          isCheck: isInput,
          value: useInput.value,
        }
        dispatch(emailReducer(reducerProps))
      }
    }
    const handleInputEvent = () => {
      if (props.title === REGISTER_EMAIL && useInput.value.length !== 0) {
        checkEmail()
        const getFetchEmailProps: ModuleGetFetchProps = {
          params: { email: useInput.value },
          fetchUrl: process.env.NEXT_PUBLIC_EMAIL_REQ_SOURCE,
        }
        void fetchEmailAvaiable(getFetchEmailProps)
      }
    }

    const inputElement = document.getElementById(props.title)
    inputElement?.addEventListener('blur', handleInputEvent)

    return () => {
      inputElement?.removeEventListener('blur', handleInputEvent)
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
      {(props.title === REGISTER_EMAIL || props.title === REGISTER_PHONENUMBER) &&
      useInput.value !== null &&
      useInput.value.length !== 0 &&
      errState.isError ? (
        <div className="mb-6">
          <ErrorAlert description={errState.description} handleClickError={handleClickError} />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
