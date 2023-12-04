import { type BtnProps } from '@/app/types/ui/btnTypes'

export function InputLabel(props: BtnProps) {
  return (
    <label
      htmlFor="input-group-1"
      className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
    >
      {props.title}
    </label>
  )
}

export function InputlabelAdd(props: BtnProps) {
  return (
    <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.title}</label>
  )
}
