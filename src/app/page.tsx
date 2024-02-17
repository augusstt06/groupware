'use client'

import { useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AiOutlineMail } from 'react-icons/ai'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { RiLockPasswordFill } from 'react-icons/ri'

import ErrorAlert from './component/ui/alert/ErrorAlert'
import Button from './component/ui/button/Button'
import InputWithLabel from './component/ui/input/InputWithLabel'
import {
  API_SUCCESS_CODE,
  FALSE,
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  REGISTER_EMAIL,
  REGISTER_PWD,
  TRUE,
} from './constant/constant'
import {
  ERR_COOKIE_NOT_FOUND,
  ERR_MESSAGE_LOGIN_EMAIL_FAIL,
  ERR_MESSAGE_LOGIN_PWD_FAIL,
  errDefault,
} from './constant/errorMsg'
import { API_URL_LOGIN } from './constant/route/api-route-constant'
import {
  ROUTE_ERR_NOT_FOUND_ORG_TOKEN,
  ROUTE_FIND_PWD,
  ROUTE_MAIN,
  ROUTE_SIGNUP,
} from './constant/route/route-constant'
import useInput from './module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from './module/hooks/reduxHooks'
import { moduleGetCookie, moduleSetCookies } from './module/utils/moduleCookie'
import { modulePostFetch } from './module/utils/moduleFetch'
import inputValidate from './module/utils/moduleInputValidate'
import { resetLoginReducer } from './store/reducers/login/loginInfoReducer'
import { updateLoginCompleteReducer } from './store/reducers/maintain/maintainReducer'
import {
  type FailResponseType,
  type LoginResponseType,
  type ModulePostFetchProps,
  type SuccessResponseType,
  type UseInputProps,
} from './types/moduleTypes'

export default function Login() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [emailInput, pwdInput]: UseInputProps[] = [REGISTER_EMAIL, REGISTER_PWD].map(
    (title: string) => useInput('', title),
  )

  const dispatch = useAppDispatch()
  const router = useRouter()
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  // const loginState = useAppSelector((state) => state.loginInfo)
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const [isPwdView, setIsPwdView] = useState(false)

  const [errorState, setErrorState] = useState({
    isError: false,
    description: '',
  })
  const setErrMsg = (errDescripton: string) => {
    setErrorState({
      isError: true,
      description: errDescripton,
    })
  }

  const handleClickError = () => {
    setErrorState({
      isError: !errorState.isError,
      description: errorState.description,
    })
  }
  const fetchLogin = async () => {
    try {
      const fetchProps: ModulePostFetchProps = {
        data: {
          email: emailInput.value,
          password: pwdInput.value,
        },
        fetchUrl: API_URL_LOGIN,
      }
      const res = await modulePostFetch<LoginResponseType>(fetchProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
      const accessToken = (res as SuccessResponseType<LoginResponseType>).result.accessToken
      moduleSetCookies({
        [KEY_ACCESS_TOKEN]: accessToken,
      })
      dispatch(updateLoginCompleteReducer(TRUE))
      dispatch(resetLoginReducer())
      router.push(ROUTE_MAIN)
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case ERR_MESSAGE_LOGIN_EMAIL_FAIL:
            setErrMsg('이메일을 잘못 입력했습니다.')
            break
          case ERR_MESSAGE_LOGIN_PWD_FAIL:
            setErrMsg('비밀번호를 잘못 입력했습니다.')
            break
          default:
            setErrMsg(errDefault('로그인'))
        }
      }
    }
  }
  const handleClickLogin = () => {
    const inputValidateProps = {
      inputData: emailInput.value,
      dataType: 'email',
    }
    const isEmailValid = inputValidate(inputValidateProps)
    if (!isEmailValid) {
      setErrMsg('이메일 형식이 잘못되었습니다. xxx@xxx.xxx 의 형태로 입력해주세요')
      return
    }
    void fetchLogin()
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

  const inputgroupList = [
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
  useEffect(() => {
    if (accessToken !== ERR_COOKIE_NOT_FOUND) {
      if (loginCompleteState === FALSE) {
        router.push(ROUTE_ERR_NOT_FOUND_ORG_TOKEN)
      } else {
        router.push(ROUTE_MAIN)
      }
      return
    }
    if (loginCompleteState === TRUE) {
      dispatch(updateLoginCompleteReducer(FALSE))
    }
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && buttonRef.current !== null) {
        buttonRef.current.click()
      }
    }
    document.addEventListener('keypress', handleKeyPress)
    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [])

  return (
    <section className="flex flex-col justify-center items-center h-screen px-4 place-content-center">
      <h1 className="text-xl font-extrabold mb-6">Login</h1>
      <div className="w-4/5 md:w-2/5">
        {inputgroupList.map((data) => (
          <InputWithLabel
            key={data.title}
            isHeadLabel={true}
            isTailLabel={data.isTailLabel}
            headLabelContent={data.headLabelContent}
            tailLabelContent={data.tailLabelContent}
            title={data.title}
            placeholder={data.placeholder}
            useInput={data.useInput}
            type={data.type}
            className=""
          />
        ))}
        {errorState.isError ? (
          <ErrorAlert description={errorState.description} handleClickError={handleClickError} />
        ) : (
          <></>
        )}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-2/3 flex justify-center">
            <Button
              ref={buttonRef}
              className="w-2/3 text-white justify-center bg-indigo-400 transition duration-500 ease-in-out hover:bg-indigo-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
              onClick={handleClickLogin}
              buttonContent={'로그인'}
            />
          </div>
          <div className="flex flex-row justify-around md:w-2/3 w-full mt-3">
            <div className="transition ease-in-out duration-500 text-sm text-gray-500 hover:text-gray-600 hover:scale-110 hover:font-bold hover:dark:text-gray-200">
              <Link href={ROUTE_SIGNUP}>회원가입</Link>
            </div>
            <div className="transition ease-in-out duration-500 text-sm text-gray-500 hover:text-gray-600 hover:scale-110 hover:font-bold hover:dark:text-gray-200">
              <Link href={ROUTE_FIND_PWD}>비밀번호찾기</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
