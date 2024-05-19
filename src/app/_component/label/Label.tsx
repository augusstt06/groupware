import { type LabelIconProps, type LabelProps } from '@/types/ui/extra'

export function Label(props: LabelProps) {
  return (
    <label className="block mb-2 text-xs text-gray-900 md:text-sm md:font-bold dark:text-white">
      {props.title}
    </label>
  )
}

export function LabelAdd(props: LabelProps) {
  return (
    <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.title}</label>
  )
}

export function LabelIcon(props: LabelIconProps) {
  return (
    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
      {props.icon}
    </span>
  )
}
