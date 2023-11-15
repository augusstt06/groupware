'use client'

import { useState } from 'react'

import JoinOrgInfo from '../component/page/organization/JoinOrgInfo'
import CreateOrgInfo from '../component/page/organization/create/CreateOrgInfo'
import CreateOrgTeam from '../component/page/organization/create/CreateOrgTeam'
import OrgChooseBtn from '../component/ui/button/organization/OrgChooseBtn'
import { NextStepToOrgTeam } from '../component/ui/button/organization/OrgTeamBtn'
import RegisterOrgBtn from '../component/ui/button/register/RegisterOrgBtn'

export default function Organization() {
  const [organization, setOrganization] = useState('create')

  return (
    <div className="flex flex-col justify-center items-center p 1 overflow-y-scroll">
      {/* 버튼 선택에 따라 조건부 렌더링 */}
      <OrgChooseBtn organization={organization} setOrganization={setOrganization} />
      <div className="w-3/5">
        {organization === 'create' ? (
          <CreateOrgInfo />
        ) : organization === 'createTeam' ? (
          <CreateOrgTeam />
        ) : (
          <JoinOrgInfo />
        )}
      </div>
      <div className="flex flex-row justify-center items-center">
        {organization === 'create' ? (
          <NextStepToOrgTeam
            title="Next"
            organization={organization}
            setOrganization={setOrganization}
          />
        ) : (
          <RegisterOrgBtn title={organization === 'createTeam' ? 'Create!' : 'Join!'} />
        )}
        {/* <RegisterOrgBtn title={organization === 'create' ? 'Create!' : 'Join!'} /> */}
      </div>
    </div>
  )
}
