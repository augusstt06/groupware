import ReactDOM from 'react-dom'

import ModalBtn from '../button/project/modal/ModalBtn'

import { MODAL_CREATE_PROJECT_ISSUE, MODAL_INVITE_MEMBER_IN_PROJECT } from '@/app/constant/constant'
import { type ModalHubProps, type ModalUsePortalProps } from '@/app/types/moduleTypes'

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
            <ModalBtn onClose={props.onClose} btnValue={props.btnValue} />
          </div>
        </div>
      </div>,
      document.getElementById('modal') as HTMLElement,
    )
  ) : (
    <></>
  )
}

export default function ModalHub(props: ModalHubProps) {
  return (
    <>
      {props.modals.map((data) => (
        <Modal
          key={data.name}
          onClose={data.onClose}
          isModalOpen={data.isModalOpen}
          name={data.name}
          btnValue={data.btnValue}
        >
          {data.childComponent}
        </Modal>
      ))}
    </>
  )
}
