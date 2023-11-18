import { NavigationBtn } from '../BtnGroups'

import { ORG_CREATE, ORG_JOIN } from '@/app/constant/constant'
import { type OrgChooseBtnProps } from '@/app/types/ui/btnTypes'

export default function OrgChooseBtn(props: OrgChooseBtnProps) {
  const handleClickBtn = (title: string) => {
    props.setOrganization(`${title}`)
  }
  return (
    <div className="flex flex-row justify-between w-full">
      {[ORG_CREATE, ORG_JOIN].map((title) => (
        <div
          key={title}
          onClick={() => {
            handleClickBtn(title)
          }}
        >
          <NavigationBtn
            title={title === ORG_CREATE ? 'Create Organization' : 'Join Organization'}
          />
        </div>
      ))}
    </div>
  )
}
