'use client'

import CreateOrgInfo from './create/CreateOrgInfo'
import JoinOrgInfo from './join/JoinOrgInfo'

import { ORG_CREATE } from '@/constant/constant'
import { type RegisterOrgProps } from '@/types/pageType'

export default function RegisterOrg(props: RegisterOrgProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full overflow-y-auto">
      <div className="w-full mt-2 md:w-3/5">
        <div>{props.organization === ORG_CREATE ? <CreateOrgInfo /> : <JoinOrgInfo />}</div>
      </div>
    </div>
  )
}
