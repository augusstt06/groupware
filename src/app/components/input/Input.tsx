import { type ForwardedRef, forwardRef } from 'react'

import { type InputProps } from '@/types/ui/input'

const Input = forwardRef((props: InputProps, fowardRef: ForwardedRef<HTMLInputElement>) => {
  const { isLabel, labelHtmlfor, labelContent, labelClassName, ...rest } = props
  const isLabelInput = () => {
    if (isLabel === true) {
      return (
        <>
          <label htmlFor={labelHtmlfor} className={labelClassName}>
            {labelContent}
          </label>
          <input ref={fowardRef} {...rest} />
        </>
      )
    }
    return <input ref={fowardRef} {...rest} />
  }
  return isLabelInput()
})
Input.displayName = 'Input'
export default Input
