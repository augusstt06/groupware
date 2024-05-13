/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Calendar from 'react-calendar'

import { type DialogCalenderProps, type DialogModalProps } from '@/types/module'

export default function Dialog(props: DialogModalProps) {
  const btnClassName =
    'border-gray-400 border-2 bg-white-600 hover:bg-gray-500 hover:dark:bg-gray-200 hover:dark:text-black hover:text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center text-center me-2er px-5 py-2.5'
  return (
    <dialog ref={props.dialog}>
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-blur-xs"
      >
        <div className="rounded-lg shadow bg-[#f5f7fc] bg-opacity-70 dark:bg-opacity-0 backdrop-blur-3xl border-solid border-2 border-indigo-300 w-4/6 md:w-2/5 xl:w-1/5 2xl:w-2/12 p-5">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-around p-2">
              <span className="font-bold mb-2">{props.dialogAlertText?.main}</span>
              <span className="text-sm">{props.dialogAlertText?.sub}</span>
            </div>
            <div className="flex flew-row w-3/5 justify-around">
              {props.dialogBtnValue?.isCancel ?? false ? (
                <button
                  className={`smooth-transition ${btnClassName}`}
                  onClick={props.dialogBtnValue?.cancleFunc}
                >
                  {props.dialogBtnValue?.cancelText}
                </button>
              ) : (
                <></>
              )}

              <button
                className={`smooth-transition ${btnClassName}`}
                onClick={props.dialogBtnValue?.confirmFunc}
              >
                {props.dialogBtnValue?.confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export function DialogCalendar(props: DialogCalenderProps) {
  const renderCalendar = () => {
    if (props.isWithtime) {
      return (
        <Calendar
          value={props.calendarWithTimeData?.calendarDateValue}
          onChange={props.calendarWithTimeData?.onDateChange}
        />
      )
    }
    return (
      <Calendar value={props.calendarData?.dateValue} onChange={props.calendarData?.onDateChange} />
    )
  }
  return (
    <dialog ref={props.dialog}>
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-blur-xs"
      >
        <div className="rounded-lg shadow dark:bg-gray-700 border-solid border-2 border-indigo-300 bg-white w-full sm:w-auto p-5 flex items-center justify-center">
          {renderCalendar()}
        </div>
      </div>
    </dialog>
  )
}
