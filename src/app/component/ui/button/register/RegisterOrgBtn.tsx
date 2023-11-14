import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type ModulePostFetchProps } from '@/app/types/moduleTypes'
import { type RegisterOrnBtnProps } from '@/app/types/ui/btnTypes'

export default function RegisterOrgBtn(props: RegisterOrnBtnProps) {
  const accessToken = getCookie('access-token')
  const router = useRouter()

  const isOrgComplete = useAppSelector((state) => {
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

  const fetchJoinOrgProps = {
    data: {
      code: orgState.joinOrg.code,
    },
    fetchUrl: process.env.NEXT_PUBLIC_JOIN_ORGANIZATIONS_SOURCE,
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const fetchCreateOrgPRops: ModulePostFetchProps = {
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
  const fetchCreateOrg = async () => {
    await modulePostFetch(fetchCreateOrgPRops)
  }

  const fetchJoinOrg = async () => {
    await modulePostFetch(fetchJoinOrgProps)
  }

  const handleClickCreateBtn = () => {
    if (!isOrgComplete) {
      alert('항목을 모두 입력해주세요')
      return
    }
    fetchCreateOrg()
      .then(() => {
        router.push('/')
        // TODO: 여기서 스토어에 저장
        alert('조직생성이 완료되었습니다.')
      })
      .catch(() => {
        alert('조직 생성에 실패했습니다.')
      })
  }
  const handleClickJoinBtn = () => {
    if (!isOrgComplete) {
      alert('조직 코드를 입력해주세요')
      return
    }
    fetchJoinOrg()
      .then(() => {
        alert('조직 가입이 완료되었습니다.')
      })
      .catch(() => {})
  }

  return (
    <button
      type="button"
      className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
      onClick={props.title === 'Create!' ? handleClickCreateBtn : handleClickJoinBtn}
    >
      {props.title}
    </button>
  )
}
