import { useEffect } from 'react'

import { InputIconlabel } from '../../label/InputIconlabel'
import { InputLabel } from '../../label/Inputlabel'

import { useInput } from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import {
  createOrgReducer,
  createTeamOrgReducer,
  joinOrgReducer,
} from '@/app/store/reducers/orgInfoReducer'
import { type OrganizationProps } from '@/app/types/ui/inputTypes'

export default function OrgInput(props: OrganizationProps) {
  const dispatch = useAppDispatch()
  const inputData = useInput('')
  const createOrgState = useAppSelector((state) => state.orgInfo.createOrg)
  const createTeamOrgState = useAppSelector((state) => state.orgInfo.teams)

  useEffect(() => {
    let payload
    switch (props.componentType) {
      case 'create':
        payload = {
          name: props.title === 'Organization name' ? inputData.value : createOrgState.name,
          description: props.title === 'Description' ? inputData.value : createOrgState.description,
          organizationType: createOrgState.organizationType,
        }
        dispatch(createOrgReducer(payload))
        break
      case 'join':
        payload = {
          code: inputData.value,
        }
        dispatch(joinOrgReducer(payload))
        break
      case 'createTeam':
        payload = {
          teamName: props.title === 'Team Name' ? inputData.value : createTeamOrgState.teamName,
          teamDescription:
            props.title === 'Team Description'
              ? inputData.value
              : createTeamOrgState.teamDescription,
        }
        dispatch(createTeamOrgReducer(payload))
        break
      default:
        break
    }
  }, [inputData.value])

  return (
    <>
      <InputLabel title={props.title} />
      <div className="flex relative mt-2 mb-6">
        <InputIconlabel icon={props.icon} />
        <input
          type="text"
          {...inputData}
          id={props.title}
          className="ounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
        />
      </div>
    </>
  )
}
