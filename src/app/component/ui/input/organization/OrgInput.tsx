import { useEffect } from 'react'

import { InputIconlabel } from '../../label/InputIconlabel'
import { InputLabel } from '../../label/Inputlabel'

import {
  ORG_CREATE,
  ORG_JOIN,
  REGISTER_ORG_DESCRIPTION,
  REGISTER_ORG_NAME,
} from '@/app/constant/constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { createOrgReducer, joinOrgReducer } from '@/app/store/reducers/login/orgInfoReducer'
import { type OrgInputProps } from '@/app/types/ui/inputTypes'

export default function OrgInput(props: OrgInputProps) {
  const createOrgState = useAppSelector((state) => state.orgInfo.createOrg)
  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.useInput.onChange(e)
  }
  const useInput = props.useInput
  useEffect(() => {
    let payload
    switch (props.componentType) {
      case ORG_CREATE:
        payload = {
          name: props.title === REGISTER_ORG_NAME ? useInput.value : createOrgState.name,
          description:
            props.title === REGISTER_ORG_DESCRIPTION ? useInput.value : createOrgState.description,
          organizationType: createOrgState.organizationType,
        }
        dispatch(createOrgReducer(payload))

        break
      case ORG_JOIN:
        payload = {
          code: useInput.value,
        }

        dispatch(joinOrgReducer(payload))

        break
      default:
        break
    }
    const handleInputFocusOut = () => {
      localStorage.setItem(props.title, useInput.value)
    }
    const handleBeforeunload = () => {
      payload = {
        name: '',
        description: '',
        organizationType: 'PUBLIC',
      }
      dispatch(createOrgReducer(payload))
      dispatch(joinOrgReducer({ code: '' }))
    }
    const inputElement = document.getElementById(props.title)
    inputElement?.addEventListener('focusout', handleInputFocusOut)
    window.addEventListener('beforeunload', handleBeforeunload)
  }, [useInput.value])

  return (
    <div>
      <InputLabel title={props.title} />
      <div className="flex relative mt-2 mb-6">
        <InputIconlabel icon={props.icon} />
        <input
          type="text"
          value={useInput.value}
          autoComplete="off"
          onChange={handleChange}
          id={props.title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  )
}
