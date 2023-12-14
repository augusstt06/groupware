import { useRouter } from 'next/navigation'

import { KEY_ACCESS_TOKEN } from '@/app/constant/constant'
import { ERR_MESSAGE_SIGNUP_USER_EXIST, errDefault } from '@/app/constant/errorMsg'
import { ROUTE_SIGNUP_ORG } from '@/app/constant/route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleSetCookies } from '@/app/module/utils/cookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { resetSignupInfoReducer } from '@/app/store/reducers/login/signupInfoReducer'
import {
  type ApiRes,
  type FailResponseType,
  type FetchResponseType,
  type ModulePostFetchProps,
  type SuccessResponseType,
} from '@/app/types/moduleTypes'
import { type SignupBtnProps } from '@/app/types/ui/btnTypes'

export function SignupBtn(props: SignupBtnProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const signupState = useAppSelector((state) => state.signupInfo)

  const fetchSignupProps: ModulePostFetchProps = {
    data: {
      email: signupState.email.value,
      name: signupState.name.value,
      password: signupState.pwd.pwdValue,
      passwordConfirm: signupState.pwd.pwdConfirmValue,
      phoneNumber: signupState.phoneNumber.value,
      position: signupState.position.value,
    },
    fetchUrl: process.env.NEXT_PUBLIC_REGISTER_SOURCE,
  }

  const fetchLoginProps: ModulePostFetchProps = {
    data: {
      email: signupState.email.value,
      password: signupState.pwd.pwdValue,
    },
    fetchUrl: process.env.NEXT_PUBLIC_LOGIN_SOURCE,
  }

  const fetchSignin = async (): Promise<void> => {
    try {
      if (!(signupState.email.isCheck as boolean)) {
        props.setErrMsg('이메일이 중복됩니다. 다른 이메일을 사용해주세요.')
        return
      }

      const signupRes = await modulePostFetch<FetchResponseType<string>>(fetchSignupProps)
      if (signupRes.status !== 200) throw new Error((signupRes as FailResponseType).message)

      const loginRes = await modulePostFetch<FetchResponseType<ApiRes>>(fetchLoginProps)
      if (loginRes.status !== 200) throw new Error((loginRes as FailResponseType).message)

      moduleSetCookies({
        [KEY_ACCESS_TOKEN]: (loginRes as SuccessResponseType<ApiRes>).result.accessToken,
      })
      dispatch(resetSignupInfoReducer())

      router.push(ROUTE_SIGNUP_ORG)
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case ERR_MESSAGE_SIGNUP_USER_EXIST:
            props.setErrMsg('이미 유저가 존재합니다.')
            break
          default:
            props.setErrMsg(errDefault('회원가입'))
            break
        }
      }
    }
  }
  const handleClickBtn = async () => {
    void fetchSignin()
  }
  return (
    <button
      type="button"
      className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
      onClick={(event) => {
        props.checkInfoComplete()
        event.preventDefault()
        void handleClickBtn()
      }}
    >
      {props.title}
    </button>
  )
}
