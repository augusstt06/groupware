import { CgDanger } from 'react-icons/cg'
import { IoCloseSharp } from 'react-icons/io5'

import { type ErrorAlertType } from '@/types/ui/alert'

export default function ErrorAlert(props: ErrorAlertType) {
  return (
    <div
      id="alert-2"
      className="flex items-center p-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <CgDanger className="w-4 h-4" />
      <span className="sr-only">Info</span>
      <div className=" ms-3 md:text-sm md:font-medium text-xs w-full md:w-auto">
        {props.description}
      </div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
        data-dismiss-target="#alert-2"
        aria-label="Close"
        onClick={() => {
          props.handleClickError()
        }}
      >
        <IoCloseSharp className="w-4 h-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}
