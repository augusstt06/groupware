import { type ReactEventHandler } from 'react'

type ModalBtnProps = {
  onClose: ReactEventHandler
  btnValue: string
}
export default function ModalBtn(props: ModalBtnProps) {
  return (
    <div className=" flex flex-row items-center justify-center p-3">
      <button
        className="transition ease-in-out duration-300 border-gray-400 border-2 bg-white-600 hover:bg-gray-500 hover:dark:bg-gray-200 hover:dark:text-black hover:text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2er mr-5"
        onClick={props.onClose}
      >
        취소
      </button>
      <button className="transition ease-in-out duration-300 border-gray-400 border-2 bg-white-600 hover:bg-gray-500 hover:dark:bg-gray-200 hover:dark:text-black hover:text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2er">
        {props.btnValue}
      </button>
    </div>
  )
}
