import { useEffect } from 'react'

import { MdOutlineDescription } from 'react-icons/md'
import { SlOrganization } from 'react-icons/sl'

import InputWithLabel from '@/app/component/ui/input/InputWithLabel'
import { REGISTER_ORG_DESCRIPTION, REGISTER_ORG_NAME } from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { createOrgReducer } from '@/app/store/reducers/login/orgInfoReducer'

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
      title: REGISTER_ORG_NAME,
      labelContent: <SlOrganization />,
      placeholder: '조직 이름을 입력해주세요.',
      useInput: orgNameInput,
    },
    {
      title: REGISTER_ORG_DESCRIPTION,
      labelContent: <MdOutlineDescription />,
      placeholder: '조직 설명을 입력해주세요.',
      useInput: orgDescriptionInput,
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
      {inputGroupList.map((data) => (
        <InputWithLabel
          key={data.title}
          title={data.title}
          isHeadLabel={true}
          headLabelContent={data.labelContent}
          placeholder={data.placeholder}
          useInput={data.useInput}
          type="text"
          isTailLabel={false}
          className=""
        />
      ))}
    </>
  )
}
