import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import Button from '../button/Button'

import Dialog from './dialog/Dialog'

import { MODAL_CREATE_PROJECT_ISSUE, MODAL_INVITE_MEMBER_IN_PROJECT } from '@/constant/constant'
import { type ModalHubProps, type ModalUsePortalProps } from '@/types/module'
import { type ModalBtnProps } from '@/types/ui/modal'

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
        className="modal-base"
      >
        <div
          className={`relative rounded-lg shadow bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-10 backdrop-blur-3xl border-solid border-2 border-indigo-300 w-5/6 md:w-1/2 xl:w-2/5 2xl:w-3/12`}
        >
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
  useEffect(() => {
    const modalElement = document.createElement('div')
    modalElement.id = 'render'
    setRender(modalElement)

    return () => {
      modalElement.remove()
    }
  }, [])
  return props.isModalOpen === true ? <>{viewModal()}</> : <></>
}

export function ModalBtn(props: ModalBtnProps) {
  return (
    <div className="justify-center p-3 sort-row-flex">
      <Button
        buttonContent="취소"
        className="smooth-transition border-gray-400 border-2 bg-white-600 hover:bg-gray-500 hover:dark:bg-gray-200 hover:dark:text-black hover:text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2er mr-5"
        onClick={props.onClose}
      />
      <Button
        buttonContent={props.btnValue}
        className="smooth-transition border-gray-400 border-2 bg-white-600 hover:bg-gray-500 hover:dark:bg-gray-200 hover:dark:text-black hover:text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2er"
        onClick={props.confirmFunc}
      />
    </div>
  )
}
