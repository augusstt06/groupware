'use client'

import { useState } from 'react'

import ErrorAlert from '../../ui/alert/ErrorAlert'
import { NavigationBtn } from '../../ui/button/BtnGroups'
import RegisterOrgBtn from '../../ui/button/register/RegisterOrgBtn'

import CreateOrgInfo from './create/CreateOrgInfo'
import JoinOrgInfo from './join/JoinOrgInfo'

import { ORG_CREATE, ORG_JOIN } from '@/app/constant/constant'
import { type RegisterOrgProps } from '@/app/types/pageTypes'

export default function RegisterOrg(props: RegisterOrgProps) {
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

  const goInitialOrg = () => {
    props.setOrganization('')
  }
  return (
    <div className="flex flex-col justify-center items-center h-3/5 h-full overflow-y-auto">
      {props.organization === '' ? (
        // <div className="w-2/5 h-2/4">
        //   <OrgChooseBtn organization={props.organization} setOrganization={props.setOrganization} />
        // </div>
        <></>
      ) : (
        <div className="h-full w-3/5">
          <div>{props.organization === ORG_CREATE ? <CreateOrgInfo /> : <JoinOrgInfo />}</div>
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
                  props.organization === ORG_CREATE
                    ? ORG_CREATE.toUpperCase()
                    : ORG_JOIN.toUpperCase()
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
