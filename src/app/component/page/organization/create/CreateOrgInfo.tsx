import { MdOutlineDescription } from 'react-icons/md'
import { SlOrganization } from 'react-icons/sl'

import OrgInput from '../../../ui/input/organization/OrgInput'
import SelectBox from '../../../ui/selectbox/SelectBox'

export default function CreateOrgInfo() {
  return (
    <>
      <OrgInput
        componentType="create"
        title="Organization name"
        placeholder="frontend"
        icon={<SlOrganization />}
      />
      <OrgInput
        componentType="create"
        title="Description"
        placeholder="
Groupware site publishing and feature development"
        icon={<MdOutlineDescription />}
      />
      <SelectBox />
    </>
  )
}
