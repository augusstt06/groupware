import axios, { HttpStatusCode } from 'axios'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { AiFillGithub, AiOutlineGoogle } from 'react-icons/ai'
import { TbLogin2 } from 'react-icons/tb'

import { KEY_ACCESS_TOKEN } from '@/app/constant/constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type SignupBtnProps } from '@/app/types/ui/btnTypes'

export function SignupBtn(props: SignupBtnProps) {
  const router = useRouter()
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
      if (!signupState.email.isCheck) {
        props.setErrMsg('이메일이 중복됩니다. 다른 이메일을 사용해주세요.')
        return
      }
      await modulePostFetch(fetchSignupProps)
      const res = await modulePostFetch(fetchLoginProps)
      setCookie(KEY_ACCESS_TOKEN, res.data.result)
      router.push('/organization')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case HttpStatusCode.BadRequest:
            props.setErrMsg('입력값이 잘못되었습니다.')
            break
          case HttpStatusCode.InternalServerError:
            props.setErrMsg('통신오류가 발생했습니다. 다시 시도해주세요')
            break
        }
      } else {
        props.setErrMsg('회원가입에 실패했습니다.')
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
        event.preventDefault()
        void handleClickBtn()
      }}
    >
      {props.title}
    </button>
  )
}

export function HeaderLoginBtn() {
  return (
    <button className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border">
      <TbLogin2 className="text-indigo-500 w-10 h-6 hover:text-stone-800" />
    </button>
  )
}

export function GitSignin() {
  return (
    <button
      type="button"
      className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 border-2 dark:hover:border-indigo-500/75 mr-2 mb-2"
    >
      <AiFillGithub width={10} height={10} className="mr-3 text-lg" />
      Sign in with Github
    </button>
  )
}

export function GoogleSignin() {
  return (
    <button
      type="button"
      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2 border-2 dark:hover:border-indigo-500 "
    >
      <AiOutlineGoogle width={10} height={10} className="mr-3 text-lg" />
      Sign in with Google
    </button>
  )
}
