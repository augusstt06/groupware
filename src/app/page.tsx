'use client'

import { useEffect, useRef, useState } from 'react'

import { Chakra_Petch } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import ErrorAlert from './component/ui/alert/ErrorAlert'
import Button from './component/ui/button/Button'
import FloatingInput from './component/ui/input/FloatingInput'
import {
  API_SUCCESS_CODE,
  FALSE,
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  REGISTER_EMAIL,
  REGISTER_EMAIL_EN,
  REGISTER_PWD,
  REGISTER_PWD_EN,
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
} from './types/module'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: '500',
})
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

  const pwdViewType = () => {
    if (isPwdView) return 'text'
    return 'password'
  }
  const handleViewPwd = () => {
    setIsPwdView(!isPwdView)
  }

  const inputgroupList = [
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
      inputViewType: pwdViewType(),
      handleViewType: handleViewPwd,
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
    <section className="sort-vertical-flex justify-center h-screen px-4 place-content-center">
      <section className="sort-vertical-flex mb-5">
        <div className="text-2xl font-extrabold mb-2">
          <h1 className={chakra.className}>Welcome to Groupware</h1>
        </div>
      </section>
      <div className="w-4/5 md:w-2/5">
        {inputgroupList.map((data, index) => (
          <div key={index} className="mb-4">
            <FloatingInput
              title={data.title}
              inputViewType={data.inputViewType}
              isViewActive={data.isViewActive}
              value={data.useInput.value}
              onChange={data.useInput.onChange}
              handleViewType={data.handleViewType}
            />
          </div>
        ))}
        {errorState.isError ? (
          <ErrorAlert description={errorState.description} handleClickError={handleClickError} />
        ) : (
          <></>
        )}
        <div className="sort-vertical-flex justify-center mt-5">
          <div className="w-2/3 flex justify-center">
            <Button
              ref={buttonRef}
              className="w-2/3 text-white justify-center bg-indigo-400 smooth-transition hover:bg-indigo-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-2 border-2"
              onClick={handleClickLogin}
              buttonContent={'Sign In'}
            />
          </div>
          <div className="flex flex-row justify-around md:w-2/3 w-full mt-3">
            <div className="smooth-transition text-sm text-gray-500 hover:text-blue-600 hover:scale-110 hover:font-bold hover:dark:text-blue-600">
              <Link href={ROUTE_SIGNUP}>Sign Up</Link>
            </div>
            <div className="smooth-transition text-sm text-gray-500 hover:text-red-600 hover:scale-110 hover:font-bold hover:dark:text-red-600">
              <Link href={ROUTE_FIND_PWD}>Forgot Password</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
