import { useEffect } from 'react'

import { MdOutlineDescription } from 'react-icons/md'
import { SiMicrosoftteams } from 'react-icons/si'

import { OrgTeamConfirmBtn } from '@/app/component/ui/button/organization/OrgTeamBtn'
import OrgInput from '@/app/component/ui/input/organization/OrgInput'
import OrgTeamTable from '@/app/component/ui/table/organization/OrgTeamTable'
import { ORG_CREATETEAM } from '@/app/constant/constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
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
  }, [teamNameInput.value, teamDescriptionInput.value])

  return (
    <div className="flex flex-row justify-center  w-full mb-5">
      <div className="w-3/6  mr-5">
        <OrgInput
          componentType={ORG_CREATETEAM}
          title="Team Name"
          useInput={teamNameInput}
          placeholder="groupware"
          icon={<SiMicrosoftteams />}
        />
        <OrgInput
          componentType={ORG_CREATETEAM}
          title="Team Description"
          useInput={teamDescriptionInput}
          placeholder="Groupware development"
          icon={<MdOutlineDescription />}
        />
        <div className="flex flex-row justify-center">
          <OrgTeamConfirmBtn title="Confirm Team" handleClick={handleClick} />
        </div>
      </div>
      <div className="w-4/6">
        <OrgTeamTable />
      </div>
    </div>
  )
}
