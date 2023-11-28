'use client'

import { useState } from 'react'

import JoinOrgInfo from '../component/page/organization/JoinOrgInfo'
import CreateOrgInfo from '../component/page/organization/create/CreateOrgInfo'
import ErrorAlert from '../component/ui/alert/ErrorAlert'
import { NavigationBtn } from '../component/ui/button/BtnGroups'
import OrgChooseBtn from '../component/ui/button/organization/OrgChooseBtn'
import RegisterOrgBtn from '../component/ui/button/register/RegisterOrgBtn'
import { ORG_CREATE, ORG_JOIN } from '../constant/constant'

export default function Organization() {
  const [errorState, setErrorState] = useState({
    isError: false,
    description: '',
  })
  const setErrMsg = (errDescription: string) => {
    setErrorState({
      isError: true,
      description: errDescription,
    })
  }
  const handleClickError = () => {
    setErrorState({
      isError: !errorState.isError,
      description: errorState.description,
    })
  }

  const [organization, setOrganization] = useState('')
  const goInitialOrg = () => {
    setOrganization('')
  }
  return (
    <div className="flex flex-col justify-center items-center h-3/5 h-full overflow-y-auto">
      {organization === '' ? (
        <div className="w-2/5 h-2/4">
          <OrgChooseBtn organization={organization} setOrganization={setOrganization} />
        </div>
      ) : (
        <div className="h-full w-3/5">
          <div>{organization === ORG_CREATE ? <CreateOrgInfo /> : <JoinOrgInfo />}</div>
          {errorState.isError ? (
            <ErrorAlert description={errorState.description} handleClickError={handleClickError} />
          ) : (
            <></>
          )}
          <div className="flex flex-row justify-center items-center">
            <div className="mr-2" onClick={goInitialOrg}>
              <NavigationBtn title="Back" />
            </div>
            <div className="ml-2">
              <RegisterOrgBtn
                title={
                  organization === ORG_CREATE ? ORG_CREATE.toUpperCase() : ORG_JOIN.toUpperCase()
                }
                setErrMsg={setErrMsg}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
