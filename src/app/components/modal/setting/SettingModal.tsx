'use client'
import { useEffect, useState } from 'react'

import ChangeOptions from './childs/ChangeOptions'
import ChangeOrg from './childs/ChangeOrg'
import ChangeProject from './childs/ChangeProject'
import ChangePwd from './childs/ChangePwd'

import Button from '@/components/button/Button'
import { NAME, ORG, PJT, PWD } from '@/constant/constant'
import { useAppDispatch } from '@/module/hooks/reduxHooks'
import { handleSettingModalReducer } from '@/store/reducers/setting/settingModalReducer'

type SettingModalBtnProps = {
  clickEvent: () => void
  handleChangeSetting: (setting: string) => void
  handleCloseModal: () => void
  isInitialSetting: boolean
}
export default function SettingModal() {
  const [setting, setSetting] = useState<string>('')
  const handleChangeSetting = (setting: string) => {
    setSetting(setting)
  }
  const [clickEvent, setClickEvent] = useState<() => void>(() => {})
  const updateClickEvent = (fetchFn: () => void) => {
    setClickEvent(fetchFn)
  }

  const isInitialSetting = setting === ''
  const dispatch = useAppDispatch()
  const handleCloseModal = () => {
    dispatch(handleSettingModalReducer())
  }
  const renderComponent = () => {
    switch (setting) {
      case PWD:
        return <ChangePwd updateClickEvent={updateClickEvent} />
      case NAME:
        return
      case ORG:
        return <ChangeOrg />
      case PJT:
        return <ChangeProject />
      default:
        return <ChangeOptions handleChangeSetting={handleChangeSetting} />
    }
  }

  useEffect(() => {
    if (setting === '') updateClickEvent(() => {})
  }, [setting])
  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className="modal-base"
    >
      <div className="justify-center w-4/6 p-4 bg-white border-2 border-indigo-300 border-solid rounded-lg shadow space-y-5 Prelative sort-vertical-flex dark:bg-[#2e2e2e] ">
        {renderComponent()}
        <SettingModalBtn
          clickEvent={clickEvent}
          isInitialSetting={isInitialSetting}
          handleChangeSetting={handleChangeSetting}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  )
}

const SettingModalBtn = (props: SettingModalBtnProps) => {
  const { isInitialSetting, handleCloseModal, handleChangeSetting, clickEvent } = props

  const buttonList = [
    { buttonContent: '변경', onClick: clickEvent, className: 'bg-indigo-300 hover:bg-indigo-500' },
    {
      buttonContent: '이전',
      onClick: () => {
        handleChangeSetting('')
      },
      className: 'bg-red-300 hover:bg-red-500',
    },
  ]

  return (
    <>
      {isInitialSetting ? (
        <Button
          buttonContent={'닫기'}
          onClick={handleCloseModal}
          className="p-2 pl-3 pr-3 text-white bg-red-300 rounded-lg smooth-transition hover:bg-red-500"
        />
      ) : (
        <section className="justify-between w-32 sort-row-flex">
          {buttonList.map((data) => (
            <Button
              key={data.buttonContent}
              buttonContent={data.buttonContent}
              onClick={data.onClick}
              className={`p-2 pl-3 pr-3 text-white rounded-lg smooth-transition ${data.className}`}
            />
          ))}
        </section>
      )}
    </>
  )
}
