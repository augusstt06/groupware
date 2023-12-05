import { HttpStatusCode } from 'axios'
import { useRouter } from 'next/navigation'

import { KEY_ACCESS_TOKEN, KEY_LOGIN_TIME, ORG_CREATE, ORG_JOIN } from '@/app/constant/constant'
import {
  ERR_INPUT_ERROR,
  ERR_INTERNAL_SERVER,
  errDefault,
  errNotEntered,
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

  const fetchOrg = async (fetchOrgProps: ModulePostFetchProps): Promise<void> => {
    try {
      await modulePostFetch(fetchOrgProps)
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case HttpStatusCode.BadRequest.toString():
            props.setErrMsg(ERR_INPUT_ERROR)
            break
          case HttpStatusCode.InternalServerError.toString():
            props.setErrMsg(ERR_INTERNAL_SERVER)
            break
          default:
            props.setErrMsg(
              props.orgType === ORG_CREATE ? errDefault('조직생성') : errDefault('조직가입'),
            )
            break
        }
      }
    }
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

  const fetchData: ModulePostFetchProps =
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
      await modulePostFetch(fetchSignupProps)
      const res = await modulePostFetch<FetchResponseType<ApiRes>>(fetchLoginProps)

      if (res.status !== 200) throw new Error((res as FailResponseType).message)

      moduleSetCookies({
        [KEY_ACCESS_TOKEN]: (res as SuccessResponseType<ApiRes>).result.accessToken,
        [KEY_LOGIN_TIME]: getCurrentTime(),
      })
      const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
      const fetchProps: ModulePostFetchProps = {
        ...fetchData,
        header: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      await fetchOrg(fetchProps)
      // FIXME: 아래를 호출해도 초기화가 되지 않음
      dispatch(resetSignupInfoReducer())
      router.push('/main')
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case HttpStatusCode.BadRequest.toString():
            props.setErrMsg(ERR_INPUT_ERROR)
            break
          case HttpStatusCode.InternalServerError.toString():
            props.setErrMsg(ERR_INTERNAL_SERVER)
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
