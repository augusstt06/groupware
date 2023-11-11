'use client'

import { useState } from 'react'

import OrgInfo from '../component/page/OrgInfo'
import OrgChooseBtn from '../component/ui/button/OrgChooseBtn'
import RegisterOrgBtn from '../component/ui/button/register/RegisterOrgBtn'

export default function Organization() {
  const [organization, setOrganization] = useState('create')
  // TODO: Organization 작성 여부 확인

  return (
    <div className="flex flex-col justify-center items-center p 1">
      <OrgChooseBtn organization={organization} setOrganization={setOrganization} />
      <div className="mt-10 w-3/5">{organization === 'create' ? <OrgInfo /> : <>join</>}</div>
      <div className="flex flex-row justify-center items-center">
        <RegisterOrgBtn title="Create!" />
      </div>
    </div>
  )
}
