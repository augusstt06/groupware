import { useEffect, useState } from 'react'

import { AiFillPhone, AiOutlineMail } from 'react-icons/ai'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { RiLockPasswordFill, RiTeamLine } from 'react-icons/ri'
import { Si1Password } from 'react-icons/si'

import ErrorAlert from '../../ui/alert/ErrorAlert'
import Button from '../../ui/button/Button'
import InputWithLabel from '../../ui/input/InputWithLabel'

import {
  API_SUCCESS_CODE,
  REGISTER_CONFIRM_PWD,
  REGISTER_EMAIL,
  REGISTER_NAME,
  REGISTER_PHONENUMBER,
  REGISTER_POSITION,
  REGISTER_PWD,
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

  const emailInput = dynamicInput(true, REGISTER_EMAIL, 100)
  const pwdInput = dynamicInput(false, REGISTER_PWD, 20)
  const pwdConfirmInput = dynamicInput(false, REGISTER_CONFIRM_PWD, 20)
  const nameInput = dynamicInput(true, REGISTER_NAME, 10)
  const positionInput = dynamicInput(true, REGISTER_POSITION, 10)
  const phoneNumberInput = dynamicInput(true, REGISTER_PHONENUMBER, 13)

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

  const handlePwdView = () => {
    props.setIsPwdView(!props.isPwdView)
  }
  const handlePwdConfirmView = () => {
    props.setIsPwdConfirmView(!props.isPwdConfirmView)
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
            setErrorMsg(REGISTER_EMAIL, true, errExist('이메일 주소'))
            break
          case ERR_MESSAGE_CHECK_MAIL:
            setErrorMsg(REGISTER_EMAIL, true, '이메일 형식이 올바르지 않습니다.')
            break
          default:
            setErrorMsg(REGISTER_EMAIL, true, errDefault('이메일 확인'))
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
        setErrorMsg(REGISTER_PHONENUMBER, true, '전화번호 형식이 잘못되었습니다.')
        dispatch(
          phoneNumberReducer({
            isCheck: false,
            value: phoneNumberInput.value,
          }),
        )
      } else {
        setErrorMsg(REGISTER_PHONENUMBER, false, '')
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
      (title === REGISTER_EMAIL ||
        title === REGISTER_PHONENUMBER ||
        title === REGISTER_CONFIRM_PWD ||
        title === REGISTER_PWD) &&
      errState.type === title
    )
  }

  const pwdViewButton = (viewfunc: () => void, content: React.ReactNode) => (
    <Button
      className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-gray-50 rounded-e-lg border dark:border-gray-600 hover:bg-indigo-200  dark:bg-gray-700 dark:hover:bg-indigo-400 "
      onClick={viewfunc}
      buttonContent={content}
    />
  )

  const pwdTailContent = (title: string) => {
    switch (title) {
      case REGISTER_PWD:
        if (props.isPwdView) {
          return pwdViewButton(
            handlePwdView,
            <IoMdEye className="w-4 h-4 text-black dark:text-white" />,
          )
        }
        return pwdViewButton(
          handlePwdView,
          <IoMdEyeOff className="w-4 h-4 text-black dark:text-white" />,
        )

      case REGISTER_CONFIRM_PWD:
        if (props.isPwdConfirmView) {
          return pwdViewButton(
            handlePwdConfirmView,
            <IoMdEye className="w-4 h-4 text-black dark:text-white" />,
          )
        }
        return pwdViewButton(
          handlePwdConfirmView,
          <IoMdEyeOff className="w-4 h-4 text-black dark:text-white" />,
        )
    }
  }
  const inputList = [
    {
      title: REGISTER_EMAIL,
      isHeadLabel: true,
      isTailLabel: false,
      headLabelContent: <AiOutlineMail />,
      tailLabelContent: '',
      placeholder: '이메일을 입력해주세요.',
      useInput: emailInput,
      type: 'text',
      className: '',
    },
    {
      title: REGISTER_PWD,
      isHeadLabel: true,
      isTailLabel: true,
      headLabelContent: <RiLockPasswordFill />,
      tailLabelContent: pwdTailContent(REGISTER_PWD),
      placeholder: '비밀번호를 입력해주세요.',
      useInput: pwdInput,
      type: props.isPwdView ? 'text' : 'password',
      className: '',
    },
    {
      title: REGISTER_CONFIRM_PWD,
      isHeadLabel: true,
      isTailLabel: true,
      headLabelContent: <Si1Password />,
      tailLabelContent: pwdTailContent(REGISTER_CONFIRM_PWD),
      placeholder: '비밀번호를 입력해주세요.',
      useInput: pwdConfirmInput,
      type: props.isPwdConfirmView ? 'text' : 'password',
      className: '',
    },
    {
      title: REGISTER_NAME,
      isHeadLabel: true,
      isTailLabel: false,
      headLabelContent: <BsFillPersonVcardFill />,
      tailLabelContent: '',
      placeholder: '이름 입력해주세요.',
      useInput: nameInput,
      type: 'text',
      className: '',
    },
    {
      title: REGISTER_POSITION,
      isHeadLabel: true,
      isTailLabel: false,
      headLabelContent: <RiTeamLine />,
      tailLabelContent: '',
      placeholder: '직무를 입력해주세요.',
      useInput: positionInput,
      type: 'text',
      className: '',
    },
    {
      title: REGISTER_PHONENUMBER,
      isHeadLabel: true,
      isTailLabel: false,
      headLabelContent: <AiFillPhone />,
      tailLabelContent: '',
      placeholder: '휴대폰 번호를 입력해주세요.',
      useInput: phoneNumberInput,
      type: 'text',
      className: '',
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
    const inputElement = document.getElementById(REGISTER_EMAIL)
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
          REGISTER_PWD,
          true,
          '8글자 이상의 영어대소문자, 특수문자, 숫자를 포함한 문자열을 입력해주세요.',
        )
      } else {
        setErrorMsg('', false, '')
      }
    } else {
      setErrorMsg('', false, '')
    }

    if (isPwdEmpty) {
      if (pwdInput.value !== pwdConfirmInput.value) {
        setErrorMsg(REGISTER_CONFIRM_PWD, true, '비밀번호가 다릅니다.')
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
        <div key={data.title}>
          <InputWithLabel
            type={data.type}
            title={data.title}
            isHeadLabel={data.isHeadLabel}
            isTailLabel={data.isTailLabel}
            tailLabelContent={data.tailLabelContent}
            headLabelContent={data.headLabelContent}
            useInput={data.useInput}
            className=""
            placeholder={data.placeholder}
          />
          {renderAlert(data.title) ? (
            <ErrorAlert description={errState.description} handleClickError={handleClickError} />
          ) : (
            <></>
          )}
        </div>
      ))}
    </>
  )
}
