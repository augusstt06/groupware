import { useEffect } from 'react'

import FloatingInput from '@/components/input/FloatingInput'
import { REGISTER_ORG_JOIN, REGISTER_ORG_JOIN_EN } from '@/constant/constant'
import useInput from '@/module/hooks/reactHooks/useInput'
import { useAppDispatch } from '@/module/hooks/reduxHooks'
import { joinOrgReducer } from '@/store/reducers/login/orgInfoReducer'

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
    <FloatingInput
      title={REGISTER_ORG_JOIN_EN}
      inputViewType="text"
      isViewActive={false}
      value={joinInput.value}
      onChange={joinInput.onChange}
    />
  )
}
