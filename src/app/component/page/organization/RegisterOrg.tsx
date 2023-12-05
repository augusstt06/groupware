'use client'

import CreateOrgInfo from './create/CreateOrgInfo'
import JoinOrgInfo from './join/JoinOrgInfo'

import { ORG_CREATE } from '@/app/constant/constant'
import { type RegisterOrgProps } from '@/app/types/pageTypes'

export default function RegisterOrg(props: RegisterOrgProps) {
  return (
    <div className="flex flex-col justify-center items-center h-3/5 h-full overflow-y-auto">
      <div className="h-full w-3/5">
        <div>{props.organization === ORG_CREATE ? <CreateOrgInfo /> : <JoinOrgInfo />}</div>
      </div>
    </div>
  )
}
