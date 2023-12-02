import { type AttendanceHistoryBtnProps } from '@/app/types/ui/btnTypes'

export default function AttendanceHistoryBtn(props: AttendanceHistoryBtnProps) {
  return (
    <div className="border border-indigo-700 border-2 p-1 mt-7 rounded-lg text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white bg-white border-indigo-500 hover:bg-indigo-500 dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 ">
      <button type="button" onClick={props.onClick}>
        조회
      </button>
    </div>
  )
}
