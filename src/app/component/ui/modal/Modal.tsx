import { useState } from 'react'
import ReactDOM from 'react-dom'

import ModalBtn from '../button/project/modal/ModalBtn'

import Dialog from './dialog/Dialog'

import { MODAL_CREATE_PROJECT_ISSUE, MODAL_INVITE_MEMBER_IN_PROJECT } from '@/app/constant/constant'
import { type ModalHubProps, type ModalUsePortalProps } from '@/app/types/moduleTypes'

export default function ModalHub(props: ModalHubProps) {
  return (
    <>
      {props.modals.map((data) => (
        <div key={data.name}>
          <Modal
            key={data.name}
            onClose={data.onClose}
            isModalOpen={data.isModalOpen}
            name={data.name}
            btnValue={data.btnValue}
            confirmFunc={() => {
              data.confirmFunc()
              data.dialog?.current?.showModal()
            }}
          >
            {data.childComponent}
          </Modal>
          <Dialog
            dialog={data.dialog}
            dialogAlertText={data.dialogAlertText}
            dialogBtnValue={data.dialogBtnValue}
          />
        </div>
      ))}
    </>
  )
}
export function Modal(props: ModalUsePortalProps) {
  const [render, setRender] = useState<HTMLDivElement | null>(null)
  const btnClassName = () => {
    switch (props.name) {
      case MODAL_CREATE_PROJECT_ISSUE:
        return ''
      case MODAL_INVITE_MEMBER_IN_PROJECT:
        return 'border-t-2 border-gray-300'
    }
  }
  const viewModal = () => {
    if (render === null) return null

    return ReactDOM.createPortal(
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-blur-xs"
      >
        <div className="relative rounded-lg shadow dark:bg-gray-700 border-solid border-2 border-indigo-300 bg-white w-5/6 md:w-1/2 xl:w-2/5 2xl:w-3/12">
          {props.children}
          <div className={btnClassName()}>
            <ModalBtn
              onClose={props.onClose}
              btnValue={props.btnValue}
              confirmFunc={props.confirmFunc}
            />
          </div>
        </div>
      </div>,
      document.getElementById('modal') as HTMLElement,
    )
  }
  return props.isModalOpen ? (
    <>
      <div
        id="render"
        ref={(el) => {
          setRender(el)
        }}
      ></div>
      {viewModal()}
    </>
  ) : (
    <></>
  )
}
