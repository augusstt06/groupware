import React from 'react'

import { type InputIconLabelProps } from '@/app/types/ui/uiTypes'

export function InputIconlabel(props: InputIconLabelProps) {
  return (
    <span className="inline-flex items-center md:px-3 px-1 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
      {props.icon}
    </span>
  )
}
