import { MdOutlineDescription } from 'react-icons/md'
import { SlOrganization } from 'react-icons/sl'

import OrgInput from '../../../ui/input/organization/OrgInput'
import SelectBox from '../../../ui/selectbox/SelectBox'

import { InputLabel } from '@/app/component/ui/label/Inputlabel'
import ToggleGroup from '@/app/component/ui/toggle/organization/ToggleGroup'

export default function CreateOrgInfo() {
  const selectList = [
    {
      value: 'PUBLIC',
      name: 'Public',
    },
    {
      value: 'PRIVATE',
      name: 'Private',
    },
  ]
  const gradesData = [
    [
      { title: 'Delete Access', value: 'deleteAccess' },
      { title: 'Invite Access', value: 'inviteAccess' },
      { title: 'Maintain Access', value: 'maintainAccess' },
    ],
    [
      { title: 'Read Access', value: 'readAccess' },
      { title: 'Update Access', value: 'updateAccess' },
      { title: 'Write Access', value: 'writeAccess' },
    ],
  ]
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
      <SelectBox
        compoenetType="orgType"
        apiKey="none"
        title="Select an Orgnization Type"
        selectList={selectList}
      />
      <InputLabel title="Organization Setting" />
      {gradesData.map((data) => (
        <div key={data[0].title}>
          <ToggleGroup toggleData={data} compoenetType="grades" />
        </div>
      ))}
    </>
  )
}
