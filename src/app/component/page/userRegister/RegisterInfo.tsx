import { useEffect, useState } from 'react'

import ErrorAlert from '../../ui/alert/ErrorAlert'
import FloatingInput from '../../ui/input/FloatingInput'

import {
  API_SUCCESS_CODE,
  REGISTER_CONFIRM_PWD_EN,
  REGISTER_EMAIL_EN,
  REGISTER_NAME_EN,
  REGISTER_PHONENUMBER_EN,
  REGISTER_POSITION_EN,
  REGISTER_PWD_EN,
  VALIDATE_EMAIL_TYPE,
  VALIDATE_PHONE_NUM_TYPE,
  VALIDATE_PWD_TYPE,
} from '@/app/constant/constant'
import {
  ERR_MESSAGE_CHECK_MAIL,
  ERR_MESSAGE_USER_EXIST,
  errDefault,
  errExist,
} from '@/app/constant/errorMsg'
import { API_URL_CHECK_EMAIL } from '@/app/constant/route/api-route-constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { moduleGetFetch } from '@/app/module/utils/moduleFetch'
import inputValidate from '@/app/module/utils/moduleInputValidate'
import {
  emailReducer,
  nameReducer,
  phoneNumberReducer,
  positionReducer,
  pwdReducer,
} from '@/app/store/reducers/login/signupInfoReducer'
import { type FailResponseType, type ModuleGetFetchProps } from '@/app/types/moduleTypes'
import { type RegisterInfoTypeProps } from '@/app/types/pageTypes'

export default function RegisterInfo(props: RegisterInfoTypeProps) {
  const dispatch = useAppDispatch()
  const dynamicInput = (isPersist: boolean, title: string, limit: number) => {
    let storedValue
    if (localStorage.getItem(title) === null) {
      storedValue = ''
    } else {
      storedValue = isPersist ? localStorage.getItem(title) : ''
    }

    return useInput(storedValue as string, title, limit)
  }

  const emailInput = dynamicInput(true, REGISTER_EMAIL_EN, 100)
  const pwdInput = dynamicInput(false, REGISTER_PWD_EN, 20)
  const pwdConfirmInput = dynamicInput(false, REGISTER_CONFIRM_PWD_EN, 20)
  const nameInput = dynamicInput(true, REGISTER_NAME_EN, 10)
  const positionInput = dynamicInput(true, REGISTER_POSITION_EN, 10)
  const phoneNumberInput = dynamicInput(true, REGISTER_PHONENUMBER_EN, 13)

  const [errState, setErrorState] = useState({
    type: '',
    isError: false,
    description: '',
  })

  const handleClickError = () => {
    setErrorState({
      type: '',
      isError: !errState.isError,
      description: '',
    })
  }
  const setErrorMsg = (errType: string, err: boolean, errDescription: string) => {
    setErrorState({
      type: errType,
      isError: err,
      description: errDescription,
    })
  }

  const fetchEmailAvaiable = async (props: ModuleGetFetchProps): Promise<void> => {
    try {
      const res = await moduleGetFetch<string>(props)
      if (res.status !== API_SUCCESS_CODE) {
        dispatch(emailReducer({ isCheck: false, value: emailInput.value }))
        throw new Error((res as FailResponseType).message)
      }

      dispatch(emailReducer({ isCheck: true, value: emailInput.value }))
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case ERR_MESSAGE_USER_EXIST:
            setErrorMsg(REGISTER_EMAIL_EN, true, errExist('이메일 주소'))
            break
          case ERR_MESSAGE_CHECK_MAIL:
            setErrorMsg(REGISTER_EMAIL_EN, true, '이메일 형식이 올바르지 않습니다.')
            break
          default:
            setErrorMsg(REGISTER_EMAIL_EN, true, errDefault('이메일 확인'))
        }
      }
    }
  }

  const phoenNumValidate = () => {
    const validateProps = {
      inputData: phoneNumberInput.value,
      dataType: VALIDATE_PHONE_NUM_TYPE,
    }
    const isPhoneNumValidate = inputValidate(validateProps)
    if (phoneNumberInput.value.length !== 0) {
      if (!isPhoneNumValidate) {
        setErrorMsg(REGISTER_PHONENUMBER_EN, true, '전화번호 형식이 잘못되었습니다.')
        dispatch(
          phoneNumberReducer({
            isCheck: false,
            value: phoneNumberInput.value,
          }),
        )
      } else {
        setErrorMsg(REGISTER_PHONENUMBER_EN, false, '')
        dispatch(
          phoneNumberReducer({
            isCheck: true,
            value: phoneNumberInput.value,
          }),
        )
      }
    }
  }
  const checkEmail = () => {
    const validateProps = {
      inputData: emailInput.value,
      dataType: VALIDATE_EMAIL_TYPE,
    }
    const isEmailValidate = inputValidate(validateProps)
    let reducerProps
    if (!isEmailValidate) {
      reducerProps = {
        isCheck: false,
        value: emailInput.value,
      }
    } else {
      setErrorMsg('', false, '')
      reducerProps = {
        isCheck: emailInput.value !== '',
        value: emailInput.value,
      }
      dispatch(emailReducer(reducerProps))
    }
  }
  const renderAlert = (title: string) => {
    return (
      errState.isError &&
      (title === REGISTER_EMAIL_EN ||
        title === REGISTER_PHONENUMBER_EN ||
        title === REGISTER_CONFIRM_PWD_EN ||
        title === REGISTER_PWD_EN) &&
      errState.type === title
    )
  }

  const inputList = [
    {
      isViewActive: false,
      title: REGISTER_EMAIL_EN,
      useInput: emailInput,
      inputViewType: 'text',
    },
    {
      isViewActive: true,
      title: REGISTER_PWD_EN,
      useInput: pwdInput,
      inputViewType: props.isPwdView ? 'text' : 'password',
      handleViewType: () => {
        props.setIsPwdView(!props.isPwdView)
      },
    },
    {
      isViewActive: true,
      title: REGISTER_CONFIRM_PWD_EN,
      useInput: pwdConfirmInput,
      inputViewType: props.isPwdConfirmView ? 'text' : 'password',
      handleViewType: () => {
        props.setIsPwdConfirmView(!props.isPwdConfirmView)
      },
    },
    {
      isViewActive: false,
      title: REGISTER_NAME_EN,
      useInput: nameInput,
      inputViewType: 'text',
    },
    {
      isViewActive: false,
      title: REGISTER_POSITION_EN,
      useInput: positionInput,
      inputViewType: 'text',
    },
    {
      isViewActive: false,
      title: REGISTER_PHONENUMBER_EN,
      useInput: phoneNumberInput,
      inputViewType: 'text',
    },
  ]

  useEffect(() => {
    phoenNumValidate()
  }, [phoneNumberInput.value])

  useEffect(() => {
    checkEmail()
    const handleEmailInputEvent = () => {
      if (emailInput.value.length !== 0) {
        checkEmail()
        const fetchProps: ModuleGetFetchProps = {
          params: { email: emailInput.value },
          fetchUrl: API_URL_CHECK_EMAIL,
        }
        void fetchEmailAvaiable(fetchProps)
      }
    }
    const inputElement = document.getElementById(REGISTER_EMAIL_EN)
    inputElement?.addEventListener('blur', handleEmailInputEvent)
    return () => {
      inputElement?.removeEventListener('blur', handleEmailInputEvent)
    }
  }, [emailInput.value])

  useEffect(() => {
    const isPwdEmpty = pwdInput.value !== '' && pwdConfirmInput.value !== ''
    const reducerProp = {
      isCheck: isPwdEmpty,
      pwdValue: pwdInput.value,
      pwdConfirmValue: pwdConfirmInput.value,
    }
    dispatch(pwdReducer(reducerProp))
    const isPwdValidate = inputValidate({ inputData: pwdInput.value, dataType: VALIDATE_PWD_TYPE })
    if (pwdInput.value !== '') {
      if (!isPwdValidate) {
        setErrorMsg(
          REGISTER_PWD_EN,
          true,
          '8글자 이상의 영어대소문자, 특수문자, 숫자를 포함해야 합니다.',
        )
      } else {
        setErrorMsg('', false, '')
      }
    } else {
      setErrorMsg('', false, '')
    }

    if (isPwdEmpty) {
      if (pwdInput.value !== pwdConfirmInput.value) {
        setErrorMsg(REGISTER_CONFIRM_PWD_EN, true, '비밀번호가 다릅니다.')
      } else {
        setErrorMsg('', false, '')
      }
    }
  }, [pwdInput.value, pwdConfirmInput.value])

  useEffect(() => {
    if (positionInput.value !== '') {
      dispatch(positionReducer({ isCheck: true, value: positionInput.value }))
    }
    if (nameInput.value !== '') {
      dispatch(nameReducer({ isCheck: true, value: nameInput.value }))
    }
  }, [positionInput.value, nameInput.value])
  return (
    <>
      {inputList.map((data) => (
        <div key={data.title} className="mb-5">
          <FloatingInput
            isViewActive={data.isViewActive}
            title={data.title}
            value={data.useInput.value}
            onChange={data.useInput.onChange}
            inputViewType={data.inputViewType}
            handleViewType={data.handleViewType}
          />

          {renderAlert(data.title) ? (
            <div className="mt-2 mb-2">
              <ErrorAlert description={errState.description} handleClickError={handleClickError} />
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </>
  )
}
