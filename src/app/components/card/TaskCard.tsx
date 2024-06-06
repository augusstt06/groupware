import Link from 'next/link'

import { type TaskCardProps } from '@/types/ui/card'

export default function TaskCard(props: TaskCardProps) {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow col-span-1 dark:bg-gray-800 dark:border-gray-700">
      <Link href={props.link}>
        <h2 className="mb-3 font-medium text-gray-700 dark:text-gray-200">{props.title}</h2>
      </Link>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">{props.description}</p>
    </div>
  )
}
