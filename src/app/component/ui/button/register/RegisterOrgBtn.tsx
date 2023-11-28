import { HttpStatusCode } from 'axios'
import { getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

import { KEY_ACCESS_TOKEN, ORG_CRAETE_NOTEAM, ORG_CREATE, ORG_JOIN } from '@/app/constant/constant'
import { ERR_400, ERR_500, ERR_DEFAULT, ERR_NOT_ENTERED } from '@/app/constant/errorMsg'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type RegisterOrgBtnProps } from '@/app/types/ui/btnTypes'
export default function RegisterOrgBtn(props: RegisterOrgBtnProps) {
  const accessToken = getCookie(KEY_ACCESS_TOKEN)
  const router = useRouter()

  const isOrgComplete: boolean = useAppSelector((state) => {
    const { name, description } = state.orgInfo.createOrg
    const { code } = state.orgInfo.joinOrg

    switch (props.title) {
      case ORG_CREATE.toUpperCase():
        return name !== '' && description !== ''
      case ORG_CRAETE_NOTEAM:
        return name !== '' && description !== ''
      case ORG_JOIN.toUpperCase():
        return code !== ''
      default:
        return false
    }
  })
  const orgState = useAppSelector((state) => {
    return state.orgInfo
  })

  const fetchJoinOrgProps: ModulePostFetchProps = {
    data: {
      code: orgState.joinOrg.code,
    },
    fetchUrl: process.env.NEXT_PUBLIC_JOIN_ORGANIZATIONS_SOURCE,
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const fetchCreateOrgProps: ModulePostFetchProps = {
    data: {
      description: orgState.createOrg.description,
      grades: [orgState.grades],
      name: orgState.createOrg.name,
      organizationType: orgState.createOrg.organizationType,
      teams: orgState.teams,
    },
    fetchUrl: process.env.NEXT_PUBLIC_CREATE_ORGANIZATIONS_SOURCE,
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const fetchCreateOrg = async (): Promise<void> => {
    try {
      const res = await modulePostFetch(fetchCreateOrgProps)
      if (!res.ok) {
        throw new Error(res.status.toString())
      }
      const resJson = await res.json()
      setCookie('X-ORGANIZATION-CODE', resJson.data.result)
      router.push('/main')
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case HttpStatusCode.BadRequest.toString():
            props.setErrMsg(ERR_400)
            break
          case HttpStatusCode.InternalServerError.toString():
            props.setErrMsg(ERR_500)
            break
          default:
            props.setErrMsg(ERR_DEFAULT('조직생성'))
            break
        }
      }
    }
  }

  const fetchJoinOrg = async (): Promise<void> => {
    try {
      const res = await modulePostFetch(fetchJoinOrgProps)
      if (!res.ok) {
        throw new Error(res.status.toString())
      }
      router.push('/main')
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case HttpStatusCode.BadRequest.toString():
            props.setErrMsg(ERR_400)
            break
          case HttpStatusCode.InternalServerError.toString():
            props.setErrMsg(ERR_500)
            break
          default:
            props.setErrMsg(ERR_DEFAULT('조직가입'))
            break
        }
      }
    }
  }

  const isInputComplete = () => {
    switch (props.title) {
      case ORG_JOIN:
        props.setErrMsg(ERR_NOT_ENTERED('조직코드'))
        return
      default:
        props.setErrMsg(ERR_NOT_ENTERED('필수 항목'))
    }
  }
  const handleClickButton = async () => {
    if (!isOrgComplete) {
      isInputComplete()
      return
    }

    if (props.title === ORG_CREATE.toUpperCase() || props.title === ORG_CRAETE_NOTEAM) {
      void fetchCreateOrg()
    } else {
      void fetchJoinOrg()
    }
  }

  return (
    <button
      type="button"
      className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
      onClick={(event) => {
        event.preventDefault()
        void handleClickButton()
      }}
    >
      {props.title}
    </button>
  )
}
