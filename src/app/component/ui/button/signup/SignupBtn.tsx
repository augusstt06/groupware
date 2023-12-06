import { useRouter } from 'next/navigation'

import {
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_TIME,
  ORG_CREATE,
  ORG_JOIN,
  REGISTER_EMAIL,
  REGISTER_NAME,
  REGISTER_ORG_DESCRIPTION,
  REGISTER_ORG_JOIN,
  REGISTER_ORG_NAME,
  REGISTER_PHONENUMBER,
  REGISTER_POSITION,
} from '@/app/constant/constant'
import {
  ERR_MESSAGE_RECORD_NOT_FOUND,
  ERR_MESSAGE_REGISTER_ORG_FAIL_EXIST,
  ERR_MESSAGE_SIGNUP_USER_EXIST,
  errDefault,
  errNotEntered,
  errNotFound,
} from '@/app/constant/errorMsg'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie, moduleSetCookies } from '@/app/module/utils/cookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { getCurrentTime } from '@/app/module/utils/time'
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
  const orgState = useAppSelector((state) => state.orgInfo)
  const signupState = useAppSelector((state) => state.signupInfo)

  const isOrgComplete: boolean = useAppSelector((state) => {
    const { name, description } = state.orgInfo.createOrg
    const { code } = state.orgInfo.joinOrg

    switch (props.orgType) {
      case ORG_CREATE:
        return name !== '' && description !== ''
      case ORG_JOIN:
        return code !== ''
      default:
        return false
    }
  })

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

  const isOrgInputError = () => {
    switch (props.title) {
      case ORG_JOIN:
        props.setErrMsg(errNotEntered('조직코드'))
        break
      default:
        props.setErrMsg(errNotEntered('필수 항목'))
        break
    }
  }

  const deleteStorage = (arr: string[]) => {
    arr.forEach((name) => {
      localStorage.removeItem(name)
    })
  }
  const fetchOrgData: ModulePostFetchProps =
    props.orgType === ORG_CREATE
      ? {
          data: {
            description: orgState.createOrg.description,
            grades: [orgState.grades],
            name: orgState.createOrg.name,
            organizationType: orgState.createOrg.organizationType,
            teams: orgState.teams,
          },
          fetchUrl: process.env.NEXT_PUBLIC_CREATE_ORGANIZATIONS_SOURCE,
        }
      : {
          data: {
            code: orgState.joinOrg.code,
          },
          fetchUrl: process.env.NEXT_PUBLIC_JOIN_ORGANIZATIONS_SOURCE,
        }

  const fetchSignin = async (): Promise<void> => {
    try {
      if (!(signupState.email.isCheck as boolean)) {
        props.setErrMsg('이메일이 중복됩니다. 다른 이메일을 사용해주세요.')
        return
      }
      if (!isOrgComplete) {
        isOrgInputError()
        return
      }
      const signupRes = await modulePostFetch<FetchResponseType<string>>(fetchSignupProps)
      if (signupRes.status !== 200) throw new Error((signupRes as FailResponseType).message)

      const loginRes = await modulePostFetch<FetchResponseType<ApiRes>>(fetchLoginProps)
      if (loginRes.status !== 200) throw new Error((loginRes as FailResponseType).message)

      moduleSetCookies({
        [KEY_ACCESS_TOKEN]: (loginRes as SuccessResponseType<ApiRes>).result.accessToken,
        [KEY_LOGIN_TIME]: getCurrentTime(),
      })
      const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
      const fetchOrgProps: ModulePostFetchProps = {
        ...fetchOrgData,
        header: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const orgRes = await modulePostFetch<FetchResponseType<string>>(fetchOrgProps)
      if (orgRes.status !== 200) throw new Error((orgRes as FailResponseType).message)
      dispatch(resetSignupInfoReducer())

      deleteStorage([
        REGISTER_EMAIL,
        REGISTER_NAME,
        REGISTER_POSITION,
        REGISTER_PHONENUMBER,
        REGISTER_ORG_DESCRIPTION,
        REGISTER_ORG_NAME,
        REGISTER_ORG_JOIN,
      ])
      router.push('/main')
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case ERR_MESSAGE_SIGNUP_USER_EXIST:
            props.setErrMsg('이미 유저가 존재합니다.')
            break
          case ERR_MESSAGE_REGISTER_ORG_FAIL_EXIST:
            props.setErrMsg('이미 해당 조직에 가입되어 있습니다.')
            break
          case ERR_MESSAGE_RECORD_NOT_FOUND:
            props.setErrMsg(errNotFound('입력한 조직'))
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
        event.preventDefault()
        void handleClickBtn()
      }}
    >
      {props.title}
    </button>
  )
}
