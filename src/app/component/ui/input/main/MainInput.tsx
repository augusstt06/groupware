import { InputLabel } from '../../label/Inputlabel'

import { type MainInputProps } from '@/app/types/ui/inputTypes'

export default function MainInput(props: MainInputProps) {
  const tailwindClassName =
    props.type === 'project'
      ? 'rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      : 'rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
  return (
    <div className={props.type === 'project' ? 'mb-5' : ''}>
      <InputLabel title={props.title} />
      <input
        type="text"
        className={tailwindClassName}
        value={props.input.value}
        onChange={props.input.onChange}
        id={props.title}
        placeholder={props.placeholder}
      />
    </div>
  )
}
