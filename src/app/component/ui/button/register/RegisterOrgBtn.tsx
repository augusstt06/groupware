import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

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
      case 'Create!':
        // return name !== '' && description !== '' && teamName !== '' && teamDescription !== ''
        return name !== '' && description !== ''
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
      // 팀 수정
      teams: [
        {
          description: orgState.teams,
          name: orgState.teams,
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
      alert('조직생성이 실패했습니다.')
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
      alert('조직가입이 실패했습니다.')
    }
  }

  const handleClickButton = () => {
    if (!isOrgComplete) {
      alert(props.title === 'create' ? '항목을 모두 입력해주세요' : '조직 코드를 입력해주세요')
      return
    }

    if (props.title === 'create') {
      void fetchCreateOrg()
    } else {
      void fetchJoinOrg()
    }

    router.push('/')
    alert(`조직 ${props.title === 'create' ? '생성' : '가입'}이 완료되었습니다.`)
  }

  return (
    <button
      type="button"
      className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
      onClick={(event) => {
        event.preventDefault()
        handleClickButton()
      }}
    >
      {props.title}
    </button>
  )
}
