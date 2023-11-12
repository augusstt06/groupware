'use client'

import { useState } from 'react'

import JoinOrgInfo from '../component/page/organization/JoinOrgInfo'
import CreateOrgInfo from '../component/page/organization/create/CreateOrgInfo'
import OrgChooseBtn from '../component/ui/button/OrgChooseBtn'
import RegisterOrgBtn from '../component/ui/button/register/RegisterOrgBtn'

export default function Organization() {
  const [organization, setOrganization] = useState('create')
  // TODO: 회원가입 후 로그인 api날려서 로그인 상태 유지하기

  return (
    <div className="flex flex-col justify-center items-center p 1">
      <OrgChooseBtn organization={organization} setOrganization={setOrganization} />
      <div className="mt-10 w-3/5">
        {organization === 'create' ? <CreateOrgInfo /> : <JoinOrgInfo />}
      </div>
      <div className="flex flex-row justify-center items-center">
        <RegisterOrgBtn title={organization === 'create' ? 'Create!' : 'Join!'} />
      </div>
    </div>
  )
}
