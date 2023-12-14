import { HiBellAlert } from 'react-icons/hi2'

export default function AlertIndicator() {
  return (
    <button
      type="button"
      className="inline-flex items-center  text-gray-900 dark:text-white dark:hover:border-indigo-400 border-2 border-white dark:border-gray-900 hover:border-indigo-400 px-5 py-2.5 text-sm font-medium text-center rounded-lg  focus:ring-4 focus:outline-none focus:ring-indigo-400  dark:focus:ring-indigo-400"
    >
      <HiBellAlert className="w-5 h-5" />
      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-1 dark:border-gray-900">
        8
      </div>
    </button>
  )
}
