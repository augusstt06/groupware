import { type ForwardedRef, forwardRef } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isLabel: boolean
  labelHtmlfor?: string
  labelContent?: React.ReactNode
  labelClassName?: string
}

const Input = forwardRef((props: InputProps, fowardRef: ForwardedRef<HTMLInputElement>) => {
  const { isLabel, labelHtmlfor, labelContent, labelClassName, ...rest } = props
  const isLabelInput = () => {
    if (isLabel) {
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
