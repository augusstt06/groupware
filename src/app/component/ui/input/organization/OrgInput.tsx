import { useEffect } from 'react'

import { InputIconlabel } from '../../label/InputIconlabel'
import { InputLabel } from '../../label/Inputlabel'

import { ORG_CREATE, ORG_JOIN } from '@/app/constant/constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { createOrgReducer, joinOrgReducer } from '@/app/store/reducers/login/orgInfoReducer'
import { type OrgInputProps } from '@/app/types/ui/inputTypes'

export default function OrgInput(props: OrgInputProps) {
  const createOrgState = useAppSelector((state) => state.orgInfo.createOrg)
  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.useInput.onChange(e)
  }

  useEffect(() => {
    let payload
    switch (props.componentType) {
      case ORG_CREATE:
        payload = {
          name: props.title === 'Organization name' ? props.useInput.value : createOrgState.name,
          description:
            props.title === 'Description' ? props.useInput.value : createOrgState.description,
          organizationType: createOrgState.organizationType,
        }
        dispatch(createOrgReducer(payload))

        break
      case ORG_JOIN:
        payload = {
          code: props.useInput.value,
        }
        dispatch(joinOrgReducer(payload))
        break
      default:
        break
    }
    const handleInputFocusOut = () => {
      localStorage.setItem(props.title, props.useInput.value)
    }
    const handleBeforeunload = () => {
      payload = {
        name: '',
        description: '',
        organizationType: 'PUBLIC',
      }
      props.useInput.resetValue()
      dispatch(createOrgReducer(payload))
      dispatch(joinOrgReducer({ code: '' }))
    }
    const inputElement = document.getElementById(props.title)
    inputElement?.addEventListener('focusout', handleInputFocusOut)
    window.addEventListener('beforeunload', handleBeforeunload)
  }, [props.useInput.value])

  return (
    <div>
      <InputLabel title={props.title} />
      <div className="flex relative mt-2 mb-6">
        <InputIconlabel icon={props.icon} />
        <input
          type="text"
          value={props.useInput.value}
          onChange={handleChange}
          id={props.title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  )
}
