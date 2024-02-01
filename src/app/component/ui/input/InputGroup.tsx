import Input from './Input'

import { type UseInputProps } from '@/app/types/moduleTypes'
type InputGroupProps = {
  title: string
  labelContent: React.ReactNode
  placeholder: string
  useInput: UseInputProps
  type: string
  isView: boolean
  viewContent?: React.ReactNode
}

const InputGroup = (props: InputGroupProps) => {
  const { title, labelContent, placeholder, useInput, type, isView, viewContent } = props

  const renderingViewContent = () => {
    if (isView) {
      return viewContent
    }
  }
  return (
    <div className="w-full">
      <span className="block mb-2 md:text-sm text-xs md:font-bold text-gray-900 dark:text-white">
        {props.title}
      </span>
      <div className="flex relative mt-2 mb-6">
        <Input
          isLabel={true}
          labelClassName="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 "
          labelContent={labelContent}
          type={type}
          value={useInput.value}
          onChange={useInput.onChange}
          id={title}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
          placeholder={placeholder}
        />
        {renderingViewContent()}
      </div>
    </div>
  )
}
export default InputGroup
