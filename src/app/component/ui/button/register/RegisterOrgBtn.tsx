import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type RegisterOrnBtnProps } from '@/app/types/ui/btnTypes'

export default function RegisterOrgBtn(props: RegisterOrnBtnProps) {
  const accessToken = getCookie('access-token')
  const router = useRouter()

  const isOrgComplete: boolean = useAppSelector((state) => {
    const { name, description } = state.orgInfo.createOrg
    const { code } = state.orgInfo.joinOrg
    const { teamName, teamDescription } = state.orgInfo.teams

    switch (props.title) {
      case 'Create!':
        return name !== '' && description !== '' && teamName !== '' && teamDescription !== ''
      case 'Join!':
        return code !== ''
      default:
        return false
    }
  })
  const orgState = useAppSelector((state) => {
    return state.orgInfo
  })

  // FIXME:  3)

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
      teams: [
        {
          description: orgState.teams.teamDescription,
          name: orgState.teams.teamName,
        },
      ],
    },
    fetchUrl: process.env.NEXT_PUBLIC_CREATE_ORGANIZATIONS_SOURCE,
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const fetchCreateOrg = async (): Promise<void> => {
    try {
      await modulePostFetch(fetchCreateOrgProps)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        switch (err.status) {
          case 400:
            throw new Error('400 : 잘못된 입력값으로 조직생성이 실패했습니다.')
          case 500:
            throw new Error('500 : 조직생성 중 서버측 에러가 발생했습니다.')
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
            throw new Error('400 : 잘못된 입력값으로 조직 가입이 실패했습니다.')
          case 500:
            throw new Error('500 : 조직 가입 중 서버측 에러가 발생했습니다.')
        }
      }
    }
  }

  const handleClickButton = async (): Promise<void> => {
    if (!isOrgComplete) {
      alert(props.title === 'create' ? '항목을 모두 입력해주세요' : '조직 코드를 입력해주세요')
      return
    }

    try {
      if (props.title === 'create') {
        await fetchCreateOrg()
      } else {
        await fetchJoinOrg()
      }

      router.push('/')
      alert(`조직 ${props.title === 'create' ? '생성' : '가입'}이 완료되었습니다.`)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.status) {
          case 400:
            throw new Error(
              `400 : 잘못된 입력값으로 ${
                props.title === 'create' ? '조직생성' : '조직가입'
              }이 실패했습니다.`,
            )
          case 500:
            throw new Error(
              `500 :   ${
                props.title === 'create' ? '조직생성' : '조직가입'
              }중 서버측 에러가 발생했습니다.`,
            )
        }
      }
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
