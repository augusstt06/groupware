import { useEffect } from 'react'

import { SlOrganization } from 'react-icons/sl'

import OrgInput from '../../../ui/input/organization/OrgInput'

import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { joinOrgStatusReducer } from '@/app/store/reducers/signupInfoReducer'

export default function JoinOrgInfo() {
  const joinInput = useInput('')
  const dispatch = useAppDispatch()
  useEffect(() => {
    const isJoinComplete = joinInput.value !== ''
    const reducerProps = {
      isCheck: isJoinComplete,
    }
    dispatch(joinOrgStatusReducer(reducerProps))
  })
  return (
    <>
      <OrgInput
        componentType="join"
        useInput={joinInput}
        title="Organization Code"
        placeholder="ABC12GG"
        icon={<SlOrganization />}
      />
    </>
  )
}
