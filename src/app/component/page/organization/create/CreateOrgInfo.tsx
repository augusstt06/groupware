import { useState } from 'react'

import { MdOutlineDescription } from 'react-icons/md'
import { SlOrganization } from 'react-icons/sl'

import OrgInput from '../../../ui/input/organization/OrgInput'
import SelectBox from '../../../ui/selectbox/SelectBox'

import CreateOrgTeam from './CreateOrgTeam'

import { BasicBtn } from '@/app/component/ui/button/BtnGroups'
import { InputLabel } from '@/app/component/ui/label/Inputlabel'
import ToggleGroup from '@/app/component/ui/toggle/organization/ToggleGroup'
import {
  ORG_CREATE,
  ORG_GRADES,
  ORG_SELECTBOX,
  PRIVATE,
  PUBLIC,
  REGISTER_ORG_DESCRIPTION,
  REGISTER_ORG_NAME,
} from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'

export default function CreateOrgInfo() {
  const [isTeam, setIsTeam] = useState(false)

  const handleClick = () => {
    setIsTeam(!isTeam)
  }

  const dynamicInput = (isPersist: boolean, title: string, limit?: number) => {
    const storedValue = isPersist ? localStorage.getItem(title) : ''
    return useInput(storedValue as string, isPersist, title, limit)
  }
  const orgNameInput = dynamicInput(true, REGISTER_ORG_NAME)
  const orgDescriptionInput = dynamicInput(true, REGISTER_ORG_DESCRIPTION, 100)

  const selectList = [
    {
      value: PUBLIC.toUpperCase(),
      name: PUBLIC,
    },
    {
      value: PRIVATE.toUpperCase(),
      name: PRIVATE,
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
        useInput={orgNameInput}
        componentType={ORG_CREATE}
        title={REGISTER_ORG_NAME}
        placeholder="frontend"
        icon={<SlOrganization />}
      />
      <OrgInput
        useInput={orgDescriptionInput}
        componentType={ORG_CREATE}
        title={REGISTER_ORG_DESCRIPTION}
        placeholder="
Groupware site publishing and feature development"
        icon={<MdOutlineDescription />}
      />
      <SelectBox
        compoenetType={ORG_SELECTBOX}
        apiKey="none"
        title="Select an Orgnization Type"
        selectList={selectList}
      />
      <InputLabel title="Organization Setting" />
      {gradesData.map((data) => (
        <div key={data[0].title}>
          <ToggleGroup toggleData={data} compoenetType={ORG_GRADES} />
        </div>
      ))}
      <div>
        <div onClick={handleClick}>
          <BasicBtn title={!isTeam ? 'Create Team' : 'Without Team'} />
        </div>
        {isTeam ? <CreateOrgTeam /> : <></>}
      </div>
    </>
  )
}
