import axios, { HttpStatusCode } from 'axios'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

import { KEY_ACCESS_TOKEN } from '@/app/constant/constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import inputValidate from '@/app/module/utils/inputValidate'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type BtnProps } from '@/app/types/ui/btnTypes'

export default function LoginBtn(props: BtnProps) {
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
    const isEmailValid = inputValidate(inputValidateProps)
    if (!isEmailValid) {
      alert('이메일 형식이 잘못되었습니다')
      return
    }
    try {
      const res = await modulePostFetch(fetchLoginProps)
      setCookie(KEY_ACCESS_TOKEN, res.data.result)
      alert('로그인이 완료되었습니다.')
      router.push('/main')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.status) {
          case HttpStatusCode.BadRequest:
            alert('입력값이 잘못되었습니다.')
            break
          case HttpStatusCode.InternalServerError:
            alert('통신오류가 발생했습니다.')
            break
        }
      }
      alert('로그인이 실패했습니다.')
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
