'use client'

import { useState } from 'react'

import { MdOutlineDescription } from 'react-icons/md'
import { SlOrganization } from 'react-icons/sl'

import { NavigateBtn } from '../component/ui/button/NavigateBtn'
import OrgInput from '../component/ui/input/organization/OrgInput'
import SelectBox from '../component/ui/selectbox/SelectBox'

// TODO: Organization 가입/생성
export default function Organization() {
  // 조직생성/가입 선택하기
  const [organization, setOrganization] = useState('')

  const handleClickBtn = (title: string) => {
    setOrganization(`${title}`)
  }

  return (
    <div className="flex flex-col justify-center items-center p 1">
      <div className="flex flex-row justify-center items-center p-8">
        {['create', 'join'].map((title) => (
          <div
            key={title}
            className="mr-10"
            onClick={() => {
              handleClickBtn(title)
            }}
          >
            <NavigateBtn title={title === 'create' ? 'Create Organization' : 'Join Organization'} />
          </div>
        ))}
      </div>
      {organization === 'create' ? (
        <>
          <OrgInput title="organization name" placeholder="frontend" icon={<SlOrganization />} />
          <OrgInput
            title="description"
            placeholder="
Groupware site publishing and feature development"
            icon={<MdOutlineDescription />}
          />
          <SelectBox />
        </>
      ) : (
        <>join</>
      )}
    </div>
  )
}
