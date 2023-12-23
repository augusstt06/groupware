import { MdOutlineDescription } from 'react-icons/md'
import { SlOrganization } from 'react-icons/sl'

import OrgInput from '../../../ui/input/organization/OrgInput'

import { ORG_CREATE, REGISTER_ORG_DESCRIPTION, REGISTER_ORG_NAME } from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'

export default function CreateOrgInfo() {
  const dynamicInput = (isPersist: boolean, title: string, limit?: number) => {
    let storedValue
    if (localStorage.getItem(title) === null) {
      storedValue = ''
    } else {
      storedValue = isPersist ? localStorage.getItem(title) : ''
    }

    return useInput(storedValue as string, title, limit)
  }
  const orgNameInput = dynamicInput(true, REGISTER_ORG_NAME)
  const orgDescriptionInput = dynamicInput(true, REGISTER_ORG_DESCRIPTION, 100)

  return (
    <>
      <OrgInput
        useInput={orgNameInput}
        componentType={ORG_CREATE}
        title={REGISTER_ORG_NAME}
        placeholder="조직 이름을 입력해주세요"
        icon={<SlOrganization />}
      />
      <OrgInput
        useInput={orgDescriptionInput}
        componentType={ORG_CREATE}
        title={REGISTER_ORG_DESCRIPTION}
        placeholder="
조직 설명을 입력해주세요"
        icon={<MdOutlineDescription />}
      />
    </>
  )
}
