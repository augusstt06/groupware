import { useRouter } from 'next/navigation'

import {
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_TIME,
  KEY_UUID,
  KEY_X_ORGANIZATION_CODE,
  LOGIN_EMAIL_FAIL_MESSAGE,
  LOGIN_PWD_FAIL_MESSAGE,
} from '@/app/constant/constant'
import { ERR_DEFAULT } from '@/app/constant/errorMsg'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleSetCookies } from '@/app/module/utils/cookie'
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
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const resJson = await res.json()
      const loginTime = performance.now()
      moduleSetCookies({
        [KEY_LOGIN_TIME]: loginTime,
        [KEY_ACCESS_TOKEN]: resJson.data.result.accessToken,
        [KEY_X_ORGANIZATION_CODE]: resJson.data.result.organizationCode,
        [KEY_UUID]: resJson.data.result.uuid,
      })

      router.push('/main')
    } catch (err) {
      // FIXME: 에러메시지 어떻게 응답되는지 확인하기
      if (err instanceof Error) {
        switch (err.message) {
          case LOGIN_EMAIL_FAIL_MESSAGE:
            props.setErrMsg('이메일을 잘못 입력했습니다.')
            break
          case LOGIN_PWD_FAIL_MESSAGE:
            props.setErrMsg('비밀번호를 잘못 입력했습니다.')
            break
          default:
            props.setErrMsg(ERR_DEFAULT('로그인'))
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
