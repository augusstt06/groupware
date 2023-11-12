import { getCookie } from 'cookies-next'

import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { type RegisterOrnBtnProps } from '@/app/types/ui/btnTypes'

export default function RegisterOrgBtn(props: RegisterOrnBtnProps) {
  const isOrgComplete = useAppSelector((state) => {
    const { name, description } = state.orgInfo.createOrg
    const { code } = state.orgInfo.joinOrg

    switch (props.title) {
      case 'Create!':
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
  const accessToken = getCookie('access-token')
  const fetchCreateOrgHeader = {
    token: accessToken,
  }

  const fetchCreateOrgProps = {
    data: {
      description: orgState.createOrg.description,
      name: orgState.createOrg.name,
      organizationType: orgState.createOrg.organizationType,
    },
    fetchUrl: process.env.NEXT_PUBLIC_CREATE_ORGANIZATIONS_SOURCE,
    header: {
      Authorization: fetchCreateOrgHeader,
    },
  }

  const fetchJoinOrgProps = {
    data: {
      code: orgState.joinOrg.code,
    },
    fetchUrl: process.env.NEXT_PUBLIC_JOIN_ORGANIZATIONS_SOURCE,
  }

  const fetchCreateOrg = async () => {
    await modulePostFetch(fetchCreateOrgProps)
    alert('조직 생성이 완료되었습니다.')
  }

  const fetchJoinOrg = async () => {
    await modulePostFetch(fetchJoinOrgProps)
  }

  const handleClick = () => {
    switch (props.title) {
      case 'Create!':
        if (!isOrgComplete) {
          alert('항목을 모두 입력해주세요')
          return
        }
        fetchCreateOrg()
          .then(() => {
            alert('조직생성이 완료되었습니다.')
          })
          .catch(() => {})
        break
      case 'Join!':
        if (!isOrgComplete) {
          alert('조직 코드를 입력해주세요')
          return
        }
        fetchJoinOrg()
          .then(() => {
            alert('조직 가입이 완료되었습니다.')
          })
          .catch(() => {})
        break
      default:
        break
    }
  }
  return (
    <button
      type="button"
      className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
      onClick={handleClick}
    >
      {props.title}
    </button>
  )
}
