import { useEffect } from 'react'

import { SlOrganization } from 'react-icons/sl'

// import OrgInput from '../../../ui/input/organization/OrgInput'

import InputGroup from '@/app/component/ui/input/InputGroup'
import { REGISTER_ORG_JOIN } from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { joinOrgReducer } from '@/app/store/reducers/login/orgInfoReducer'

export default function JoinOrgInfo() {
  const dispatch = useAppDispatch()
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

  const handleBeforeunload = () => {
    dispatch(joinOrgReducer({ code: '' }))
  }
  useEffect(() => {
    const payload = {
      code: joinInput.value,
    }
    dispatch(joinOrgReducer(payload))

    const handleJoinInputFocusOut = () => {
      localStorage.setItem(REGISTER_ORG_JOIN, joinInput.value)
    }
    const joinInputElement = document.getElementById(REGISTER_ORG_JOIN)
    joinInputElement?.addEventListener('focusout', handleJoinInputFocusOut)
    window.addEventListener('beforeunload', handleBeforeunload)
  }, [joinInput.value])
  return (
    <InputGroup
      title={REGISTER_ORG_JOIN}
      isLabel={true}
      labelContent={<SlOrganization />}
      placeholder="조직 코드를 입력해주세요"
      useInput={joinInput}
      type="text"
      isView={false}
    />
  )
}
