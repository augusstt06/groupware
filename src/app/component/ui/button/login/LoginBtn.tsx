import { useRouter } from 'next/navigation'

import { KEY_ACCESS_TOKEN, TRUE } from '@/app/constant/constant'
import {
  ERR_MESSAGE_LOGIN_EMAIL_FAIL,
  ERR_MESSAGE_LOGIN_PWD_FAIL,
  errDefault,
} from '@/app/constant/errorMsg'
import { API_URL_LOGIN } from '@/app/constant/route/api-route-constant'
import { ROUTE_MAIN } from '@/app/constant/route/route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleSetCookies } from '@/app/module/utils/moduleCookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import inputValidate from '@/app/module/utils/moduleInputValidate'
import { resetLoginReducer } from '@/app/store/reducers/login/loginInfoReducer'
import { updateLoginCompleteReducer } from '@/app/store/reducers/maintain/maintainReducer'
import {
  type ApiRes,
  type FailResponseType,
  type FetchResponseType,
  type ModulePostFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'
import { type LoginBtnProps } from '@/app/types/ui/btnTypes'

export default function LoginBtn(props: LoginBtnProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const loginState = useAppSelector((state) => state.loginInfo)

  const fetchLoginProps: ModulePostFetchProps = {
    data: {
      email: loginState.email.value,
      password: loginState.pwd.value,
    },
    fetchUrl: API_URL_LOGIN,
  }
  const inputValidateProps = {
    inputData: loginState.email.value,
    dataType: 'email',
  }

  const fetchLogin = async (): Promise<void> => {
    try {
      const isEmailValid = inputValidate(inputValidateProps)
      if (!isEmailValid) {
        props.setErrMsg('이메일 형식이 잘못되었습니다. xxx@xxx.xxx 의 형태로 입력해주세요')
        return
      }
      const loginRes = await modulePostFetch<FetchResponseType<ApiRes>>(fetchLoginProps)
      if (loginRes.status !== 200) throw new Error((loginRes as FailResponseType).message)
      moduleSetCookies({
        [KEY_ACCESS_TOKEN]: (loginRes as SuccessResponseType<ApiRes>).result.accessToken,
      })

      dispatch(updateLoginCompleteReducer(TRUE))
      dispatch(resetLoginReducer())
      router.push(ROUTE_MAIN)
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case ERR_MESSAGE_LOGIN_EMAIL_FAIL:
            props.setErrMsg('이메일을 잘못 입력했습니다.')
            break
          case ERR_MESSAGE_LOGIN_PWD_FAIL:
            props.setErrMsg('비밀번호를 잘못 입력했습니다.')
            break
          default:
            props.setErrMsg(errDefault('로그인'))
        }
      }
    }
  }

  const handleLogin = async () => {
    void fetchLogin()
  }
  return (
    <button
      type="button"
      className="w-full text-white justify-center bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
      onClick={(event) => {
        event.preventDefault()
        void handleLogin()
      }}
    >
      {props.title}
    </button>
  )
}
