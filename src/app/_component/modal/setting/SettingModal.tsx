'use client'
import { useState } from 'react'

import ChangeOptions from './childs/ChangeOptions'
import ChangeOrg from './childs/ChangeOrg'
import ChangeProject from './childs/ChangeProject'
import ChangePwd from './childs/ChangePwd'

import { NAME, ORG, PJT, PWD } from '@/constant/constant'
import { useAppDispatch } from '@/module/hooks/reduxHooks'
import { handleSettingModalReducer } from '@/store/reducers/setting/settingModalReducer'

/**
 * 마이 페이지 모달
 * 1. 조직 / 프로젝트 이름 변경
 * 2. 비밀번호 변경
 * 3. 이름 변경
 */
export default function SettingModal() {
  const [setting, setSetting] = useState<string>('')
  const handleChangeSetting = (setting: string) => {
    setSetting(setting)
  }
  const dispatch = useAppDispatch()
  const handleCloseModal = () => {
    dispatch(handleSettingModalReducer())
  }
  const renderComponent = () => {
    switch (setting) {
      case PWD:
        return <ChangePwd handleChangeSetting={handleChangeSetting} />
      case NAME:
        return
      case ORG:
        return <ChangeOrg />
      case PJT:
        return <ChangeProject />
      default:
        return (
          <ChangeOptions
            handleChangeSetting={handleChangeSetting}
            handleCloseModal={handleCloseModal}
          />
        )
    }
  }

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className="modal-base"
    >
      <div className="justify-center w-4/6 p-4 space-y-5 bg-white border-2 border-indigo-300 border-solid rounded-lg shadow Prelative sort-vertical-flex dark:bg-gray-700 ">
        {renderComponent()}
      </div>
    </div>
  )
}
