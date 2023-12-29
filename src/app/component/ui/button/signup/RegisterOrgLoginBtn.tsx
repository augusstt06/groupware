import { useRouter } from 'next/navigation'

import {
  FALSE,
  KEY_ACCESS_TOKEN,
  ORG_CREATE,
  ORG_JOIN,
  REGISTER_ORG_DESCRIPTION,
  REGISTER_ORG_JOIN,
  REGISTER_ORG_NAME,
} from '@/app/constant/constant'
import {
  ERR_MESSAGE_RECORD_NOT_FOUND,
  ERR_MESSAGE_REGISTER_ORG_FAIL_EXIST,
  errNotEntered,
  errNotFound,
} from '@/app/constant/errorMsg'
import { API_URL_CREATE_ORG, API_URL_JOIN_ORG } from '@/app/constant/route/api-route-constant'
import { ROUTE_SIGNUP_COMPLETE } from '@/app/constant/route/route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleDeleteCookies, moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { deleteStorage } from '@/app/module/utils/moduleStorage'
import { updateLoginCompleteReducer } from '@/app/store/reducers/maintain/maintainReducer'
import {
  type FailResponseType,
  type FetchResponseType,
  type ModulePostFetchProps,
} from '@/app/types/moduleTypes'
import { type RegisterOrgLoginBtnProps } from '@/app/types/ui/btnTypes'

export default function RegisterOrgLoginBtn(props: RegisterOrgLoginBtnProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgState = useAppSelector((state) => state.orgInfo)
  const isOrgComeplete: boolean = useAppSelector((state) => {
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
  const isOrgInputError = () => {
    switch (props.orgType) {
      case ORG_CREATE:
        props.setErrMsg(errNotEntered('필수 항목'))
        break
      case ORG_JOIN:
        props.setErrMsg(errNotEntered('조직코드'))
    }
  }

  const fetchOrgProps: ModulePostFetchProps =
    props.orgType === ORG_CREATE
      ? {
          data: {
            description: orgState.createOrg.description,
            name: orgState.createOrg.name,
          },
          fetchUrl: API_URL_CREATE_ORG,
          header: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : {
          data: {
            code: orgState.joinOrg.code,
          },
          fetchUrl: API_URL_JOIN_ORG,
          header: {
            Authorization: `Bearer ${accessToken}`,
          },
        }

  const fetchOrg = async (): Promise<void> => {
    try {
      if (!isOrgComeplete) {
        isOrgInputError()
        return
      }

      const orgRes = await modulePostFetch<FetchResponseType<string>>(fetchOrgProps)
      if (orgRes.status !== 200) throw new Error((orgRes as FailResponseType).message)

      deleteStorage([REGISTER_ORG_DESCRIPTION, REGISTER_ORG_NAME, REGISTER_ORG_JOIN])
      dispatch(updateLoginCompleteReducer(FALSE))
      moduleDeleteCookies(KEY_ACCESS_TOKEN)
      router.push(ROUTE_SIGNUP_COMPLETE)
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case ERR_MESSAGE_RECORD_NOT_FOUND:
            props.setErrMsg(errNotFound('입력한 조직'))
            break
          case ERR_MESSAGE_REGISTER_ORG_FAIL_EXIST:
            props.setErrMsg('이미 해당 조직에 가입되어 있습니다.')
            break
        }
      }
    }
  }

  return (
    <button
      type="button"
      className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
      onClick={() => {
        void fetchOrg()
      }}
    >
      {props.orgType === ORG_CREATE ? '조직 생성' : '조직 가입'}
    </button>
  )
}
