import { MdOutlineDescription } from 'react-icons/md'
import { SiMicrosoftteams } from 'react-icons/si'

import { OrgTeamBtn } from '@/app/component/ui/button/organization/OrgTeamBtn'
import OrgInput from '@/app/component/ui/input/organization/OrgInput'

export default function CreateOrgTeam() {
  return (
    <>
      <OrgInput
        componentType="createTeam"
        title="Team Name"
        placeholder="groupware"
        icon={<SiMicrosoftteams />}
      />
      <OrgInput
        componentType="createTeam"
        title="Team Description"
        placeholder="Groupware development"
        icon={<MdOutlineDescription />}
      />

      <div className="flex flex-row justify-around w-2/4">
        <OrgTeamBtn title="Confirm Team" />
      </div>
    </>
  )
}
