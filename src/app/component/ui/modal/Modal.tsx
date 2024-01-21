import ReactDOM from 'react-dom'

import ModalBtn from '../button/project/modal/ModalBtn'

import { MODAL_CREATE_PROJECT_ISSUE, MODAL_INVITE_MEMBER_IN_PROJECT } from '@/app/constant/constant'
import {
  type DialogModalProps,
  type ModalHubProps,
  type ModalUsePortalProps,
} from '@/app/types/moduleTypes'

export default function ModalHub(props: ModalHubProps) {
  return (
    <>
      {props.modals.map((data) => (
        <>
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
          <DialogModal dialog={data.dialog} dialogAlertText={data.dialogAlertText} />
        </>
      ))}
    </>
  )
}
export function Modal(props: ModalUsePortalProps) {
  const btnClassName = () => {
    switch (props.name) {
      case MODAL_CREATE_PROJECT_ISSUE:
        return ''
      case MODAL_INVITE_MEMBER_IN_PROJECT:
        return 'border-t-2 border-gray-300'
    }
  }
  return props.isModalOpen ? (
    ReactDOM.createPortal(
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
  ) : (
    <></>
  )
}

export function DialogModal(props: DialogModalProps) {
  return (
    <dialog ref={props.dialog}>
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-blur-xs"
      >
        <div className="rounded-lg shadow dark:bg-gray-700 border-solid border-2 border-indigo-300 bg-white w-4/6 md:w-2/5 xl:w-1/5 2xl:w-2/12 p-5">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-around p-2">
              <span className="font-bold mb-2">{props.dialogAlertText?.main}</span>
              <span className="text-sm">{props.dialogAlertText?.sub}</span>
            </div>
            <button
              className="transition ease-in-out duration-300 border-gray-400 border-2 bg-white-600 hover:bg-gray-500 hover:dark:bg-gray-200 hover:dark:text-black hover:text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2er"
              onClick={() => props.dialog?.current?.close()}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}
