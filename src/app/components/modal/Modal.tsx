import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import Button from '../button/Button'

import Dialog from './dialog/Dialog'

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
          className={`p-3 relative rounded-lg shadow bg-[#f5f7fc] dark:bg-[#2e2e2e] backdrop-blur-3xl border-solid border-4 border-indigo-300 w-5/6 md:w-1/2 xl:w-2/5 2xl:w-1/3 `}
        >
          {props.children}
          <ModalBtn
            onClose={props.onClose}
            btnValue={props.btnValue}
            confirmFunc={props.confirmFunc}
          />
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
        className="smooth-transition bg-red-400 hover:bg-red-600 text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2er mr-5"
        onClick={props.onClose}
      />
      <Button
        buttonContent={props.btnValue}
        className="smooth-transition bg-indigo-400 hover:bg-indigo-600 text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2er"
        onClick={props.confirmFunc}
      />
    </div>
  )
}
