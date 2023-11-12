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
