import { SlOrganization } from 'react-icons/sl'

import OrgInput from '../../../ui/input/organization/OrgInput'

import useInput from '@/app/module/hooks/reactHooks/useInput'

export default function JoinOrgInfo() {
  const joinInput = useInput('')
  return (
    <>
      <OrgInput
        componentType="join"
        useInput={joinInput}
        title="Organization Code"
        placeholder="ABC12GG"
        icon={<SlOrganization />}
      />
    </>
  )
}
