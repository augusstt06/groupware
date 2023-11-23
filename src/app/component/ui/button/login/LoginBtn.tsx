import axios, { HttpStatusCode } from 'axios'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

import {
  KEY_ACCESS_TOKEN,
  LOGIN_EMAIL_FAIL_MESSAGE,
  LOGIN_PWD_FAIL_MESSAGE,
} from '@/app/constant/constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import inputValidate from '@/app/module/utils/inputValidate'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type LoginBtnProps } from '@/app/types/ui/btnTypes'

export default function LoginBtn(props: LoginBtnProps) {
  const router = useRouter()
  const loginState = useAppSelector((state) => state.loginInfo)

  const fetchLoginProps: ModulePostFetchProps = {
    data: {
      email: loginState.email.value,
      password: loginState.pwd.value,
    },
    fetchUrl: process.env.NEXT_PUBLIC_LOGIN_SOURCE,
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
      const res = await modulePostFetch(fetchLoginProps)
      setCookie(KEY_ACCESS_TOKEN, res.data.result)
      router.push('/main')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case HttpStatusCode.BadRequest:
            if (err.response?.data.message === LOGIN_EMAIL_FAIL_MESSAGE) {
              props.setErrMsg('이메일을 잘못 입력했습니다.')
            } else if (err.response?.data.message === LOGIN_PWD_FAIL_MESSAGE) {
              props.setErrMsg('비밀번호를 잘못 입력했습니다.')
            }
            break
          case HttpStatusCode.InternalServerError:
            props.setErrMsg('통신오류가 발생했습니다. 다시 시도해주세요')
            break
        }
      } else {
        props.setErrMsg('로그인에 실패했습니다.')
      }
    }
  }

  const handleLogin = async () => {
    void fetchLogin()
  }
  return (
    <button
      type="button"
      className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
      onClick={(event) => {
        event.preventDefault()
        void handleLogin()
      }}
    >
      {props.title}
    </button>
  )
}
