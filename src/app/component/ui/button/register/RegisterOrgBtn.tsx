import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

import { ORG_CRAETE_NOTEAM, ORG_CREATE, ORG_JOIN } from '@/app/constant/constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type BtnProps } from '@/app/types/ui/btnTypes'

export default function RegisterOrgBtn(props: BtnProps) {
  const accessToken = getCookie('access-token')
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
      await modulePostFetch(fetchCreateOrgProps)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.status) {
          case 400:
            alert('입력값이 잘못되었습니다.')
            break
          case 500:
            alert('통신오류가 발생했습니다.')
            break
        }
      }
    }
  }

  const fetchJoinOrg = async (): Promise<void> => {
    try {
      await modulePostFetch(fetchJoinOrgProps)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.status) {
          case 400:
            alert('입력값이 잘못되었습니다.')
            break
          case 500:
            alert('통신오류가 발생했습니다.')
            break
        }
      }
    }
  }

  const isInputComplete = () => {
    switch (props.title) {
      case ORG_CREATE:
        alert('항목을 모두 입력해주세요')
        return
      case ORG_CRAETE_NOTEAM:
        alert('항목을 모두 입력해주세요')
        return
      case ORG_JOIN:
        alert('조직 코드를 입력해 주세요')
        return
      default:
        alert('잘못된 접근입니다.')
    }
  }
  const handleClickButton = async () => {
    if (!isOrgComplete) {
      isInputComplete()
      return
    }

    if (props.title === ORG_CREATE.toUpperCase() || props.title === ORG_CRAETE_NOTEAM) {
      await fetchCreateOrg().catch(() => {
        alert('조직 생성 실패')
      })
    } else {
      await fetchJoinOrg().catch(() => {
        alert('조직 가입 실패')
      })
      return
    }

    router.push('/')
    alert(`조직 ${props.title === ORG_CREATE ? '생성' : '가입'}이 완료되었습니다.`)
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
