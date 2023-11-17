'use client'

import { useState } from 'react'

import JoinOrgInfo from '../component/page/organization/JoinOrgInfo'
import CreateOrgInfo from '../component/page/organization/create/CreateOrgInfo'
import CreateOrgTeam from '../component/page/organization/create/CreateOrgTeam'
import OrgChooseBtn from '../component/ui/button/organization/OrgChooseBtn'
import { NextStepToOrgTeam } from '../component/ui/button/organization/OrgTeamBtn'
import RegisterOrgBtn from '../component/ui/button/register/RegisterOrgBtn'
import {
  ORG_CRAETE_NOTEAM,
  ORG_CREATE,
  ORG_CREATETEAM,
  ORG_JOIN,
  ORG_NEXT,
} from '../constant/constant'

export default function Organization() {
  const [organization, setOrganization] = useState('')

  return (
    <div className="flex flex-col justify-center items-center h-3/5">
      {organization === '' ? (
        <div className="w-2/5">
          <OrgChooseBtn organization={organization} setOrganization={setOrganization} />
        </div>
      ) : (
        <>
          <div className="w-3/5">
            {organization === ORG_CREATE ? (
              <CreateOrgInfo />
            ) : organization === ORG_CREATETEAM ? (
              <CreateOrgTeam />
            ) : (
              <JoinOrgInfo />
            )}
          </div>
          <div className="flex flex-row justify-center items-center">
            {organization === ORG_CREATE ? (
              <>
                <div className="mr-5">
                  <NextStepToOrgTeam
                    title={ORG_NEXT}
                    organization={organization}
                    setOrganization={setOrganization}
                  />
                </div>
                <div>
                  <RegisterOrgBtn title={ORG_CRAETE_NOTEAM} />
                </div>
              </>
            ) : (
              <RegisterOrgBtn
                title={
                  organization === ORG_CREATETEAM
                    ? ORG_CREATE.toUpperCase()
                    : ORG_JOIN.toUpperCase()
                }
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}
