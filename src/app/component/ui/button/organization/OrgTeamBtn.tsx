import { ORG_CREATE, ORG_JOIN } from '@/app/constant/constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { type NextStepOrgTeamProps, type RegisterOrgBtnProps } from '@/app/types/ui/btnTypes'

export function OrgTeamConfirmBtn(props: RegisterOrgBtnProps) {
  // FIXME: 버튼 클릭시 현재 작성한 팀의 정보가 오른쪽의 팀 현황ㅇ로 이동하고 밸류 초기화
  return (
    <button
      type="button"
      className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-xs px-1 py-1 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
      onClick={props.handleClick}
    >
      {props.title}
    </button>
  )
}

export function NextStepToOrgTeam(props: NextStepOrgTeamProps) {
  const isOrgComplete = useAppSelector((state) => {
    const name = state.orgInfo.createOrg.name
    const description = state.orgInfo.createOrg.description
    const code = state.orgInfo.joinOrg.code

    switch (props.organization) {
      case ORG_CREATE:
        return name !== '' && description !== ''
      case ORG_JOIN:
        return code !== ''
      default:
        return false
    }
  })

  const handleClick = () => {
    switch (props.organization) {
      case ORG_CREATE:
        if (isOrgComplete) {
          props.setOrganization('createTeam')
        } else {
          alert('입력 항목을 다 입력해주세요')
        }
        break
      case ORG_JOIN:
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
