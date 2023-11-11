// FIXME: grade, team 선택
// 1. 조직안의 팀 생성
// 2. 팀 등급 설정 (grade)
// 조직생성이후 팀 생성이나 등급생성 데이터 형식대로 다 input value화 시켜서 상태관리

import { BsMicrosoftTeams } from 'react-icons/bs'

import OrgInput from '@/app/component/ui/input/organization/OrgInput'

export default function AdditionalOrg() {
  return (
    <>
      <OrgInput
        componentType="create team"
        title="Organization Team Name"
        placeholder="frontend-ui"
        icon=<BsMicrosoftTeams />
      />
    </>
  )
}
