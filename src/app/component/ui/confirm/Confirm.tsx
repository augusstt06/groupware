import React, { type SetStateAction } from 'react'

import { IoCloseSharp } from 'react-icons/io5'

type props = {
  isConfirmOpen: boolean
  setIsConfirmOpen: React.Dispatch<SetStateAction<boolean>>
  setConfirmValue: React.Dispatch<SetStateAction<boolean>>
}
export default function Confirm(props: props) {
  const tailwindClass = `${
    props.isConfirmOpen ? '' : 'hidden'
  } overflow-y-auto overflow-x-hidden fixed flex justify-center items-center w-2/4 top-0 left-1/3`
  return (
    <>
      <div id="deleteModal" tabIndex={-1} aria-hidden="true" className={tailwindClass}>
        <div className="flex p-4 w-full max-w-md h-full md:h-auto justify-center items-center">
          <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="text-right">
              <button
                onClick={() => {
                  props.setIsConfirmOpen(!props.isConfirmOpen)
                }}
              >
                <IoCloseSharp className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-500 dark:text-gray-300">아직 퇴근확인이 되지 않았습니다.</p>
            <p className="mb-4 text-gray-500 dark:text-gray-300">
              {' '}
              퇴근처리 이후 로그아웃을 진행합니다.
            </p>

            <div className="flex justify-center items-center space-x-4">
              <button
                data-modal-toggle="deleteModal"
                type="button"
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => {
                  props.setIsConfirmOpen(!props.isConfirmOpen)
                  props.setConfirmValue(false)
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={() => {
                  props.setIsConfirmOpen(!props.isConfirmOpen)
                  props.setConfirmValue(true)
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
