import { NavigationBtn } from '../NavigationBtn'

import { type OrgChooseBtnProps } from '@/app/types/ui/btnTypes'

export default function OrgChooseBtn(props: OrgChooseBtnProps) {
  const handleClickBtn = (title: string) => {
    props.setOrganization(`${title}`)
  }
  return (
    <div className="flex flex-row justify-center items-center p-8">
      {['create', 'join'].map((title) => (
        <div
          key={title}
          className="mr-10"
          onClick={() => {
            handleClickBtn(title)
          }}
        >
          <NavigationBtn title={title === 'create' ? 'Create Organization' : 'Join Organization'} />
        </div>
      ))}
    </div>
  )
}
