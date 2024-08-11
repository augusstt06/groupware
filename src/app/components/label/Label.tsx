import { LABEL_ICON } from '@/constant/constant'
import { type LabelProps } from '@/types/ui/extra'

export function Label(props: LabelProps) {
  const { category, childs } = props
  const decideClassName = () => {
    switch (category) {
      case LABEL_ICON:
        return 'rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300'
      default:
        return 'md:text-sm md:font-bold dark:text-white block mb-2 text-xs text-gray-900'
    }
  }
  return <label className={decideClassName()}>{childs}</label>
}
