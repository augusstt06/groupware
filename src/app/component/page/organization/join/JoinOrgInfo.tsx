import { SlOrganization } from 'react-icons/sl'

import OrgInput from '../../../ui/input/organization/OrgInput'

import { ORG_JOIN, REGISTER_ORG_JOIN } from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'

export default function JoinOrgInfo() {
  const dynamicInput = (isPersist: boolean, title: string) => {
    let storedValue
    if (localStorage.getItem(title) === null) {
      storedValue = ''
    } else {
      storedValue = isPersist ? localStorage.getItem(title) : ''
    }

    return useInput(storedValue as string, title)
  }

  const joinInput = dynamicInput(true, REGISTER_ORG_JOIN)
  return (
    <>
      <OrgInput
        componentType={ORG_JOIN}
        useInput={joinInput}
        title={REGISTER_ORG_JOIN}
        placeholder="조직 코드를 입력해주세요"
        icon={<SlOrganization />}
      />
    </>
  )
}
