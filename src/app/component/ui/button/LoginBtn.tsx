import { useRouter } from 'next/navigation'
import { AiFillGithub, AiOutlineGoogle } from 'react-icons/ai'
import { TbLogin2 } from 'react-icons/tb'

import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type BtnProps } from '@/app/types/ui/btnTypes'

export function SignupBtn(props: BtnProps) {
  const router = useRouter()
  const loginState = useAppSelector((state) => {
    return state.loginInfo
  })

  const fetchProps = {
    data: {
      email: loginState.email.value,
      password: loginState.pwd.pwdValue,
      passwordConfirm: loginState.pwd.pwdConfirmValue,
      phoneNumber: loginState.phoneNumber.value,
    },
    fetchUrl: process.env.NEXT_PUBLIC_REGISTER_SOURCE,
  }
  const fetchSignin = async () => {
    await modulePostFetch(fetchProps)

    alert('회원가입이 완료되었습니다.')
  }
  const handleClickBtn = () => {
    fetchSignin()
      .then(() => {
        router.push('/organization')
      })
      .catch(() => {
        alert('회원가입이 실패했습니다.')
      })
  }

  return (
    <button
      type="button"
      className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
      onClick={handleClickBtn}
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
