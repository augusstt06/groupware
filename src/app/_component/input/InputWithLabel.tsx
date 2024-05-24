import Input from './Input'

import { type InputGroupProps } from '@/_types/ui/input'

const InputWithLabel = (props: InputGroupProps) => {
  const {
    onKeyDown,
    className,
    isHeadLabel,
    title,
    headLabelContent,
    placeholder,
    useInput,
    type,
    isTailLabel,
    tailLabelContent,
  } = props

  const renderingtailLabelContent = () => {
    if (isTailLabel === true) {
      return tailLabelContent
    }
  }
  const renderingInputTitle = () => {
    if (props.title === '') {
      return <></>
    }
    return (
      <span className="block mb-2 text-xs text-gray-900 md:text-sm md:font-bold dark:text-white">
        {props.title}
      </span>
    )
  }
  const inputClassName = () => {
    if (className === '') {
      return 'rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-[#2e2e2e] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none'
    }
    return className
  }

  return (
    <div className="w-full">
      {renderingInputTitle()}
      <div className="relative flex mt-2 mb-2">
        <Input
          onKeyDown={onKeyDown}
          isLabel={isHeadLabel}
          labelClassName="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md dark:bg-[#505050] dark:text-gray-400 dark:border-[#505050] "
          labelContent={headLabelContent}
          type={type}
          value={useInput.value}
          onChange={useInput.onChange}
          id={title}
          className={inputClassName()}
          placeholder={placeholder}
        />
        {renderingtailLabelContent()}
      </div>
    </div>
  )
}
export default InputWithLabel
