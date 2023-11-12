// TODO: join시 사용자가 선택/입력해야할 부분이? =>

import { SlOrganization } from 'react-icons/sl'

import OrgInput from '../../ui/input/organization/OrgInput'

export default function JoinOrgInfo() {
  return (
    <>
      <OrgInput
        componentType="join"
        title="Organization Code"
        placeholder="001"
        icon={<SlOrganization />}
      />
    </>
  )
}
