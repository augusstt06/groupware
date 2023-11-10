import { MdOutlineDescription } from 'react-icons/md'
import { SlOrganization } from 'react-icons/sl'

import OrgInput from '../ui/input/organization/OrgInput'
import SelectBox from '../ui/selectbox/SelectBox'

export default function OrgInfo() {
  return (
    <>
      <OrgInput title="Organization name" placeholder="frontend" icon={<SlOrganization />} />
      <OrgInput
        title="Description"
        placeholder="
Groupware site publishing and feature development"
        icon={<MdOutlineDescription />}
      />
      <SelectBox />
    </>
  )
}
