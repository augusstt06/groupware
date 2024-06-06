import { useEffect } from 'react'

import FloatingInput from '@/components/input/FloatingInput'
import {
  REGISTER_ORG_DESCRIPTION,
  REGISTER_ORG_DESCRIPTION_EN,
  REGISTER_ORG_NAME,
  REGISTER_ORG_NAME_EN,
} from '@/constant/constant'
import useInput from '@/module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { createOrgReducer } from '@/store/reducers/login/orgInfoReducer'

export default function CreateOrgInfo() {
  const dispatch = useAppDispatch()
  const createOrgState = useAppSelector((state) => state.orgInfo.createOrg)

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

  const handleBeforeunload = () => {
    const payload = {
      name: '',
      description: '',
    }
    dispatch(createOrgReducer(payload))
  }
  useEffect(() => {
    const payload = {
      name: orgNameInput.value,
      description: createOrgState.description,
    }
    dispatch(createOrgReducer(payload))
    const handleNameInputFocusOut = () => {
      localStorage.setItem(REGISTER_ORG_NAME, orgNameInput.value)
    }
    const orgNameInputElement = document.getElementById(REGISTER_ORG_NAME)
    orgNameInputElement?.addEventListener('focusout', handleNameInputFocusOut)
    window.addEventListener('beforeunload', handleBeforeunload)
  }, [orgNameInput.value])

  const inputGroupList = [
    {
      title: REGISTER_ORG_NAME_EN,
      isViewActive: false,
      useInput: orgNameInput,
      inputViewType: 'text',
    },
    {
      title: REGISTER_ORG_DESCRIPTION_EN,
      isViewActive: false,
      useInput: orgDescriptionInput,
      inputViewType: 'text',
    },
  ]
  useEffect(() => {
    const payload = {
      name: createOrgState.name,
      description: orgDescriptionInput.value,
    }
    dispatch(createOrgReducer(payload))

    const handleDesInputFocusOut = () => {
      localStorage.setItem(REGISTER_ORG_DESCRIPTION, orgDescriptionInput.value)
    }
    const orgDesInputElement = document.getElementById(REGISTER_ORG_DESCRIPTION)
    orgDesInputElement?.addEventListener('focusout', handleDesInputFocusOut)
    window.addEventListener('beforeunload', handleBeforeunload)
  }, [orgDescriptionInput.value])
  return (
    <>
      {inputGroupList.map((data, index) => (
        <div key={index} className="mb-4">
          <FloatingInput
            title={data.title}
            inputViewType={data.inputViewType}
            isViewActive={data.isViewActive}
            value={data.useInput.value}
            onChange={data.useInput.onChange}
          />
        </div>
      ))}
    </>
  )
}
