import { IoClose } from 'react-icons/io5'

import { type BoardWriteAlertProps } from '@/app/types/ui/alertTypes'

export default function BoardWriteAlert(props: BoardWriteAlertProps) {
  return (
    <>
      <div
        id="popup-modal"
        tabIndex={-1}
        className="overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-99 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full left-1/3 right-1/3 top-1/4">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border-2 border-gray-500 ">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={props.handleModalState}
            >
              <IoClose className="w-4 h-4" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <h3 className="text-lg  text-gray-700 dark:text-gray-400 font-bold">
                {props.alertState.headDescription}
              </h3>
              {props.alertState.additianoalDescription !== '' ? (
                <span className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
                  {props.alertState.additianoalDescription}
                </span>
              ) : (
                <></>
              )}

              <div className="mt-5">
                {props.alertState.option.negative !== '' ? (
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                    onClick={props.handleModalState}
                  >
                    {props.alertState.option.negative}
                  </button>
                ) : (
                  <></>
                )}
                {props.alertState.isFetch ? (
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => {
                      void props.fetchPost()
                    }}
                  >
                    {props.alertState.option.positive}
                  </button>
                ) : (
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={props.handleModalState}
                  >
                    {props.alertState.option.positive}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
