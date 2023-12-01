import { InputLabel } from '../../../label/Inputlabel'

import { type AttendanceInputProps } from '@/app/types/ui/inputTypes'

export default function AttendanceInput(props: AttendanceInputProps) {
  return (
    <div>
      <InputLabel title="From" />
      <input
        type="text"
        className="rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={props.input.value}
        onChange={props.input.onChange}
        id="from"
        placeholder="2023/01/12/23:02"
      />
    </div>
  )
}
