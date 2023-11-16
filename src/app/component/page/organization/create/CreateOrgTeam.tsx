import { useEffect } from 'react'

import { MdOutlineDescription } from 'react-icons/md'
import { SiMicrosoftteams } from 'react-icons/si'

import { OrgTeamConfirmBtn } from '@/app/component/ui/button/organization/OrgTeamBtn'
import OrgInput from '@/app/component/ui/input/organization/OrgInput'
import { useInput } from '@/app/module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import {
  createOrgTeamReducer,
  updateCurrentOrgTeamReducer,
} from '@/app/store/reducers/orgInfoReducer'

export default function CreateOrgTeam() {
  const teamNameInput = useInput('')
  const teamDescriptionInput = useInput('')
  const dispatch = useAppDispatch()
  const currentTeamState = useAppSelector((state) => state.orgInfo.currentTeam)
  const teamState = useAppSelector((state) => state.orgInfo.teams)

  const handleClick = () => {
    dispatch(createOrgTeamReducer(currentTeamState))
    teamNameInput.resetValue()
    teamDescriptionInput.resetValue()

    alert('팀생성이 완료되었습니다.')
  }

  useEffect(() => {
    const payload = {
      teamName: teamNameInput.value,
      teamDescription: teamDescriptionInput.value,
    }
    dispatch(updateCurrentOrgTeamReducer(payload))
    teamNameInput.value = ''
  }, [teamState])

  return (
    <>
      <OrgInput
        componentType="createTeam"
        title="Team Name"
        useInput={teamNameInput}
        placeholder="groupware"
        icon={<SiMicrosoftteams />}
      />
      <OrgInput
        componentType="createTeam"
        title="Team Description"
        useInput={teamDescriptionInput}
        placeholder="Groupware development"
        icon={<MdOutlineDescription />}
      />

      <div className="flex flex-row justify-around w-2/4">
        <OrgTeamConfirmBtn title="Confirm Team" handleClick={handleClick} />
      </div>
    </>
  )
}
